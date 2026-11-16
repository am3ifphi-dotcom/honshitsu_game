import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';
import type { ChapterData } from '../types';

export const CHAPTERS: ChapterData[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
];

export function getChapterById(id: number): ChapterData {
  return CHAPTERS.find((c) => c.id === id) ?? CHAPTERS[0];
}
