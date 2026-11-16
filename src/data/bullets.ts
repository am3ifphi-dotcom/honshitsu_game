import type { TruthBullet } from './types';

export const TRUTH_BULLETS: Record<string, TruthBullet> = {
  // Chapter 1
  corn_soup_absence: {
    id: 'corn_soup_absence',
    title: 'コーンスープの不在',
    subtitle: '北棟自販機の三ヶ月間',
    category: '✝本質✝記録',
    description:
      '南棟（偏差値70）には常備されているコーンスープが、北棟（理数科）の自販機では三ヶ月間補充されていない。砂糖は「あるときより、ないときの方が本質」と配信に投稿した。',
    sourceQuote: '「コーンスープは、あるときより、ないときの方が本質である。」',
  },
  miso_tectonic: {
    id: 'miso_tectonic',
    title: '糸魚川-静岡構造線と味噌',
    subtitle: '火曜三限・ヘイカツの授業',
    category: '地理・地形',
    description:
      '日本列島の地質境界線を境に石・土壌・作物が変わり、赤味噌と白味噌、さらには丸餅と角餅の分布まで分かれる。「朝飯が何億年前の地面で決まっている」。',
    sourceQuote: '「お前らが今朝飲んだ味噌汁は、地殻変動が決めてる」',
  },
  cross_signature: {
    id: 'cross_signature',
    title: '「✝」の署名と自演ログ',
    subtitle: '両馬の匿名掲示板生態系',
    category: '証言・ログ',
    description:
      '合格祈願・天気予報・スーパーのレビューに三重県臣の名前と「✝」が埋め込まれている。両馬は「四人中二人は俺かもしれない」「✝は人類共通の記号」と強弁する。',
    sourceQuote: '「自演は嘘だけど、自己対話は✝本質✝」',
  },
  schrodinger_love: {
    id: 'schrodinger_love',
    title: 'シュレディンガーの好意＆第七法則',
    subtitle: '櫻優の恋愛学研究ノート',
    category: '理論・心理',
    description:
      '第三法則「告白は波動関数の崩壊」。第七法則「理解できないものに対して恋愛感情を抱く確率が高い（不理解の引力）」。しかしG-07（理数科）で最も理解不能な両馬は誰からもモテていない。',
    sourceQuote: '「不理解の引力は閾値を超えると〈恐怖〉に変換される？ 要調査」',
  },
  river_terrace_topdown: {
    id: 'river_terrace_topdown',
    title: '上から描く河岸段丘',
    subtitle: '金曜五限・時間を掘る板書',
    category: '地理・地形',
    description:
      '普通の教師と違い、ヘイカツは今の地表から過去に向かって上から断面図を描く。今を起点に時間を掘ることで、台地の上の集落と下の河床に刻まれた「人間の判断」が見える。',
    sourceQuote: '「今を起点にすると地面って時間の積み重ねなんだよな」',
  },

  // Chapter 2
  gen_honshitsu_paradox: {
    id: 'gen_honshitsu_paradox',
    title: '原✝本質✝の自己崩壊',
    subtitle: '倉石暁の怪文書投稿',
    category: '理論・心理',
    description:
      '倉石が提唱した上位概念「原✝本質✝（言語化以前の本質）」。しかし「言語化された✝本質✝はすでに残骸である」と文章で送ってきた時点で、その投稿自体が残骸であり自己矛盾している。',
    sourceQuote: '「この投稿自体が言語化されてるから、すでに残骸じゃないか？」',
  },
  married_ring_seal: {
    id: 'married_ring_seal',
    title: '封印の刻印（結婚指輪）',
    subtitle: '召野カイトの覚醒と矛盾',
    category: '証言・ログ',
    description:
      '副担任・二見玲子の銀の結婚指輪に覚醒し英語学年12位へ急上昇した召野。「二見先生一筋」と宣言する一方、「隣のクラスの女子から告白されたら即OKする」と即答した。',
    sourceQuote: '「心は一筋。でも告白されたらOKする」',
  },
  double_ha_harmony: {
    id: 'double_ha_harmony',
    title: '二つの「は？」（三重×三峰）',
    subtitle: '北棟と南棟の完全ハモリ',
    category: '✝本質✝記録',
    description:
      '理数科に踏み込んだ南棟の常識人・三峰瑠衣と、北棟の否定の守護者・三重県臣。声のトーンも顔の角度も完全に一致した「は？」のハモリで、暴走する理論と✝本質✝を迎え撃つ。',
    sourceQuote: '「ハモリじゃない」「ハモリじゃない」「……もういい」',
  },
  unfulfilled_completion: {
    id: 'unfulfilled_completion',
    title: '片思いの完了論',
    subtitle: '成就しないまま完了する',
    category: '理論・心理',
    description:
      '「告白は相手に答えを求める行為。気持ちを伝えるのは自分が完了する行為」。二見先生へ潔く想いを伝え完了した召野の言葉は、寺地の本質配信とも深く響き合った。',
    sourceQuote: '「山の頂上に登って、景色を見て、降りてくる。それで完了するんだろう」',
  },

  // Chapter 3
  time_hazard_map: {
    id: 'time_hazard_map',
    title: '時間の地形図（防災マップ）',
    subtitle: '異棟合同課題・決勝案',
    category: '地理・地形',
    description:
      '「ここが危ない」だけでなく「なぜそこが危ないのか」を河岸段丘・過去の洪水・人間の選択という時間軸から説明する防災マップ。見る側が変わると、同じ地図が違う地図になる。',
    sourceQuote: '「等高線の一本一本が、過去の洪水の記録です」',
  },
  fun_over_efficiency: {
    id: 'fun_over_efficiency',
    title: '効率より面白さ（通訳済み）',
    subtitle: '両馬の十回に一回＆三重の通訳',
    category: '証言・ログ',
    description:
      '「ハワイは手段。面白い課題を作った結果としてハワイに行く」。効率重視の内進生に対し、三重が両馬の✝本質✝語を翻訳し、ヘイカツ監修の審査基準を射抜いた。',
    sourceQuote: '「見方が変わると、同じ地図が違う地図になる」',
  },
  ground_never_forgets: {
    id: 'ground_never_forgets',
    title: '地面は忘れない',
    subtitle: 'ハワイ・キラウエア＆ダイヤモンドヘッド',
    category: '地理・地形',
    description:
      '数年前にできたばかりの「地図が追いつかない地面」キラウエアと、死火山になっても形を刻み続けるダイヤモンドヘッド。地図も人間も忘れるが、地面だけはすべてを記憶している。',
    sourceQuote: '「地面は忘れない。地図は、地面の一部を切り取ったものだ」',
  },
  naitou_reassurance: {
    id: 'naitou_reassurance',
    title: '意味がわからなくても安心する',
    subtitle: '内藤蘭の少し笑った一言',
    category: '証言・ログ',
    description:
      '「面白い考え方だね」と櫻の恋愛学を受け入れ、本質配信を「意味わかんないけど聞いてると安心する」と語った内藤蘭。理論を超えた「面白さ」と「安心」の証明。',
    sourceQuote: '「あの配信、好き。意味わかんないけど、聞いてると安心する」',
  },

  // Chapter 4
  great_chain_fallacy: {
    id: 'great_chain_fallacy',
    title: '前-原✝本質✝の循環矛盾',
    subtitle: '倉石のグレートチェーン5段階モデル',
    category: '理論・心理',
    description:
      '「前-原✝本質✝→原✝本質✝→✝本質✝→亜✝本質✝→非✝本質✝」の5階層。しかし「概念として存在しないがある」という定義は✝本質✝そのものであり、階層を分けた意味がゼロ。',
    sourceQuote: '「前-原✝本質✝って結局✝本質✝と同じじゃん！」',
  },
  crepe_equality: {
    id: 'crepe_equality',
    title: 'クレープも✝本質✝（平等宣言）',
    subtitle: '砂糖の異議＆寺地の名言',
    category: '✝本質✝記録',
    description:
      '倉石はクレープを「亜✝本質✝」に格下げしたが、砂糖も「クレープうまかったぞ」と反論。ラーメンもクレープもコーンスープも階層などなく、すべて等しく✝本質✝である。',
    sourceQuote: '「階層を作るな。✝本質✝は平等だ」',
  },
  satou_third_map: {
    id: 'satou_third_map',
    title: '二年半越しの挙手',
    subtitle: '三年目・三度目の同じ地形図',
    category: '地理・地形',
    description:
      '二年半スマホゲームを見続けた砂糖東洋が、三度目の同じ地形図で自ら挙手し、河岸段丘・段丘崖・湧水と道の関係まで完璧に回答。ヘイカツを五秒間沈黙させた。',
    sourceQuote: '「違って見えてるのに黙ってたら、三年待ってたヘイカツに嘘つくことになる」',
  },
  feikatsu_regret: {
    id: 'feikatsu_regret',
    title: '✝本質✝じゃない悔しさ',
    subtitle: '球技大会・二点差のラストパス',
    category: '証言・ログ',
    description:
      '確実な零ではなく両馬へパスを出した三重。シュートを外した両馬は三年間で初めて「✝本質✝ではなく普通に悔しい」と吐露し、フェイカツとして受験生に本音を綴った。',
    sourceQuote: '「✝本質✝の外側にも大事なものがある」',
  },

  // Chapter 5
  truth_over_correct: {
    id: 'truth_over_correct',
    title: '正しいことより、本当のこと',
    subtitle: '本質配信 #1 から続く核',
    category: '✝本質✝記録',
    description:
      '一年目の初回配信に届き、零も「良かった」と認めた言葉。テストの正解やネットの野次馬の「正論」よりも、本気で向き合った「本当のこと」こそが揺るがない。',
    sourceQuote: '「正しいことより、本当のことの方が大事だ。」',
  },
  sign_489_524: {
    id: 'sign_489_524',
    title: '489番と524番のサイン',
    subtitle: '等高線のように存在する本物の読者',
    category: '証言・ログ',
    description:
      '荒れたスレに両馬が523番として戻った直後に届いた524番「ずっと見てた。三年間。ネタじゃないのは読めばわかる」。零の言う通り、直接見えなくても確かなサインが存在する。',
    sourceQuote: '「ネタじゃないのは読めばわかる。書き続けてくれ」',
  },
  guardian_of_negation: {
    id: 'guardian_of_negation',
    title: '否定の守護者「は？」',
    subtitle: '423回を超える暴走の防波堤',
    category: '✝本質✝記録',
    description:
      '三年かけて両馬の暴走を引き締め続けた三重県臣の「は？」。特定厨や悪意ある野次馬がヘイカツと桐葉高校に土足で踏み込む瞬間、最大の防波堤として立ちはだかる。',
    sourceQuote: '「お前のせいじゃない。そして、ヘイカツに指一本触れさせるな」',
  },
  distance_of_32: {
    id: 'distance_of_32',
    title: '三十二人のちょうどいい距離',
    subtitle: 'URL限定・非公開配信への決断',
    category: '✝本質✝記録',
    description:
      '一万人の速すぎて読めない騒音ではなく、一人ひとりの「おかえり」を全部読める三十二人の非公開配信。初回七人の時と変わらない身内率——✝本質✝は数ではなく、距離だった。',
    sourceQuote: '「一万人から三十二人です。ちょうどいい✝本質✝の距離って、あるんだと思います」',
  },
};
