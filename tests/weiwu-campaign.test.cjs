const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=process.argv[2] || require('path').resolve(__dirname,'..');
const html=fs.readFileSync(root+'/weiwu-2drpg.html','utf8');
const elements=new Map();
function el(){return {textContent:'',innerHTML:'',style:{},dataset:{},children:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},appendChild(){},remove(){},focus(){},querySelector(){return el()},querySelectorAll(){return []},getContext(){return paint},getBoundingClientRect(){return {width:800,height:576}}};}
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
run('curSlot=1;startChapter(2);capturedDialog.onEnd();capturedDialog.onEnd();');
check('S.chapter===2&&scene==="yanzhou"&&questState()===1','chapter two arrival and briefing');
check('availableLessons().length===3','only chapter two lessons');
check('makeSaveData(1).chapter===2&&makeSaveData(1).chapterName==="兗州立足"','save chapter metadata');
run('openCampaignExam();');check('capturedPanel.title==="先完成城鎮任務"','final gated by town tasks');
run('finishLesson(LESSONS.find(l=>l.id==="g5"),0,3);');check('!S.lessons.g5','lesson mastery gate');
run('finishLesson(LESSONS.find(l=>l.id==="g5"),2,3);');check('S.lessons.g5&&questState()===2','lesson success advances quest');
run('talkCampaignNpc({id:"dianwei"});capturedDialog.onEnd();capturedQuiz.onDone(1,3);');check('!S.recruited.includes("dianwei")','failed recruit does not join');
run('talkCampaignNpc({id:"dianwei"});capturedDialog.onEnd();capturedQuiz.onDone(2,3);');check('S.recruited.includes("dianwei")&&S.army===1700&&questState()===3','successful recruitment and army');
run('S.lessons.g6=true;talkCampaignNpc({id:"guojia"});capturedDialog.onEnd();capturedQuiz.onDone(3,3);');check('S.recruited.includes("guojia")&&questState()===5','Guo Jia recruitment');
run('S.lessons.g7=true;openCampaignTraining();capturedQuiz.onDone(3,3);');check('campaignState().supplies&&questState()===7','supplies quest');
run('openCampaignExam();runCampaignFinal(C2_FINAL,4);capturedQuiz.onDone(3,6);');check('!campaignState().complete','failed final remains incomplete');
run('runCampaignFinal(C2_FINAL,4);capturedQuiz.onDone(4,6);var firstGold=S.gold,firstFood=S.food,firstLevel=S.level,firstExp=S.exp;');
check('campaignState().complete&&questState()===8','chapter two completion');
run('runCampaignFinal(C2_FINAL,4);capturedQuiz.onDone(6,6);');check('S.gold===firstGold&&S.food===firstFood&&S.exp===firstExp&&S.level===firstLevel','first clear reward cannot be farmed');
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
check('NEW_LESSONS.every(l=>l.check.every(q=>q.difficulty==="basic"))&&C3_FINAL.every(q=>q.difficulty==="basic")','all new content marked basic');
check('NEW_LESSONS.every(l=>l.pages.length>=2&&l.check.length===3)','detailed lesson pages and quick checks');
check('[...NEW_LESSONS.flatMap(l=>l.check),...DW_Q,...GJ_Q,...SUPPLY_Q,...SIGNS_Q,...PERMISSION_Q,...C2_FINAL,...C3_FINAL].every(q=>q.o.length===3&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length&&q.w)','quiz answer integrity');
// Ensure every town quest can be reached with the actual collision map and NPCs.
for(const chapter of [2,3]){
  run(`S.chapter=${chapter};scene=chapterCity();`);
  const data=run('JSON.stringify({map:SCENES[scene].map,solid:SCENES[scene].solid,npcs:activeNpcs(),quests:campaign().quests})');
  const d=JSON.parse(data),seen=new Set(['12,15']),todo=[[12,15]];
  while(todo.length){const [x,y]=todo.shift();for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){let a=x+dx,b=y+dy,k=a+','+b;if(a<0||a>=25||b<0||b>=18||seen.has(k)||d.solid.includes(d.map[b][a])||d.npcs.some(n=>n.x===a&&n.y===b))continue;seen.add(k);todo.push([a,b]);}}
  for(const q of d.quests){if(!q.target)continue;const {x,y}=q.target;const npc=d.npcs.some(n=>n.x===x&&n.y===y);assert.ok(npc?[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen.has((x+dx)+','+(y+dy))):seen.has(x+','+y),`Chapter ${chapter}: ${q.id} unreachable`);checks++;}
}
console.log(`PASS: ${checks} checks covering legacy saves, chapters 2–3, failure/retry, one-time rewards, lesson access and map reachability.`);
