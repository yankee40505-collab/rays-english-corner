/* Shared presentation and safe chapter checkpoints. No automatic save writes. */
const VENUES={
  academy:{host:"xunyu",cn:"荀彧",en:"Xun Yu",hint:"讀書先明其意，再學如何說清楚。"},
  recruit:{host:"xiahoudun",cn:"夏侯惇",en:"Xiahou Dun",hint:"募兵不只看勇力，也看是否肯守軍令。"},
  exam:{host:"xunyu",cn:"荀彧",en:"Xun Yu",hint:"軍議不求搶答；想明白，再下決斷。"},
  training:{host:"xuchu",cn:"軍需教頭",en:"Drill Officer",hint:"平日多練一步，臨陣就少一分慌亂。"}
};
const VENUE_ART={};
Object.keys(VENUES).forEach(key=>{
  const img=new Image();
  img.onload=()=>{SCENES[key].bg=buildVenue(key);};
  img.src="assets/venue-"+key+"-v1.png";VENUE_ART[key]=img;
});
const INTERIOR_SPAWN=[6,22],INTERIOR_HOST=[26,21],INTERIOR_EXIT=[2,22];
function isInteriorScene(key=scene){return !!VENUES[key];}
function interiorNpcs(){
  const v=VENUES[scene];
  return [{id:scene==="academy"?"xunyu":"venue-host",cn:v.cn,en:v.en,pal:v.host,x:INTERIOR_HOST[0],y:INTERIOR_HOST[1],dir:"left"}];
}
function buildVenue(key){
  const c=document.createElement("canvas");c.width=1600;c.height=928;
  const g=c.getContext("2d"),art=VENUE_ART[key];
  g.fillStyle="#563c29";g.fillRect(0,0,c.width,c.height);
  if(art&&art.complete&&art.naturalWidth){g.imageSmoothingEnabled=true;g.drawImage(art,0,0,c.width,c.height);}
  // A smooth loading surface replaces the former pixel-tile interior fallback.
  else {const glow=g.createLinearGradient(0,0,0,c.height);glow.addColorStop(0,"#584537");glow.addColorStop(1,"#bc9566");g.fillStyle=glow;g.fillRect(0,0,c.width,c.height);}
  return c;
}
function enterVenue(key){
  if(!VENUES[key])return;
  transition(()=>{
    scene=key;SCENES[key].cn=townLayout(chapterCity()).names[key];
    if(!SCENES[key].bg)SCENES[key].bg=buildVenue(key);
    placeP(...INTERIOR_SPAWN,"right");FOLLOW.active=false;MODE="world";
    markDirty();autoSave();syncQuest();
    toast("已進入"+SCENES[key].cn+"・找人物按 E 互動");
  });
}
function openVenueActivity(){
  if(scene==="academy")return openAcademyMenu();
  if(scene==="recruit")return campaign()?openCampaignRecruit():openParty();
  if(scene==="exam")return campaign()?openCampaignExam():openExamIntro();
  if(scene==="training")return campaign()?openCampaignTraining():openTraining();
}
function drawInteriorExit(g){
  if(!isInteriorScene())return;
  const x=INTERIOR_EXIT[0]*TS+TS/2,y=(INTERIOR_EXIT[1]+1)*TS;
  g.save();g.strokeStyle="#a4efda";g.lineWidth=3;g.shadowColor="#5de0c4";g.shadowBlur=15;
  g.beginPath();g.ellipse(x,y-38,21,38,0,0,Math.PI*2);g.stroke();
  g.font="bold 13px "+F_SERIF;g.fillStyle="#fff1c8";g.fillText("← 返回城鎮",x-38,y+19);g.restore();
}
function resizeGameViewport(){
  const rect=document.getElementById("stage").getBoundingClientRect();
  if(!rect.width||!rect.height)return;
  // Keep world units isotropic. Wider screens reveal more scenery, not a
  // stretched character or an enlarged square canvas.
  const h=576,w=Math.max(1,Math.round(h*rect.width/rect.height));
  if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}
}
function emptyCheckpointSlot(){
  try{return SLOTS.find(n=>localStorage.getItem(SLOT_KEY(n))===null)??null;}
  catch(e){return null;}
}
function makeYanzhouCheckpoint(slot){
  const q=CAMPAIGNS[2].quests[0];
  return {gameVersion:VERSION,checkpoint:"yanzhou-start",saveSlot:slot,playerName:"Cao Cao",
    chapter:2,chapterName:CAMPAIGNS[2].cn,scene:"yanzhou",locationCn:"兗州・鄄城",currentLocation:"Juancheng · Yanzhou",
    playerX:TOWN_LAYOUTS.yanzhou.spawn[0],playerY:TOWN_LAYOUTS.yanzhou.spawn[1],playerDir:"right",
    level:3,exp:0,gold:220,food:120,army:1300,metXunYu:true,gateOpen:true,chapterDone:true,
    examPassed:true,examBest:8,examScores:[],playTime:0,
    unlockedGenerals:["xiahoudun"],unlockedCities:["chenliu","yanzhou"],
    completedLessons:Object.fromEntries(LESSONS.filter(l=>!l.chapter).map(l=>[l.id,true])),
    completedQuests:QUESTS.slice(0,-1).map(q=>q.id),
    campaigns:{2:{curriculum:YANZHOU_CURRICULUM,briefed:false,complete:false,best:null}},
    journeys:{"1-2":{cleared:ROAD_ENCOUNTER_POSITIONS.map((_,i)=>i),complete:true}},journeyKey:null,
    currentMainQuest:{id:q.id,title:q.t,desc:q.d},lastSavedTime:new Date().toISOString()};
}
function createYanzhouCheckpoint(){
  const slot=emptyCheckpointSlot();
  if(slot===null){infoBox("沒有空白存檔槽","原有存檔不會被覆蓋。請先備份或選擇其他瀏覽器。");return false;}
  if(!writeSlot(slot,makeYanzhouCheckpoint(slot))){infoBox("儲存失敗","瀏覽器無法儲存，沒有切換目前遊戲。");return false;}
  MODE="world";loadFromSlot(slot);return slot;
}
function openYanzhouCheckpoint(){
  confirmBox("從兗州開始", "在空白槽建立「初入兗州」紀錄，陳留與途中戰鬥已完成，夏侯惇同行。<br>原有存檔不會被覆蓋。<br>此紀錄只儲存在目前網站與瀏覽器。",createYanzhouCheckpoint,{defaultYes:true});
}

const RESIDENT_LINES={
  town:[
    ["Cloth can keep a family warm.","布能做軍衣，也能給流離的人禦寒。掌櫃我最盼的，是每匹布都用在該用的地方。"],
    ["A strong cart needs good wood.","兵馬未動，車輪先得修好。木匠我不會揮刀，卻能讓糧車多走幾里。"],
    ["We train together every morning.","我才加入義軍，口令還會聽岔。主公，操練時可別笑我！"],
    ["I hope the fields will be quiet again.","我只盼田裡聽見的是鋤頭聲，不是戰鼓聲。"],
    ["Please take care of the wounded.","藥材得省著用，傷兵卻不能丟下。先讓我看看你的傷。"],
    ["Every road has a different story.","一路走來，有人談討董，有人只問哪裡還有糧。亂世裡，消息也得分辨真假。"],
    ["Please wait. Let me check the gate.","城門要查驗出入。不是故意刁難，守門就是要替城裡人多想一步。"],
    ["Can you teach me a new word?","大家說你會帶兵，也會讀書。我也想學一個新字！"]
  ],
  yanzhou:[
    ["Food matters as much as weapons.","我是糧商。守住城牆還不夠，倉裡有糧，百姓心裡才不慌。"],
    ["A small crack can break a blade.","鐵匠看刀，先看有沒有裂口。小毛病現在不修，上陣可就遲了。"],
    ["We must keep watch at night.","夜裡換哨，口令得說清楚。請別把『可以進城』和『不可以進城』聽反！"],
    ["Rest is part of getting better.","藥師治傷，也勸人歇息。勇敢不等於帶著高熱硬撐。"],
    ["Please protect the fields too.","兵要吃糧，糧要從地裡長。請守住城，也替田裡的人想想。"],
    ["A tired horse needs water.","我是馬販。好馬也要飲水歇腳，可不能只顧趕路。"],
    ["This is Juancheng, in Yanzhou.","這裡是兗州境內的鄄城。兗州是一片州域，可不是只有眼前這一座城。"],
    ["Can I open my stall here?","城裡安穩了，我才敢把攤子重新擺出來。主公，要不要看看今日的新貨？"]
  ],
  xuchang:[
    ["Please keep the market road clear.","我是市集掌櫃。攤位別堵路，買賣才能長久。"],
    ["One wrong word can change an order.","抄書人最怕漏一個『不』字。軍令與告示，落筆前都得再看一遍。"],
    ["Rules should be clear to everyone.","我巡街不是只為抓錯，還要把告示講到人人聽得懂。"],
    ["Sit down and tell me your story.","我是茶攤老闆。熱水備好了，趕路的人坐下歇歇吧。"],
    ["A city needs many skilled hands.","宮室、街道、糧車，都要人修。工匠手裡的工具，也是在替城裡出力。"],
    ["Trade needs safe roads.","我是行商。路上少一道兵禍，城裡就能多一車貨物。"],
    ["Please read the notice before entering.","先看告示，再過城門。不懂的就問我，別急著跟人群往前擠。"],
    ["Can I study with you?","我想學會讀告示，也想把話說得清清楚楚。能跟著你學嗎？"]
  ]
};
function residentDialogue(n){
  const index=Number(n.id.split("-").at(-1)),line=RESIDENT_LINES[scene]?.[index];
  return [{en:line?.[0]||"Welcome, my lord.",zh:line?.[1]||"主公，路上辛苦了。"},
    {en:"Every town has its own past.",zh:"【城鎮背景】"+townLayout().note}];
}
const CHARACTER_STORIES={
  caocao:{cn:"曹操",line:"兵法不能只停在書簡上。先安百姓，再談用兵。",fact:"初平三年（192），曹操在兗州擊破青州黃巾，從降眾中收取精銳，稱青州兵。這與 184 年黃巾起事不是同一時間。",volume:"01"},
  xunyu:{cn:"荀彧",line:"主公，取天下要識人，守住根本也同樣要緊。",fact:"194 年兗州多地響應呂布時，荀彧、程昱等守住鄄城等據點。陳留章讓荀彧授課是教學串場，不代表他在 190 年已投曹。",volume:"01"},
  xiahoudun:{cn:"夏侯惇",line:"末將不怕上陣，也不肯荒廢學問。學不會，就再練一回。",fact:"《三國志》記夏侯惇在軍旅中仍迎請老師學習；也記他率將士興修水利、勸種稻。史書並非只寫他作戰的一面。",volume:"09"},
  dianwei:{cn:"典韋",line:"主公放心，守衛的事交給末將。話我說不多，軍令卻一定記清。",fact:"《三國志》記典韋先屬張邈，後屬夏侯惇，以勇力見重，後來成為曹操的近衛。角色對白是依其形象創作，不是史書原話。",volume:"18"},
  guojia:{cn:"郭嘉",line:"先別急著下結論。對方為何這樣做，往往比表面聲勢更重要。",fact:"《三國志》記荀彧向曹操推薦郭嘉。遊戲將薦才故事放進兗州教學，不把來投時間寫死為某年某月。",volume:"14"},
  xuchu:{cn:"許褚",line:"護衛主公，先要守好自己的位置。該往前時，末將絕不退。",fact:"《三國志》寫許褚少言而謹慎、以勇力著稱。城中借用其造型的軍需教頭是虛構 NPC，不表示許褚已在該年代登場。",volume:"18"}
};
function openCharacterStories(){
  const keys=[...new Set(["caocao","xunyu",...S.recruited])];
  panel("📜","人物對白與史話","Characters · 對白為原創，史事另標來源",keys.filter(k=>CHARACTER_STORIES[k]).map(k=>{
    const p=CHARACTER_STORIES[k];return '<article class="story-card"><img src="'+BATTLE_CHAR_ART[k].src+'" alt="'+p.cn+'"><div><h3>'+p.cn+'</h3><p>「'+p.line+'」</p><p class="history-note">【史料旁注】'+p.fact+'</p><a href="https://zh.wikisource.org/wiki/三國志/卷'+p.volume+'" target="_blank" rel="noopener">史料：《三國志》卷'+p.volume+'</a></div></article>';
  }).join(""));
}
function decorateVenuePanel(title,en){
  const venue=isInteriorScene()?scene:/Academy|Lesson|學|課/i.test(title+en)?"academy":/Recruit|Party|募|招募|武將/i.test(title+en)?"recruit":/Exam|Test|考|測驗/i.test(title+en)?"exam":/Train|練|軍需/i.test(title+en)?"training":null;
  const ov=document.getElementById("ov");ov.dataset.venue=venue||"";
  const hero=document.getElementById("venue-hero");
  hero.innerHTML=venue?'<img class="venue-host" src="'+BATTLE_CHAR_ART[VENUES[venue].host].src+'" alt="'+VENUES[venue].cn+'"><div><b>'+townLayout(chapterCity()).names[venue]+'</b><p>'+VENUES[venue].hint+'</p></div>':"";
  hero.classList.toggle("hide",!venue);
}
