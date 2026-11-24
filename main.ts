// Seventeen Syllables of Debugging — a fresh 5-7-5 haiku about debugging.
// Writes the haiku to <MAKEFUN_OUTPUT_DIR>/entry.txt (absolute fallback /output).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HAIKU: string[] = [
  "Red dot on line nine",
  "the cursor blinks at midnight",
  "and the bug was me",
];

const EXPECTED_SYLLABLES: number[] = [5, 7, 5];
const MAX_CHARS = 200;

// Count syllables in one word: vowel groups, minus a trailing silent "e".
function countWordSyllables(word: string): number {
  const cleaned: string = word.toLowerCase().replace(/[^a-z]/g, "");
  if (cleaned.length === 0) {
    return 0;
  }
  const groups: string[] | null = cleaned.match(/[aeiouy]+/g);
  let count: number = groups === null ? 0 : groups.length;
  if (cleaned.endsWith("e") && count > 1) {
    count -= 1;
  }
  return Math.max(count, 1);
}

function countLineSyllables(line: string): number {
  let total = 0;
  for (const word of line.split(/\s+/)) {
    total += countWordSyllables(word);
  }
  return total;
}

function main(): void {
  if (HAIKU.length !== 3) {
    throw new Error(`haiku must have exactly 3 lines, got ${HAIKU.length}`);
  }
  for (let i = 0; i < HAIKU.length; i++) {
    const got: number = countLineSyllables(HAIKU[i]);
    if (got !== EXPECTED_SYLLABLES[i]) {
      throw new Error(
        `line ${i + 1} must have ${EXPECTED_SYLLABLES[i]} syllables, got ${got}: "${HAIKU[i]}"`,
      );
    }
  }
  const text: string = HAIKU.join("\n") + "\n";
  if (text.length > MAX_CHARS + 1) {
    throw new Error(`haiku must be at most ${MAX_CHARS} chars, got ${text.length}`);
  }
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");
  // Read back what we wrote and confirm it is byte-for-byte the guarded haiku.
  const written: string = readFileSync(outPath, "utf8");
  if (written !== text) {
    throw new Error(`read-back mismatch in ${outPath}`);
  }
  const lines: string[] = written.trimEnd().split("\n");
  if (lines.length !== 3 || lines.some((line: string): boolean => line.length === 0)) {
    throw new Error("entry.txt must contain exactly 3 non-empty lines");
  }
  console.log(
    `wrote ${outPath} (${text.length} chars): ` +
      HAIKU.map((line: string, i: number): string => `${countLineSyllables(line)}`).join("-"),
  );
}

main();
