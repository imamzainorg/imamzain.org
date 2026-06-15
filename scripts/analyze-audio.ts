import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import * as mm from "music-metadata";

const INPUT_JSON = path.join(process.cwd(), "src/data/AudioItem.json");
const OUTPUT_JSON = path.join(process.cwd(), "src/data/AudioItemAnalyzed.json");

export type AudioItem = {
  id: number;
  title: string;
  speaker: string;
  audio: string;
  pdf?: string;
  durationSeconds?: number;
  sizeMB?: number;
  peaks?: number[];
};

// ─────────────────────────────────────────────────────────────
// Download
// ─────────────────────────────────────────────────────────────

function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const decodedUrl = decodeURI(url);

    console.log(`  📥 تحميل: ${path.basename(decodedUrl)}`);

    client
      .get(decodedUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          if (!res.headers.location) {
            reject(new Error("Redirect location missing"));
            return;
          }
          downloadFile(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          return;
        }

        const chunks: Buffer[] = [];
        let downloadedSize = 0;
        const contentLength = parseInt(
          res.headers["content-length"] || "0",
          10,
        );

        res.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
          downloadedSize += chunk.length;
          if (contentLength > 0) {
            const percent = ((downloadedSize / contentLength) * 100).toFixed(1);
            process.stdout.write(
              `\r  📊 التحميل: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(1)} MB)`,
            );
          }
        });

        res.on("end", () => {
          console.log(
            `\r  ✅ اكتمل: ${(downloadedSize / 1024 / 1024).toFixed(2)} MB    `,
          );
          resolve(Buffer.concat(chunks));
        });

        res.on("error", reject);
      })
      .on("error", reject);
  });
}

// ─────────────────────────────────────────────────────────────
// Format Duration
// ─────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0)
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────
// حساب المدة بدقة باستخدام music-metadata فقط
// ─────────────────────────────────────────────────────────────

async function getDuration(buffer: Buffer, audioUrl: string): Promise<number> {
  const ext = path.extname(audioUrl).toLowerCase();

  const mimeMap: Record<string, string> = {
    ".mp3": "audio/mpeg",
    ".m4a": "audio/mp4",
    ".mp4": "audio/mp4",
    ".ogg": "audio/ogg",  
    ".wav": "audio/wav",
    ".flac": "audio/flac",
    ".webm": "audio/webm",
    ".aac": "audio/aac",
    ".3gp": "audio/3gpp",
    ".3gpp": "audio/3gpp",
  };

  const mimeType = mimeMap[ext] ?? "audio/mpeg";

  try {
    const metadata = await mm.parseBuffer(buffer, mimeType, {
      duration: true, 
      skipCovers: true,
      includeChapters: false,
    });

    const duration = metadata.format.duration;

    if (duration && duration > 0 && isFinite(duration)) {
      console.log(
        `  ⏱ المدة: ${formatDuration(duration)} (${duration.toFixed(2)} ثانية)`,
      );
      return duration;
    }

    throw new Error("لم يتم العثور على مدة صالحة");
  } catch (error) {
    console.warn(
      `  ⚠ فشل قراءة metadata: ${error instanceof Error ? error.message : error}`,
    );
    const estimatedDuration = (buffer.length * 8) / (128 * 1000);
    console.warn(
      `  ⏱ تقدير تقريبي: ${formatDuration(estimatedDuration)} (مبني على 128kbps)`,
    );
    return estimatedDuration;
  }
}

// ─────────────────────────────────────────────────────────────
// استخراج الـ Peaks
// ─────────────────────────────────────────────────────────────

function extractPeaks(buffer: Buffer): number[] {
  const numPeaks = 300;
  const step = Math.floor(buffer.length / numPeaks);
  const peaks: number[] = [];

  for (let i = 0; i < numPeaks; i++) {
    const start = i * step;
    const end = Math.min(start + step, buffer.length);
    let sum = 0;
    let count = 0;
    let maxValue = 0;

    for (let j = start; j < end; j++) {
      const value = (buffer[j] - 128) / 128;
      const absValue = Math.abs(value);
      sum += value * value;
      count++;
      if (absValue > maxValue) maxValue = absValue;
    }

    const rms = count ? Math.sqrt(sum / count) : 0;
    peaks.push(rms * 0.6 + maxValue * 0.4);
  }

  const sorted = [...peaks].sort((a, b) => a - b);
  const p5 = sorted[Math.floor(sorted.length * 0.05)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const range = p95 - p5;

  return peaks.map((p) => {
    let normalized = range > 0 ? (p - p5) / range : 0;
    normalized = Math.max(0, Math.min(1, normalized));
    normalized = Math.pow(normalized, 0.8);
    if (normalized < 0.1) normalized *= 1.2;
    return parseFloat(normalized.toFixed(4));
  });
}

// ─────────────────────────────────────────────────────────────
// تحليل ملف واحد
// ─────────────────────────────────────────────────────────────

async function analyzeAudio(
  item: AudioItem,
  forceAnalyze: boolean = false,
): Promise<AudioItem> {
  // تخطي الملفات التي تم تحليلها مسبقاً (ما لم forceAnalyze = true)
  if (
    !forceAnalyze &&
    item.peaks &&
    item.durationSeconds &&
    item.durationSeconds > 0
  ) {
    console.log(`  ⏭ تخطي (محلل مسبقاً): ${item.title}`);
    return item;
  }

  console.log(`\n🎵 [${item.id}] ${item.title} — ${item.speaker}`);

  try {
    const buffer = await downloadFile(item.audio);
    const sizeMB = parseFloat((buffer.length / 1024 / 1024).toFixed(2));
    const durationSeconds = await getDuration(buffer, item.audio);
    console.log(`  📊 جاري استخراج الـ peaks...`);
    const peaks = extractPeaks(buffer);
    console.log(
      `  ✅ النتيجة: ${formatDuration(durationSeconds)} | ${sizeMB} MB | ${peaks.length} نقاط`,
    );

    return {
      id: item.id,
      title: item.title,
      speaker: item.speaker,
      audio: item.audio,
      pdf: item.pdf,
      durationSeconds: Math.round(durationSeconds),
      sizeMB,
      peaks,
    };
  } catch (error) {
    console.error(
      `  ❌ فشل التحليل: ${error instanceof Error ? error.message : error}`,
    );
    return {
      id: item.id,
      title: item.title,
      speaker: item.speaker,
      audio: item.audio,
      pdf: item.pdf,
      durationSeconds: 0,
      sizeMB: 0,
      peaks: [],
    };
  }
}

// ─────────────────────────────────────────────────────────────
// قراءة الملفات الموجودة مسبقاً
// ─────────────────────────────────────────────────────────────

function loadExistingAnalyzed(): Map<number, AudioItem> {
  if (fs.existsSync(OUTPUT_JSON)) {
    try {
      const existing: AudioItem[] = JSON.parse(
        fs.readFileSync(OUTPUT_JSON, "utf-8"),
      );
      const map = new Map<number, AudioItem>();
      existing.forEach((item) => map.set(item.id, item));
      return map;
    } catch {
      return new Map();
    }
  }
  return new Map();
}

// ─────────────────────────────────────────────────────────────
// دمج النتائج
// ─────────────────────────────────────────────────────────────

function mergeResults(
  existing: Map<number, AudioItem>,
  newResults: AudioItem[],
): AudioItem[] {
  const merged = new Map<number, AudioItem>();

  // إضافة الملفات الموجودة
  existing.forEach((item, id) => merged.set(id, item));

  // تحديث أو إضافة الملفات الجديدة
  newResults.forEach((item) => merged.set(item.id, item));

  // ترتيب حسب ID
  return Array.from(merged.values()).sort((a, b) => a.id - b.id);
}

// ─────────────────────────────────────────────────────────────
// عرض المساعدة
// ─────────────────────────────────────────────────────────────

function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                 أداة تحليل الملفات الصوتية                    ║
╚══════════════════════════════════════════════════════════════╝

الاستخدام:
  bun run analyze                       # تحليل جميع الملفات
  bun run analyze --id 5                # تحليل ملف برقم ID 5 فقط
  bun run analyze --from 10 --to 20     # تحليل الملفات من ID 10 إلى 20
  bun run analyze --force               # إعادة تحليل جميع الملفات (تجاوز المخزن)
  bun run analyze --id 5 --force        # إعادة تحليل ملف ID 5
  bun run analyze --help                # عرض هذه المساعدة

ملاحظات:
  • النتائج تحفظ تلقائياً في ${OUTPUT_JSON}
  • يتم تخطي الملفات المحللة مسبقاً إلا مع --force
  • يمكنك إيقاف السكربت في أي وقت وسيتم حفظ التقدم
  `);
}

// ─────────────────────────────────────────────────────────────
// معاملات سطر الأوامر
// ─────────────────────────────────────────────────────────────

interface CLIOptions {
  id?: number;
  from?: number;
  to?: number;
  force: boolean;
  help: boolean;
}

function parseCLI(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = { force: false, help: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--id":
        if (args[i + 1]) {
          options.id = parseInt(args[i + 1], 10);
          i++;
        }
        break;
      case "--from":
        if (args[i + 1]) {
          options.from = parseInt(args[i + 1], 10);
          i++;
        }
        break;
      case "--to":
        if (args[i + 1]) {
          options.to = parseInt(args[i + 1], 10);
          i++;
        }
        break;
      case "--force":
        options.force = true;
        break;
      case "--help":
      case "-h":
        options.help = true;
        break;
    }
  }

  return options;
}

// ─────────────────────────────────────────────────────────────
// فلترة الملفات حسب الخيارات
// ─────────────────────────────────────────────────────────────

function filterItems(items: AudioItem[], options: CLIOptions): AudioItem[] {
  let filtered = [...items];

  if (options.id !== undefined) {
    filtered = filtered.filter((item) => item.id === options.id);
    if (filtered.length === 0) {
      console.error(`❌ لا يوجد ملف برقم ID: ${options.id}`);
      process.exit(1);
    }
  }

  if (options.from !== undefined) {
    filtered = filtered.filter((item) => item.id >= options.from!);
  }

  if (options.to !== undefined) {
    filtered = filtered.filter((item) => item.id <= options.to!);
  }

  return filtered;
}

// ─────────────────────────────────────────────────────────────
// التحقق من وجود بيانات صحيحة في النتائج المخزنة
// ─────────────────────────────────────────────────────────────

function isValidAnalyzedItem(item: AudioItem | undefined): boolean {
  return (
    item !== undefined &&
    item.durationSeconds !== undefined &&
    item.durationSeconds > 0
  );
}

// ─────────────────────────────────────────────────────────────
// الوظيفة الرئيسية
// ─────────────────────────────────────────────────────────────

async function main() {
  const options = parseCLI();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // التحقق من وجود ملف الإدخال
  if (!fs.existsSync(INPUT_JSON)) {
    console.error(`❌ الملف غير موجود: ${INPUT_JSON}`);
    process.exit(1);
  }

  // قراءة البيانات
  const allItems: AudioItem[] = JSON.parse(
    fs.readFileSync(INPUT_JSON, "utf-8"),
  );
  const itemsToAnalyze = filterItems(allItems, options);

  // تحميل النتائج الموجودة مسبقاً
  const existingResults = loadExistingAnalyzed();

  // عرض معلومات البدء
  console.log(`\n📁 إجمالي الملفات: ${allItems.length}`);
  console.log(`🎯 ملفات للتحليل: ${itemsToAnalyze.length}`);
  console.log(
    `🔄 وضع القوة: ${options.force ? "نعم (إعادة تحليل الكل)" : "لا (تخطي المحلل مسبقاً)"}`,
  );

  if (options.id !== undefined) console.log(`🔍 تحليل ID: ${options.id}`);
  if (options.from !== undefined) console.log(`📊 من ID: ${options.from}`);
  if (options.to !== undefined) console.log(`📊 إلى ID: ${options.to}`);

  console.log(`\n${"=".repeat(60)}`);

  const newResults: AudioItem[] = [];
  let analyzedCount = 0;
  let skippedCount = 0;

  // معالجة كل ملف
  for (let i = 0; i < itemsToAnalyze.length; i++) {
    const item = itemsToAnalyze[i];
    const existingItem = existingResults.get(item.id);
    const alreadyAnalyzed = isValidAnalyzedItem(existingItem);

    if (!options.force && alreadyAnalyzed) {
      console.log(
        `\n[${i + 1}/${itemsToAnalyze.length}] ⏭ تخطي ID ${item.id}: ${item.title}`,
      );
      skippedCount++;
      // نضيف الملف الموجود بدلاً من إنشاء واحد جديد
      if (existingItem) {
        newResults.push(existingItem);
      } else {
        newResults.push(item);
      }
      continue;
    }

    console.log(`\n[${i + 1}/${itemsToAnalyze.length}] ${"=".repeat(50)}`);
    const result = await analyzeAudio(item, options.force);
    newResults.push(result);
    analyzedCount++;

    // حفظ التقدم بعد كل ملف (دمج مع النتائج الموجودة)
    const merged = mergeResults(existingResults, newResults);
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(merged, null, 2), "utf-8");
    console.log(
      `  💾 تم حفظ التقدم (${analyzedCount + skippedCount}/${itemsToAnalyze.length})`,
    );
  }

  // دمج النتائج النهائية
  const finalResults = mergeResults(existingResults, newResults);

  const failed = finalResults.filter(
    (item) =>
      !item.durationSeconds ||
      item.durationSeconds <= 0 ||
      !item.peaks ||
      item.peaks.length === 0,
  );

  if (failed.length > 0) {
    console.log("\n❌ الملفات المتضررة:");
    failed.forEach((item) => {
      console.log(`ID: ${item.id} | ${item.title}`);
    });
  }

  // إحصائيات نهائية
  const successful = finalResults.filter(
    (a) => a.durationSeconds !== undefined && a.durationSeconds > 0,
  );
  const totalDuration = successful.reduce(
    (sum, a) => sum + (a.durationSeconds || 0),
    0,
  );

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ اكتمل التحليل بنجاح!`);
  console.log(`📊 تم تحليل ${analyzedCount} ملف جديد`);
  console.log(`⏩ تم تخطي ${skippedCount} ملف محلل مسبقاً`);
  console.log(
    `📊 إجمالي المحللين: ${successful.length}/${allItems.length} ملف بنجاح`,
  );
  console.log(`⏱ إجمالي المدة: ${formatDuration(totalDuration)}`);
  console.log(`💾 النتائج محفوظة في: ${OUTPUT_JSON}`);
}

// تشغيل البرنامج
main().catch((error) => {
  console.error("❌ خطأ غير متوقع:", error);
  process.exit(1);
});
