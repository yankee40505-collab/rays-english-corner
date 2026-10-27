"use strict";

/* Chapters share the original movement, artwork, lessons and save slots. */
const basicQ = (q, o, a, w) => ({ q, o, a, w, difficulty:"basic" });
const lessonPage = (t, idea, formula, examples, tip) => ({t, h:
  '<div class="box"><span class="k">先這樣想</span><p>' + idea + '</p></div>' +
  '<div class="box"><span class="k">句子怎麼排</span><p class="fl">' + formula + '</p></div>' +
  examples.map(e => '<p class="fl">' + e[0] + '</p><p class="note">' + e[1] + '</p>').join("") +
  '<div class="mist"><div class="mh">記住這一點就好</div><p style="margin:0;padding:12px 14px">' + tip + '</p></div>'
});
const NEW_LESSONS = [
  {id:"g5", chapter:2, cn:"城裡有什麼？", en:"There is / There are", skill:"City Scout", tier:"main", tag:"第二章・基礎", desc:"一個用 is，兩個以上用 are。",
    pages:[
      lessonPage("有一個，用 There is", "想告訴別人『這裡有什麼』，可以用 There is。這裡的 there 不用翻成『那裡』。", "There is ＋ 一個人或東西 ＋ 地點.", [["There <b>is a guard</b> at the gate.","城門口有一位守衛。a guard 是一個人，所以用 is。"],["There <b>is a book</b> on the desk.","桌上有一本書。先說有什麼，再說在哪裡。"]], "看到 a / an ＋ 一個東西，先想 There is。"),
      lessonPage("有很多，用 There are", "東西變成兩個以上，is 要換成 are，名詞通常也會加 s。", "There are ＋ 複數名詞 ＋ 地點.", [["There <b>are two guards</b> at the gate.","城門口有兩位守衛。two guards 是兩個人。"],["There <b>are three books</b> on the desk.","三本書是複數，所以用 are。"]], "不要寫 There is two guards。看數量，不要只看句子的第一個字。"),
      lessonPage("沒有與詢問", "說『沒有』就在 is / are 後加 not；想問『有沒有』就把 is / are 搬到最前面。", "Is there a …? ／ Are there two …?", [["<b>Is there</b> a guard? — Yes, there is.","有一位守衛嗎？有。問 is，回答也用 is。"],["There <b>are not</b> two horses here.","這裡沒有兩匹馬。are not 可以縮成 aren't。"]], "先把『一個 is、很多 are』練熟，再練問句。")
    ], check:[basicQ("There _____ a book on the desk.",["is","are","am"],0,"一本書是單數，用 <b>is</b>。"),basicQ("There _____ two guards at the gate.",["is","are","am"],1,"two guards 是兩個人，用 <b>are</b>。"),basicQ("_____ there a horse here?",["Are","Am","Is"],2,"a horse 是一匹馬，問句用 <b>Is there</b>。")]
  },
  {id:"g6", chapter:2, cn:"每天都會做的事", en:"Simple Present", skill:"Daily Orders", tier:"main", tag:"第二章・基礎", desc:"I / you / we / they 用原形；he / she / it 的動詞會變。",
    pages:[
      lessonPage("每天的習慣", "每天、常常會做的事，可以用現在簡單式。先只記 I / you / we / they 的句子。", "I / You / We / They ＋ 原形動詞.", [["We <b>train</b> every day.","我們每天練兵。train 保持原形。"],["They <b>read</b> every morning.","他們每天早上閱讀。read 也不變。"]], "every day 是『每天』，不是只有現在這一秒。"),
      lessonPage("只有他或她一個人", "主詞換成 he / she / it，或一個人的名字，現在簡單式的動詞通常加 s。", "He / She / It ＋ 動詞加 s.", [["He <b>reads</b> every day.","他每天閱讀。he 是一個人，read 加 s。"],["Guo Jia <b>helps</b> the soldiers.","郭嘉幫助士兵。Guo Jia 是一個人，所以是 helps。"]], "We read，He reads。先把這兩句放在一起記。"),
      lessonPage("簡單的否定", "要說『不會這樣做』，I / you / we / they 用 don't；he / she / it 用 doesn't。後面的動詞都回到原形。", "He doesn't ＋ 原形動詞.", [["We <b>don't run</b> here.","我們不在這裡跑。"],["He <b>doesn't read</b> at night.","他晚上不閱讀。不要寫 doesn't reads。"]], "有 doesn't 幫忙，後面的動詞就不用再加 s。")
    ],check:[basicQ("We _____ every day.",["train","trains","training"],0,"主詞 We 配原形 <b>train</b>。"),basicQ("He _____ books every morning.",["read","reads","reading"],1,"He 是一個人，read 加 s → <b>reads</b>。"),basicQ("She doesn't _____ here.",["runs","running","run"],2,"doesn't 後用原形 <b>run</b>。")]
  },
  {id:"g7", chapter:2, cn:"誰有軍糧？", en:"Have / Has", skill:"Supplies", tier:"main", tag:"第二章・基礎", desc:"我有、我們有用 have；他有、她有用 has。",
    pages:[
      lessonPage("have：我有、我們有", "have 是『有』。I / you / we / they 後面用 have。", "I / You / We / They ＋ have ＋ 東西.", [["We <b>have</b> food.","我們有糧食。"],["I <b>have</b> a bag.","我有一個袋子。"]], "有很多人當主詞，用 have：The soldiers have food。"),
      lessonPage("has：他有、她有", "he / she / it 或一個人的名字，後面要用 has。has 就是 have 在這種句子裡的樣子。", "He / She / It ＋ has ＋ 東西.", [["He <b>has</b> a horse.","他有一匹馬。"],["Dian Wei <b>has</b> a sword.","典韋有一把劍。典韋是一個人，所以用 has。"]], "看『誰有』，不要看『有幾個東西』：He has two books 仍然用 has。")
    ],check:[basicQ("I _____ a book.",["have","has","is"],0,"I 後面用 <b>have</b>。"),basicQ("She _____ a bag.",["have","has","are"],1,"She 後面用 <b>has</b>。"),basicQ("The soldiers _____ food.",["has","is","have"],2,"soldiers 是很多士兵，用 <b>have</b>。")]
  },
  {id:"u3words",chapter:3,cn:"城鎮生活單字",en:"Unit 3 · Words",skill:"Town Words",tier:"main",tag:"第三章・基礎",desc:"先認得 sign、rule、follow、quiet、safe 等生活用字。",
    pages:[
      lessonPage("看懂告示", "先記三個在城裡常會看到的字：sign 是標誌，rule 是規則，place 是地方。", "sign 標誌 ／ rule 規則 ／ place 地方", [["Look at the <b>sign</b>.","看看這個標誌。sign 裡的 g 不發音。"],["Follow the <b>rules</b>.","遵守規則。follow 可以是『跟著人走』，也可以是『遵守規則』。"],["This is a safe <b>place</b>.","這是一個安全的地方。"]], "rule 一條規則；rules 多條規則。先把意思記起來，不用背很長的定義。"),
      lessonPage("三個重要的形容詞", "形容詞用來說人或東西『怎麼樣』。先記 careful、quiet、safe。", "careful 小心的 ／ quiet 安靜的 ／ safe 安全的", [["Be <b>careful</b>.","要小心。careful 說的是狀態，前面加 Be。"],["Be <b>quiet</b>, please.","請安靜。"],["This place is <b>safe</b>.","這個地方很安全。"]], "小心＝careful；安靜＝quiet；安全＝safe。一次分清楚三個就好。"),
      lessonPage("簡單的動作", "動詞就是動作。先把動作跟意思一起記。", "use 使用 ／ wait 等待 ／ see 看見 ／ talk 說話 ／ wash 清洗", [["<b>Wash</b> your hands.","洗手。hand 是一隻手，hands 是雙手或多隻手。"],["<b>Wait</b> for me.","等我。等待某人要用 wait for ＋ 人。"],["Don't <b>talk</b> here.","不要在這裡說話。"]], "follow＝遵守／跟隨；fight＝打架；不要把它們當成同一個動作。"),
      lessonPage("常用的小片語", "片語就是幾個字放在一起用。先用整組意思記，比一個字一個字拆容易。", "wake up 醒來 ／ turn off 關掉 ／ after class 下課後", [["<b>Wake up</b>, Ben.","Ben，醒醒。"],["<b>Turn off</b> the light.","關燈。turn on 則是打開。"],["Wait for your <b>turn</b>.","等輪到你。這裡的 turn 是『輪到的機會』。"]], "time for class＝上課時間到了；Sure.＝當然可以。先看得懂、會選意思就好。"),
      lessonPage("其他課本單字", "這些字先認得中文意思即可，基礎題不考拼字。", "museum 博物館 ／ lab 實驗室 ／ magic 神奇的", [["There are <b>many</b> books.","有很多書。many＝很多，後面放複數名詞。"],["That <b>man</b> is our teacher.","那位男子是我們的老師。man 的複數是 men。"],["I can see a <b>dinosaur</b>.","我能看到一隻恐龍。mummy＝木乃伊；rock＝石塊。"]], "guy＝人／傢伙；with＝和／用；now＝現在。先記意思，不用一次背完所有用法。")
    ],check:[basicQ("sign 的意思是什麼？",["標誌","時間","手"],0,"<b>sign</b> 是標誌，g 不發音。"),basicQ("『安全的』是哪一個字？",["quiet","safe","many"],1,"<b>safe</b>＝安全的；quiet＝安靜的。"),basicQ("follow the rules 的意思是？",["關燈","洗手","遵守規則"],2,"follow 在這裡是『遵守』，rules 是規則。")]
  },
  {id:"u3command",chapter:3,cn:"請你做一件事",en:"Imperatives",skill:"Clear Instructions",tier:"main",tag:"第三章・基礎",desc:"動作直接開頭；不要做就加 Don't。",
    pages:[
      lessonPage("動作直接放前面", "要請別人做事，可以直接用動作開頭。『你』通常省略，不必先寫 You。這種句子叫祈使句。", "原形動詞 ＋ 其他字.", [["<b>Open</b> the door.","打開門。Open 是原形，就是字典裡最基本的動詞樣子。"],["<b>Wash</b> your hands.","洗手。不是 Washes，也不是 Washing。"]], "先找『要對方做什麼』，把那個動作放最前面。"),
      lessonPage("說『請』更有禮貌", "please 放句子前面或後面都可以。放後面時，前面加逗號。", "Please ＋ 原形動詞. ／ 原形動詞…, please.", [["<b>Please open</b> the door.","請開門。"],["<b>Open</b> the door<b>, please</b>.","也是請開門。動作還是用 open。"]], "please 不會讓動詞變形：Please open，不是 Please opens。"),
      lessonPage("安靜不是一個動作", "quiet、careful、safe 是形容詞。要叫人『保持這種狀態』，前面要放 Be。", "Be ＋ 形容詞.", [["<b>Be quiet</b>.","安靜。quiet 前面加 Be。"],["<b>Be careful</b>, my lord.","主公，要小心。叫誰，就把名字或稱呼用逗號隔開。"]], "不要只寫 Quiet 或 Careful 來套這個句型；本課練完整的 Be quiet / Be careful。"),
      lessonPage("不要做：Don't", "叫對方『不要做』，就在原形動詞前面放 Don't。Don't 是 Do not 的縮寫。", "Don't ＋ 原形動詞.", [["<b>Don't run</b> here.","不要在這裡跑。"],["<b>Don't be</b> noisy.","不要吵。noisy 是形容詞，所以 Don't 後面仍然要有 be。"]], "Don't open 是對的；Don't opens、Don't to open 都不對。"),
      lessonPage("把三句放在一起", "肯定、客氣、否定，只改前面的字，動作本身保持原形。", "Open… ／ Please open… ／ Don't open…", [["<b>Open</b> the door.","開門。"],["<b>Please open</b> the door.","請開門。"],["<b>Don't open</b> the door.","不要開門。"]], "這裡先練看懂句子，不考繞口的重組或很多空格。")
    ],check:[basicQ("_____ the door, please.",["Open","Opens","Opening"],0,"請別人做事，直接用原形 <b>Open</b> 開頭。"),basicQ("_____ quiet, please.",["Is","Be","Are"],1,"quiet 是形容詞，前面放原形 <b>Be</b>。"),basicQ("_____ run here.（不要在這裡跑。）",["Not","Doesn't","Don't"],2,"不要做某事：<b>Don't ＋ 原形動詞</b>。")]
  },
  {id:"u3lets",chapter:3,cn:"我們一起做吧",en:"Let's / Let's not",skill:"Teamwork",tier:"main",tag:"第三章・基礎",desc:"Let's 後接原形；一起不要做用 Let's not。",
    pages:[
      lessonPage("Let's＝我們一起", "自己也參加，邀大家一起做，就用 Let's。跟只叫別人做的祈使句有一點不同。", "Let's ＋ 原形動詞.", [["<b>Let's go</b>.","我們一起走吧。說話的人也會一起去。"],["<b>Let's follow</b> the rules.","我們一起遵守規則吧。follow 保持原形。"]], "Let's go，不是 Let's to go，也不是 Let's goes。"),
      lessonPage("一起不要做", "邀大家『一起不要做』，就在 Let's 後面加 not。這裡不用 don't。", "Let's not ＋ 原形動詞.", [["<b>Let's not run</b> here.","我們不要在這裡跑吧。"],["<b>Let's not be</b> noisy.","我們不要吵吧。形容詞前面還是要有 be。"]], "Don't run＝叫對方不要跑；Let's not run＝我們一起不要跑。"),
      lessonPage("一起保持某種狀態", "後面是 quiet / careful / nice 這種形容詞時，Let's 後面要用 be。", "Let's be ＋ 形容詞.", [["<b>Let's be careful</b>.","我們一起小心一點吧。"],["<b>Let's be quiet</b>.","我們一起安靜吧。"]], "Let's 後面的動詞都用原形，所以用 be，不用 is 或 are。")
    ],check:[basicQ("Let's _____ to the gate.",["go","goes","to go"],0,"Let's 後面用原形 <b>go</b>。"),basicQ("Let's _____ run here.（我們不要在這裡跑吧。）",["don't","not","doesn't"],1,"一起不要做：<b>Let's not</b> ＋ 原形。"),basicQ("Let's _____ quiet.",["are","is","be"],2,"quiet 前面要有 be；Let's 後用原形 <b>be</b>。")]
  },
  {id:"u3can",chapter:3,cn:"我會，也可以",en:"Can / Can't",skill:"Ask Permission",tier:"main",tag:"第三章・基礎",desc:"can 後面用原形；Can I…? 是詢問可不可以。",
    pages:[
      lessonPage("會做、可以做", "can 可以表示『有能力做』，也可以表示『被允許做』。先看句子在說哪一種。", "主詞 ＋ can ＋ 原形動詞.", [["I <b>can swim</b>.","我會游泳。這是在說能力。"],["You <b>can use</b> this book.","你可以用這本書。這是在說允許。"]], "不管 I、he、they，都用 can：He can swim，不加 s，也不加 to。"),
      lessonPage("不會、不可以", "can 後面加 not，常縮成 can't。後面的動詞一樣維持原形。", "主詞 ＋ can't ＋ 原形動詞.", [["He <b>can't swim</b>.","他不會游泳。"],["We <b>can't use</b> the phone here.","我們不可以在這裡用電話。"]], "不能寫 can't uses。can 和 can't 後面都用同一種原形。"),
      lessonPage("想問就把 Can 搬前面", "想問『可不可以』或『會不會』，把 Can 放到主詞前面，句尾加問號。", "Can ＋ 主詞 ＋ 原形動詞…?", [["<b>Can I use</b> this book?", "我可以用這本書嗎？先 Can，再 I，再 use。"],["<b>Can you swim</b>?", "你會游泳嗎？"]], "問 Can I…? 時，對方回答你會用 you：Yes, you can。"),
      lessonPage("簡單回答", "用 can 問，就用 can 或 can't 回答。先看問題在問誰。", "Yes, 主詞 can. ／ No, 主詞 can't.", [["Can you swim? — <b>Yes, I can.</b>","問你會不會，你回答『我會』。"],["Can he swim? — <b>No, he can't.</b>","問他，就回答 he。"],["What can you do? — <b>I can draw.</b>","問你會做什麼，就說一個會做的動作。"]], "本章先練肯定問句與簡答；不放否定疑問、語氣推測等進階題。")
    ],check:[basicQ("He can _____ a horse.",["ride","rides","to ride"],0,"can 後用原形 <b>ride</b>，不加 s / to。"),basicQ("_____ I use this book?",["Am","Can","Is"],1,"詢問可不可以：<b>Can I use…?</b>"),basicQ("Can you swim? — Yes, _____.",["you can","I am","I can"],2,"別人問你，你回答『我會』→ <b>I can</b>。")]
  },
  {id:"u3or",chapter:3,cn:"選這個，或那個",en:"Or · Simple Choices",skill:"Make a Choice",tier:"main",tag:"第三章・基礎",desc:"or 是『或者』，先練兩個簡單選項。",
    pages:[
      lessonPage("or 把選項接起來", "or 是『或者』。最簡單的用法，是把兩個同類的東西放在一起，讓人選。", "選項 A ＋ or ＋ 選項 B", [["Tea <b>or</b> water?", "茶還是水？兩邊都是飲料。"],["A book <b>or</b> a bag?", "一本書或一個袋子？兩邊都是東西。"]], "先認得 or＝或者。本章不考主詞遠近搭配等進階規則。"),
      lessonPage("選擇問句怎麼回答", "別人問『A 還是 B』，直接選其中一個回答，通常不用 Yes / No。", "A or B? → 選 A 或選 B.", [["Do you want tea <b>or water</b>? — <b>Water, please.</b>","你要茶還是水？請給我水。"],["Is it a book <b>or a bag</b>? — <b>A book.</b>","它是書還是袋子？是書。"]], "Yes 沒有說出選哪個，所以基礎題要找有明確選項的回答。"),
      lessonPage("不要做 A，也不要做 B", "Don't 後面可以用 or 接兩個不可以做的動作，意思是兩個都不要做。", "Don't ＋ 動作 A ＋ or ＋ 動作 B.", [["Don't <b>eat or drink</b> here.","這裡不要吃，也不要喝。不是選一個做。"],["Don't <b>run or fight</b> here.","這裡不要跑，也不要打架。"]], "看到 Don't 先想『不可以』；這句裡的兩個動作都不可以。")
    ],check:[basicQ("Tea _____ water?（茶還是水？）",["or","but","with"],0,"兩個選項中間放 <b>or</b>，表示『或者』。"),basicQ("A book or a bag? 哪個回答最清楚？",["Yes.","A book.","No."],1,"直接選一項：<b>A book.</b>"),basicQ("Don't eat or drink here. 是什麼意思？",["可以吃也可以喝","只能選一個","不要吃，也不要喝"],2,"Don't…or… 表示兩件事都不要做。")]
  },
  {id:"u3object",chapter:3,cn:"動作後面要用誰？",en:"Object Pronouns",skill:"Help Each Other",tier:"main",tag:"第三章・基礎",desc:"help me、with him：看位置，選受格。",
    pages:[
      lessonPage("做動作的人與接受動作的人", "『我幫助他』裡，我做動作，他接受幫助。英文會依位置換代名詞，不是中文意思變了。", "I help him. → 我（做）幫助 他（接受）", [["<b>He</b> helps <b>me</b>.","他幫我。He 做動作，me 接受幫助。"],["I help <b>him</b>.","我幫他。help 後面用 him，不用 he。"]], "先找動作 help。動作前面的主詞用 I / he，動作後面的受詞用 me / him。"),
      lessonPage("受格對照表", "先把常見的七個受格認得。you 和 it 的形狀不變，其他會變。", "I→me ／ you→you ／ he→him ／ she→her ／ it→it ／ we→us ／ they→them", [["Please help <b>us</b>.","請幫助我們。we 在這裡要換成 us。"],["I can see <b>them</b>.","我能看見他們。they 在 see 後面換成 them。"]], "一次先記三組也可以：I / me、he / him、they / them。再慢慢加上其他組。"),
      lessonPage("with / for 後面也一樣", "不只動作後面要受格，with（和）、for（為了／給）這些介系詞後面也用受格。", "with / for ＋ me / you / him / her / it / us / them", [["Come with <b>me</b>.","跟我來。with 後面用 me，不用 I。"],["This is for <b>her</b>.","這是給她的。for 後面用 her，不用 she。"]], "簡單口訣：help 後、see 後、with 後、for 後，找受格。"),
      lessonPage("叫醒他、把它關掉", "wake up 和 turn off 是兩個字組成的動作。受詞是 him / her / it / them 這種代名詞時，要放中間。", "wake ＋ 人的受格 ＋ up ／ turn ＋ it / them ＋ off", [["Wake <b>him</b> up.","叫醒他。不能寫 wake up him。"],["Turn <b>it</b> off.","把它關掉。不能寫 turn off it。"]], "這裡先學短句。題目只填一個很明確的受格，不混進很多變化。")
    ],check:[basicQ("Please help _____.（請幫助我。）",["me","I","my"],0,"help 後面要受格『我』→ <b>me</b>。"),basicQ("Come with _____.（跟他來。）",["he","him","his"],1,"with 後面要受格『他』→ <b>him</b>。"),basicQ("Turn _____ off.（把它關掉。）",["he","they","it"],2,"『它』是 <b>it</b>；受格代名詞放 turn 和 off 中間。")]
  }
];
LESSONS.push(...NEW_LESSONS);
NEW_LESSONS.forEach(l => { TRAIN_Q[l.id] = l.check; });

const DW_Q = [basicQ("There _____ a guard at the gate.",["is","are","am"],0,"a guard 一位守衛，用 is。"),basicQ("There are two _____.",["horse","horses","a horse"],1,"two 後面用複數 horses。"),basicQ("_____ there two books?",["Is","Am","Are"],2,"two books 是複數，用 Are there。")];
const GJ_Q = [basicQ("He _____ every morning.",["reads","read","reading"],0,"He 是一個人，read 加 s。"),basicQ("They _____ every day.",["trains","train","training"],1,"They 配原形 train。"),basicQ("She doesn't _____ at night.",["reads","reading","read"],2,"doesn't 後面用原形 read。")];
const SUPPLY_Q = [basicQ("We _____ food.",["have","has","is"],0,"We 配 have。"),basicQ("He _____ a bag.",["have","has","are"],1,"He 配 has。"),basicQ("I _____ two books.",["has","am","have"],2,"I 配 have，不受書本數量影響。")];
const SIGNS_Q = [basicQ("_____ quiet, please.",["Be","Is","Are"],0,"叫人安靜：Be quiet。"),basicQ("_____ fight here.（不要打架。）",["Not","Don't","Isn't"],1,"不要做：Don't ＋ 原形。"),basicQ("Please _____ the rules.",["follows","following","follow"],2,"please 後面接原形 follow。")];
const PERMISSION_Q = [basicQ("Let's _____ together.",["go","goes","to go"],0,"Let's 後用原形 go。"),basicQ("Can I use this book? — Yes, _____.",["I am","you can","he is"],1,"對方問『我可以嗎』，回答『你可以』：you can。"),basicQ("He can't _____ here.",["runs","to run","run"],2,"can't 後用原形 run。")];
const C2_FINAL = [...DW_Q.slice(0,2),...GJ_Q.slice(0,2),...SUPPLY_Q.slice(0,2)];
const C3_FINAL = [
  basicQ("rule 的意思是什麼？",["規則","時間","地方"],0,"rule＝規則。"),
  basicQ("Please _____ your hands.",["washes","wash","washing"],1,"請做某個動作，用原形 wash。"),
  basicQ("_____ talk here.（不要在這裡說話。）",["Not","Isn't","Don't"],2,"Don't ＋ 原形，表示不要做。"),
  basicQ("Let's _____ the rules.",["follow","follows","to follow"],0,"Let's 後接原形 follow。"),
  basicQ("Let's _____ run here.（我們不要在這裡跑。）",["don't","not","isn't"],1,"Let's not ＋ 原形。"),
  basicQ("She can _____ a book.",["reads","to read","read"],2,"can 後用原形 read。"),
  basicQ("Tea or water? — _____",["Water, please.","Yes, I am.","No, it isn't."],0,"選擇問句直接選一項。"),
  basicQ("Please help _____.（請幫助我們。）",["we","us","our"],1,"help 後用受格，『我們』是 us。"),
  basicQ("Turn _____ off.（把它關掉。）",["he","they","it"],2,"it 放在 turn 和 off 中間。")
];

const cq = (id,t,d,test,target) => ({id,t,d,test,target});
const CAMPAIGNS = {
  2:{cn:"兗州立足",en:"A Home in Yanzhou",city:"yanzhou",cityCn:"兗州",tone:"#294b52", lessons:["g5","g6","g7"], final:C2_FINAL,
    opening:[{en:"A city needs more than a strong army.",zh:"要讓一座城安定，只有兵力還不夠。"},{en:"We need guards, plans, and food.",zh:"我們還需要守衛、計畫和糧食。"},{en:"Let us build a home in Yanzhou.",zh:"就在兗州，建立我們的根基吧。"}],
    quests:[
      cq("c2-arrive","初入兗州","找荀彧，了解城裡的情況。",s=>s.briefed,{x:12,y:7}),
      cq("c2-scout","巡城第一課","到學堂學會 There is / There are。",()=>S.lessons.g5,{x:4,y:4}),
      cq("c2-dianwei","城門前的壯士","找典韋，完成三題基礎招募題。",()=>S.recruited.includes("dianwei"),{x:8,y:10}),
      cq("c2-routine","軍營的一天","到學堂學會現在簡單式。",()=>S.lessons.g6,{x:4,y:4}),
      cq("c2-guojia","軍師來訪","找郭嘉，完成三題基礎招募題。",()=>S.recruited.includes("guojia"),{x:16,y:5}),
      cq("c2-have","軍糧清點","到學堂分清楚 have / has。",()=>S.lessons.g7,{x:4,y:4}),
      cq("c2-supply","備齊糧草","到練兵場，完成三題補給任務。",s=>s.supplies,{x:19,y:13}),
      cq("c2-defend","守住兗州","到城內考場，完成六題基礎守城測驗。",s=>s.complete,{x:4,y:13}),
      cq("c2-clear","第二章完成・兗州立足","到南門，前往第三章「許都新規」。",()=>false,{x:12,y:17})
    ]},
  3:{cn:"許都新規",en:"Rules of the City",city:"xuchang",cityCn:"許都",tone:"#554328",lessons:["u3words","u3command","u3lets","u3can","u3or","u3object"],final:C3_FINAL,
    opening:[{en:"A new city. A new beginning.",zh:"新的城鎮，也是新的開始。"},{en:"Read the signs. Help the people.",zh:"看懂告示，幫助城裡的人。"},{en:"Small words can make a city safer.",zh:"學會簡單的英文，也能讓一座城更安全。"}],
    quests:[
      cq("c3-arrive","許都的新告示","找荀彧，接下城鎮生活任務。",s=>s.briefed,{x:12,y:7}),
      cq("c3-words","先看懂單字","到學堂認識 Unit 3 的生活單字。",()=>S.lessons.u3words,{x:4,y:4}),
      cq("c3-command","把規則說清楚","到學堂學會 Please / Be / Don't。",()=>S.lessons.u3command,{x:4,y:4}),
      cq("c3-signs","告示修復","到告示館，完成三題基礎告示題。",s=>s.signs,{x:19,y:4}),
      cq("c3-lets","我們一起來","到學堂學會 Let's / Let's not。",()=>S.lessons.u3lets,{x:4,y:4}),
      cq("c3-can","先問可不可以","到學堂學會 can / can't 和簡單問答。",()=>S.lessons.u3can,{x:4,y:4}),
      cq("c3-permission","借書與同行","到練兵場，完成三題基礎對話。",s=>s.permission,{x:19,y:13}),
      cq("c3-or","選一個就好","到學堂學會 or 的簡單選擇。",()=>S.lessons.u3or,{x:4,y:4}),
      cq("c3-object","互相幫忙","到學堂學會 me / him / us / them。",()=>S.lessons.u3object,{x:4,y:4}),
      cq("c3-review","城鎮生活小測驗","到城內考場，完成九題基礎複習。",s=>s.complete,{x:4,y:13}),
      cq("c3-clear","第三章完成・許都新規","城鎮基礎任務已完成，可以自由複習。",()=>false,null)
    ]}
};

function campaign(){ return S && CAMPAIGNS[S.chapter] || null; }
function campaignState(){ return S.campaigns[S.chapter] ||= {briefed:false,complete:false,best:null}; }
function currentQuests(){ return campaign() ? campaign().quests : QUESTS; }
function availableLessons(){ return LESSONS.filter(l => campaign() ? l.chapter === S.chapter : !l.chapter); }
function chapterCity(){ return campaign() ? campaign().city : "town"; }
function isTownScene(){ return scene !== "academy"; }
function chapterComplete(){ return campaign() ? campaignState().complete : S.chapterDone; }
function campaignQuest(){ const st=campaignState(), qs=campaign().quests; const n=qs.findIndex(q=>!q.test(st)); return n<0?qs.length-1:n; }

function campaignNpcs(){
  if(scene === "academy") return [{id:"xunyu",cn:"荀彧",en:"Xun Yu",pal:"xunyu",x:12,y:5,dir:"down"}];
  return [{id:"xunyu",cn:"荀彧",en:"Xun Yu",pal:"xunyu",x:12,y:7,dir:"down"},
    {id:"dianwei",cn:"典韋",en:"Dian Wei",pal:"dianwei",x:8,y:10,dir:"down"},
    {id:"guojia",cn:"郭嘉",en:"Guo Jia",pal:"guojia",x:16,y:5,dir:"down"},
    {id:"xuchu",cn:"許褚",en:"Xu Chu",pal:"xuchu",x:18,y:14,dir:"down"}];
}

function startChapter(number){
  if(!CAMPAIGNS[number]) return;
  closePanel(); closeMenus(); clearInterval(typing); show("#dbox",false);
  S.chapter=number; S.campaigns ||= {}; campaignState();
  if(!S.unlockedCities.includes(campaign().city)) S.unlockedCities.push(campaign().city);
  scene=chapterCity(); lastQuest=-1; MODE="world";
  enterGameShell(); placeP(12,15,"up"); FOLLOW.active=hasDun();
  markDirty(); syncHUD(); autoSave();
  say({cn:"曹操",en:"Cao Cao",pal:"caocao"},campaign().opening,()=>talkCampaignNpc({id:"xunyu"}));
}

function talkCampaignNpc(n){
  const c=campaign(),st=campaignState();
  if(n.id==="xunyu"){
    if(!st.briefed) return say({cn:"荀彧",en:"Xun Yu",pal:"xunyu"}, S.chapter===2 ? [
      {en:"Welcome to Yanzhou, my lord.",zh:"主公，兗州的百姓正等著我們。"},
      {en:"Visit the Academy. Then meet Dian Wei and Guo Jia.",zh:"先到學堂學習，再去見典韋與郭嘉。"},
      {en:"We will check the food and guard the city.",zh:"備好糧草、守好城門，才算真正站穩腳步。"}
    ]:[{en:"Welcome to our new city, my lord.",zh:"主公，許都的告示需要重新整理。"},
      {en:"Please read the signs and help the people.",zh:"這一章從生活單字與簡單規則開始，幫居民解決小問題。"},
      {en:"Take one small step at a time.",zh:"城裡全部是基礎題。先學會一個重點，再做幾題，不用急。"}],()=>{st.briefed=true;markDirty();syncHUD();autoSave();});
    if(scene==="academy") return openAcademyMenu();
    return say({cn:"荀彧",en:"Xun Yu",pal:"xunyu"},[{en:"One step at a time, my lord.",zh:currentQuests()[questState()].d}],()=>{});
  }
  if(S.chapter===2 && n.id==="dianwei" && !S.recruited.includes("dianwei")){
    if(!S.lessons.g5) return campaignHint("典韋","dianwei","先到學堂學會 There is / There are，再來和我巡城。 ");
    return say({cn:"典韋",en:"Dian Wei",pal:"dianwei"},[{en:"There is a guard at every gate.",zh:"每個城門都要有人守。主公能看懂巡城報告嗎？"}],()=>runCampaignQuiz("招募典韋",DW_Q,2,()=>{S.recruited.push("dianwei");addRes(0,0,400);},"典韋加入！兵力 +400。"));
  }
  if(S.chapter===2 && n.id==="guojia" && !S.recruited.includes("guojia")){
    if(!S.lessons.g6) return campaignHint("郭嘉","guojia","先學會現在簡單式，再來討論每天的軍營安排。");
    return say({cn:"郭嘉",en:"Guo Jia",pal:"guojia"},[{en:"A good plan starts with daily habits.",zh:"好的計畫，要從每天的安排開始。主公，來試三句簡單英文吧。"}],()=>runCampaignQuiz("招募郭嘉",GJ_Q,2,()=>{S.recruited.push("guojia");addRes(50,0,0);},"郭嘉加入！金錢 +50。"));
  }
  if(n.id==="xuchu") return campaignHint("許褚","xuchu","練兵場在我身後。城裡先做基礎題，答錯會有解析，也可以重試。");
  return campaignHint(n.id==="dianwei"?"典韋":"郭嘉",n.id,S.chapter===3?"先看懂告示、問清楚可不可以，再一起幫忙。這樣城裡就更安全了。":"守城不是一個人的事，末將會和主公一起努力。");
}
function campaignHint(cn,pal,zh){say({cn,pal},[{en:"We are ready to help, my lord.",zh}]);}

function campaignResult(title,text,button,on){
  panel("📜",title,"Town · Basic practice",'<div class="result"><div class="rk">'+(campaign()?"Chapter "+S.chapter:"Campaign")+'</div><div class="rbig" style="font-size:28px">'+title+'</div><p class="rsub">'+text+'</p><div class="row center"><button class="btn big" id="cp-action">'+button+'</button><button class="btn ghost" id="cp-close">回到城鎮</button></div></div>');
  document.getElementById("cp-action").addEventListener("click",on);
  document.getElementById("cp-close").addEventListener("click",closePanel);
}
function runCampaignQuiz(title,questions,pass,onPass,reward){
  panel("📖",title,"基礎題 · 答錯有解析 · 不扣資源",'<p class="note">共 '+questions.length+' 題，答對 '+pass+' 題即可完成。每題只練一個重點，可隨時離開後重試。</p><div class="sheet"><div id="cp-quiz"></div></div>');
  quizBlock(document.getElementById("cp-quiz"),questions,(correct,total)=>{
    const ok=correct>=pass;
    if(ok){onPass();addExp(30);markDirty();syncHUD();autoSave();SFX.fanfare();}
    campaignResult(ok?"任務完成":"再練一次就好",correct+" / "+total+"。"+(ok?reward+" EXP +30。":"答錯不扣資源。可以先回學堂看看，再來試。"),ok?"查看下一步":"再試一次",ok?()=>{closePanel();openCampaignLog();}:()=>runCampaignQuiz(title,questions,pass,onPass,reward));
  });
}
function openCampaignRecruit(){
  if(S.chapter===3){
    const st=campaignState();
    if(st.signs) return campaignResult("告示已修好","城裡的規則更清楚了。可回學堂繼續下一課。","查看任務",openCampaignLog);
    if(!S.lessons.u3words||!S.lessons.u3command) return campaignResult("先學會怎麼說規則","到學堂修完生活單字與祈使句，再來修告示。","前往課程",openAcademyMenu);
    return runCampaignQuiz("告示修復",SIGNS_Q,2,()=>{st.signs=true;addRes(30,0,0);},"告示修復完成！金錢 +30。");
  }
  panel("🏛️","兗州招賢館","Recruitment Hall",'<p class="note">典韋在城內西南方；郭嘉在城內東北方。先修對應課程，再和本人交談招募。</p><div class="row"><button class="btn" id="cp-party">查看隊伍</button><button class="btn ghost" id="cp-log">查看任務</button></div>');
  document.getElementById("cp-party").addEventListener("click",openParty);
  document.getElementById("cp-log").addEventListener("click",()=>{closePanel();openCampaignLog();});
}
function openCampaignTraining(){
  const st=campaignState();
  if(S.chapter===2&&!st.supplies){
    if(!S.lessons.g7) return campaignResult("先學會 have / has","讀懂誰有什麼，才能清點糧草。","前往課程",openAcademyMenu);
    return runCampaignQuiz("備齊糧草",SUPPLY_Q,2,()=>{st.supplies=true;addRes(0,80,0);},"糧草備妥！糧食 +80。");
  }
  if(S.chapter===3&&!st.permission){
    if(!S.lessons.u3lets||!S.lessons.u3can) return campaignResult("先學會邀請與詢問","修完 Let's 與 can，再來練簡單對話。","前往課程",openAcademyMenu);
    return runCampaignQuiz("借書與同行",PERMISSION_Q,2,()=>{st.permission=true;addRes(0,30,0);},"居民順利借到書！糧食 +30。");
  }
  return openTraining(true);
}
function campaignRequirements(){return campaign().quests.slice(0,-2).map(q=>({t:q.t,d:q.d,ok:!!q.test(campaignState())}));}
function openCampaignExam(){
  const reqs=campaignRequirements();
  if(!reqs.every(r=>r.ok)) return campaignResult("先完成城鎮任務",reqs.filter(r=>!r.ok).map(r=>r.d).join("<br>"),"查看任務",()=>{closePanel();openCampaignLog();});
  const st=campaignState(),questions=campaign().final,need=S.chapter===2?4:6;
  if(st.complete) return campaignResult("本章已通過","最佳成績 "+st.best+" / "+questions.length+"。可重做基礎題，首通獎勵只領一次。","基礎複習",()=>runCampaignFinal(questions,need));
  campaignResult(S.chapter===2?"守住兗州":"城鎮生活小測驗","全部是基礎題，每題都有白話解析。共 "+questions.length+" 題，答對 "+need+" 題過關。","開始作答",()=>runCampaignFinal(questions,need));
}
function runCampaignFinal(questions,need){
  const st=campaignState();
  panel("📝",S.chapter===2?"守城基礎測驗":"城鎮生活小測驗","Town · Basic questions only",'<p class="note">答對 '+need+' / '+questions.length+' 即可過關。沒有計時，答錯不扣兵力或資源。</p><div class="sheet"><div id="cp-final"></div></div>');
  quizBlock(document.getElementById("cp-final"),questions,(c,n)=>{
    st.best=Math.max(st.best||0,c); st.attempts=(st.attempts||0)+1;
    const pass=c>=need,first=pass&&!st.complete;
    if(first){st.complete=true;addExp(80);addRes(100,100,0);SFX.fanfare();}
    markDirty();syncHUD();autoSave();
    campaignResult(pass?"第"+S.chapter+"章完成":"再複習一次",c+" / "+n+"。"+(first?"首通獎勵：EXP +80、金錢 +100、糧食 +100。":pass?"複習完成！首通獎勵已領取。":"不用急，看看解析，再到學堂複習。"),pass&&S.chapter===2?"前往第三章":pass?"查看任務":"再試一次",pass&&S.chapter===2?()=>startChapter(3):pass?()=>{closePanel();openCampaignLog();}:()=>runCampaignFinal(questions,need));
  });
}
function openCampaignGate(){
  if(MODE==="panel"||topMenu())return;
  if(!campaignState().complete) return campaignResult("先把城裡的事做好",currentQuests()[questState()].d,"查看任務",()=>{closePanel();openCampaignLog();});
  if(S.chapter===2) return campaignResult("兗州已安定","典韋、郭嘉與軍隊會一起前往許都，接續第三章的城鎮基礎任務。","前往第三章",()=>startChapter(3));
  campaignResult("許都新規・基礎篇完成","城鎮基礎任務已完成。回學堂看看重點，或到練兵場再練幾題吧。","回學堂複習",openAcademyMenu);
}
function openCampaignLog(){
  closePanel();
  const st=campaignState(),qs=campaign().quests;
  pushMenu({host:"layer",title:"任務　QUESTS",sub:"Chapter "+S.chapter+" · "+campaign().cn,
    msg:'<p style="color:var(--goldhi)">目前：'+qs[questState()].t+'</p><div style="font-size:13px;line-height:1.9">'+qs.slice(0,-1).map(q=>'<div style="color:'+(q.test(st)?'var(--jade)':'var(--t2)')+'">'+(q.test(st)?'✓ ':'○ ')+q.t+'<div style="font-size:11px">'+q.d+'</div></div>').join('')+'</div><p class="note">本章任務都在城鎮內完成，題目都是基礎練習。'+(st.best!=null?' 本章最佳 '+st.best+' / '+campaign().final.length:'')+'</p>',
    items:[{label:"回到遊戲",on:closeMenus}],onCancel:closeMenus});
}
function openChapterTravel(){
  closeMenus();
  pushMenu({host:"layer",title:"章節　CHAPTERS",sub:"沿著旅程前進",items:[
    {label:"第一章・陳留起兵",sub:"代名詞與 be 動詞",on:()=>travelToChapter(1)},
    {label:"第二章・兗州立足",sub:"巡城、招募典韋與郭嘉、守城",disabled:!S.chapterDone,on:()=>travelToChapter(2)},
    {label:"第三章・許都新規",sub:"Unit 3・城鎮基礎題",disabled:!(S.campaigns[2]&&S.campaigns[2].complete),on:()=>travelToChapter(3)},
    {label:"返回",on:closeMenus}],note:"進度會保留。先完成前一章，再前往下一章。",onCancel:closeMenus});
}
function travelToChapter(n){
  if(n>1&&!(n===2?S.chapterDone:S.campaigns[2]&&S.campaigns[2].complete))return;
  closeMenus();closePanel();S.chapter=n;lastQuest=-1;scene=chapterCity();
  placeP(12,15,"up");FOLLOW.active=hasDun();enterGameShell();markDirty();syncHUD();autoSave();
  if(campaign()&&!campaignState().briefed) say({cn:"曹操",en:"Cao Cao",pal:"caocao"},campaign().opening,()=>talkCampaignNpc({id:"xunyu"}));
}
