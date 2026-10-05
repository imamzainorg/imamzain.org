import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { normalizeArabic } from "../src/app/library/_lib/arabic-text";

type Explanation = {
  id?: number;
  author: string;
  text?: string;
  content: string;
  occurrence?: number;
};

type Phrase = {
  id: string;
  content: string;
  explanations?: Explanation[];
};

type Subject = {
  id: string;
  title: string;
  phrases: Phrase[];
};

type Dictionary = {
  slug: string;
  subjects: Subject[];
};

type SourcePhrase = {
  text?: unknown;
  break?: unknown;
  [key: string]: unknown;
};

type SourcePrayer = {
  prayer_number: number;
  phrases: SourcePhrase[];
};

const DIGIT_TRANSLATION: Record<string, string> = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
};

function numericId(value: string | number): number | null {
  const translated = String(value).replace(/[٠-٩۰-۹]/g, (digit) => DIGIT_TRANSLATION[digit]);
  const parsed = Number(translated);
  return Number.isInteger(parsed) ? parsed : null;
}

function isExplanation(explanation: Explanation): boolean {
  return Boolean(explanation.author?.trim() || explanation.content?.trim());
}

function main() {
  const sourcePathArgument = process.argv[2];
  const shouldWrite = process.argv.includes("--write");

  if (!sourcePathArgument) {
    console.error(
      'Usage: bun scripts/merge-sahifa-explanations.ts "<source.json>" [--write]',
    );
    process.exitCode = 1;
    return;
  }

  const sourcePath = path.resolve(sourcePathArgument);
  const targetPath = path.resolve(
    "src/data/imamzain-legacy/al-sahifa.json",
  );
  const source = JSON.parse(readFileSync(sourcePath, "utf8")) as {
    prayers: SourcePrayer[];
  };
  const target = JSON.parse(readFileSync(targetPath, "utf8")) as Dictionary[];
  const index = target.find(
    (dictionary) => dictionary.slug === "al-sahifa-al-sajjadiya-index",
  );

  if (!Array.isArray(source.prayers) || !index) {
    throw new Error("Could not find source prayers or the Sahifa index dictionary.");
  }

  let added = 0;
  let duplicates = 0;
  let unmatched = 0;
  const unmatchedSamples: string[] = [];

  for (const prayer of source.prayers) {
    const prayerNumber = numericId(prayer.prayer_number);
    const subject = index.subjects.find(
      (candidate) => numericId(candidate.id) === prayerNumber,
    );

    if (!subject) {
      unmatched++;
      unmatchedSamples.push(`الدعاء ${prayer.prayer_number}: لم يُعثر على الدعاء`);
      continue;
    }

    for (const sourcePhrase of prayer.phrases ?? []) {
      if (typeof sourcePhrase.text !== "string") continue;

      const newItems = Object.entries(sourcePhrase)
        .filter(
          ([author, content]) =>
            author !== "text" &&
            author !== "break" &&
            typeof content === "string" &&
            content.trim().length > 0,
        )
        .map(([author, content]) => ({
          author,
          text: sourcePhrase.text as string,
          content: content as string,
        }));

      if (newItems.length === 0) continue;

      const searchText = normalizeArabic(sourcePhrase.text.toLowerCase());
      const matches = subject.phrases.filter((phrase) =>
        normalizeArabic(phrase.content.toLowerCase()).includes(searchText),
      );

      if (matches.length !== 1) {
        unmatched++;
        unmatchedSamples.push(
          `الدعاء ${prayer.prayer_number}، العبارة «${sourcePhrase.text.slice(0, 45)}»: ${matches.length === 0 ? "لم تُطابق" : "لها أكثر من موضع"}`,
        );
        continue;
      }

      const destinationPhrase = matches[0];
      const current = (destinationPhrase.explanations ?? []).filter(isExplanation);
      let nextId =
        Math.max(0, ...current.map((explanation) => explanation.id ?? 0)) + 1;

      for (const item of newItems) {
        const duplicate = current.some(
          (existing) =>
            existing.author === item.author &&
            existing.text === item.text &&
            existing.content === item.content,
        );

        if (duplicate) {
          duplicates++;
          continue;
        }

        current.push({ id: nextId++, ...item });
        added++;
      }

      destinationPhrase.explanations = current;
    }
  }

  console.log(`شروحات أُضيفت: ${added}`);
  console.log(`شروحات موجودة مسبقًا: ${duplicates}`);
  console.log(`عبارات لم تُطابق بأمان: ${unmatched}`);
  for (const sample of unmatchedSamples.slice(0, 20)) {
    console.log(`- ${sample}`);
  }
  if (unmatchedSamples.length > 20) {
    console.log(`- ... و${unmatchedSamples.length - 20} حالة أخرى`);
  }

  if (!shouldWrite) {
    console.log("معاينة فقط؛ لم يتغير أي ملف. أضف --write للتنفيذ.");
    return;
  }

  const backupPath = `${targetPath}.backup-${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}`;
  copyFileSync(targetPath, backupPath);
  writeFileSync(targetPath, `${JSON.stringify(target, null, 4)}\n`, "utf8");
  console.log(`تم حفظ النسخة الاحتياطية: ${backupPath}`);
  console.log(`تم تحديث: ${targetPath}`);
}

main();