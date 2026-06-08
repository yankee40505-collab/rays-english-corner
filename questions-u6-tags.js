/**
 * 國二 U6 附加問句 (Question Tags) — 30 題題庫
 * 掛載方式：在 practice.html 的 bank 宣告之前 <script src="questions-u6-tags.js"></script>
 * 本檔定義 window.EXTRA_BANKS，practice.html 的 init() 執行前會自動 merge 進 bank。
 */
window.EXTRA_BANKS = window.EXTRA_BANKS || {};

window.EXTRA_BANKS['國二 U6 附加問句'] = [
  // ── 第一部分：Be 動詞與一般動詞 ────────────────────────────────
  {
    type: 'mc',
    q: "The science fair is around the corner, ____?",
    opts: ["does it", "is it", "isn't it", "doesn't it"],
    ans: 2,
    exp: "主句為肯定句（is），附加問句要用否定形式；主詞為 it，助動詞用 is，故答案是 isn't it。"
  },
  {
    type: 'mc',
    q: "Mom and Dad were watching TV then, ____?",
    opts: ["wasn't it", "was they", "didn't they", "weren't they"],
    ans: 3,
    exp: "主句為肯定句（were），附加問句用否定；主詞為複數 they，故用 weren't they。"
  },
  {
    type: 'mc',
    q: "Stacy isn't going to the beach with us, ____?",
    opts: ["is she", "does she", "isn't she", "wasn't she"],
    ans: 0,
    exp: "主句為否定句（isn't），附加問句要用肯定形式；主詞為 she，助動詞用 is，故答案是 is she。"
  },
  {
    type: 'mc',
    q: "I'm taller than Amy, ____?",
    opts: ["am I", "am not I", "don't I", "aren't I"],
    ans: 3,
    exp: "「I am」的否定附加問句是 aren't I（特殊固定用法，不用 am not I）。"
  },
  {
    type: 'mc',
    q: "Her brother wasn't at the party, ____?",
    opts: ["wasn't he", "is he", "was he", "did he"],
    ans: 2,
    exp: "主句為否定句（wasn't），附加問句用肯定形式；主詞為 he，Be 動詞過去式用 was，故答案是 was he。"
  },
  {
    type: 'mc',
    q: "You like black coffee, ____?",
    opts: ["aren't you", "don't you", "do you", "didn't you"],
    ans: 1,
    exp: "主句為肯定的一般動詞現在式，附加問句用否定助動詞 don't；主詞為 you，故答案是 don't you。"
  },
  {
    type: 'mc',
    q: "Chad didn't make you do his homework, ____?",
    opts: ["did he", "didn't he", "does he", "do he"],
    ans: 0,
    exp: "主句為否定句（didn't），附加問句用肯定形式；主詞為 he，過去式助動詞用 did，故答案是 did he。"
  },
  {
    type: 'mc',
    q: "Eric went to India last year, ____?",
    opts: ["was he", "did he", "went he", "didn't he"],
    ans: 3,
    exp: "主句為肯定的一般動詞過去式，附加問句用否定助動詞 didn't；主詞為 he，故答案是 didn't he。"
  },
  {
    type: 'mc',
    q: "Judy runs every day, ____?",
    opts: ["isn't she", "didn't she", "doesn't she", "does she"],
    ans: 2,
    exp: "主句為肯定的一般動詞現在式（三單），附加問句用否定助動詞 doesn't；主詞為 she，故答案是 doesn't she。"
  },
  {
    type: 'mc',
    q: "They have a pet, ____?",
    opts: ["haven't they", "aren't they", "do they", "don't they"],
    ans: 3,
    exp: "have 在此為一般動詞「擁有」（非完成式助動詞），附加問句用 don't they。"
  },

  // ── 第二部分：助動詞句型（Can / Will / Should）────────────────
  {
    type: 'mc',
    q: "Mike can swim, ____?",
    opts: ["can't he", "can he", "doesn't he", "isn't he"],
    ans: 0,
    exp: "主句為肯定句（can），附加問句用否定 can't；主詞為 he，故答案是 can't he。"
  },
  {
    type: 'mc',
    q: "They won't be late, ____?",
    opts: ["won't they", "are they", "will they", "do they"],
    ans: 2,
    exp: "主句為否定句（won't），附加問句用肯定形式 will；主詞為 they，故答案是 will they。"
  },
  {
    type: 'mc',
    q: "You will do the dishes, ____?",
    opts: ["didn't you", "don't you", "will you", "won't you"],
    ans: 3,
    exp: "主句為肯定句（will），附加問句用否定 won't；主詞為 you，故答案是 won't you。"
  },
  {
    type: 'mc',
    q: "We can't walk the dog here, ____?",
    opts: ["don't we", "can we", "can't we", "do we"],
    ans: 1,
    exp: "主句為否定句（can't），附加問句用肯定形式 can；主詞為 we，故答案是 can we。"
  },
  {
    type: 'mc',
    q: "Rick should take the trash out, ____?",
    opts: ["shouldn't he", "should he", "doesn't he", "won't he"],
    ans: 0,
    exp: "主句為肯定句（should），附加問句用否定 shouldn't；主詞為 he，故答案是 shouldn't he。"
  },

  // ── 第三部分：特殊句型與陷阱題 ────────────────────────────────
  {
    type: 'mc',
    q: "There is a coffee shop near the river, ____?",
    opts: ["isn't it", "is there", "isn't there", "is it"],
    ans: 2,
    exp: "There is... 句型的附加問句主詞用 there，肯定句搭配否定形式，故答案是 isn't there。"
  },
  {
    type: 'mc',
    q: "Getting up early is hard for kids, ____?",
    opts: ["is it", "isn't it", "aren't they", "do they"],
    ans: 1,
    exp: "動名詞片語當主詞（Getting up early），視為單數 it，肯定句用否定附加問句，故答案是 isn't it。"
  },
  {
    type: 'mc',
    q: "Someone took your bike, ____?",
    opts: ["didn't he", "did they", "did he", "didn't they"],
    ans: 3,
    exp: "不定代名詞 someone 在附加問句中以 they 代替，肯定句搭配否定形式，故答案是 didn't they。"
  },
  {
    type: 'mc',
    q: "Everyone is good and bad at something, ____?",
    opts: ["isn't it", "aren't they", "isn't he", "are they"],
    ans: 1,
    exp: "everyone 在附加問句中以 they 代替（現代英文習慣），肯定句搭配否定形式，故答案是 aren't they。"
  },
  {
    type: 'mc',
    q: "Gary was never late for class, ____?",
    opts: ["wasn't he", "didn't he", "was he", "did he"],
    ans: 2,
    exp: "never 為否定副詞，主句視為否定句，附加問句要用肯定形式，故答案是 was he。"
  },
  {
    type: 'mc',
    q: "No one knows the man's name, ____?",
    opts: ["doesn't he", "do they", "don't they", "does he"],
    ans: 1,
    exp: "no one 為否定詞，主句視為否定句，附加問句用肯定形式 do；no one 以 they 代替，故答案是 do they。"
  },
  {
    type: 'mc',
    q: "Few people passed the test, ____?",
    opts: ["didn't they", "don't they", "do they", "did they"],
    ans: 3,
    exp: "few 表示「幾乎沒有」，含否定語意，視為否定句，附加問句用肯定形式；過去式用 did they。"
  },
  {
    type: 'mc',
    q: "Take a seat, ____?",
    opts: ["will you", "do you", "don't you", "shall we"],
    ans: 0,
    exp: "肯定祈使句（命令句）的附加問句固定用 will you。"
  },
  {
    type: 'mc',
    q: "Let's go sit on the grass, ____?",
    opts: ["won't you", "shall we", "will you", "do we"],
    ans: 1,
    exp: "Let's... 開頭的祈使句，附加問句固定用 shall we（邀請語氣）。"
  },
  {
    type: 'mc',
    q: "Don't make an excuse for your mistake, ____?",
    opts: ["do you", "don't you", "shall we", "will you"],
    ans: 3,
    exp: "否定祈使句（Don't...）的附加問句同樣固定用 will you。"
  },
  {
    type: 'mc',
    q: "Jacob didn't do his homework until his mom came home, ____?",
    opts: ["didn't he", "did he", "did she", "didn't she"],
    ans: 1,
    exp: "主句主詞為 Jacob（he），否定句（didn't），附加問句用肯定形式 did he。不要被 his mom 混淆主詞。"
  },
  {
    type: 'mc',
    q: "If it rains tomorrow, you will stay home, ____?",
    opts: ["will you", "does it", "won't you", "doesn't it"],
    ans: 2,
    exp: "附加問句針對主要子句（you will stay home）。主句為肯定（will），主詞為 you，故用 won't you。"
  },
  {
    type: 'mc',
    q: "When you got home, Andy was sleeping, ____?",
    opts: ["wasn't he", "didn't you", "was he", "did you"],
    ans: 0,
    exp: "附加問句針對主要子句（Andy was sleeping）。主句肯定、主詞 Andy（he），故用 wasn't he。"
  },
  {
    type: 'mc',
    q: "I don't think that he is very smart, ____?",
    opts: ["do I", "don't I", "isn't he", "is he"],
    ans: 3,
    exp: "「I don't think that...」句型，附加問句針對 that 子句（he is smart），因主句為否定，子句的附加問句用肯定 is he。"
  },
  {
    type: 'mc',
    q: "You said your parents weren't at home then, ____?",
    opts: ["didn't you", "did you", "were they", "weren't they"],
    ans: 0,
    exp: "附加問句針對主要子句（You said...）。主句肯定、主詞 You，過去式一般動詞用 didn't you。"
  }
];
