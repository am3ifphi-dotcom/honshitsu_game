import { getAllPreloadImages, LOTTIE_ASSETS, SFX_ASSETS } from '../data/assets';
import { audioEngine } from './audio';

export interface PreloadProgress {
  loaded: number;
  total: number;
  percent: number;
  phase: string;
  detail: string;
}

// Persistent global image & lottie cache so browser never evicts decoded bitmaps
export const IMAGE_CACHE = new Map<string, HTMLImageElement>();
export const LOTTIE_CACHE = new Map<string, object>();

declare global {
  interface Window {
    __HONSHITSU_IMG_CACHE__?: Map<string, HTMLImageElement>;
  }
}

function loadAndDecodeImage(url: string): Promise<HTMLImageElement | null> {
  if (IMAGE_CACHE.has(url)) {
    return Promise.resolve(IMAGE_CACHE.get(url)!);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = async () => {
      try {
        if (typeof img.decode === 'function') {
          await img.decode();
        }
      } catch {
        // Already loaded; ignore decode quirk on older engines
      }
      IMAGE_CACHE.set(url, img);
      resolve(img);
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
}

export async function preloadAllGameAssets(
  onProgress: (p: PreloadProgress) => void
): Promise<void> {
  window.__HONSHITSU_IMG_CACHE__ = IMAGE_CACHE;

  const images = getAllPreloadImages();
  const lottieEntries = Object.entries(LOTTIE_ASSETS);
  const sfxCount = Object.keys(SFX_ASSETS).length;
  const total = images.length + lottieEntries.length + sfxCount;
  let loaded = 0;

  const emit = (phase: string, detail: string) => {
    const percent = Math.min(100, Math.round((loaded / total) * 100));
    onProgress({ loaded, total, percent, phase, detail });
  };

  const categoryLabels: Record<string, string> = {
    characters: '立ち絵アセットを完全展開中（全14名・77差分）',
    backgrounds: '桐葉高校・ハワイ・翠湖の背景美術を読み込み中',
    ui: '外部UIフレーム・照準アイコンを展開中',
    particles: '外部パーティクルVFXスプライトを展開中',
  };

  emit('立ち絵アセットを完全展開中（全14名・77差分）', '初期化中…');

  // Load images in parallel batches of 10 for smooth progress & high throughput
  const BATCH_SIZE = 10;
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    const batch = images.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (item) => {
        await loadAndDecodeImage(item.url);
        loaded += 1;
        const shortName = item.url.split('/').pop() ?? item.url;
        emit(categoryLabels[item.category] ?? '画像アセット読み込み中', shortName);
      })
    );
  }

  // Preload external Lottie JSON animations
  emit('Lottieアニメーションを展開中', 'JSONベクトル演出');
  await Promise.all(
    lottieEntries.map(async ([key, url]) => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          LOTTIE_CACHE.set(key, data);
        }
      } catch {
        // Ignore gracefully
      }
      loaded += 1;
      emit('Lottieアニメーションを展開中', `${key}.json`);
    })
  );

  // Preload SFX & warm BGM engine
  emit('魔王魂BGM＆Kenneyサウンドを初期化中', 'スタジオオーディオ展開');
  await audioEngine.preloadCoreAudio(() => {
    loaded += 1;
    emit('魔王魂BGM＆Kenneyサウンドを初期化中', `SFX ${Math.min(loaded, total)}/${total}`);
  });

  // Ensure fonts are completely ready before gameplay starts
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  loaded = total;
  emit('全アセット事前読み込み完了', 'ゼロ遅延描画・準備完了✝');
}
