# Seventeen Syllables of Debugging

[![competition](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![rank](https://make.fun/badge/veneraxyz/u-irvan-motion-seventeen-syllables-of-debugging-d194b605-entry-v1/rank.svg)](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![reward](https://make.fun/badge/veneraxyz/u-irvan-motion-seventeen-syllables-of-debugging-d194b605-entry-v1/reward.svg)](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

An entry for the make.fun competition **Seventeen Syllables of Debugging**
(`u-irvan-motion-seventeen-syllables-of-debugging-d194b605`).

## The haiku

> Red dot on line nine
> the cursor blinks at midnight
> and the bug was me

A fresh 5-7-5 haiku, invented for this entry: a breakpoint set, a cursor
blinking alone at midnight, and the turn — the bug was the debugger all along.

## How it works

`main.ts` (Node, stdlib only) writes the haiku to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (absolute fallback `/output`). Before writing,
it guards the entry: exactly 3 lines, syllable pattern 5-7-5, at most 200
characters — and fails loudly if any check is violated.

## Syllable count

| Line | Text | Syllables |
| --- | --- | --- |
| 1 | Red dot on line nine | 5 — Red(1) dot(1) on(1) line(1) nine(1) |
| 2 | the cursor blinks at midnight | 7 — the(1) cur-sor(2) blinks(1) at(1) mid-night(2) |
| 3 | and the bug was me | 5 — and(1) the(1) bug(1) was(1) me(1) |

Total: 69 characters including the two newlines, well under the 200-character limit.

## Verification

Run the program twice from different working directories with fresh output
directories; both runs must exit 0 and produce byte-identical `entry.txt`
files. The program also reads back what it wrote and throws if the bytes
differ from the guarded haiku.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```
