import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import * as mm from 'music-metadata';

const INPUT_JSON = path.join(
  process.cwd(),
  "src/data/AudioItem.json"
);

const OUTPUT_JSON = path.join(
  process.cwd(),
  "src/data/AudioItemAnalyzed.json"
);

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type AudioItem = {
  id: number;
  title: string;
  speaker: string;
  audio: string;
  pdf?: string;
  category?: string;
  duration?: string;
  durationSeconds?: number;
  bitrate?: number;
  size?: string;
  sizeMB?: number;
  createdAt?: string;
  searchText?: string;
  peaks?: number[];
  sampleRate?: number;
  codec?: string;
  isVBR?: boolean;
};

// ─────────────────────────────────────────────────────────────
// Download File with Progress
// ─────────────────────────────────────────────────────────────

function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const decodedUrl = decodeURI(url);
    
    console.log(`  📥 تحميل: ${path.basename(decodedUrl)}`);
    
    client
      .get(decodedUrl, (res) => {
        // Handle redirects
        if (res.statusCode === 301 || res.statusCode === 302) {
          console.log(`  🔄 إعادة توجيه إلى: ${res.headers.location}`);
          downloadFile(res.headers.location!)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          return;
        }

        const chunks: Buffer[] = [];
        let downloadedSize = 0;
        const contentLength = parseInt(res.headers['content-length'] || '0', 10);
        
        res.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
          downloadedSize += chunk.length;
          
          if (contentLength > 0) {
            const percent = ((downloadedSize / contentLength) * 100).toFixed(1);
            process.stdout.write(`\r  📊 التحميل: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(1)} MB)`);
          }
        });

        res.on("end", () => {
          console.log(`\r  ✅ اكتمل التحميل: ${(downloadedSize / 1024 / 1024).toFixed(1)} MB    `);
          resolve(Buffer.concat(chunks));
        });

        res.on("error", reject);
      })
      .on("error", (err) => {
        console.error(`  ❌ خطأ في التحميل: ${err.message}`);
        reject(err);
      });
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

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────
// Extract Peaks (محسن)
// ─────────────────────────────────────────────────────────────

function extractPeaks(buffer: Buffer): number[] {
  const numPeaks = Math.min(
    1500,
    Math.max(
      300,
      Math.floor(buffer.length / 1200)
    )
  );

  const step = Math.floor(
    buffer.length / numPeaks
  );

  const peaks: number[] = [];

  for (let i = 0; i < numPeaks; i++) {
    let sum = 0;
    let count = 0;
    let maxValue = 0;

    const start = i * step;

    const end = Math.min(
      start + step,
      buffer.length
    );

    for (let j = start; j < end; j++) {
      const value =
        (buffer[j] - 128) / 128;

      const absValue = Math.abs(value);

      sum += value * value;

      count++;

      if (absValue > maxValue) {
        maxValue = absValue;
      }
    }

    const rms = count
      ? Math.sqrt(sum / count)
      : 0;

    const combined =
      rms * 0.6 + maxValue * 0.4;

    peaks.push(combined);
  }

  // remove outliers
  const sorted = [...peaks].sort(
    (a, b) => a - b
  );

  const p5 =
    sorted[
      Math.floor(sorted.length * 0.05)
    ];

  const p95 =
    sorted[
      Math.floor(sorted.length * 0.95)
    ];

  const minVal = p5;
  const maxVal = p95;

  const normalized = peaks.map((p) => {
    let normalized =
      (p - minVal) /
      (maxVal - minVal);

    normalized = Math.max(
      0,
      Math.min(1, normalized)
    );

    return parseFloat(
      Math.pow(normalized, 0.8).toFixed(4)
    );
  });

  const enhanced = normalized.map((p) => {
    if (p < 0.1) return p * 1.2;

    return p;
  });

  return enhanced;
}

// ─────────────────────────────────────────────────────────────
// Get Accurate Audio Metadata
// ─────────────────────────────────────────────────────────────

async function getAccurateMetadata(buffer: Buffer, audioUrl: string): Promise<{
  durationSeconds: number;
  bitrate: number;
  sampleRate: number;
  codec: string;
  isVBR: boolean;
}> {
  try {
    // تحديد نوع الملف من الامتداد
    const ext = path.extname(audioUrl).toLowerCase();
    let mimeType = 'audio/mpeg';
    
    switch(ext) {
      case '.mp3':
        mimeType = 'audio/mpeg';
        break;
      case '.m4a':
      case '.mp4':
        mimeType = 'audio/mp4';
        break;
      case '.ogg':
        mimeType = 'audio/ogg';
        break;
      case '.wav':
        mimeType = 'audio/wav';
        break;
      case '.flac':
        mimeType = 'audio/flac';
        break;
      default:
        mimeType = 'audio/mpeg';
    }
    
    console.log(`  🔍 تحليل الميتاداتا (${ext || 'mp3'})...`);
    
    const metadata = await mm.parseBuffer(buffer, mimeType);
    
    const durationSeconds = metadata.format.duration || 0;
    const bitrate = metadata.format.bitrate ? Math.round(metadata.format.bitrate / 1000) : 0;
    const sampleRate = metadata.format.sampleRate || 0;
    const codec = metadata.format.codec || 'unknown';
    const isVBR = metadata.format.bitrate ? !metadata.format.bitrate.toString().includes('CBR') : false;
    
    console.log(`  📊 الميتاداتا المستخرجة:`);
    console.log(`     • المدة: ${durationSeconds.toFixed(2)} ثانية (${formatDuration(durationSeconds)})`);
    console.log(`     • البتريت: ${bitrate} kbps ${isVBR ? '(VBR)' : '(CBR)'}`);
    console.log(`     • معدل العينة: ${sampleRate} Hz`);
    console.log(`     • نوع الترميز: ${codec}`);
    
    return {
      durationSeconds: Math.floor(durationSeconds),
      bitrate,
      sampleRate,
      codec,
      isVBR
    };
    
  } catch (err) {
    console.warn(`  ⚠ فشل قراءة الميتاداتا: ${err instanceof Error ? err.message : err}`);
    console.log(`  📊 استخدام حساب تقريبي بناءً على افتراض bitrate 128 kbps`);
    
    // حساب تقريبي كـ Fallback
    const estimatedBitrate = 128;
    const estimatedDuration = (buffer.length * 8) / (estimatedBitrate * 1000);
    
    return {
      durationSeconds: Math.floor(estimatedDuration),
      bitrate: estimatedBitrate,
      sampleRate: 44100,
      codec: 'unknown',
      isVBR: false
    };
  }
}

// ─────────────────────────────────────────────────────────────
// Analyze Audio (معدل بدقة عالية)
// ─────────────────────────────────────────────────────────────

async function analyzeAudio(item: AudioItem): Promise<AudioItem> {
  // التحقق مما إذا كان قد تم تحليله مسبقاً بدقة
  if (item.peaks && item.durationSeconds && item.codec && item.sampleRate) {
    console.log(`  ⏭ تخطي (محلل مسبقاً بدقة): ${item.title}`);
    return item;
  }
  
  console.log(`\n🎵 بدء تحليل: ${item.title}`);
  console.log(`  👤 المتحدث: ${item.speaker}`);
  
  try {
    // تحميل الملف
    const buffer = await downloadFile(item.audio);
    
    // الحجم الدقيق
    const sizeBytes = buffer.length;
    const sizeMB = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));
    const sizeText = `${sizeMB} MB`;
    
    console.log(`  💾 الحجم الفعلي: ${sizeText} (${sizeBytes.toLocaleString()} bytes)`);
    
    // استخراج الميتاداتا الدقيقة
    const metadata = await getAccurateMetadata(buffer, item.audio);
    
    // ✅ تم التصحيح هنا: استخدام const بدلاً من let
    const finalDurationSeconds = metadata.durationSeconds;
    const finalDuration = formatDuration(finalDurationSeconds);
    
    // التحقق من أن المدة معقولة (بين دقيقة و 10 ساعات)
    if (finalDurationSeconds < 60) {
      console.log(`  ⚠ المدة قصيرة جداً (${finalDurationSeconds} ثانية)، قد يكون التحليل غير دقيق`);
    }
    
    if (finalDurationSeconds > 36000) {
      console.log(`  ⚠ المدة طويلة جداً (${finalDurationSeconds} ثانية)، تأكد من صحة الملف`);
    }
    
    // استخراج الـ Peaks
    console.log(`  📊 استخراج波形 الصوتية...`);
    const peaks = extractPeaks(buffer);
    
    // إنشاء نص البحث
    const searchText = `${item.title} ${item.speaker} ${item.category || ""}`
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
    
    // النتيجة النهائية
    const result: AudioItem = {
      id: item.id,
      title: item.title,
      speaker: item.speaker,
      audio: item.audio,
      pdf: item.pdf,
      category: item.category,
      duration: finalDuration,
      durationSeconds: finalDurationSeconds,
      bitrate: metadata.bitrate,
      size: sizeText,
      sizeMB: sizeMB,
      createdAt: item.createdAt || new Date().toISOString(),
      searchText: searchText,
      peaks: peaks,
      sampleRate: metadata.sampleRate,
      codec: metadata.codec,
      isVBR: metadata.isVBR
    };
    
    console.log(`  ✅ اكتمل التحليل بنجاح:`);
    console.log(`     • المدة: ${finalDuration} (${finalDurationSeconds} ثانية)`);
    console.log(`     • الحجم: ${sizeText}`);
    console.log(`     • الجودة: ${metadata.bitrate} kbps ${metadata.isVBR ? 'متغير' : 'ثابت'}`);
    console.log(`     •波形 النقاط: ${peaks.length} نقطة`);
    
    return result;
    
  } catch (err) {
    console.error(`  ❌ فشل تحليل الملف: ${item.title}`);
    console.error(`     الخطأ: ${err instanceof Error ? err.message : err}`);
    
    // إرجاع العنصر الأصلي مع بيانات جزئية
    const searchText = `${item.title} ${item.speaker} ${item.category || ""}`
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
    
    return {
      ...item,
      createdAt: item.createdAt || new Date().toISOString(),
      searchText: searchText
    };
  }
}

// ─────────────────────────────────────────────────────────────
// Main Function
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("         🎵 تحليل الملفات الصوتية بدقة عالية");
  console.log("═══════════════════════════════════════════════════════════\n");
  
  // قراءة الملفات
  if (!fs.existsSync(INPUT_JSON)) {
    console.error(`❌ خطأ: الملف ${INPUT_JSON} غير موجود!`);
    process.exit(1);
  }
  
  const raw = fs.readFileSync(INPUT_JSON, "utf-8");
  const items: AudioItem[] = JSON.parse(raw);
  
  console.log(`📁 تم العثور على ${items.length} ملف(ات) للتحليل\n`);
  
  const analyzed: AudioItem[] = [];
  
  // تحليل كل ملف بالتسلسل (لتجنب الضغط على الخادم)
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`\n[${i + 1}/${items.length}] ────────────────────────────────`);
    
    const result = await analyzeAudio(item);
    analyzed.push(result);
    
    // حفظ التقدم بعد كل ملف (لضمان عدم فقدان البيانات)
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(analyzed, null, 2), "utf-8");
    console.log(`  💾 تم حفظ التقدم (${analyzed.length}/${items.length})`);
  }
  
  // إحصائيات نهائية
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("📊 إحصائيات التحليل:");
  console.log("═══════════════════════════════════════════════════════════");
  
  const successful = analyzed.filter(a => a.durationSeconds && a.codec).length;
  const totalSizeMB = analyzed.reduce((sum, a) => sum + (a.sizeMB || 0), 0);
  const totalDurationSec = analyzed.reduce((sum, a) => sum + (a.durationSeconds || 0), 0);
  
  console.log(`  ✅ نجح: ${successful}/${analyzed.length} ملف`);
  console.log(`  💾 الحجم الكلي: ${(totalSizeMB / 1024).toFixed(2)} GB`);
  console.log(`  ⏱ المدة الكلية: ${formatDuration(totalDurationSec)}`);
  console.log(`  📁 حفظ النتائج في: ${OUTPUT_JSON}`);
  console.log("═══════════════════════════════════════════════════════════\n");
  
  console.log("✅ انتهى التحليل بنجاح!");
}

// تشغيل السكربت
main().catch(err => {
  console.error("❌ خطأ فادح:", err);
  process.exit(1);
});