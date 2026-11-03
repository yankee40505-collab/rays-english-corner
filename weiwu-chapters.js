"use strict";

/* Chapters share the original movement, artwork, lessons and save slots. */
const basicQ = (q, o, a, w) => ({ q, o, a, w, difficulty:"basic" });
const lessonPage = (t, idea, formula, examples, tip) => ({t, h:
  '<div class="box"><span class="k">先這樣想</span><p>' + idea + '</p></div>' +
  '<div class="box"><span class="k">句子怎麼排</span><p class="fl">' + formula + '</p></div>' +
  examples.map(e => '<p class="fl">' + e[0] + '</p><p class="note">' + e[1] + '</p>').join("") +
  '<div class="mist"><div class="mh">記住這一點就好</div><p style="margin:0;padding:12px 14px">' + tip + '</p></div>'
});

/* ── 城與城之間的行軍道路 ── */
const ROAD_MAP = [
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "sssssssssssssssssssssssss",
  "rrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrG",
  "rrrrrrrrrrrrrrrrrrrrrrrrr",
  "rrrrrrrrrrrrrrrrrrrrrrrrr",
  "ggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggg"
];

SCENES.road = {map:ROAD_MAP,solid:"sg#",bg:null,label:"Yellow Turban Battlefield",cn:"黃巾戰道"};

/* Generated project art: the procedural scene remains as a loading fallback. */
const ROAD_BG_ART = new Image();
ROAD_BG_ART.onload = () => {
  if(SCENES.road && typeof buildRoad === "function") SCENES.road.bg = buildRoad();
};
ROAD_BG_ART.src = "assets/road-yellow-turban-v2.png";

const YELLOW_TURBAN_ART = new Image();
YELLOW_TURBAN_ART.src = "assets/yellow-turban-soldier-v2.png";

const BATTLE_CHAR_ART = {};
Object.entries({
  caocao:"assets/cao-cao-battle-v2.png",
  xiahoudun:"assets/xiahou-dun-battle-v2.png",
  dianwei:"assets/dian-wei-battle-v2.png",
  guojia:"assets/guo-jia-battle-v2.png",
  xunyu:"assets/xun-yu-battle-v2.png",
  xuchu:"assets/xu-chu-battle-v2.png"
}).forEach(([key,src])=>{
  const img=new Image();
  img.onload=()=>{ if(key==="caocao"&&typeof paintFace==="function") paintFace(document.getElementById("hudface"),"caocao",1.05); };
  img.src=src; BATTLE_CHAR_ART[key]=img;
});

const JOURNEYS = {
  "1-2":{
    from:1,to:2,fromCn:"陳留",toCn:"兗州",title:"兗州平黃巾",year:"初平三年（192）",
    enemyCn:"青州黃巾",enemyEn:"Qingzhou Yellow Turban",
    allies:["xiahoudun"],
    history:"青州黃巾進入兗州，刺史劉岱戰死。曹操受迎領兗州，擊破黃巾並收編精銳為青州兵。",
    review:["g1","g2","g3","g4"]
  },
  "2-3":{
    from:2,to:3,fromCn:"兗州",toCn:"許都",title:"汝潁討黃巾",year:"建安元年（196）",
    enemyCn:"黃巾餘部",enemyEn:"Yellow Turban Remnant",
    allies:["xiahoudun","dianwei","guojia"],
    history:"曹操進軍汝南、潁川，擊破何儀、劉辟、黃邵等黃巾餘部；同年迎漢獻帝都許。",
    review:["y2command","y2lets","y2can","y2or","y2object"]
  }
};

const ROAD_ENCOUNTER_POSITIONS = [
  {x:3,y:12},{x:5,y:13},{x:7,y:11},{x:9,y:13},{x:11,y:12},
  {x:13,y:11},{x:15,y:13},{x:17,y:12},{x:19,y:11},{x:21,y:13}
];

function journey(){ return S && S.journeyKey ? JOURNEYS[S.journeyKey] : null; }
function roadQuestions(route=journey()){
  if(!route) return [];
  const sets=route.review.map(id=>TRAIN_Q[id]||[]),review=[],max=Math.max(0,...sets.map(q=>q.length));
  for(let i=0;i<max;i++) sets.forEach(q=>{ if(q[i]) review.push(q[i]); });
  const final=route.from===1?EXAM_Q:(CAMPAIGNS[route.from]?CAMPAIGNS[route.from].final:[]);
  const count=ROAD_ENCOUNTER_POSITIONS.length,pool=[...review.slice(0,count-2),...final.slice(0,2)];
  return Array.from({length:count},(_,i)=>pool[i%pool.length]);
}
function journeyState(){
  if(!journey()) return null;
  S.journeys ||= {};
  return S.journeys[S.journeyKey] ||= {cleared:[],complete:false};
}
function beginJourney(from,to){
  const key=from+"-"+to;
  if(!JOURNEYS[key]) return startChapter(to);
  closePanel(); closeMenus(); clearInterval(typing); show("#dbox",false);
  S.journeyKey=key; S.journeys ||= {}; const st=journeyState(),route=journey(),brief=!st.briefed;
  st.briefed=true;
  scene="road"; MODE="world"; lastQuest=-1;
  enterGameShell(); placeP(1,13,"right"); FOLLOW.active=false;
  markDirty(); syncHUD(); autoSave();
  if(brief) setTimeout(()=>say({cn:"軍報",en:"Campaign Record",pal:"caocao"},[
    {en:route.year+" — "+route.title,zh:route.year+"，"+route.title+"。"},
    {en:"Historical setting",zh:route.history},
    {en:"Your generals will hold the background line. Defeat the ten main enemies yourself.",zh:"同行武將會牽制背景敵兵；你要親自擊退十名"+route.enemyCn+"主力，才能打開右側城門。"}
  ]),260);
}
function roadNpcs(){
  const route=journey(),st=journeyState();
  if(!st) return [];
  return ROAD_ENCOUNTER_POSITIONS.map((p,i)=>({id:"road-soldier-"+i,cn:route.enemyCn,en:route.enemyEn,pal:"yellowturban",encounter:i,x:p.x,y:p.y,dir:"left"}))
    .filter(n=>!st.cleared.includes(n.encounter));
}
function talkRoadSoldier(n){
  return say({cn:n.cn,en:n.en,pal:"yellowturban"},[
    {en:"The Yellow Turbans control this road!",zh:"蒼天已死，黃天當立！這條路由黃巾軍把守！"},
    {en:"Give the correct English command to break through.",zh:"答對英文號令就能擊退我；答錯不扣兵力或糧食。"}
  ],()=>runRoadEncounter(n.encounter));
}
function runRoadEncounter(index){
  const route=journey(),questions=roadQuestions(route);
  if(!route) return;
  panel("🟡",route.enemyCn+"來襲",route.year+" · "+(index+1)+" / "+questions.length,
    '<p class="note">用正確的英文號令擊退這名'+route.enemyCn+'。答錯會看到解析，而且不扣任何資源。</p><div class="sheet"><div id="road-quiz"></div></div>');
  quizBlock(document.getElementById("road-quiz"),[questions[index]],correct=>finishRoadEncounter(index,correct));
}
function roadResult(title,text,button,on){
  panel("⚔️",title,"Historical Campaign",'<div class="result"><div class="rk">'+(journey()?journey().year:'Historical Campaign')+'</div><div class="rbig" style="font-size:28px">'+title+'</div><p class="rsub">'+text+'</p><div class="row center"><button class="btn big" id="road-action">'+button+'</button><button class="btn ghost" id="road-close">返回戰場</button></div></div>');
  document.getElementById("road-action").addEventListener("click",on);
  document.getElementById("road-close").addEventListener("click",closePanel);
}
function finishRoadEncounter(index,correct){
  const st=journeyState();
  if(!st) return;
  if(correct<1){
    return roadResult("再戰一次","黃巾賊還守在路上。看看剛才的解析，再試一次；不扣兵力或資源。","重新下令",()=>runRoadEncounter(index));
  }
  if(!st.cleared.includes(index)){
    st.cleared.push(index); st.cleared.sort((a,b)=>a-b);
    markDirty(); syncHUD(); autoSave();
  }
  const remaining=roadNpcs().length;
  roadResult(remaining?"擊退黃巾賊":"黃巾戰道已平定",remaining?"戰場上還有 "+remaining+" 名黃巾賊。繼續往右推進。":"十名黃巾賊都已退開，前往右側城門。","繼續前進",closePanel);
}
function openJourneyGate(){
  const route=journey(),st=journeyState(),questions=roadQuestions(route);
  if(!route||!st) return;
  if(st.cleared.length<questions.length){
    return roadResult("戰鬥尚未結束","還有 "+(questions.length-st.cleared.length)+" 名黃巾賊沒有擊退。回到戰場完成討伐後再進城。","返回戰場",closePanel);
  }
  roadResult("抵達"+route.toCn,"從「"+route.fromCn+"」出發的行軍已完成。全隊平安抵達下一座城。","進入"+route.toCn,arriveJourney);
}
function arriveJourney(){
  const route=journey(),st=journeyState();
  if(!route||!st) return;
  st.complete=true;
  S.journeyKey=null;
  markDirty();
  startChapter(route.to);
}

function roadBattleAllies(){
  const route=journey();
  if(!S||!route) return [];
  return route.allies.filter(id=>S.recruited.includes(id));
}
function drawRoadSkirmishes(g){
  const remaining=roadNpcs().length,allies=remaining?roadBattleAllies():[];
  const spots=[{x:176,y:302},{x:432,y:310},{x:650,y:304}];
  allies.forEach((id,i)=>{
    const p=spots[i],phase=tick/7+i*2.2,hit=Math.sin(phase)>0.72;
    g.save(); g.globalAlpha=.82;
    drawActor(g,p.x+(hit?4:0),p.y,id,"right",1+(Math.floor(tick/7+i)%3),.76);
    drawActor(g,p.x+42-(hit?5:0),p.y,"yellowturban","left",1+(Math.floor(tick/8+i)%3),.78);
    if(hit){
      g.translate(p.x+22,p.y-27); g.rotate(Math.sin(phase)*.35);
      g.strokeStyle="#fff2a8"; g.lineWidth=3; g.beginPath(); g.moveTo(-8,-8); g.lineTo(8,8); g.moveTo(8,-8); g.lineTo(-8,8); g.stroke();
      g.fillStyle="#ffe066"; g.fillRect(-2,-14,4,5); g.fillRect(11,-2,5,4);
    }
    g.restore();
  });
}
const NEW_LESSONS = [
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
// The photographed syllabus belongs to Yanzhou, not the old g5–g7 unit.
// New IDs deliberately do not inherit mastery from the unrelated old lessons.
const YANZHOU_CURRICULUM = "imperatives-can-or-objects-v1";
const YANZHOU_LESSONS = [
  {id:"y2command",cn:"軍令與禮貌",en:"Imperatives",skill:"Clear Orders",desc:"原形動詞、稱呼逗號、please，以及 don't / never。",pages:[
    lessonPage("用原形動詞下指令","祈使句請對方做事，主詞 you 通常省略。動作直接用原形；要保持某種狀態就用 Be。","原形動詞… ／ Be ＋ 形容詞.",[["<b>Stand</b> here.","站在這裡。不是 Stands 或 Standing。"],["<b>Be</b> careful.","要小心。careful 是形容詞，前面需要 Be。"]],"即使對很多人說，也用原形。"),
    lessonPage("先叫名字，或最後再叫","稱呼語可以放指令前或後，都要用逗號隔開。名字不是這句的主詞。","人名, 原形動詞… ／ 原形動詞…, 人名.",[["<b>Ben,</b> sit down.","Ben，坐下。"],["Sit down<b>, Ben.</b>","把 Ben 移到句尾，意思一樣。"]],"不要因為有一個人的名字，就把 sit 改成 sits。"),
    lessonPage("please 與名字一起用","please 在動作前通常不加逗號；在句尾時前面要加逗號。稱呼語仍然用逗號隔開。","Please ＋ 原形… ／ 原形…, please.",[["Please wait here.","請在這裡等。Please 後不加逗號。"],["Ben, please wait here.","Ben，請在這裡等。"],["Ben, wait here, please.","名字在前，please 在後。"],["Please wait here, Ben.","please 在前，名字在後也可以。"]],"兩種逗號要分清楚：稱呼語必須隔開；句首 please 不必。"),
    lessonPage("不要做：don't / do not / never","在原形前加 do not 或 don't，就變成否定祈使句。never 表示『絕不要』，語氣更強。","Don't / Do not / Never ＋ 原形動詞.",[["<b>Don't run</b> here.","不要在這裡跑。Do not run 語氣較正式。"],["<b>Never leave</b> the gate open.","絕不要讓城門開著。"],["Please <b>don't be</b> noisy.","請不要吵。否定 Be quiet 這類句子時，仍要保留 be。"]],"Please don't open it. 是祈使句；不是 Please not open it.")
  ],check:[
    basicQ("_____ careful at the gate.",["Be","Is","Are"],0,"形容詞 careful 前用原形 Be。"),
    basicQ("哪一句的稱呼與逗號正確？",["Ben open the door.","Ben, open the door.","Ben, opens the door."],1,"稱呼 Ben 用逗號隔開，open 保持原形。"),
    basicQ("哪一句 please 的位置與標點正確？",["Please, wait here.","Wait here please.","Wait here, please."],2,"本課句型中，句尾 please 前加逗號。"),
    basicQ("Please _____ run here.（請不要跑。）",["don't","not","not to"],0,"祈使句的否定用 don't ＋ 原形。"),
    basicQ("Never _____ the gate open.",["leaves","leave","leaving"],1,"never 後接原形 leave，表示絕不要讓城門開著。")
  ]},
  {id:"y2lets",cn:"一起守城",en:"Let's / Let's not",skill:"Act Together",desc:"Let's ＋ 原形；Let's not ＋ 原形；形容詞前加 be。",pages:[
    lessonPage("自己也加入的邀請","Let's 是 let us 的縮寫，在本課用來邀大家一起做，包含說話的人。","Let's ＋ 原形動詞.",[["<b>Let's help</b> the guards.","我們一起幫守衛吧。"],["<b>Let's go</b> to the gate.","我們一起去城門吧。"]],"不加 to，也不加 s：Let's go，不是 Let's to go。"),
    lessonPage("一起保持某種狀態","quiet、nice、careful 是形容詞。Let's 後面要先用原形 be。","Let's be ＋ 形容詞.",[["<b>Let's be</b> quiet.","我們一起保持安靜吧。"],["<b>Let's be</b> nice to them.","我們對他們友善一點吧。"]],"Let's be，不是 Let's are。"),
    lessonPage("Let's not，不是 Let's don't","邀大家一起不要做，在 Let's 後面直接加 not。跟叫別人不要做的 Don't 不同。","Let's not ＋ 原形動詞.",[["<b>Let's not open</b> it.","我們不要打開它吧。"],["<b>Let's not be</b> noisy.","我們不要吵吧。"],["<b>Don't open</b> it.","你不要打開它。這是祈使句。"]],"Please don't open it. ／ Let's not open it. 分清楚兩種否定。")
  ],check:[
    basicQ("Let's _____ the guards.",["help","helps","to help"],0,"Let's 後接原形 help。"),
    basicQ("Let's _____ open it.（我們不要打開它吧。）",["don't","not","not to"],1,"Let's 的否定是 Let's not。"),
    basicQ("Let's _____ quiet.",["are","is","be"],2,"形容詞 quiet 前要有 be，且用原形。")
  ]},
  {id:"y2can",cn:"能力與許可",en:"Can / Can't",skill:"Ask and Answer",desc:"直述句、肯否問答、Wh- 問句，以及 can't 的推測。",pages:[
    lessonPage("任何主詞都用 can ＋ 原形","can 可以說『會』，也可以說『可以』。否定常用 can't，完整形式通常寫 cannot。","主詞 ＋ can / can't ＋ 原形動詞.",[["She <b>can ride</b> a horse.","她會騎馬。She 後也不用 rides。"],["You <b>can't enter</b> now.","你現在不可以進去。這裡是許可，不是能力。"]],"can 不隨人稱改變，後面不加 to。"),
    lessonPage("Can 問，can 回答","把 Can 放在主詞前，問對方會不會、可不可以。回答時代名詞要跟著問答角色改變。","Can ＋ 主詞 ＋ 原形…? ／ Yes, 代名詞 can. ／ No, 代名詞 can't.",[["Can I enter? — <b>Yes, you can.</b>","我可以進來嗎？可以，你可以。"],["Can she swim? — <b>No, she can't.</b>","她會游泳嗎？不，她不會。"]],"回答 Can you…? 時，你要說 I can / I can't。"),
    lessonPage("否定問句也照事實回答","本課的否定問句用 Can't ＋ 主詞起首，不把 Can not 整組放在主詞前。回答以實際能不能為準。","Can't ＋ 主詞 ＋ 原形…?",[["Can't you swim? — <b>Yes, I can.</b>","你不會游泳嗎？我會。能做到，仍然用 Yes。"],["Can't he ride? — <b>No, he can't.</b>","他不會騎嗎？他不會。不能做到，就用 No。"]],"不要照中文的『對／不是』直翻，要看英文回答是能還是不能。"),
    lessonPage("Wh- 問句：想知道什麼？","疑問詞放最前面，後面接 can / can't ＋ 主詞 ＋ 原形。回答要給對應的資訊。","疑問詞 ＋ can / can't ＋ 主詞 ＋ 原形…?",[["<b>What can</b> he do? — He can read.","他會做什麼？他會閱讀。"],["<b>Where can</b> we wait? — We can wait here.","我們可以在哪裡等？可以在這裡等。"],["<b>Why can't</b> I enter? — The gate is closed.","為什麼我不能進入？城門關了。"]],"What can he do? 問動作，不是回答 Yes 或 No。"),
    lessonPage("can't be：不可能是","can't 不只是不會，也能根據線索推測『不可能』。be 後面可以接人或狀態。","主詞 ＋ can't be…",[["He is in the city. He <b>can't be</b> at this gate.","他在城裡，不可能在這個城門口。"]],"依情境判斷：can't swim 是不會游泳；can't be 是不可能是／在。")
  ],check:[
    basicQ("She can _____ a horse.",["ride","rides","to ride"],0,"can 後接原形 ride，任何人稱都一樣。"),
    basicQ("Can I wait here? — Yes, _____.",["I am","you can","he can"],1,"對方問『我可以嗎』，回答『你可以』。"),
    basicQ("你確實會游泳。Can't you swim? — _____",["No, I can.","Yes, I can't.","Yes, I can."],2,"實際會做就回答 Yes, I can.，不被否定問句影響。"),
    basicQ("_____ he ride?（他不會騎嗎？）",["Can't","Can not","Isn't"],0,"本課否定問句以 Can't 起首，不用 Can not 起首。"),
    basicQ("He can read. 問『他會做什麼？』要說：",["Where can he read?","What can he do?","Can he read?"],1,"What can he do? 問能力的內容。"),
    basicQ("Ben is away. He can't be the man at this gate. 依線索推測，can't be 是：",["不准成為","一定是","不可能是"],2,"Ben 不在這裡，因此推測眼前的人不可能是他；can't be 表示『不可能是』。")
  ]},
  {id:"y2or",cn:"選擇與提醒",en:"Or",skill:"Make Choices",desc:"對等連接、選擇問答、就近一致、否定與『否則』。",pages:[
    lessonPage("連接同類的選項","or 是對等連接詞，兩邊可以是名詞、形容詞或相同功能的片語。","名詞 or 名詞 ／ 形容詞 or 形容詞 ／ 片語 or 片語",[["Tea <b>or</b> water?","茶還是水？兩邊都是名詞。"],["Is he tired <b>or</b> hungry?","他累了還是餓了？兩邊都是形容詞。"],["Is it behind <b>or</b> in front of the house?","它在房子後面還是前面？兩邊都是地方片語。"]],"先找 or 兩邊是否在表達同一類的選項。"),
    lessonPage("選擇問句，要選一項","問 A 還是 B，通常直接說選哪個，而不是只答 Yes / No。","A or B? → 回答其中一項.",[["Are you a guard or a cook? — <b>A cook.</b>","你是守衛還是廚師？是廚師。"]],"Yes 並沒有告訴對方你選了哪一項。"),
    lessonPage("be 動詞看最近的主詞","當 or 連接兩個主詞，本課用靠近 be 動詞的主詞決定形式。注意問句和直述句的順序不同。","Be ＋ 主詞₁ or 主詞₂…? ／ 主詞₁ or 主詞₂ ＋ be…",[["<b>Are you</b> or I the guide?","問句中 Are 最近的是 you，所以用 Are。"],["You or <b>I am</b> the guide.","直述句中 am 最近的是 I，所以用 am。"]],"這是課本的就近一致句型；實際溝通也可以改寫句子，避免拗口。"),
    lessonPage("否定中的 or：兩件都不做","Don't…or… 在這個句型中把兩個動作一起否定，不是選一個禁止。","Don't ＋ 動作 A ＋ or ＋ 動作 B.",[["Don't eat <b>or</b> drink here.","在這裡不要吃，也不要喝。"]],"不是『只要不吃，就可以喝』。"),
    lessonPage("連接句子：否則","or 也能連接兩個句子。前面提出提醒，後面說不照做的結果，意思是『否則』。","句子, or（否則）句子.",[["Be careful, <b>or</b> you can get hurt.","要小心，否則你可能受傷。"]],"先看 or 兩邊：選項常是『或者』；提醒加後果常是『否則』。")
  ],check:[
    basicQ("Is it behind _____ in front of the house?",["or","with","not"],0,"or 連接兩個表示位置的片語。"),
    basicQ("A guard or a cook? — _____",["Yes.","A cook.","No."],1,"選擇問句直接選一項。"),
    basicQ("_____ you or I the guide?",["Am","Is","Are"],2,"問句中 be 最近的主詞是 you，用 Are。"),
    basicQ("You or I _____ the guide.",["am","are","is"],0,"直述句中 be 最近的主詞是 I，用 am。"),
    basicQ("Don't eat or drink here. 意思是：",["只能選一個做","兩件事都不要做","兩件事都可以做"],1,"Don't…or… 同時否定兩個動作。"),
    basicQ("Be careful, or you can get hurt. 的 or 是：",["和","但是","否則"],2,"前面提醒，後面是不照做的結果，or＝否則。")
  ]},
  {id:"y2object",cn:"把糧草交給誰？",en:"Object Pronouns",skill:"Help the People",desc:"七個受格、動詞與介系詞受詞、It's me 與代名詞位置。",pages:[
    lessonPage("主格做動作，受格接受動作","代名詞的中文意思可能一樣，但英文形式依功能改變。","I→me ／ you→you ／ he→him ／ she→her ／ it→it ／ we→us ／ they→them",[["<b>He</b> helps <b>me</b>.","他幫我。He 做動作，me 是 help 的受詞。"],["Please help <b>them</b>.","請幫助他們。them 是 they 的受格。"]],"you 和 it 的主格、受格長得一樣。"),
    lessonPage("一般動詞與介系詞的受詞","help、see 等一般動詞後的受詞用受格；with、for 等介系詞後也一樣。","動詞 / 介系詞 ＋ 受格",[["I can see <b>her</b>.","我能看見她。see 後用 her，不用 she。"],["Come with <b>us</b>.","和我們一起來。with 後用 us，不用 we。"],["Read the sign for <b>him</b>.","替他讀告示。for 後用 him。"]],"替換名詞時，看它在句子裡的功能，不只看中文。"),
    lessonPage("It's me：口語中的主詞補語","有人問『是誰？』，日常對話常用 It's me 回答。這裡 me 不是動作的受詞，而是補充說明主詞的補語。","Who is it? — It's me.",[["Who is it? — <b>It's me</b>, Ben.","是誰？是我，Ben。"]],"課本採常見口語 It's me；不要誤以為所有受格都只能跟在一般動詞後。"),
    lessonPage("代名詞放在兩個字中間","wake up、turn off 這類可分開的片語動詞，受詞是代名詞時放中間。","wake ＋ him / her / them ＋ up ／ turn ＋ it / them ＋ off",[["Wake <b>them</b> up.","叫醒他們。不是 Wake up them。"],["Turn <b>it</b> off.","把它關掉。不是 Turn off it。"]],"記住一整組：wake them up、turn it off。")
  ],check:[
    basicQ("Please help _____.（請幫助我。）",["me","I","my"],0,"help 的受詞用 me。"),
    basicQ("Come with _____.（跟我們來。）",["we","us","our"],1,"with 是介系詞，後面的『我們』用 us。"),
    basicQ("Who is it? — It's _____.（是我。）",["my","mine","me"],2,"常見口語用 It's me，me 在這裡當主詞補語。"),
    basicQ("叫醒他們：哪一句正確？",["Wake them up.","Wake up them.","Wake they up."],0,"代名詞受詞 them 放在 wake 與 up 中間。"),
    basicQ("Turn _____ off.（把它關掉。）",["he","it","they"],1,"it 指它，放在 turn 和 off 中間。")
  ]}
].map(l=>({...l,chapter:2,tier:"main",tag:"第二章・課本範圍"}));
// Retain the next city's existing content as application/review, without guessing a new syllabus.
const ACTIVE_NEW_LESSONS = [...YANZHOU_LESSONS,...NEW_LESSONS.filter(l=>l.chapter===3)];
LESSONS.push(...ACTIVE_NEW_LESSONS);
ACTIVE_NEW_LESSONS.forEach(l => { TRAIN_Q[l.id] = l.check; });

const DW_Q = YANZHOU_LESSONS[0].check.slice(0,3);
const GJ_Q = [YANZHOU_LESSONS[1].check[1],...YANZHOU_LESSONS[2].check.slice(0,2)];
const SUPPLY_Q = [YANZHOU_LESSONS[3].check[1],...YANZHOU_LESSONS[4].check.slice(0,2)];
const SIGNS_Q = [basicQ("_____ quiet, please.",["Be","Is","Are"],0,"叫人安靜：Be quiet。"),basicQ("_____ fight here.（不要打架。）",["Not","Don't","Isn't"],1,"不要做：Don't ＋ 原形。"),basicQ("Please _____ the rules.",["follows","following","follow"],2,"please 後面接原形 follow。")];
const PERMISSION_Q = [basicQ("Let's _____ together.",["go","goes","to go"],0,"Let's 後用原形 go。"),basicQ("Can I use this book? — Yes, _____.",["I am","you can","he is"],1,"對方問『我可以嗎』，回答『你可以』：you can。"),basicQ("He can't _____ here.",["runs","to run","run"],2,"can't 後用原形 run。")];
const C2_FINAL = YANZHOU_LESSONS.flatMap(l=>l.check.slice(-2));
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
  2:{cn:"兗州立足",en:"A Home in Yanzhou",city:"yanzhou",cityCn:"兗州・鄄城",tone:"#294b52", lessons:YANZHOU_LESSONS.map(l=>l.id), final:C2_FINAL,
    opening:[{en:"From 192 to 196, Yanzhou became our foundation.",zh:"初平三年至建安元年（192–196），曹操在兗州立足，又經歷叛亂與收復。"},{en:"Juancheng is our base in Yanzhou.",zh:"兗州是一個州域；這張城鎮地圖以鄄城據點為主題，不代表整個兗州。"},{en:"Let us guard the city and help the people.",zh:"讀懂軍令、協力守城、安置百姓。場景與教學任務為遊戲化設計，並非古城復原。"}],
    quests:[
      cq("c2-arrive","初入兗州","找荀彧，了解城裡的情況。",s=>s.briefed,{x:28,y:15}),
      cq("c2-scout","軍令第一課","到鄄城學舍學會祈使句、please、稱呼與否定。",()=>S.lessons.y2command,{x:10,y:8}),
      cq("c2-dianwei","興平元年・典韋效力","到底層找典韋，完成三題軍令練習。",()=>S.recruited.includes("dianwei"),{x:12,y:25}),
      cq("c2-lets","一起守城","到鄄城學舍學會 Let's / Let's not。",()=>S.lessons.y2lets,{x:10,y:8}),
      cq("c2-can","能力與許可","到鄄城學舍學會 can / can't 的句型與問答。",()=>S.lessons.y2can,{x:10,y:8}),
      cq("c2-guojia","荀彧薦才・郭嘉","到上層找郭嘉，完成三題邀請與許可題。",()=>S.recruited.includes("guojia"),{x:38,y:8}),
      cq("c2-or","守城的選擇","到鄄城學舍學會 or 的選擇、就近一致與否則。",()=>S.lessons.y2or,{x:10,y:8}),
      cq("c2-object","把糧草交給誰？","到鄄城學舍學會七個受格與代名詞位置。",()=>S.lessons.y2object,{x:10,y:8}),
      cq("c2-supply","備齊糧草","到軍需營，完成選擇與受格補給任務。",s=>s.supplies,{x:36,y:25}),
      cq("c2-defend","守住兗州","到守城議事堂，完成五單元共十題測驗。",s=>s.complete,{x:23,y:15}),
      cq("c2-clear","第二章完成・兗州立足","到底層南門，前往第三章「許都新規」。",()=>false,{x:25,y:28})
    ]},
  3:{cn:"許都新規",en:"Rules of the City",city:"xuchang",cityCn:"許都",tone:"#554328",lessons:["u3words","u3command","u3lets","u3can","u3or","u3object"],final:C3_FINAL,
    opening:[{en:"In 196, the emperor moved to Xu.",zh:"建安元年（196），漢獻帝遷都許縣；遊戲以「許都」稱呼此處，不把後來的許昌縣名提前套用。"},{en:"Read the notices. Help the people.",zh:"這裡以官署與告示街區為主題，任務重點是居民對話，不同於鄄城的守城軍務。"},{en:"Use what you learned in Yanzhou.",zh:"先保留原有生活單字與應用複習；第三章的新課本範圍尚未指定。"}],
    quests:[
      cq("c3-arrive","許都的新告示","到中層找荀彧，接下城鎮生活任務。",s=>s.briefed,{x:28,y:15}),
      cq("c3-words","先看懂單字","到上層學堂認識 Unit 3 的生活單字。",()=>S.lessons.u3words,{x:10,y:8}),
      cq("c3-command","把規則說清楚","到上層學堂學會 Please / Be / Don't。",()=>S.lessons.u3command,{x:10,y:8}),
      cq("c3-signs","告示修復","到上層告示館，完成三題基礎告示題。",s=>s.signs,{x:40,y:8}),
      cq("c3-lets","我們一起來","到上層學堂學會 Let's / Let's not。",()=>S.lessons.u3lets,{x:10,y:8}),
      cq("c3-can","先問可不可以","到上層學堂學會 can / can't 和簡單問答。",()=>S.lessons.u3can,{x:10,y:8}),
      cq("c3-permission","借書與同行","到底層練兵場，完成三題基礎對話。",s=>s.permission,{x:36,y:25}),
      cq("c3-or","選一個就好","到上層學堂學會 or 的簡單選擇。",()=>S.lessons.u3or,{x:10,y:8}),
      cq("c3-object","互相幫忙","到上層學堂學會 me / him / us / them。",()=>S.lessons.u3object,{x:10,y:8}),
      cq("c3-review","城鎮生活小測驗","到中層考場，完成九題基礎複習。",s=>s.complete,{x:23,y:15}),
      cq("c3-clear","第三章完成・許都新規","城鎮基礎任務已完成，可以自由複習。",()=>false,null)
    ]}
};

Object.values(CAMPAIGNS).forEach(c=>c.quests.forEach(q=>{q.target=townPoint(q.target,c.city);}));
function campaign(){ return S && CAMPAIGNS[S.chapter] || null; }
function migrateYanzhouCurriculum(){
  const st=S.campaigns[2];
  if(!st||st.curriculum===YANZHOU_CURRICULUM) return;
  st.legacyBest=st.best??null;
  st.finalRewardClaimed=!!(st.finalRewardClaimed||st.complete);
  st.supplyRewardClaimed=!!(st.supplyRewardClaimed||st.supplies);
  st.complete=false;st.best=null;st.attempts=0;st.supplies=false;
  st.curriculum=YANZHOU_CURRICULUM;
  const road=S.journeys&&S.journeys["2-3"];
  if(road&&!road.complete) road.cleared=[];
}
function campaignState(){
  S.campaigns ||= {};
  migrateYanzhouCurriculum();
  return S.campaigns[S.chapter] ||= {briefed:false,complete:false,best:null,...(S.chapter===2?{curriculum:YANZHOU_CURRICULUM}:{})};
}
function currentQuests(){ return campaign() ? campaign().quests : QUESTS; }
function availableLessons(){ return LESSONS.filter(l => campaign() ? campaign().lessons.includes(l.id) : !l.chapter); }
function chapterCity(){ return campaign() ? campaign().city : "town"; }
function isTownScene(){ return scene === "town" || scene === "yanzhou" || scene === "xuchang"; }
function chapterComplete(){ return campaign() ? campaignState().complete : S.chapterDone; }
function campaignQuest(){ const st=campaignState(), qs=campaign().quests; const n=qs.findIndex(q=>!q.test(st)); return n<0?qs.length-1:n; }

function campaignNpcs(){
  if(scene === "academy") return [{id:"xunyu",cn:"荀彧",en:"Xun Yu",pal:"xunyu",x:12,y:5,dir:"down"}];
  const list=[{id:"xunyu",cn:"荀彧",en:"Xun Yu",pal:"xunyu",x:28,y:15,dir:"down"}];
  if(S.chapter===2){
    if(S.lessons.y2command||S.recruited.includes("dianwei")) list.push({id:"dianwei",cn:"典韋",en:"Dian Wei",pal:"dianwei",x:12,y:25,dir:"down"});
    if((S.lessons.y2lets&&S.lessons.y2can)||S.recruited.includes("guojia")) list.push({id:"guojia",cn:"郭嘉",en:"Guo Jia",pal:"guojia",x:38,y:8,dir:"down"});
  }else{
    if(S.recruited.includes("dianwei")) list.push({id:"dianwei",cn:"典韋",en:"Dian Wei",pal:"dianwei",x:12,y:25,dir:"down"});
    if(S.recruited.includes("guojia")) list.push({id:"guojia",cn:"郭嘉",en:"Guo Jia",pal:"guojia",x:38,y:8,dir:"down"});
  }
  return list.map(n=>({...n,...townPoint(n,chapterCity())}));
}

function startChapter(number){
  if(!CAMPAIGNS[number]) return;
  closePanel(); closeMenus(); clearInterval(typing); show("#dbox",false);
  S.chapter=number; S.journeyKey=null; S.campaigns ||= {}; campaignState();
  if(!S.unlockedCities.includes(campaign().city)) S.unlockedCities.push(campaign().city);
  scene=chapterCity(); lastQuest=-1; MODE="world";
  enterGameShell(); placeTownPlayer(); FOLLOW.active=hasDun();
  markDirty(); syncHUD(); autoSave();
  say({cn:"曹操",en:"Cao Cao",pal:"caocao"},campaign().opening,()=>talkCampaignNpc({id:"xunyu"}));
}

function talkCampaignNpc(n){
  const c=campaign(),st=campaignState();
  if(n.id==="xunyu"){
    if(!st.briefed) return say({cn:"荀彧",en:"Xun Yu",pal:"xunyu"}, S.chapter===2 ? [
      {en:"Welcome to Yanzhou, my lord.",zh:"主公，兗州的百姓正等著我們。"},
      {en:"Juancheng stood firm during the rebellion.",zh:"興平元年（194），兗州多地響應呂布，鄄城、范、東阿仍為曹操守住。"},
      {en:"Learn the orders, then help the people.",zh:"本章學祈使句、Let's、can、or、受格。典韋效力與荀彧薦郭嘉的故事在此濃縮呈現；郭嘉來投不標死為某年某月。"}
    ]:[{en:"Welcome to our new city, my lord.",zh:"主公，許都的告示需要重新整理。"},
      {en:"Please read the signs and help the people.",zh:"這一章從生活單字與簡單規則開始，幫居民解決小問題。"},
      {en:"Take one small step at a time.",zh:"城裡全部是基礎題。先學會一個重點，再做幾題，不用急。"}],()=>{st.briefed=true;markDirty();syncHUD();autoSave();});
    if(scene==="academy") return openAcademyMenu();
    return say({cn:"荀彧",en:"Xun Yu",pal:"xunyu"},[{en:"One step at a time, my lord.",zh:currentQuests()[questState()].d}],()=>{});
  }
  if(S.chapter===2 && n.id==="dianwei" && !S.recruited.includes("dianwei")){
    if(!S.lessons.y2command) return campaignHint("典韋","dianwei","先到鄄城學舍學會祈使句，再來讀守城軍令。");
    return say({cn:"典韋",en:"Dian Wei",pal:"dianwei"},[{en:"Be careful. Please guard the gate.",zh:"小心戒備，請守住城門。把指令說清楚，將士才能協力守城。"}],()=>runCampaignQuiz("招募典韋",DW_Q,2,()=>{S.recruited.push("dianwei");addRes(0,0,400);},"典韋加入！兵力 +400。"));
  }
  if(S.chapter===2 && n.id==="guojia" && !S.recruited.includes("guojia")){
    if(!S.lessons.y2lets||!S.lessons.y2can) return campaignHint("郭嘉","guojia","先學會 Let's 與 can，再來討論如何協力與詢問許可。");
    return say({cn:"郭嘉",en:"Guo Jia",pal:"guojia"},[{en:"Let's help the guards. Can we enter?",zh:"荀彧薦才的故事在這裡化成教學任務：先邀大家合作，再問清楚可不可以。"}],()=>runCampaignQuiz("招募郭嘉",GJ_Q,2,()=>{S.recruited.push("guojia");addRes(50,0,0);},"郭嘉加入！金錢 +50。"));
  }
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
    if(!S.lessons.y2or||!S.lessons.y2object) return campaignResult("先學會選擇與受格","讀懂選擇、知道把糧草交給誰，再來軍需營。","前往課程",openAcademyMenu);
    return runCampaignQuiz("備齊糧草",SUPPLY_Q,2,()=>{st.supplies=true;if(!st.supplyRewardClaimed)addRes(0,80,0);st.supplyRewardClaimed=true;},st.supplyRewardClaimed?"新範圍補給複習完成；糧食獎勵先前已領取。":"糧草備妥！糧食 +80。");
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
  const st=campaignState(),questions=campaign().final,need=S.chapter===2?7:6;
  if(st.complete) return campaignResult("本章已通過","最佳成績 "+st.best+" / "+questions.length+"。可重做基礎題，首通獎勵只領一次。","基礎複習",()=>runCampaignFinal(questions,need));
  campaignResult(S.chapter===2?"守住兗州":"城鎮生活小測驗","全部是基礎題，每題都有白話解析。共 "+questions.length+" 題，答對 "+need+" 題過關。","開始作答",()=>runCampaignFinal(questions,need));
}
function runCampaignFinal(questions,need){
  const st=campaignState();
  panel("📝",S.chapter===2?"守城基礎測驗":"城鎮生活小測驗","Town · Basic questions only",'<p class="note">答對 '+need+' / '+questions.length+' 即可過關。沒有計時，答錯不扣兵力或資源。</p><div class="sheet"><div id="cp-final"></div></div>');
  quizBlock(document.getElementById("cp-final"),questions,(c,n)=>{
    st.best=Math.max(st.best||0,c); st.attempts=(st.attempts||0)+1;
    const pass=c>=need,first=pass&&!st.complete&&!st.finalRewardClaimed;
    if(pass)st.complete=true;
    if(first){st.finalRewardClaimed=true;addExp(80);addRes(100,100,0);SFX.fanfare();}
    markDirty();syncHUD();autoSave();
    campaignResult(pass?"第"+S.chapter+"章完成":"再複習一次",c+" / "+n+"。"+(first?"首通獎勵：EXP +80、金錢 +100、糧食 +100。":pass?"複習完成！首通獎勵已領取。":"不用急，看看解析，再到學堂複習。"),pass&&S.chapter===2?"前往城門":pass?"查看任務":"再試一次",pass?()=>{closePanel();openCampaignLog();}:()=>runCampaignFinal(questions,need));
  });
}
function openCampaignGate(){
  if(MODE==="panel"||topMenu())return;
  if(!campaignState().complete) return campaignResult("先把城裡的事做好",currentQuests()[questState()].d,"查看任務",()=>{closePanel();openCampaignLog();});
  if(S.chapter===2) return campaignResult("兗州已安定","建安元年（196），曹操進軍汝南、潁川，討伐黃巾餘部。已招募武將會協助你；助戰陣容是遊戲演出，不代表每位武將皆有此次參戰記載。出城十題只複習兗州的五個單元。","出城討黃巾",()=>beginJourney(2,3));
  campaignResult("許都新規・基礎篇完成","城鎮基礎任務已完成。回學堂看看重點，或到練兵場再練幾題吧。","回學堂複習",openAcademyMenu);
}
function openCampaignLog(){
  closePanel();
  const st=campaignState(),qs=campaign().quests;
  pushMenu({host:"layer",title:"任務　QUESTS",sub:"Chapter "+S.chapter+" · "+campaign().cn,
    msg:'<p style="color:var(--goldhi)">目前：'+qs[questState()].t+'</p><div style="font-size:13px;line-height:1.9">'+qs.slice(0,-1).map(q=>'<div style="color:'+(q.test(st)?'var(--jade)':'var(--t2)')+'">'+(q.test(st)?'✓ ':'○ ')+q.t+'<div style="font-size:11px">'+q.d+'</div></div>').join('')+'</div><p class="note">本章任務都在城鎮內完成，題目都是基礎練習。'+(st.best!=null?' 本章最佳 '+st.best+' / '+campaign().final.length:'')+'</p>',
    items:[{label:"回到遊戲",on:closeMenus}],onCancel:closeMenus});
}
function chapterUnlocked(n){
  if(n===1) return true;
  if(n===2) return S.chapter>=2||!!(S.journeys&&S.journeys["1-2"]&&S.journeys["1-2"].complete);
  if(n===3) return S.chapter>=3||!!(S.journeys&&S.journeys["2-3"]&&S.journeys["2-3"].complete);
  return false;
}
function openChapterTravel(){
  closeMenus();
  pushMenu({host:"layer",title:"章節　CHAPTERS",sub:"沿著旅程前進",items:[
    {label:"第一章・陳留起兵",sub:"初平元年（190）・討董義兵",on:()=>travelToChapter(1)},
    {label:"第二章・兗州立足",sub:"初平三年至建安元年（192–196）",disabled:!chapterUnlocked(2),on:()=>travelToChapter(2)},
    {label:"第三章・許都新規",sub:"建安元年（196）・迎帝都許",disabled:!chapterUnlocked(3),on:()=>travelToChapter(3)},
    {label:"返回",on:closeMenus}],note:"進度會保留。先完成前一章，再前往下一章。",onCancel:closeMenus});
}
function travelToChapter(n){
  if(!chapterUnlocked(n))return;
  closeMenus();closePanel();S.chapter=n;S.journeyKey=null;lastQuest=-1;scene=chapterCity();
  placeTownPlayer();FOLLOW.active=hasDun();enterGameShell();markDirty();syncHUD();autoSave();
  if(campaign()&&!campaignState().briefed) say({cn:"曹操",en:"Cao Cao",pal:"caocao"},campaign().opening,()=>talkCampaignNpc({id:"xunyu"}));
}
