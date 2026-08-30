/**
 * Backfills HTTP metadata on every object in the `imamzain-media` R2 bucket:
 *
 *   - all objects get `Cache-Control: public, max-age=31536000, immutable`
 *   - downloadable types (pdf, mp3, mp4, wav, zip, docx) also get a
 *     `Content-Disposition: attachment` header carrying the object's basename,
 *     so `/api/download` redirects save with a proper filename
 *
 * Run locally with an R2 API token scoped to the bucket (Object Read & Write):
 *
 *   R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... \
 *     bun scripts/r2-set-metadata.ts [--dry-run]
 *
 * Idempotent: objects already carrying the target headers are skipped, so
 * re-running after a partial failure only touches what is left.
 */
import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
  CopyObjectCommand,
} from "@aws-sdk/client-s3";

const BUCKET = "imamzain-media";
const CACHE_CONTROL = "public, max-age=31536000, immutable";
const ATTACHMENT_EXTENSIONS = new Set([
  "pdf",
  "mp3",
  "mp4",
  "wav",
  "zip",
  "docx",
]);
// CopyObject rejects sources over 5 GB; anything larger needs a manual
// multipart copy and is only reported here.
const MAX_COPY_BYTES = 5 * 1024 * 1024 * 1024;

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const dryRun = process.argv.includes("--dry-run");

function contentDispositionFor(key: string): string | undefined {
  const basename = key.split("/").pop() ?? key;
  const extension = basename.split(".").pop()?.toLowerCase() ?? "";
  if (basename === extension || !ATTACHMENT_EXTENSIONS.has(extension)) {
    return undefined;
  }
  return `attachment; filename*=UTF-8''${encodeURIComponent(basename)}`;
}

async function* listAllObjects(s3: S3Client) {
  let continuationToken: string | undefined;
  do {
    const page = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        ContinuationToken: continuationToken,
      }),
    );
    yield* page.Contents ?? [];
    continuationToken = page.NextContinuationToken;
  } while (continuationToken);
}

async function main() {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error(
      "Missing credentials: set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.",
    );
    process.exit(1);
  }

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    // R2 rejects the SDK's newer default of checksumming every request.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  let updated = 0;
  let skipped = 0;
  let failed = 0;
  let scanned = 0;

  for await (const object of listAllObjects(s3)) {
    const key = object.Key;
    if (!key || key.endsWith("/")) continue;

    scanned++;
    if (scanned % 100 === 0) {
      console.log(`...scanned ${scanned} objects`);
    }

    if ((object.Size ?? 0) > MAX_COPY_BYTES) {
      console.warn(`SKIP (over 5 GB, copy manually): ${key}`);
      failed++;
      continue;
    }

    const targetDisposition = contentDispositionFor(key);

    try {
      const head = await s3.send(
        new HeadObjectCommand({ Bucket: BUCKET, Key: key }),
      );

      const alreadyDone =
        head.CacheControl === CACHE_CONTROL &&
        (targetDisposition === undefined ||
          head.ContentDisposition === targetDisposition);
      if (alreadyDone) {
        skipped++;
        continue;
      }

      if (dryRun) {
        console.log(
          `DRY RUN would update: ${key}` +
            (targetDisposition ? " (cache + attachment filename)" : " (cache)"),
        );
        updated++;
        continue;
      }

      await s3.send(
        new CopyObjectCommand({
          Bucket: BUCKET,
          Key: key,
          CopySource: `${BUCKET}/${key.split("/").map(encodeURIComponent).join("/")}`,
          MetadataDirective: "REPLACE",
          CacheControl: CACHE_CONTROL,
          ContentDisposition: targetDisposition ?? head.ContentDisposition,
          // MetadataDirective REPLACE drops everything not restated, so carry
          // over the metadata the object already has.
          ContentType: head.ContentType,
          ContentEncoding: head.ContentEncoding,
          ContentLanguage: head.ContentLanguage,
          Metadata: head.Metadata,
        }),
      );
      updated++;
    } catch (error) {
      failed++;
      console.error(
        `FAILED: ${key}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  console.log(
    `${dryRun ? "[dry run] " : ""}Done. ${scanned} scanned, ${updated} ${
      dryRun ? "would be updated" : "updated"
    }, ${skipped} already correct, ${failed} failed.`,
  );
  if (failed > 0) process.exit(1);
}

main();
