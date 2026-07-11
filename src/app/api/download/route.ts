import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME;
const DEFAULT_CONTENT_TYPE = "application/octet-stream";
const EXTERNAL_TYPE_TO_EXT: Record<string, string> = {
  "application/pdf": "pdf",
  "audio/mpeg": "mp3",
  "video/mp4": "mp4",
  "audio/wav": "wav",
};

function getBaseName(name: string) {
  return name.replace(/\.[^/.]+$/, "");
}

function getRelativeExtension(path: string) {
  return path.split(".").pop() ?? "bin";
}

function getResponseHeaders(
  contentType: string,
  fileName: string,
  extension: string,
  length: number,
) {
  return {
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
      fileName,
    )}.${extension}`,
    "Content-Length": length.toString(),
  };
}

async function fetchWithTimeout(
  url: string,
  signal: AbortSignal,
  userAgent = false,
) {
  return fetch(url, {
    signal,
    headers: userAgent ? { "User-Agent": "Mozilla/5.0" } : undefined,
  });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const name = req.nextUrl.searchParams.get("name") ?? "file";

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  const baseName = getBaseName(name);
  const isRelative = url.startsWith("/");
  const fetchUrl = isRelative ? `${req.nextUrl.origin}${url}` : url;

  if (!isRelative) {
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return new NextResponse("Invalid url", { status: 400 });
    }
    console.log("ALLOWED_HOSTNAME =", ALLOWED_HOSTNAME);
    console.log("parsed hostname =", parsedUrl.hostname);
    if (!ALLOWED_HOSTNAME || parsedUrl.hostname !== ALLOWED_HOSTNAME) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetchWithTimeout(
      fetchUrl,
      controller.signal,
      !isRelative,
    );
    console.log("fetchUrl =", fetchUrl);
    console.log("response status =", response.status);
    if (!response.ok) {
      return new NextResponse("Fetch failed", { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type")?.split(";")[0] ??
      DEFAULT_CONTENT_TYPE;
    const extension = isRelative
      ? getRelativeExtension(url)
      : (EXTERNAL_TYPE_TO_EXT[contentType] ?? "bin");

    return new NextResponse(buffer, {
      headers: getResponseHeaders(
        contentType,
        baseName,
        extension,
        buffer.byteLength,
      ),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return new NextResponse("انتهت مهلة التحميل", { status: 504 });
    }

    return new NextResponse("فشل التحميل", { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
