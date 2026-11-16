import type { BackgroundId, BgmId, CharacterId, SfxId } from './assets';

export interface TruthBullet {
  id: string;
  title: string;
  subtitle: string;
  category: '地理・地形' | '✝本質✝記録' | '証言・ログ' | '理論・心理';
  description: string;
  sourceQuote: string;
}

export interface StageSlot {
  charId: CharacterId;
  expression?: string;
  position: 'left' | 'center' | 'right';
  flip?: boolean;
  dim?: boolean;
}

export type NarrativeOverlay =
  | {
      kind: 'bbs';
      boardName: string;
      threadTitle: string;
      posts: Array<{ num: string; author: string; text: string; highlight?: boolean }>;
    }
  | {
      kind: 'line';
      groupName: string;
      messages: Array<{ sender: string; text: string; isSelf?: boolean }>;
    }
  | {
      kind: 'paper';
      header: string;
      lines: string[];
      footer?: string;
    }
  | {
      kind: 'almanac';
      title: string;
      rows: Array<{ label: string; value: string; note?: string }>;
    };

export interface DialogueStep {
  type: 'dialogue';
  id?: string;
  speaker?: CharacterId | 'narrator' | 'system' | 'crowd';
  speakerLabel?: string;
  text: string;
  stage?: StageSlot[];
  bg?: BackgroundId;
  bgm?: BgmId;
  sfx?: SfxId;
  flash?: 'white' | 'crimson' | 'gold';
  shake?: boolean;
  addBullet?: TruthBullet;
  overlay?: NarrativeOverlay;
  particleMood?: 'sakura' | 'dust' | 'stars' | 'rain' | 'debate' | 'none';
}

export interface ChoiceOption {
  label: string;
  sublabel?: string;
  responseLines: DialogueStep[];
  sanityBonus?: number;
  addBullet?: TruthBullet;
}

export interface ChoiceStep {
  type: 'choice';
  prompt: string;
  speaker?: CharacterId | 'narrator';
  stage?: StageSlot[];
  bg?: BackgroundId;
  options: ChoiceOption[];
}

export interface DebateSegment {
  text: string;
  weakPointId?: string;
  emphasis?: 'normal' | 'loud' | 'whisper' | 'glitch';
}

export interface DebateStatement {
  id: string;
  speaker: CharacterId;
  expression: string;
  speakerTag?: string;
  segments: DebateSegment[];
  durationMs: number;
  position: {
    topPct: number;
    leftPct: number;
    rotateDeg: number;
  };
  pressResponse: {
    protagonistLine: string;
    targetReply: string;
    targetExpression: string;
    extraHint?: string;
    unlockBullet?: TruthBullet;
    revealWeakPointId?: string;
  };
}

export interface DebateRound {
  id: string;
  roundTitle: string;
  topicBanner: string;
  hint: string;
  statements: DebateStatement[];
  solution: {
    weakPointId: string;
    bulletId: string;
    cutInText: string;
    cutInSubtext: string;
    cutInSpeaker: CharacterId;
    cutInExpression: string;
    partnerSpeaker?: CharacterId;
    partnerExpression?: string;
    breakdownLines: DialogueStep[];
  };
  wrongHitLine: string;
}

export interface DebateStep {
  type: 'debate';
  id: string;
  title: string;
  subtitle: string;
  bg: BackgroundId;
  bgm: BgmId;
  protagonist: CharacterId;
  protagonistExpression: string;
  startingBullets: string[];
  rounds: DebateRound[];
  victoryLines: DialogueStep[];
}

export interface LivestreamItem {
  id: string;
  senderTag: string;
  paperText: string;
  terachiFreezeSec: number;
  liveComments: Array<{ user: string; text: string; toxic?: boolean }>;
  prompt: string;
  choices: Array<{
    label: string;
    style: 'tsukkomi' | 'honshitsu' | 'empathy' | 'shield';
    terachiReply: string;
    terachiExpression: string;
    chatReaction: Array<{ user: string; text: string }>;
    scoreDelta: number;
    isBest?: boolean;
  }>;
}

export interface LivestreamStep {
  type: 'livestream';
  id: string;
  episodeTitle: string;
  channelName: string;
  viewerCountLabel: string;
  subscriberLabel: string;
  isPrivateMode?: boolean;
  isCrisisMode?: boolean;
  bgm: BgmId;
  items: LivestreamItem[];
  afterLines: DialogueStep[];
}

export interface TopoHotspot {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  radius: number;
  isCorrectForStep: number; // 0, 1, 2
  wrongFeedback: string;
  correctExplanation: string;
  speaker: CharacterId;
  expression: string;
}

export interface TopoPuzzleStep {
  type: 'topo_puzzle';
  id: string;
  title: string;
  subtitle: string;
  bgm: BgmId;
  prompts: Array<{
    question: string;
    speaker: CharacterId;
    expression: string;
  }>;
  hotspots: TopoHotspot[];
  rewardBullet?: TruthBullet;
  afterLines: DialogueStep[];
}

export interface ChapterEndStep {
  type: 'chapter_end';
  chapterId: number;
  nextChapterId?: number;
  summaryTitle: string;
  summaryQuote: string;
  almanacUnlockNote: string;
}

export type StoryStep =
  | DialogueStep
  | ChoiceStep
  | DebateStep
  | LivestreamStep
  | TopoPuzzleStep
  | ChapterEndStep;

export interface ChapterData {
  id: number;
  numberLabel: string;
  yearLabel: string;
  title: string;
  subtitle: string;
  coverBg: BackgroundId;
  featuredChar: CharacterId;
  featuredExpression: string;
  accentColor: string;
  initialBullets: TruthBullet[];
  steps: StoryStep[];
}

export interface BacklogEntry {
  speakerName: string;
  speakerColor: string;
  text: string;
}

export interface SaveState {
  chapterId: number;
  stepIndex: number;
  completedChapters: number[];
  unlockedBulletIds: string[];
  haCount: number;
  honshitsuCount: number;
  bestRankByChapter: Record<number, 'S' | 'A' | 'B'>;
}
