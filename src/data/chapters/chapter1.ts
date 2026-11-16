import type { ChapterData } from '../types';
import { TRUTH_BULLETS } from '../bullets';

export const chapter1: ChapterData = {
  id: 1,
  numberLabel: '第1話',
  yearLabel: '一年生編・春〜秋',
  title: '味噌と自販機と、最初の「は？」',
  subtitle: '桐葉高校・北棟理数科B組から✝本質✝が漏れ出す日',
  coverBg: 'bg_classroom_day',
  featuredChar: 'mie',
  featuredExpression: 'ha',
  accentColor: '#e11d48',
  initialBullets: [TRUTH_BULLETS.corn_soup_absence],
  steps: [
    {
      type: 'dialogue',
      bg: 'bg_cherry_path',
      bgm: 'bgm_classroom',
      particleMood: 'sakura',
      speaker: 'narrator',
      text: '桐葉高校には国境がある。見えないが、たしかにある。',
    },
    {
      type: 'dialogue',
      speaker: 'narrator',
      text: '南棟・中高一貫コース、偏差値七十、紺のネクタイ。そして俺たちの北棟・理数科、偏差値六十、えんじのネクタイ。',
    },
    {
      type: 'dialogue',
      bg: 'bg_vending_hallway',
      particleMood: 'dust',
      speaker: 'narrator',
      text: '北棟の自販機からは、三ヶ月前からコーンスープが消えている。理数科ではこれを「コーンスープの不在」と呼ぶ。解決する気配はない。',
      addBullet: TRUTH_BULLETS.corn_soup_absence,
      sfx: 'clue_get',
    },
    {
      type: 'dialogue',
      bg: 'bg_classroom_day',
      stage: [
        { charId: 'ryoma', expression: 'niyari', position: 'left' },
        { charId: 'mie', expression: 'reishou', position: 'right' },
      ],
      bgm: 'bgm_comedy',
      speaker: 'ryoma',
      text: 'なぁ三重。いま廊下歩いてたら、電線の角度にすげぇ✝本質✝が降りてきた。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'ryoma', expression: 'niyari', position: 'left', dim: true },
        { charId: 'mie', expression: 'ha', position: 'right' },
      ],
      sfx: 'question',
      shake: true,
      speaker: 'mie',
      text: 'は？ だから何が本質なんだよ。本質って言葉は「何かの本質」だろ、文法的に。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'ryoma', expression: 'kyuu_magao', position: 'left' },
        { charId: 'mie', expression: 'ha', position: 'right', dim: true },
      ],
      speaker: 'ryoma',
      text: '文法の✝本質✝を超えたところに本質があるんだよ。ほら、さっき合格祈願掲示板にも書いておいた。',
      overlay: {
        kind: 'bbs',
        boardName: '受験情報サイト・桐葉高校 合格祈願スレ',
        threadTitle: '【絶対合格】今年の受験生集まれ！',
        posts: [
          {
            num: '85',
            author: '名無しの受験生',
            text: '絶対合格して、みえみえしい高校生活を送るんだ！ ✝',
            highlight: true,
          },
          {
            num: '86',
            author: '天気予報ユーザー',
            text: '三重方面、県をまたいで臣民のように晴天が広がるでしょう。✝本質✝',
            highlight: true,
          },
          {
            num: '87',
            author: '名無しの生徒',
            text: 'うちのヘイカツは等高線の話するとき目が完全に地形図の向こう側見てて、あれまじ✝本質✝。',
          },
        ],
      },
      sfx: 'notify',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'ryoma', expression: 'tsuujou', position: 'left', dim: true },
        { charId: 'mie', expression: 'iradachi_shinken', position: 'right' },
      ],
      addBullet: TRUTH_BULLETS.cross_signature,
      sfx: 'clue_get',
      speaker: 'mie',
      text: '俺の姓名を天気予報と受験板にばら撒くな！ 最後に✝がついてる時点でお前だってバレバレなんだよ！',
    },
    {
      type: 'dialogue',
      bg: 'bg_geography_board',
      bgm: 'bgm_classroom',
      stage: [
        { charId: 'katsuya', expression: 'tsuujou', position: 'center' },
      ],
      speaker: 'narrator',
      text: '――チャイムが鳴る。火曜三限、地理。理数科にとっては弁当のバラン扱いの科目に、塀勝也（ヘイカツ）が地形図を抱えて入ってきた。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'katsuya', expression: 'tsuujou', position: 'center' },
      ],
      speaker: 'katsuya',
      text: '糸魚川-静岡構造線。ここを境に日本列島の石が変わる。土壌が変わる。作物が変わる。作物が変わると――',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'katsuya', expression: 'hohoemi', position: 'center' },
      ],
      sfx: 'impact_metal',
      flash: 'gold',
      addBullet: TRUTH_BULLETS.miso_tectonic,
      speaker: 'katsuya',
      text: '「味噌」が違う。お前らが今朝飲んだ味噌汁は、何億年前の地殻変動が決めてる。丸餅と角餅の境界線も、だいたいこのへんだ。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'izaki', expression: 'egao', position: 'left' },
        { charId: 'mie', expression: 'reishou', position: 'right' },
      ],
      speaker: 'izaki',
      text: '朝飯が何億年前の地面で決まってるって、冷静に考えるとやばくないか？ すごくない？',
    },
    {
      type: 'choice',
      speaker: 'mie',
      prompt: '伊崎がまっすぐ聞いてくる。冷笑系を自認する三重としてどう返す？',
      stage: [
        { charId: 'izaki', expression: 'egao', position: 'left', dim: true },
        { charId: 'mie', expression: 'reishou', position: 'right' },
      ],
      options: [
        {
          label: '「……まあ。……まあ（二回言う）」',
          sublabel: '冷笑システムの隙間：内心ちょっと面白い',
          sanityBonus: 10,
          responseLines: [
            {
              type: 'dialogue',
              speaker: 'mie',
              stage: [
                { charId: 'izaki', expression: 'egao', position: 'left', dim: true },
                { charId: 'mie', expression: 'kimazui_chinmoku', position: 'right' },
              ],
              text: '……まあ。……まあな。',
            },
            {
              type: 'dialogue',
              speaker: 'narrator',
              text: '三重が「まあ」を二回言うとき、内心では面白いと思っている。窓際では砂糖が黙って外を見つめ、数理零は楽しそうにシャーペンを回していた。',
            },
          ],
        },
        {
          label: '「地理の話を真に受けるな（強がり冷笑）」',
          sublabel: '防御姿勢を崩さない',
          responseLines: [
            {
              type: 'dialogue',
              speaker: 'mie',
              stage: [
                { charId: 'izaki', expression: 'tsuujou', position: 'left', dim: true },
                { charId: 'mie', expression: 'reishou', position: 'right' },
              ],
              text: 'ふーん。まあ、言われてみればって程度だろ。',
            },
            {
              type: 'dialogue',
              speaker: 'rei',
              stage: [
                { charId: 'rei', expression: 'hohoemi', position: 'center' },
              ],
              text: 'そうかな？ 地図を見て本気で感動する大人って、普通に面白いと思うけど。',
            },
          ],
        },
      ],
    },
    {
      type: 'dialogue',
      bg: 'bg_geography_board',
      stage: [
        { charId: 'katsuya', expression: 'tooi_me', position: 'center' },
      ],
      speaker: 'narrator',
      text: '金曜五限。勝也は「河岸段丘」の断面図を普通の教師とは逆に、今の地表から過去へ向かって【上から】描いた。そして時折、窓の外を五秒見つめ、小さく口を動かす。',
      addBullet: TRUTH_BULLETS.river_terrace_topdown,
      sfx: 'clue_get',
    },
    {
      type: 'dialogue',
      bg: 'bg_terachi_stream',
      bgm: 'bgm_stream_piano',
      particleMood: 'stars',
      stage: [
        { charId: 'terachi', expression: 'nemusou', position: 'center' },
      ],
      speaker: 'narrator',
      text: 'そして数日後。登録者百五十人の底辺YouTuber・寺地星は、両馬の意味不明な掲示板を見て五分ほど考え――一人で「本質配信」を始めた。',
    },
    {
      type: 'livestream',
      id: 'stream_ep1',
      episodeTitle: '寺地星のカス配信・第一回「✝本質✝募集所」',
      channelName: '星と地面とせいちちゃんねる',
      viewerCountLabel: '視聴者 7人（うち3人は両馬の複垢疑惑）',
      subscriberLabel: '登録者 152人',
      bgm: 'bgm_stream_piano',
      items: [
        {
          id: 'st1_1',
          senderTag: '匿名投稿（北棟の誰か）',
          paperText: 'コーンスープは、あるときより、ないときの方が本質である。',
          terachiFreezeSec: 3,
          liveComments: [
            { user: '地形図好き87', text: 'きたああああ✝本質✝' },
            { user: '名無しの視聴者', text: '何の話してるんだこの配信' },
            { user: '星屑リスナー', text: 'フリー素材のピアノ落ち着く' },
          ],
          prompt: '寺地としてA4用紙をカメラに見せながらどうコメントする？',
          choices: [
            {
              label: '「北棟の自販機の不在感、たしかに本質あるな」',
              style: 'honshitsu',
              terachiReply:
                'なんか知ってる感じがするな、このコーンスープ。三ヶ月補充されないあの不在感……あることより、ないことの方が本質を持つ場合がある。なんかわかる。',
              terachiExpression: 'haishin_shinken',
              chatReaction: [
                { user: '砂糖（ROM専）', text: '（事実を述べただけ）' },
                { user: '地形図好き87', text: 'それまじ✝本質✝' },
                { user: '通りすがり', text: '急に哲学っぽくて草' },
              ],
              scoreDelta: 20,
              isBest: true,
            },
            {
              label: '「いや普通に業者が忘れてるだけでしょ」',
              style: 'tsukkomi',
              terachiReply:
                'まあ業者が忘れてるだけなんですけど……でもみんな「コーンスープの不在」って呼んで覚えてる時点で、ちょっとだけ本質っぽい気もします。',
              terachiExpression: 'nemusou',
              chatReaction: [
                { user: '通りすがり', text: '現実的で草' },
                { user: '地形図好き87', text: '忘れられた事実が✝本質✝' },
              ],
              scoreDelta: 10,
            },
          ],
        },
        {
          id: 'st1_2',
          senderTag: '投稿者：明らかに両馬',
          paperText: '三重県臣について考えよ。',
          terachiFreezeSec: 6,
          liveComments: [
            { user: '地形図好き87', text: 'さあ考えよ✝' },
            { user: '名無しの視聴者', text: '誰だよ三重県臣ｗｗｗ' },
            { user: '星屑リスナー', text: '6秒固まってて草' },
          ],
          prompt: '6秒フリーズした寺地。どう乗り切る？',
          choices: [
            {
              label: '「否定しながら一番近くで聞いてる。それが三重の✝本質✝かも」',
              style: 'empathy',
              terachiReply:
                '三重はずっと✝本質✝を否定してるんですよね。でも一番近くで聞いてる。本質に近い人間が本質を一番否定する、みたいな……いや知らないけど。',
              terachiExpression: 'haishin_shinken',
              chatReaction: [
                { user: '地形図好き87', text: '寺地が三重の✝本質✝に気づいた！！' },
                { user: '三重（裏で激怒）', text: 'おい俺について語るな' },
                { user: '名無しの視聴者', text: '草' },
              ],
              scoreDelta: 25,
              isBest: true,
            },
            {
              label: '「すみません、これは完全に内輪の荒らしです」',
              style: 'tsukkomi',
              terachiReply:
                'あの……うちのクラスの個人名を送らないでください。どう返せばいいか本当にわかりません。次いきます。',
              terachiExpression: 'konwaku_katamaru',
              chatReaction: [
                { user: '名無しの視聴者', text: '困惑顔が面白すぎる' },
                { user: '地形図好き87', text: '困惑も✝本質✝' },
              ],
              scoreDelta: 12,
            },
          ],
        },
      ],
      afterLines: [
        {
          type: 'dialogue',
          bg: 'bg_classroom_day',
          bgm: 'bgm_mystery',
          stage: [
            { charId: 'sakura', expression: 'kenkyuusha', position: 'center' },
          ],
          speaker: 'narrator',
          text: '十一月半ば。昼休みの北棟B組に、見慣れない「紺のネクタイ」が現れた。南棟の内進生・櫻優だ。',
        },
        {
          type: 'dialogue',
          stage: [
            { charId: 'sakura', expression: 'kenkyuusha', position: 'left' },
            { charId: 'mie', expression: 'ha', position: 'right' },
          ],
          addBullet: TRUTH_BULLETS.schrodinger_love,
          sfx: 'clue_get',
          speaker: 'sakura',
          text: '皆さんのグループを「サンプルG-07」として二ヶ月観察していました。私は恋愛学の研究者です。彼女はいません。いたこともありません。',
        },
        {
          type: 'dialogue',
          stage: [
            { charId: 'ryoma', expression: 'niyari', position: 'left' },
            { charId: 'sakura', expression: 'kenkyuusha', position: 'center' },
            { charId: 'mie', expression: 'iradachi_shinken', position: 'right' },
          ],
          speaker: 'narrator',
          text: '両馬の「自己対話✝本質✝論」と、櫻の「シュレディンガーの好意＆不理解の引力」。理数科の教室に異次元のカオスが渦巻く――！',
        },
        {
          type: 'dialogue',
          stage: [
            { charId: 'mie', expression: 'honki_shinken', position: 'center' },
          ],
          sfx: 'zoom_in',
          speaker: 'mie',
          text: '……いい加減にしろ。俺がまとめて現実へ引き戻してやる！',
        },
      ],
    },
    {
      type: 'debate',
      id: 'debate_ep1',
      title: 'ノンストップ✝本質✝議論 #01',
      subtitle: '両馬の「自己対話」と櫻優の「恋愛学第七法則」をツッコミ論破せよ！',
      bg: 'bg_debate_void',
      bgm: 'bgm_debate',
      protagonist: 'mie',
      protagonistExpression: 'ha',
      startingBullets: ['corn_soup_absence', 'miso_tectonic', 'cross_signature', 'schrodinger_love'],
      rounds: [
        {
          id: 'd1_r1',
          roundTitle: 'ROUND 1：匿名掲示板「自演」疑惑を追及せよ',
          topicBanner: '両馬二郎の「✝は人類共通の記号」論を撃ち抜け！',
          hint: '両馬が「俺じゃない」とシラを切る箇所に、【「✝」の署名と自演ログ】を装填して「は？！」を撃ち込め！',
          wrongHitLine: '三重「ちがう、そこを突いても両馬は『✝本質✝』で煙に巻いてくる……別の発言を狙え！」',
          statements: [
            {
              id: 's1_1',
              speaker: 'izaki',
              expression: 'egao',
              segments: [{ text: 'でもヘイカツの味噌の話、普通に面白かったよな！' }],
              durationMs: 4200,
              position: { topPct: 24, leftPct: 10, rotateDeg: -2 },
              pressResponse: {
                protagonistLine: '三重「そこはまあ認める。だが今は掲示板の話だ！」',
                targetReply: '伊崎「あ、そっちか。たしかに両馬の書き込み、いつも同じ記号ついてるよな」',
                targetExpression: 'tsuujou',
              },
            },
            {
              id: 's1_2',
              speaker: 'ryoma',
              expression: 'niyari',
              segments: [
                { text: '俺は掲示板で自演なんてしてない。' },
                { text: '三重の名前を書いたのは別の誰かだ！', weakPointId: 'wp_ryoma_alibi', emphasis: 'loud' },
              ],
              durationMs: 5600,
              position: { topPct: 44, leftPct: 26, rotateDeg: 2.5 },
              pressResponse: {
                protagonistLine: '三重「おい両馬！ じゃあなんで毎回語尾に✝がついてるんだよ！」',
                targetReply: '両馬「✝は人類共通の記号だからだよ！ それに四人中二人が俺でも、それは自演じゃなく自己対話！」',
                targetExpression: 'kyuu_magao',
                extraHint: '【「✝」の署名と自演ログ】で「別の誰かだ！」を撃ち抜こう！',
              },
            },
            {
              id: 's1_3',
              speaker: 'satou',
              expression: 'game_gyoushi',
              segments: [{ text: '……どうでもいいけど、コーンスープはまだ補充されてない。' }],
              durationMs: 4200,
              position: { topPct: 62, leftPct: 14, rotateDeg: -1.5 },
              pressResponse: {
                protagonistLine: '三重「砂糖、お前も配信に投稿したくせに他人事みたいな顔するな」',
                targetReply: '砂糖「事実を述べただけ。……うるさい」',
                targetExpression: 'soppo',
              },
            },
          ],
          solution: {
            weakPointId: 'wp_ryoma_alibi',
            bulletId: 'cross_signature',
            cutInText: 'は？！！',
            cutInSubtext: '否定の守護者・防波堤カウンター！',
            cutInSpeaker: 'mie',
            cutInExpression: 'ha',
            breakdownLines: [
              {
                type: 'dialogue',
                speaker: 'mie',
                stage: [
                  { charId: 'ryoma', expression: 'terekakushi', position: 'left', dim: true },
                  { charId: 'mie', expression: 'ha', position: 'right' },
                ],
                text: 'は？ お前以外に天気予報と合格祈願の語尾に「✝」つけて「みえみえしい」とか書く人間が地球上にいるか！',
              },
              {
                type: 'dialogue',
                speaker: 'ryoma',
                stage: [
                  { charId: 'ryoma', expression: 'niyari', position: 'left' },
                  { charId: 'mie', expression: 'ha', position: 'right', dim: true },
                ],
                text: '……バレたか。だが自演は嘘でも、自己対話は✝本質✝だぞ。',
              },
              {
                type: 'dialogue',
                speaker: 'mie',
                stage: [
                  { charId: 'ryoma', expression: 'niyari', position: 'left', dim: true },
                  { charId: 'mie', expression: 'iradachi_shinken', position: 'right' },
                ],
                text: '日本語やめろ！ ……よし、次はそっちの紺ネクタイだ！',
              },
            ],
          },
        },
        {
          id: 'd1_r2',
          roundTitle: 'ROUND 2：櫻優「恋愛学・第七法則」の反例を突きつけろ！',
          topicBanner: '「不理解の引力」が理数科B組で成り立たない矛盾を撃て！',
          hint: '櫻が「理解不能な人間ほど恋愛対象としてモテる」と主張する黄色フレーズに、【シュレディンガーの好意＆第七法則】をぶつけろ！',
          wrongHitLine: '三重「そこじゃない……櫻の『第七法則（不理解の引力）』の決定的な矛盾を狙え！」',
          statements: [
            {
              id: 's1_2_1',
              speaker: 'sakura',
              expression: 'kenkyuusha',
              segments: [
                { text: '恋愛発生の第三法則――好意は観測されない限り量子的重ね合わせにあります。' },
              ],
              durationMs: 4600,
              position: { topPct: 24, leftPct: 12, rotateDeg: -1.5 },
              pressResponse: {
                protagonistLine: '三重「いや、告白したら波動関数が崩壊するってどういうことだよ」',
                targetReply: '零「モデルのアナロジーとしては面白いよね。でも収束後の減衰データ、文献値だけで自分のデータはないんだよね？」',
                targetExpression: 'egao',
              },
            },
            {
              id: 's1_2_2',
              speaker: 'sakura',
              expression: 'kenkyuusha',
              segments: [
                { text: 'そして第七法則「不理解の引力」！ ' },
                { text: '最も理解不能な個体ほどモテるはずです！', weakPointId: 'wp_sakura_law7', emphasis: 'loud' },
              ],
              durationMs: 5800,
              position: { topPct: 46, leftPct: 24, rotateDeg: 2 },
              pressResponse: {
                protagonistLine: '三重「ちょっと待て！ この教室で一番理解不能な奴を見てから言え！」',
                targetReply: '伊豆見「それだと……一番理解不能な両馬が一番モテるってこと！？」',
                targetExpression: 'kenkyuusha',
                extraHint: '【シュレディンガーの好意＆第七法則】を「最も理解不能な個体ほどモテるはずです！」に撃ち込め！',
              },
            },
            {
              id: 's1_2_3',
              speaker: 'ryoma',
              expression: 'kyuu_magao',
              segments: [{ text: '恋愛にも✝本質✝はある。わからないことが✝本質✝だからな。' }],
              durationMs: 4200,
              position: { topPct: 66, leftPct: 18, rotateDeg: -2 },
              pressResponse: {
                protagonistLine: '三重「お前は第七法則に乗っかって褒められた気になるな！」',
                targetReply: '両馬「でも第七法則的には俺が最強のモテ男ってことだろ？」',
                targetExpression: 'niyari',
              },
            },
          ],
          solution: {
            weakPointId: 'wp_sakura_law7',
            bulletId: 'schrodinger_love',
            cutInText: '反例あり！！',
            cutInSubtext: 'サンプルG-07・第七法則崩壊！',
            cutInSpeaker: 'mie',
            cutInExpression: 'honki_shinken',
            partnerSpeaker: 'rei',
            partnerExpression: 'hohoemi',
            breakdownLines: [
              {
                type: 'dialogue',
                speaker: 'mie',
                stage: [
                  { charId: 'sakura', expression: 'kenkyuusha', position: 'left', dim: true },
                  { charId: 'mie', expression: 'honki_shinken', position: 'right' },
                ],
                text: '目の前の両馬二郎を見ろ！ クラスでぶっちぎり一番理解不能なのに、恋愛対象として一ミリも評価されてないぞ！',
              },
              {
                type: 'dialogue',
                speaker: 'sakura',
                stage: [
                  { charId: 'sakura', expression: 'kenkyuusha', position: 'left' },
                  { charId: 'rei', expression: 'hohoemi', position: 'right', dim: true },
                ],
                sfx: 'paper_flip',
                text: 'っ……！ 猛烈にメモします！「理解不能度が閾値を超えると引力は〈恐怖〉へ変換される？ 要検証」……！',
              },
              {
                type: 'dialogue',
                speaker: 'rei',
                stage: [
                  { charId: 'sakura', expression: 'yawarakai', position: 'left', dim: true },
                  { charId: 'rei', expression: 'hohoemi', position: 'right' },
                ],
                text: '枠が広がって中身がこぼれただけだよ。外に出たからって消えるわけじゃない。――面白いね、櫻さん。',
              },
            ],
          },
        },
      ],
      victoryLines: [
        {
          type: 'dialogue',
          bg: 'bg_cherry_path',
          bgm: 'bgm_emotional',
          particleMood: 'sakura',
          stage: [
            { charId: 'ryoma', expression: 'tsuujou', position: 'left' },
            { charId: 'mie', expression: 'sunao_hohoemi', position: 'center' },
            { charId: 'terachi', expression: 'ureshii', position: 'right' },
          ],
          speaker: 'narrator',
          text: '一月、北棟の自販機に六ヶ月ぶりのコーンスープが帰還した。伊豆見は大喜利大会の司会を独力でやり遂げ、寺地の登録者は九百人を超えた。',
        },
        {
          type: 'dialogue',
          stage: [
            { charId: 'ryoma', expression: 'niyari', position: 'left' },
            { charId: 'mie', expression: 'reishou', position: 'center' },
            { charId: 'terachi', expression: 'ureshii', position: 'right' },
          ],
          speaker: 'narrator',
          text: '何も解決しない。✝本質✝が何かは一年目が終わってもわからない。でも、桜の下で来年も同じ四十人が続く。――それだけで十分だった。',
        },
      ],
    },
    {
      type: 'chapter_end',
      chapterId: 1,
      nextChapterId: 2,
      summaryTitle: '第1話・完『味噌と自販機と、最初の「は？」』',
      summaryQuote: '「両馬の✝本質✝と三重の〈は？〉はセットだな」',
      almanacUnlockNote: '一年生編のキャラクター記録＆言弾が『倉石暁の✝本質✝年鑑』に登録されました！',
    },
  ],
};
