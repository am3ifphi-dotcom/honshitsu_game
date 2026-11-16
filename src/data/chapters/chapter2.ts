import type { ChapterData } from '../types';
import { TRUTH_BULLETS } from '../bullets';

export const chapter2: ChapterData = {
  id: 2,
  numberLabel: '第2話',
  yearLabel: '二年生編・春〜初夏',
  title: '狂信者降臨、二つの「は？」、そして封印の刻印',
  subtitle: '倉石暁の「原✝本質✝」と召野カイトの覚醒を迎え撃て',
  coverBg: 'bg_classroom_day',
  featuredChar: 'kuraishi',
  featuredExpression: 'nekkyou',
  accentColor: '#a855f7',
  initialBullets: [TRUTH_BULLETS.cross_signature, TRUTH_BULLETS.corn_soup_absence],
  steps: [
    {
      type: 'dialogue',
      bg: 'bg_classroom_day',
      bgm: 'bgm_classroom',
      particleMood: 'sakura',
      speaker: 'narrator',
      text: '四月。理数科は一学年一クラス・四十人。クラス替えなし、全員続投。自販機のコーンスープは今も健在だ。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'futami', expression: 'tsuujou', position: 'left' },
        { charId: 'meshino', expression: 'shinken', position: 'right' },
      ],
      bgm: 'bgm_comedy',
      speaker: 'futami',
      text: 'はーい、二見玲子です！ 今年から皆さんの副担任をやります、英語担当だよ。よろしくね！',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'futami', expression: 'itazura', position: 'left', dim: true },
        { charId: 'meshino', expression: 'shinken', position: 'right' },
      ],
      flash: 'gold',
      sfx: 'zoom_in',
      addBullet: TRUTH_BULLETS.married_ring_seal,
      speaker: 'meshino',
      text: '……悟ったぞ両馬。人妻だ。左手薬指の結婚指輪は「封印の刻印」だ！ 自由に手に入らないからこそ光る。俺は二見先生一筋だ！（……でも隣のクラスの女子に告白されたらOKする）',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'mie', expression: 'ha', position: 'center' },
      ],
      sfx: 'question',
      speaker: 'mie',
      text: '即答で矛盾してるじゃねえか！ ……と思っていたら、もっとヤバい新入生がドアを開けた。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'kuraishi', expression: 'kangeki', position: 'left' },
        { charId: 'ryoma', expression: 'tsuujou', position: 'center' },
        { charId: 'mie', expression: 'douyou', position: 'right' },
      ],
      sfx: 'impact_slam',
      shake: true,
      speaker: 'kuraishi',
      text: '理数科一年の倉石暁です！ 教祖――両馬二郎先輩に会えた……！ 僕はファンじゃありません、信徒です！ ブレザーの裏にも修正液で✝本質✝と刻みました！',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'kuraishi', expression: 'nekkyou', position: 'left', dim: true },
        { charId: 'ryoma', expression: 'shonbori', position: 'center' },
        { charId: 'mie', expression: 'iradachi_shinken', position: 'right', dim: true },
      ],
      speaker: 'ryoma',
      text: '……教祖じゃない。✝本質✝は誰のものでもない、元からあったんだ。俺は✝✝をつけただけだ。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'kuraishi', expression: 'kangeki', position: 'left' },
        { charId: 'ryoma', expression: 'shonbori', position: 'center', dim: true },
        { charId: 'mie', expression: 'douyou', position: 'right', dim: true },
      ],
      speaker: 'kuraishi',
      text: '「教祖じゃない」――その否定こそがまさに✝本質✝です！ ノートに書きます！！',
    },
    {
      type: 'dialogue',
      speaker: 'narrator',
      text: '両馬二郎が✝本質✝発言を受けて黙ったのは、理数科B組の観測史上、初めてだった。',
    },
    {
      type: 'dialogue',
      bg: 'bg_classroom_day',
      bgm: 'bgm_comedy',
      stage: [
        { charId: 'mitsumine', expression: 'tsukkomi', position: 'left' },
        { charId: 'mie', expression: 'reishou', position: 'right' },
      ],
      speaker: 'narrator',
      text: 'さらに六月。内藤蘭に実存的な恋をして理論崩壊した櫻優を追って、南棟の常識人・三峰瑠衣が北棟B組へ踏み込んできた。',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'mitsumine', expression: 'ha', position: 'left' },
        { charId: 'mie', expression: 'ha', position: 'right' },
      ],
      sfx: 'impact_metal',
      flash: 'white',
      shake: true,
      addBullet: TRUTH_BULLETS.double_ha_harmony,
      speaker: 'crowd',
      speakerLabel: '三重 ＆ 三峰（完全ハモリ）',
      text: '「は？」',
    },
    {
      type: 'dialogue',
      stage: [
        { charId: 'ryoma', expression: 'niyari', position: 'center' },
      ],
      speaker: 'ryoma',
      text: 'おおっ！ 三重と三峰が声のトーンも顔の角度も完全に一致した「は？」のハモリした！ まじ✝本質✝！',
    },
    {
      type: 'dialogue',
      bg: 'bg_terachi_stream',
      bgm: 'bgm_stream_piano',
      particleMood: 'stars',
      stage: [
        { charId: 'terachi', expression: 'konwaku_katamaru', position: 'center' },
      ],
      speaker: 'narrator',
      text: 'そして迎えた二年目最初の本質配信 #7。登録者は九百六十人――だがオープンチャットには、倉石・召野・櫻・両馬によるかつてないカオス投稿が殺到していた！',
    },
    {
      type: 'livestream',
      id: 'stream_ep2',
      episodeTitle: '本質配信 #7「二年目カオス回・原✝本質✝と封印の刻印」',
      channelName: '星と地面とせいちちゃんねる',
      viewerCountLabel: '視聴者 88人',
      subscriberLabel: '登録者 960人',
      bgm: 'bgm_stream_piano',
      items: [
        {
          id: 'st2_1',
          senderTag: '倉石暁（後輩・信徒）',
          paperText: '寺地先輩は✝本質✝の巫女です。あなたの配信は聖典です。✝✝✝',
          terachiFreezeSec: 12,
          liveComments: [
            { user: '古参リスナーA', text: '✝が三つついてる、重いｗｗｗ' },
            { user: '名無しの視聴者', text: '聖典は草' },
            { user: '倉石暁（本人）', text: '原✝本質✝の器たる寺地先輩に敬意を！' },
          ],
          prompt: '「聖典の巫女」呼ばわりされた寺地。どう切り返す？',
          choices: [
            {
              label: '「巫女じゃない。俺はペットボトルくらいの存在です。直接来ないで」',
              style: 'tsukkomi',
              terachiReply:
                '俺は巫女じゃないです、男だし。器でもなくペットボトルくらいの存在です。あと✝は一つでいいです、三つは重い。――直接言いに来ないでください、怖いから。',
              terachiExpression: 'konwaku_katamaru',
              chatReaction: [
                { user: '名無しの視聴者', text: 'ペットボトルは草' },
                { user: '古参リスナーA', text: '直接来るなｗｗｗ' },
                { user: '両馬（複垢）', text: '寺地のツッコミ成長してて✝本質✝' },
              ],
              scoreDelta: 25,
              isBest: true,
            },
            {
              label: '「ありがとう……でも机の引き出しに紙束入れてるだけだよ」',
              style: 'empathy',
              terachiReply:
                '聖典ってほどじゃないです。ただのコピー用紙と太マジックです。でも毎回見てくれてありがとう。',
              terachiExpression: 'ureshii',
              chatReaction: [
                { user: '古参リスナーA', text: '寺地さん優しいな' },
                { user: '倉石暁（本人）', text: '謙遜すら聖句です✝' },
              ],
              scoreDelta: 15,
            },
          ],
        },
        {
          id: 'st2_2',
          senderTag: '匿名（明らかに恋愛学研究者）',
          paperText: '研究対象に自分が含まれたとき、理論は耐えられるのか。',
          terachiFreezeSec: 4,
          liveComments: [
            { user: '名無しの視聴者', text: '急にガチ相談きた' },
            { user: '内藤蘭（ROM専）', text: '……' },
          ],
          prompt: '理論が耐えられない櫻へ、寺地としてなんと答える？',
          choices: [
            {
              label: '「正しい理論より本当の感情の方が大事。理論が壊れても恋は壊れてない」',
              style: 'empathy',
              terachiReply:
                '去年来た「正しいことより、本当のことの方が大事だ」に似てる気がします。正しい理論より本当の感情の方が大事。理論が壊れても、恋は壊れてないから。たぶん。',
              terachiExpression: 'haishin_shinken',
              chatReaction: [
                { user: '古参リスナーA', text: '✝本質✝カウンセラー爆誕' },
                { user: '名無しの視聴者', text: '普通に名言で泣いた' },
              ],
              scoreDelta: 25,
              isBest: true,
            },
            {
              label: '「当事者になったら理論なんて捨てていいんじゃないかな」',
              style: 'honshitsu',
              terachiReply:
                '理論が機能しないのが恋なんだと思います。壊れたまま飛び込むのも✝本質✝かも。',
              terachiExpression: 'nemusou',
              chatReaction: [
                { user: '古参リスナーA', text: 'たしかに' },
              ],
              scoreDelta: 15,
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
            { charId: 'kuraishi', expression: 'nekkyou', position: 'left' },
            { charId: 'meshino', expression: 'eigo_doya', position: 'right' },
          ],
          addBullet: TRUTH_BULLETS.gen_honshitsu_paradox,
          sfx: 'clue_get',
          speaker: 'narrator',
          text: '翌日、昼休みの教室。倉石の「原✝本質✝」論と、召野の「人妻の封印＆一筋」宣言が同時多発的に暴走し始めた！',
        },
        {
          type: 'dialogue',
          stage: [
            { charId: 'terachi', expression: 'haishin_shinken', position: 'left' },
            { charId: 'mie', expression: 'honki_shinken', position: 'right' },
          ],
          speaker: 'mie',
          text: '寺地、三峰、手を貸せ！ 二年目のカオス投稿どもに現実の防波堤を叩き込むぞ！',
        },
      ],
    },
    {
      type: 'debate',
      id: 'debate_ep2',
      title: 'ノンストップ✝本質✝議論 #02',
      subtitle: '倉石の「原✝本質✝」と召野の「人妻一筋宣言」の矛盾を撃ち抜け！',
      bg: 'bg_debate_void',
      bgm: 'bgm_debate',
      protagonist: 'terachi',
      protagonistExpression: 'haishin_shinken',
      startingBullets: [
        'gen_honshitsu_paradox',
        'married_ring_seal',
        'double_ha_harmony',
        'cross_signature',
      ],
      rounds: [
        {
          id: 'd2_r1',
          roundTitle: 'ROUND 1：倉石暁「原✝本質✝」の自己崩壊を突け！',
          topicBanner: '「言語化されたものは残骸」と文章で送ってきた矛盾を撃て！',
          hint: '倉石の「言語化以前の原✝本質✝を今まさに文章で伝授します」という矛盾発言に【原✝本質✝の自己崩壊】を撃ち込め！',
          wrongHitLine: '寺地「うーん、そこじゃない……倉石くんの『言語化』に関する自己矛盾を狙おう！」',
          statements: [
            {
              id: 's2_1_1',
              speaker: 'kuraishi',
              expression: 'nekkyou',
              segments: [{ text: '✝本質✝は言語に先立つ！ 言語化された✝本質✝はすでに残骸なのです！' }],
              durationMs: 4800,
              position: { topPct: 24, leftPct: 12, rotateDeg: -2 },
              pressResponse: {
                protagonistLine: '寺地「ちょっと待って倉石くん！ 言語化したら残骸になるってことは……」',
                targetReply: '倉石「はい！ 言葉にした瞬間、もはや純粋な原✝本質✝ではなくなるのです！」',
                targetExpression: 'hokorashige',
                extraHint: 'その直後の発言に【原✝本質✝の自己崩壊】を撃ち込めば自己崩壊する！',
              },
            },
            {
              id: 's2_1_2',
              speaker: 'kuraishi',
              expression: 'hokorashige',
              segments: [
                { text: 'だから僕はこの投稿で、' },
                { text: '純粋な原✝本質✝を完璧に言語化して届けます！', weakPointId: 'wp_gen_paradox', emphasis: 'loud' },
              ],
              durationMs: 5800,
              position: { topPct: 48, leftPct: 24, rotateDeg: 2.5 },
              pressResponse: {
                protagonistLine: '寺地「いや、完璧に言語化して届けたら、それ自分で残骸って言ってるよね！？」',
                targetReply: '倉石「……はっ！？ い、いや、これは聖なる例外で……」',
                targetExpression: 'kotoba_ushinau',
              },
            },
            {
              id: 's2_1_3',
              speaker: 'ryoma',
              expression: 'niyari',
              segments: [{ text: 'ちなみに三重県産みかんの白い筋も糸魚川-静岡構造線より深いぞ✝' }],
              durationMs: 4000,
              position: { topPct: 68, leftPct: 14, rotateDeg: -1.5 },
              pressResponse: {
                protagonistLine: '三重「また俺の名前をみかんに混ぜるな！ あと笹かまぼこは宮城だろ！」',
                targetReply: '両馬「笹かまぼこ宮城だったわ」',
                targetExpression: 'terekakushi',
              },
            },
          ],
          solution: {
            weakPointId: 'wp_gen_paradox',
            bulletId: 'gen_honshitsu_paradox',
            cutInText: '自己崩壊だ！！',
            cutInSubtext: '寺地星・12秒フリーズからの逆転ツッコミ！',
            cutInSpeaker: 'terachi',
            cutInExpression: 'haishin_shinken',
            breakdownLines: [
              {
                type: 'dialogue',
                speaker: 'terachi',
                stage: [
                  { charId: 'kuraishi', expression: 'kotoba_ushinau', position: 'left', dim: true },
                  { charId: 'terachi', expression: 'haishin_shinken', position: 'right' },
                ],
                text: '言語化したら残骸だって言いながら、文章にして送ってきてる時点で――この投稿自体がもう残骸じゃないですか！ 自己崩壊してますよ！',
              },
              {
                type: 'dialogue',
                speaker: 'kuraishi',
                stage: [
                  { charId: 'kuraishi', expression: 'kotoba_ushinau', position: 'left' },
                  { charId: 'terachi', expression: 'haishin_shinken', position: 'right', dim: true },
                ],
                shake: true,
                text: 'ぐっ……！！ 言語化のパラドックスを突かれるとは……さすが✝本質✝の巫女……！',
              },
              {
                type: 'dialogue',
                speaker: 'terachi',
                stage: [
                  { charId: 'kuraishi', expression: 'kotoba_ushinau', position: 'left', dim: true },
                  { charId: 'terachi', expression: 'konwaku_katamaru', position: 'right' },
                ],
                text: 'だから俺はペットボトルだって言ってるのに……！',
              },
            ],
          },
        },
        {
          id: 'd2_r2',
          roundTitle: 'ROUND 2：召野カイト「二見先生一筋」の二重構造を暴け！',
          topicBanner: '封印の刻印に酔いしれる召野へ「は？」を叩き込め！',
          hint: '召野が「絶対に他の女にはなびかない一筋だ」と豪語する部分に【封印の刻印（結婚指輪）】を撃ち込め！',
          wrongHitLine: '三重「そこは召野の本心だ。矛盾してる『一筋』発言に【封印の刻印】をぶつけろ！」',
          statements: [
            {
              id: 's2_2_1',
              speaker: 'meshino',
              expression: 'eigo_doya',
              segments: [{ text: '二見先生の結婚指輪は封印の刻印！ そのおかげで英語は学年十二位だ！' }],
              durationMs: 4400,
              position: { topPct: 24, leftPct: 10, rotateDeg: -2 },
              pressResponse: {
                protagonistLine: '三重「百十八人抜きしたのは普通にすごいよ、認めるよ。だが――」',
                targetReply: '召野「ふっ、すべては愛の力さ。Love conquers all.」',
                targetExpression: 'eigo_doya',
              },
            },
            {
              id: 's2_2_2',
              speaker: 'meshino',
              expression: 'shinken',
              segments: [
                { text: '俺の愛に一点の曇りもない！ ' },
                { text: '二見先生以外の女子に揺らぐことなど絶対にない！', weakPointId: 'wp_meshino_loyal', emphasis: 'loud' },
              ],
              durationMs: 5600,
              position: { topPct: 46, leftPct: 22, rotateDeg: 2 },
              pressResponse: {
                protagonistLine: '伊崎「じゃあさ、仮に隣のクラスの女子が告白してきたら？」',
                targetReply: '召野「……OKする。告白されたら断るのは失礼だろ」',
                targetExpression: 'tsuujou',
                extraHint: '今だ！【封印の刻印（結婚指輪）】を「絶対にない！」へ撃ち込め！',
              },
            },
            {
              id: 's2_2_3',
              speaker: 'mitsumine',
              expression: 'tsukkomi',
              segments: [{ text: 'ちょっと待って、理数科って全員こんな感じなの！？' }],
              durationMs: 4000,
              position: { topPct: 68, leftPct: 20, rotateDeg: -1 },
              pressResponse: {
                protagonistLine: '三重「巻き込まれてるだけだ……俺と一緒にツッコめ三峰！」',
                targetReply: '三峰「わかった、タイミング合わせてやる！」',
                targetExpression: 'ha',
              },
            },
          ],
          solution: {
            weakPointId: 'wp_meshino_loyal',
            bulletId: 'married_ring_seal',
            cutInText: 'は？！！（ハモリ）',
            cutInSubtext: '三重 × 三峰 ダブル防波堤ツッコミ！',
            cutInSpeaker: 'mie',
            cutInExpression: 'ha',
            partnerSpeaker: 'mitsumine',
            partnerExpression: 'ha',
            breakdownLines: [
              {
                type: 'dialogue',
                speaker: 'crowd',
                speakerLabel: '三重 ＆ 三峰',
                stage: [
                  { charId: 'mie', expression: 'ha', position: 'left' },
                  { charId: 'meshino', expression: 'shinmiri', position: 'center', dim: true },
                  { charId: 'mitsumine', expression: 'ha', position: 'right' },
                ],
                text: '隣のクラスの女子に告白されたら即OKする奴のどこが一筋なんだよ！！',
              },
              {
                type: 'dialogue',
                speaker: 'meshino',
                stage: [
                  { charId: 'meshino', expression: 'shinmiri', position: 'center' },
                ],
                text: '……まあ、ちょっとはふざけてる。でもな、二見先生への気持ちだけは本当なんだ。人妻だから成就しないこともわかってる。',
              },
              {
                type: 'dialogue',
                speaker: 'meshino',
                stage: [
                  { charId: 'meshino', expression: 'shinken', position: 'center' },
                ],
                addBullet: TRUTH_BULLETS.unfulfilled_completion,
                sfx: 'clue_get',
                text: '片思いの✝本質✝は、成就しないまま完了することだ。……いつかちゃんと気持ちを伝えて、俺の中で完了させるよ。',
              },
            ],
          },
        },
      ],
      victoryLines: [
        {
          type: 'dialogue',
          bg: 'bg_classroom_sunset',
          bgm: 'bgm_emotional',
          particleMood: 'dust',
          stage: [
            { charId: 'futami', expression: 'yokogao', position: 'left' },
            { charId: 'meshino', expression: 'shinmiri', position: 'right' },
          ],
          speaker: 'narrator',
          text: 'その後、召野は放課後の教室で二見玲子へ「返事はいりません、言いたかっただけです」と潔く想いを伝え、完了した。',
        },
        {
          type: 'dialogue',
          stage: [
            { charId: 'futami', expression: 'tsuujou', position: 'left' },
            { charId: 'meshino', expression: 'shinken', position: 'right', dim: true },
          ],
          speaker: 'futami',
          text: 'ありがとう、召野くん。でも私は先生で、あなたは生徒だから。――英語の勉強、私のためじゃなくて、自分のために続けてね。',
        },
      ],
    },
    {
      type: 'chapter_end',
      chapterId: 2,
      nextChapterId: 3,
      summaryTitle: '第2話・完『狂信者降臨、二つの「は？」、そして封印の刻印』',
      summaryQuote: '「山の頂上に登って、景色を見て、降りてくる。それで完了するんだろう」',
      almanacUnlockNote: '倉石暁・召野カイト・二見玲子・三峰瑠衣のプロフィール＆言弾が年鑑に追加されました！',
    },
  ],
};
