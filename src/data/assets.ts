export type CharacterId =
  | 'ryoma'
  | 'mie'
  | 'katsuya'
  | 'terachi'
  | 'rei'
  | 'satou'
  | 'izaki'
  | 'izumi'
  | 'sakura'
  | 'kuraishi'
  | 'meshino'
  | 'futami'
  | 'mitsumine'
  | 'naitou';

export type BackgroundId =
  | 'bg_classroom_day'
  | 'bg_classroom_sunset'
  | 'bg_geography_board'
  | 'bg_vending_hallway'
  | 'bg_terachi_stream'
  | 'bg_cherry_path'
  | 'bg_auditorium'
  | 'bg_hawaii_volcano'
  | 'bg_suiko_lake'
  | 'bg_debate_void';

export type BgmId =
  | 'bgm_title'
  | 'bgm_classroom'
  | 'bgm_comedy'
  | 'bgm_stream_piano'
  | 'bgm_mystery'
  | 'bgm_debate'
  | 'bgm_climax'
  | 'bgm_emotional'
  | 'bgm_epilogue';

export type SfxId =
  | 'click'
  | 'hover'
  | 'confirm'
  | 'back'
  | 'open'
  | 'close'
  | 'blip'
  | 'question'
  | 'glitch'
  | 'error'
  | 'glass_ping'
  | 'select'
  | 'zoom_in'
  | 'glass_shatter'
  | 'impact_slam'
  | 'impact_metal'
  | 'explosion'
  | 'bullet_fire'
  | 'focus_enter'
  | 'clue_get'
  | 'alert'
  | 'notify'
  | 'paper_flip'
  | 'jingle_clear'
  | 'jingle_victory';

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  reading: string;
  almanacTitle: string;
  affiliation: string;
  tie: 'burgundy' | 'navy' | 'teacher';
  accentColor: string;
  blipRate: number; // playback pitch for dialogue typewriter blips
  bio: string;
  signatureQuote: string;
  defaultExpression: string;
  expressions: Record<string, string>;
}

const c = (file: string) => `/assets/characters/${file}.webp`;

export const CHARACTERS: Record<CharacterId, CharacterMeta> = {
  ryoma: {
    id: 'ryoma',
    name: '両馬 二郎',
    reading: 'りょうま じろう',
    almanacTitle: '✝本質✝の創始者（フェイカツ）',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#e11d48',
    blipRate: 0.94,
    bio: '二郎系ラーメンを週三で食べ、匿名掲示板・合格祈願・天気予報コメント欄に「✝本質✝」「三重県臣」「ヘイカツ」を投下し続ける男。十回に九回は意味不明だが、十回に一回だけ核心を突く。',
    signatureQuote: '「文法の✝本質✝を超えたところに本質があるんだよ」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_ryoma_01_tsuujou'),
      niyari: c('chr_ryoma_02_niyari'),
      kyuu_magao: c('chr_ryoma_04_kyuu_magao'),
      shonbori: c('chr_ryoma_05_shonbori'),
      nakiwarai: c('chr_ryoma_06_nakiwarai'),
      shinken_ketsui: c('chr_ryoma_07_shinken_ketsui'),
      terekakushi: c('chr_ryoma_08_terekakushi'),
      goukyuu: c('chr_ryoma_09_goukyuu'),
    },
  },
  mie: {
    id: 'mie',
    name: '三重 県臣',
    reading: 'みえ けんじん',
    almanacTitle: '否定の守護者（防波堤）',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#38bdf8',
    blipRate: 0.86,
    bio: '自認冷笑系ツッコミ担当。「は？」を三年間で420回以上発し、暴走する✝本質✝を引き締める防波堤。内心面白いと思った時は「まあ」を二回言う。球技大会では鋭い観察眼で無双する。',
    signatureQuote: '「は？ 俺に✝本質✝をつけるな」',
    defaultExpression: 'reishou',
    expressions: {
      reishou: c('chr_mie_01_reishou'),
      ha: c('chr_mie_02_ha'),
      douyou: c('chr_mie_03_douyou'),
      kimazui_chinmoku: c('chr_mie_04_kimazui_chinmoku'),
      iradachi_shinken: c('chr_mie_06_iradachi_shinken'),
      honki_shinken: c('chr_mie_07_honki_shinken'),
      sunao_hohoemi: c('chr_mie_09_sunao_hohoemi'),
      nakigao: c('chr_mie_10_nakigao'),
    },
  },
  katsuya: {
    id: 'katsuya',
    name: '塀 勝也（ヘイカツ）',
    reading: 'へい かつや',
    almanacTitle: '地形図の向こう側を見る者',
    affiliation: '桐葉高校・地理科教諭',
    tie: 'teacher',
    accentColor: '#d97706',
    blipRate: 0.72,
    bio: '理数科で「バラン扱い」の地理を教える中年教師。地図を見て本気で感動し、河岸段丘を「今の地表から過去に向かって上から描く」。時折、窓の外を五秒間見つめて何かを呟く。',
    signatureQuote: '「地面は忘れない。地図は地面の一部を切り取ったものだ」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_katsuya_01_tsuujou'),
      hohoemi: c('chr_katsuya_02_hohoemi'),
      tooi_me: c('chr_katsuya_03_tooi_me'),
      odoroki: c('chr_katsuya_04_odoroki'),
      katai_muhyoujou: c('chr_katsuya_06_katai_muhyoujou'),
      kaisou_me_hosomeru: c('chr_katsuya_07_kaisou_me_hosomeru'),
      namida_koraeru: c('chr_katsuya_08_namida_koraeru'),
      naku: c('chr_katsuya_09_naku'),
      hareyaka_emi: c('chr_katsuya_10_hareyaka_emi'),
    },
  },
  terachi: {
    id: 'terachi',
    name: '寺地 星',
    reading: 'てらち せい',
    almanacTitle: '✝本質✝の配信者（自称ペットボトル）',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#818cf8',
    blipRate: 1.02,
    bio: 'YouTube「星と地面とせいちちゃんねる」運営者。両馬の怪文書をきっかけに「本質配信」を開始。A4コピー用紙と太マジックで投稿を読み上げ、時折15秒フリーズしながらも名言を生む。',
    signatureQuote: '「巫女じゃないです。ペットボトルくらいの存在です」',
    defaultExpression: 'nemusou',
    expressions: {
      nemusou: c('chr_terachi_01_nemusou'),
      konwaku_katamaru: c('chr_terachi_02_konwaku_katamaru'),
      haishin_shinken: c('chr_terachi_03_haishin_shinken'),
      ureshii: c('chr_terachi_04_ureshii'),
      maiku_no_ketsui: c('chr_terachi_06_maiku_no_ketsui'),
      namida: c('chr_terachi_08_namida'),
    },
  },
  rei: {
    id: 'rei',
    name: '数理 零',
    reading: 'すうり れい',
    almanacTitle: '面白さの王（偏差値85・学年首席）',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#22d3ee',
    blipRate: 1.08,
    bio: '内進を含め全科目学年首席・偏差値85でありながら「家が近いから」という理由だけで理数科に在籍する天才。評価軸は一貫して「面白い」。Pythonもバスケも万能。',
    signatureQuote: '「直接は見えないけど、等高線みたいにサインを読むと存在がわかる」',
    defaultExpression: 'suzushii',
    expressions: {
      suzushii: c('chr_rei_01_suzushii'),
      hohoemi: c('chr_rei_02_hohoemi'),
      odoroki: c('chr_rei_04_odoroki'),
      data_shinken: c('chr_rei_05_data_shinken'),
      kotoba_erabu: c('chr_rei_07_kotoba_erabu'),
    },
  },
  satou: {
    id: 'satou',
    name: '砂糖 東洋',
    reading: 'さとう とうよう',
    almanacTitle: '沈黙の観察者',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#94a3b8',
    blipRate: 0.82,
    bio: '片道70分の田舎から通い、常にスマホゲームを見つめる男。「窓の外は見ていない」と言い張りながら、実は二年半ずっと山の稜線とヘイカツの地形図を見つめ続けていた。',
    signatureQuote: '「見てない。事実を述べただけ。……うるさい」',
    defaultExpression: 'game_gyoushi',
    expressions: {
      game_gyoushi: c('chr_satou_01_game_gyoushi'),
      muhyoujou: c('chr_satou_02_muhyoujou'),
      kao_ageta: c('chr_satou_03_kao_ageta'),
      soppo: c('chr_satou_04_soppo'),
      camera: c('chr_satou_05_camera'),
      hohoemi: c('chr_satou_06_hohoemi'),
      tsumaru: c('chr_satou_07_tsumaru'),
      me_hikari_koraeru: c('chr_satou_08_me_hikari_koraeru'),
    },
  },
  izaki: {
    id: 'izaki',
    name: '伊崎',
    reading: 'いざき',
    almanacTitle: '理数科B組のまとめ役',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#f59e0b',
    blipRate: 0.98,
    bio: 'クラスの明るいまとめ役。無自覚に三重の冷笑システムの隙間を突く天才であり、伊豆見の自立を静かに喜ぶ良き相棒。',
    signatureQuote: '「朝飯が何億年前の地面で決まってるって、冷静に考えるとやばくないか」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_izaki_01_tsuujou'),
      egao: c('chr_izaki_02_egao'),
      shikiri: c('chr_izaki_04_shikiri'),
      shimijimi_hohoemi: c('chr_izaki_06_shimijimi_hohoemi'),
    },
  },
  izumi: {
    id: 'izumi',
    name: '伊豆見',
    reading: 'いずみ',
    almanacTitle: '半歩ずれた大喜利司会者',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#10b981',
    blipRate: 1.05,
    bio: 'いつも伊崎の隣にいたが、大喜利大会の企画・司会を独力でやり遂げたことで自分の歩幅を広げた好青年。合同課題では砂糖の車窓写真を構成し高評価を得た。',
    signatureQuote: '「やったことないけど、自分で司会をやってみたい」',
    defaultExpression: 'egao',
    expressions: {
      egao: c('chr_izumi_02_egao'),
      kinchou: c('chr_izumi_03_kinchou'),
      ketsui: c('chr_izumi_04_ketsui'),
      hokorashige: c('chr_izumi_06_hokorashige'),
    },
  },
  sakura: {
    id: 'sakura',
    name: '櫻 優',
    reading: 'さくら ゆう',
    almanacTitle: '恋愛学研究者（理論崩壊中）',
    affiliation: '南棟・中高一貫コース',
    tie: 'navy',
    accentColor: '#ec4899',
    blipRate: 1.0,
    bio: '紺ネクタイの国境を越えて理数科へ通う、恋愛経験ゼロの「恋愛学」研究者。「シュレディンガーの好意」などの法則を提唱するが、内藤蘭への実存的な恋と✝本質✝により理論が完全崩壊する。',
    signatureQuote: '「告白は波動関数の崩壊です。……助けて。」',
    defaultExpression: 'kenkyuusha',
    expressions: {
      kenkyuusha: c('chr_sakura_02_kenkyuusha'),
      egao: c('chr_sakura_05_egao'),
      yawarakai: c('chr_sakura_06_yawarakai'),
    },
  },
  kuraishi: {
    id: 'kuraishi',
    name: '倉石 暁',
    reading: 'くらいし あきら',
    almanacTitle: '✝本質✝狂信者・年鑑編纂官',
    affiliation: '北棟・理数科（一学年後輩）',
    tie: 'burgundy',
    accentColor: '#a855f7',
    blipRate: 1.12,
    bio: '本質配信と掲示板に導かれて入学した熱狂的信徒。ノート・筆箱・ブレザー裏地にまで✝を刻み、「前-原✝本質✝」を含む5段階モデル『グレートチェーン』や『✝本質✝年鑑』を編纂する。',
    signatureQuote: '「教祖に会えた……！ あなたの配信は聖典です✝✝✝」',
    defaultExpression: 'nekkyou',
    expressions: {
      nekkyou: c('chr_kuraishi_01_nekkyou'),
      kangeki: c('chr_kuraishi_02_kangeki'),
      chousa_shinken: c('chr_kuraishi_03_chousa_shinken'),
      hokorashige: c('chr_kuraishi_05_hokorashige'),
      kotoba_ushinau: c('chr_kuraishi_06_kotoba_ushinau'),
    },
  },
  meshino: {
    id: 'meshino',
    name: '召野 カイト',
    reading: 'めしの かいと',
    almanacTitle: '人妻の使徒（英語学年5位）',
    affiliation: '北棟・理数科B組',
    tie: 'burgundy',
    accentColor: '#f97316',
    blipRate: 0.96,
    bio: '副担任・二見玲子の左手薬指の結婚指輪に覚醒した男。英語の成績を130位から5位まで125人抜きした努力家。ただし隣のクラスの女子に告白されたら即OKする二重構造を持つ。',
    signatureQuote: '「片思いの✝本質✝は、成就しないまま完了することだ」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_meshino_01_tsuujou'),
      shinken: c('chr_meshino_04_shinken'),
      eigo_doya: c('chr_meshino_05_eigo_doya'),
      shinmiri: c('chr_meshino_06_shinmiri'),
    },
  },
  futami: {
    id: 'futami',
    name: '二見 玲子',
    reading: 'ふたみ れいこ',
    almanacTitle: '封印の刻印を持つ英語教師',
    affiliation: '桐葉高校・英語科教諭（既婚）',
    tie: 'teacher',
    accentColor: '#fb7185',
    blipRate: 1.24,
    bio: '二年B組の副担任。明るく気さくな32歳の英語教師。召野の潔い告白を「先生と生徒だから」と優しく受け止めつつ、「私のためではなく自分のために勉強を続けて」と導いた。',
    signatureQuote: '「私のためじゃなくて、自分のためにね」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_futami_01_tsuujou'),
      shinpai: c('chr_futami_03_shinpai'),
      itazura: c('chr_futami_04_itazura'),
      yokogao: c('chr_futami_05_yokogao'),
    },
  },
  mitsumine: {
    id: 'mitsumine',
    name: '三峰 瑠衣',
    reading: 'みつみね るい',
    almanacTitle: '南棟の常識人（第二の「は？」）',
    affiliation: '南棟・中高一貫コース',
    tie: 'navy',
    accentColor: '#fb923c',
    blipRate: 1.28,
    bio: '櫻の恋愛作戦を立てる直球型の常識人。理数科に踏み込んだ際、三重と完全に同じ角度・トーンで「は？」をハモり、以後よき戦友となる。',
    signatureQuote: '「波動関数の話もいい！ 好きなら好きって認めなよ！」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_mitsumine_01_tsuujou'),
      tsukkomi: c('chr_mitsumine_02_tsukkomi'),
      egao: c('chr_mitsumine_03_egao'),
      ha: c('chr_mitsumine_06_ha'),
    },
  },
  naitou: {
    id: 'naitou',
    name: '内藤 蘭',
    reading: 'ないとう らん',
    almanacTitle: '静かな本質配信リスナー',
    affiliation: '南棟・中高一貫コース',
    tie: 'navy',
    accentColor: '#c084fc',
    blipRate: 1.32,
    bio: '図書室で櫻の消しゴムを拾ったことから「消しゴム事象」の当事者となった静かな少女。櫻の恋愛学を「面白い考え方だね」と受け入れ、寺地の本質配信を密かに愛聴している。',
    signatureQuote: '「あの配信、好き。意味わかんないけど、聞いてると安心する」',
    defaultExpression: 'tsuujou',
    expressions: {
      tsuujou: c('chr_naitou_01_tsuujou'),
      hohoemi: c('chr_naitou_02_hohoemi'),
      odoroki: c('chr_naitou_04_odoroki'),
      yasashii_me: c('chr_naitou_05_yasashii_me'),
      sukoshi_warau: c('chr_naitou_06_sukoshi_warau'),
    },
  },
};

export const BACKGROUNDS: Record<BackgroundId, { path: string; label: string }> = {
  bg_classroom_day: { path: '/assets/backgrounds/bg_classroom_day.webp', label: '北棟・理数科B組（昼）' },
  bg_classroom_sunset: { path: '/assets/backgrounds/bg_classroom_sunset.webp', label: '北棟・理数科B組（放課後）' },
  bg_geography_board: { path: '/assets/backgrounds/bg_geography_board.webp', label: '地理授業・ヘイカツの板書' },
  bg_vending_hallway: { path: '/assets/backgrounds/bg_vending_hallway.webp', label: '北棟廊下・自販機前' },
  bg_terachi_stream: { path: '/assets/backgrounds/bg_terachi_stream.webp', label: '寺地星の配信デスク' },
  bg_cherry_path: { path: '/assets/backgrounds/bg_cherry_path.webp', label: '南棟と北棟の間の桜並木' },
  bg_auditorium: { path: '/assets/backgrounds/bg_auditorium.webp', label: '桐葉高校・講堂（異棟合同課題）' },
  bg_hawaii_volcano: { path: '/assets/backgrounds/bg_hawaii_volcano.webp', label: 'ハワイ・キラウエア＆ダイヤモンドヘッド' },
  bg_suiko_lake: { path: '/assets/backgrounds/bg_suiko_lake.webp', label: '翠湖・十キロ遊歩道' },
  bg_debate_void: { path: '/assets/backgrounds/bg_debate_void.webp', label: '✝本質✝論戦アリーナ（等高線空間）' },
};

export const UI_ASSETS = {
  borderOrnate: '/assets/ui/panel-border-015.png',
  borderSleek: '/assets/ui/panel-border-007.png',
  borderFancy: '/assets/ui/panel-border-025.png',
  divider: '/assets/ui/divider-003.png',
  crosshairRed: '/assets/ui/crosshair_red.png',
  crosshairBlue: '/assets/ui/crosshair_blue.png',
  crosshairWhite: '/assets/ui/crosshair_white.png',
  glassCorners: '/assets/ui/glassPanel_corners.png',
  glassProjection: '/assets/ui/glassPanel_projection.png',
  iconAudioOn: '/assets/ui/icon_audio_on.png',
  iconAudioOff: '/assets/ui/icon_audio_off.png',
  iconFf: '/assets/ui/icon_ff.png',
  iconGear: '/assets/ui/icon_gear.png',
  iconHome: '/assets/ui/icon_home.png',
  iconInfo: '/assets/ui/icon_info.png',
  iconExclamation: '/assets/ui/icon_exclamation.png',
} as const;

export const PARTICLE_ASSETS = {
  flare01: '/assets/particles/flare_01.png',
  light02: '/assets/particles/light_02.png',
  magic02: '/assets/particles/magic_02.png',
  magic04: '/assets/particles/magic_04.png',
  slash01: '/assets/particles/slash_01.png',
  slash02: '/assets/particles/slash_02.png',
  spark01: '/assets/particles/spark_01.png',
  spark04: '/assets/particles/spark_04.png',
  spark05: '/assets/particles/spark_05.png',
  star04: '/assets/particles/star_04.png',
  star07: '/assets/particles/star_07.png',
  star08: '/assets/particles/star_08.png',
  circle02: '/assets/particles/circle_02.png',
  circle05: '/assets/particles/circle_05.png',
  trace01: '/assets/particles/trace_01.png',
  trace05: '/assets/particles/trace_05.png',
} as const;

export const BGM_ASSETS: Record<BgmId, { src: string; title: string; mood: string }> = {
  bgm_title: { src: '/assets/audio/bgm/bgm_title.m4a', title: '桐葉高校・北棟と南棟の境界', mood: 'メインテーマ（魔王魂）' },
  bgm_classroom: { src: '/assets/audio/bgm/bgm_classroom.m4a', title: '偏差値60の午後・室外機の唸り', mood: '日常パート（魔王魂）' },
  bgm_comedy: { src: '/assets/audio/bgm/bgm_comedy.m4a', title: '✝本質✝の生態系と「は？」', mood: 'コメディ（魔王魂）' },
  bgm_stream_piano: { src: '/assets/audio/bgm/bgm_stream_piano.m4a', title: '星と地面とせいちちゃんねる（フリー素材ピアノ）', mood: '本質配信（魔王魂）' },
  bgm_mystery: { src: '/assets/audio/bgm/bgm_mystery.m4a', title: '地形図の向こう側・恋愛学検証', mood: '調査・分析（魔王魂）' },
  bgm_debate: { src: '/assets/audio/bgm/bgm_debate.m4a', title: 'ノンストップ✝本質✝議論', mood: '通常論戦（魔王魂）' },
  bgm_climax: { src: '/assets/audio/bgm/bgm_climax.m4a', title: '逆転の防波堤・最終論破', mood: 'クライマックス論戦（魔王魂）' },
  bgm_emotional: { src: '/assets/audio/bgm/bgm_emotional.m4a', title: '地面は忘れない・三十二人の距離', mood: '感動・夕暮れ（魔王魂）' },
  bgm_epilogue: { src: '/assets/audio/bgm/bgm_epilogue.m4a', title: '桜並木のエピローグ（オルゴール）', mood: 'エンディング（魔王魂）' },
};

export const SFX_ASSETS: Record<SfxId, string[]> = {
  click: ['/assets/audio/sfx/click.wav'],
  hover: ['/assets/audio/sfx/hover.wav'],
  confirm: ['/assets/audio/sfx/confirm.wav'],
  back: ['/assets/audio/sfx/back.wav'],
  open: ['/assets/audio/sfx/open.wav'],
  close: ['/assets/audio/sfx/close.wav'],
  blip: ['/assets/audio/sfx/blip.wav'],
  question: ['/assets/audio/sfx/question.wav'],
  glitch: ['/assets/audio/sfx/glitch.wav'],
  error: ['/assets/audio/sfx/error.wav'],
  glass_ping: ['/assets/audio/sfx/glass_ping.wav'],
  select: ['/assets/audio/sfx/select.wav'],
  zoom_in: ['/assets/audio/sfx/zoom_in.wav'],
  glass_shatter: ['/assets/audio/sfx/glass_shatter.ogg', '/assets/audio/sfx/glass_ping.wav'],
  impact_slam: ['/assets/audio/sfx/impact_slam.ogg', '/assets/audio/sfx/error.wav'],
  impact_metal: ['/assets/audio/sfx/impact_metal.ogg', '/assets/audio/sfx/click.wav'],
  explosion: ['/assets/audio/sfx/explosion.ogg', '/assets/audio/sfx/confirm.wav'],
  bullet_fire: ['/assets/audio/sfx/bullet_fire.ogg', '/assets/audio/sfx/zoom_in.wav'],
  focus_enter: ['/assets/audio/sfx/focus_enter.ogg', '/assets/audio/sfx/select.wav'],
  clue_get: ['/assets/audio/sfx/clue_get.wav'],
  alert: ['/assets/audio/sfx/alert.wav'],
  notify: ['/assets/audio/sfx/notify.wav'],
  paper_flip: ['/assets/audio/sfx/paper_flip.ogg', '/assets/audio/sfx/open.wav'],
  jingle_clear: ['/assets/audio/sfx/jingle_clear.m4a'],
  jingle_victory: ['/assets/audio/sfx/jingle_victory.m4a'],
};

export const LOTTIE_ASSETS = {
  ripple: '/assets/lottie/ripple.json',
  sparkleBurst: '/assets/lottie/sparkle_burst.json',
  loaderDots: '/assets/lottie/loader_dots.json',
} as const;

export function getCharacterImage(charId: CharacterId, expression?: string): string {
  const meta = CHARACTERS[charId];
  if (expression && meta.expressions[expression]) {
    return meta.expressions[expression];
  }
  return meta.expressions[meta.defaultExpression];
}

export interface PreloadItem {
  url: string;
  category: 'characters' | 'backgrounds' | 'ui' | 'particles';
}

export function getAllPreloadImages(): PreloadItem[] {
  const items: PreloadItem[] = [];
  for (const char of Object.values(CHARACTERS)) {
    for (const url of Object.values(char.expressions)) {
      items.push({ url, category: 'characters' });
    }
  }
  for (const bg of Object.values(BACKGROUNDS)) {
    items.push({ url: bg.path, category: 'backgrounds' });
  }
  for (const url of Object.values(UI_ASSETS)) {
    items.push({ url, category: 'ui' });
  }
  for (const url of Object.values(PARTICLE_ASSETS)) {
    items.push({ url, category: 'particles' });
  }
  return items;
}
