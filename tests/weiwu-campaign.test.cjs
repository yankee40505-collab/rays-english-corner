const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=process.argv[2] || require('path').resolve(__dirname,'..');
const html=fs.readFileSync(root+'/weiwu-2drpg.html','utf8');
const elements=new Map();
function el(){return {width:800,height:576,textContent:'',innerHTML:'',style:{},dataset:{},children:[],listeners:{},classList:{add(){},remove(){},toggle(){}},addEventListener(type,fn){this.listeners[type]=fn},appendChild(){},remove(){},focus(){},querySelector(){return el()},querySelectorAll(){return []},getContext(){return paint},getBoundingClientRect(){return {width:800,height:576}}};}
const paint=new Proxy({measureText:t=>({width:String(t).length*8}),createRadialGradient:()=>({addColorStop(){}}),createLinearGradient:()=>({addColorStop(){}})}, {get:(o,k)=>o[k]||(()=>{})});
const storage=new Map();
const ctx=vm.createContext({console,document:{addEventListener(){},body:el(),getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},querySelector(q){return this.getElementById(q.replace(/^#/,''))},querySelectorAll(){return []},createElement:el},window:{addEventListener(){}},getComputedStyle:()=>({getPropertyValue:()=>"serif"}),Image:class{},setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},Date,Math,JSON,URL,Blob});
for(const m of html.matchAll(/<script(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)){
  const source=m[1]?fs.readFileSync(root+'/'+m[1],'utf8'):m[2];
  new vm.Script(source,{filename:m[1]||'inline'}).runInContext(ctx);
}
function run(src){return vm.runInContext(src,ctx)}
run(`
var capturedQuiz=null,capturedDialog=null,capturedPanel=null;
quizBlock=(host,items,onDone)=>{capturedQuiz={items,onDone};};
say=(who,lines,onEnd)=>{capturedDialog={who,lines,onEnd};MODE="dialog";};
panel=(icon,title,en,html)=>{capturedPanel={title,html};MODE="panel";};
toast=()=>{}; initAudio=()=>{}; startMusic=()=>{};
Object.keys(SFX).forEach(k=>SFX[k]=()=>{});
`);
let checks=0;
function check(code,msg){assert.ok(run(code),msg);checks++}
run(`applySaveData({level:5,exp:32,gold:220,food:160,army:1300,chapterDone:true,completedLessons:{g1:true,g2:true},unlockedGenerals:["xiahoudun"],examPassed:true,examBest:8,scene:"academy",playerX:12,playerY:14});`);
check('S.chapter===1&&S.level===5&&S.army===1300&&S.lessons.g1&&S.recruited.includes("xiahoudun")&&scene==="academy"','legacy save migration');
run('scene="town";SCENES.town.bg=buildTown("town");placeP(25,25,"up");');
check('TOWN_MAP.length===29&&TOWN_MAP.every(row=>row.length===50)&&SCENES.town.bg.width===1600&&SCENES.town.bg.height===928','towns use a large three-level side-scrolling world');
check('townCamera().x>0&&townCamera().y>0','town camera follows the player horizontally and vertically');
check('ambientTownNpcs().length===8&&activeNpcs().filter(n=>n.ambient).length===8','town streets include eight ambient residents across the levels');
check('TOWN_MAP[20][25]==="#"&&townStairStep(24,25,"up").x===23&&townStairStep(24,25,"up").y===24','town levels connect through explicit diagonal stairs instead of invisible vertical movement');
run('MODE="world";openGate();document.getElementById("gt-fin").listeners.click();');
check('scene==="road"&&S.journeyKey==="1-2"','chapter one destination button starts the road instead of skipping to Yanzhou');
run('beginJourney(1,2);');
check('scene==="road"&&S.journeyKey==="1-2"&&activeNpcs().length===10','chapter travel enters a ten-enemy battlefield');
check('!chapterUnlocked(2)','chapter menu cannot bypass an unfinished road');
check('SCENES.road.bg&&ROAD_MAP.length===18&&ROAD_MAP.every(row=>row.length===25)','road scene builds a complete visible map');
check('ROAD_ENCOUNTER_POSITIONS.length===10&&ROAD_ENCOUNTER_POSITIONS.every(p=>p.x>1&&p.x<24&&p.y>=11&&p.y<=13)','ten enemies fill the horizontal battlefield lane');
check('Object.values(JOURNEYS).every(r=>roadQuestions(r).length===ROAD_ENCOUNTER_POSITIONS.length&&r.allies.length>0&&new Set(r.allies).size===r.allies.length)','every route keeps its questions and unique background allies in sync');
check('roadQuestions(JOURNEYS["1-2"]).every(q=>[...JOURNEYS["1-2"].review.flatMap(id=>TRAIN_Q[id]),...EXAM_Q].includes(q))','the Chenliu road reuses questions from Chenliu lessons and its final exam');
check('roadQuestions(JOURNEYS["2-3"]).every(q=>[...JOURNEYS["2-3"].review.flatMap(id=>TRAIN_Q[id]),...CAMPAIGNS[2].final].includes(q))','the Yanzhou road reuses questions from Yanzhou lessons and its final exam');
check('ROAD_BG_ART.src.includes("road-yellow-turban-v2.png")&&YELLOW_TURBAN_ART.src.includes("yellow-turban-soldier-v2.png")','road battlefield loads its illustrated background and Yellow Turban sprite');
check('["caocao","xiahoudun","dianwei","guojia","xunyu","xuchu"].every(k=>BATTLE_CHAR_ART[k].src.includes("battle-v2.png"))','town and road scenes load unified large chibi art for every named character');
check('Object.values(TOWN_BG_ART).every(img=>img.src.includes("town-")&&img.src.includes("-v2.jpg"))','all three cities load the unified illustrated town art');
check('document.getElementById("q-t").textContent.includes("青州黃巾")&&questTarget().x===3&&questTarget().y===12','journey HUD and quest arrow point to the next Yellow Turban enemy');
check('journey().year.includes("192")&&journey().history.includes("青州兵")','first battlefield carries the 192 historical setting');
check('roadBattleAllies().length===1&&roadBattleAllies()[0]==="xiahoudun"','only the currently recruited general joins the first background skirmish');
run('capturedQuiz=null;talkNpc(activeNpcs()[0]);');
check('capturedDialog.who.cn==="青州黃巾"&&typeof capturedDialog.onEnd==="function"','Yellow Turban enemy starts the encounter dialogue');
run('capturedDialog.onEnd();');
check('capturedQuiz&&capturedQuiz.items.length===1&&capturedQuiz.items[0].q.includes("Xiahou Dun")','road soldier opens one route-specific question');
run('var roadExp=S.exp;capturedQuiz.onDone(0,1);');
check('journeyState().cleared.length===0&&capturedPanel.title==="再戰一次"','wrong road answer keeps the enemy in place');
run('runRoadEncounter(0);capturedQuiz.onDone(1,1);');
check('journeyState().cleared.length===1&&activeNpcs().length===9&&S.exp===roadExp','correct road answer clears one enemy without changing resources');
run('var roadSave=makeSaveData(1);applySaveData(JSON.parse(JSON.stringify(roadSave)));');
check('scene==="road"&&S.journeyKey==="1-2"&&journeyState().cleared.length===1&&activeNpcs().length===9','battlefield progress survives save and load');
run('for(var i=1;i<10;i++)finishRoadEncounter(i,1);MODE="world";openGate();');
check('capturedPanel.title==="抵達兗州"&&journeyState().cleared.length===10','clearing all ten enemies unlocks the destination gate');
run('arriveJourney();capturedDialog.onEnd();capturedDialog.onEnd();');
check('S.chapter===2&&scene==="yanzhou"&&!S.journeyKey','arrival enters the next chapter and clears active travel state');
check('chapterUnlocked(2)','arriving unlocks the destination chapter');
run(`applySaveData({level:5,exp:32,gold:220,food:160,army:1300,chapterDone:true,completedLessons:{g1:true,g2:true},unlockedGenerals:["xiahoudun"],examPassed:true,examBest:8,scene:"academy",playerX:12,playerY:14});`);
run('curSlot=1;startChapter(2);capturedDialog.onEnd();capturedDialog.onEnd();');
check('S.chapter===2&&scene==="yanzhou"&&questState()===1','chapter two arrival and briefing');
check('campaign().opening[0].zh.includes("192–196")&&campaignNpcs().every(n=>n.id!=="dianwei"&&n.id!=="guojia"&&n.id!=="xuchu")','Yanzhou spans 192–196 and later officers do not appear early');
check('availableLessons().length===3','only chapter two lessons');
check('makeSaveData(1).chapter===2&&makeSaveData(1).chapterName==="兗州立足"','save chapter metadata');
run('openCampaignExam();');check('capturedPanel.title==="先完成城鎮任務"','final gated by town tasks');
run('finishLesson(LESSONS.find(l=>l.id==="g5"),0,3);');check('!S.lessons.g5','lesson mastery gate');
run('finishLesson(LESSONS.find(l=>l.id==="g5"),2,3);');check('S.lessons.g5&&questState()===2','lesson success advances quest');
check('campaignNpcs().some(n=>n.id==="dianwei")&&!campaignNpcs().some(n=>n.id==="guojia")','Dian Wei appears only when his dated recruitment quest opens');
run('talkCampaignNpc({id:"dianwei"});capturedDialog.onEnd();capturedQuiz.onDone(1,3);');check('!S.recruited.includes("dianwei")','failed recruit does not join');
run('talkCampaignNpc({id:"dianwei"});capturedDialog.onEnd();capturedQuiz.onDone(2,3);');check('S.recruited.includes("dianwei")&&S.army===1700&&questState()===3','successful recruitment and army');
run('S.lessons.g6=true;');check('campaignNpcs().some(n=>n.id==="guojia")','Guo Jia appears only when his 196 recruitment quest opens');
run('talkCampaignNpc({id:"guojia"});capturedDialog.onEnd();capturedQuiz.onDone(3,3);');check('S.recruited.includes("guojia")&&questState()===5','Guo Jia recruitment');
run('S.lessons.g7=true;openCampaignTraining();capturedQuiz.onDone(3,3);');check('campaignState().supplies&&questState()===7','supplies quest');
run('openCampaignExam();runCampaignFinal(C2_FINAL,4);capturedQuiz.onDone(3,6);');check('!campaignState().complete','failed final remains incomplete');
run('runCampaignFinal(C2_FINAL,4);capturedQuiz.onDone(4,6);var firstGold=S.gold,firstFood=S.food,firstLevel=S.level,firstExp=S.exp;');
check('campaignState().complete&&questState()===8','chapter two completion');
run('document.getElementById("cp-action").listeners.click();');
check('S.chapter===2&&scene==="yanzhou"','chapter two result returns to the city gate instead of skipping the road');
run('closeMenus();');
run('runCampaignFinal(C2_FINAL,4);capturedQuiz.onDone(6,6);');check('S.gold===firstGold&&S.food===firstFood&&S.exp===firstExp&&S.level===firstLevel','first clear reward cannot be farmed');
run('MODE="world";openCampaignGate();document.getElementById("cp-action").listeners.click();');
check('scene==="road"&&S.journeyKey==="2-3"&&TRAIN_Q.g5.includes(roadQuestions(journey())[0])','Yanzhou gate starts the second road with chapter-two review questions');
check('activeNpcs().length===10&&journey().year.includes("196")&&journey().history.includes("漢獻帝")','second battlefield has ten remnants and the 196 historical setting');
check('roadBattleAllies().join(",")==="xiahoudun,dianwei,guojia"','all recruited generals stage background skirmishes on the second battlefield');
check('!chapterUnlocked(3)','chapter three stays locked until the Yanzhou road is complete');
run('var saved=makeSaveData(1);applySaveData(JSON.parse(JSON.stringify(saved)));');check('S.chapter===2&&campaignState().complete&&S.recruited.length===3','chapter two save round trip');
run('startChapter(3);capturedDialog.onEnd();capturedDialog.onEnd();');check('S.chapter===3&&scene==="xuchang"&&questState()===1','chapter three entry');
check('availableLessons().length===6&&availableLessons().every(l=>l.chapter===3)','six Unit 3 lessons');
run('openCampaignRecruit();');check('!campaignState().signs&&capturedPanel.title==="先學會怎麼說規則"','sign quest prerequisite');
run('S.lessons.u3words=true;S.lessons.u3command=true;openCampaignRecruit();capturedQuiz.onDone(3,3);');check('campaignState().signs&&questState()===4','sign repair progression');
run('S.lessons.u3lets=true;S.lessons.u3can=true;openCampaignTraining();capturedQuiz.onDone(2,3);');check('campaignState().permission&&questState()===7','permission dialogue progression');
run('S.lessons.u3or=true;S.lessons.u3object=true;openCampaignExam();');check('capturedPanel.title==="城鎮生活小測驗"','third final available');
run('runCampaignFinal(C3_FINAL,6);capturedQuiz.onDone(5,9);');check('!campaignState().complete','third final failure');
run('runCampaignFinal(C3_FINAL,6);capturedQuiz.onDone(6,9);');check('campaignState().complete&&questState()===10','third chapter complete');
run('MODE="world";openCampaignGate();');check('capturedPanel.html.includes("城鎮基礎任務已完成")','hard outdoor questions withheld');
run('var save3=makeSaveData(1);applySaveData(JSON.parse(JSON.stringify(save3)));');check('S.chapter===3&&campaignState().complete&&campaignState().best===6&&S.campaigns[2].complete','both campaign states survive load');
run('travelToChapter(1);');check('S.chapter===1&&scene==="town"&&S.lessons.u3can','chapter travel retains learning');
run('travelToChapter(3);');check('S.chapter===3&&scene==="xuchang"','return to unlocked third chapter');
run('applySaveData({chapter:3,scene:"xuchang",completedLessons:{},unlockedGenerals:[]});travelToChapter(1);');
check('chapterUnlocked(2)&&chapterUnlocked(3)','legacy chapter-three saves retain durable chapter unlocks');
run('travelToChapter(3);');check('S.chapter===3&&scene==="xuchang"','legacy save can revisit its highest unlocked chapter');
check('NEW_LESSONS.every(l=>l.check.every(q=>q.difficulty==="basic"))&&C3_FINAL.every(q=>q.difficulty==="basic")','all new content marked basic');
check('NEW_LESSONS.every(l=>l.pages.length>=2&&l.check.length===3)','detailed lesson pages and quick checks');
check('[...NEW_LESSONS.flatMap(l=>l.check),...DW_Q,...GJ_Q,...SUPPLY_Q,...SIGNS_Q,...PERMISSION_Q,...C2_FINAL,...C3_FINAL].every(q=>q.o.length===3&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length&&q.w)','quiz answer integrity');
// Ensure every town quest can be reached with the actual collision map and NPCs.
for(const chapter of [2,3]){
  run(`S.chapter=${chapter};scene=chapterCity();`);
  const data=run('JSON.stringify({map:SCENES[scene].map,solid:SCENES[scene].solid,npcs:activeNpcs(),quests:campaign().quests,stairs:TOWN_STAIR_PATHS})');
  const d=JSON.parse(data),seen=new Set(['25,25']),todo=[[25,25]],height=d.map.length,width=d.map[0].length;
  while(todo.length){const [x,y]=todo.shift(),steps=[[x+1,y],[x-1,y],[x,y+1],[x,y-1]];for(const path of d.stairs){const i=path.findIndex(p=>p[0]===x&&p[1]===y);if(i>=0){if(path[i-1])steps.push(path[i-1]);if(path[i+1])steps.push(path[i+1]);}}for(const [a,b]of steps){let k=a+','+b;if(a<0||a>=width||b<0||b>=height||seen.has(k)||d.solid.includes(d.map[b][a])||d.npcs.some(n=>n.x===a&&n.y===b))continue;seen.add(k);todo.push([a,b]);}}
  for(const q of d.quests){if(!q.target)continue;const {x,y}=q.target;const npc=d.npcs.some(n=>n.x===x&&n.y===y);assert.ok(npc?[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen.has((x+dx)+','+(y+dy))):seen.has(x+','+y),`Chapter ${chapter}: ${q.id} unreachable`);checks++;}
}
console.log(`PASS: ${checks} checks covering legacy saves, chapters 2–3, failure/retry, one-time rewards, lesson access and map reachability.`);
