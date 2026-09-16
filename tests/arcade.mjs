import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
await build({entryPoints:['lib/arcade/world.ts'],outfile:'/tmp/nexo-bd1-arcade-test.mjs',bundle:true,platform:'node',format:'esm'});
const {createWorld,step,replay,score,chapters}=await import(pathToFileURL('/tmp/nexo-bd1-arcade-test.mjs'));
const base='http://localhost:5173';let cookie='';
async function api(body,status=200){const r=await fetch(base+'/api/game',{method:'POST',headers:{'content-type':'application/json',cookie},body:JSON.stringify(body)});if(r.headers.get('set-cookie'))cookie=r.headers.get('set-cookie').split(';')[0];const j=await r.json();assert.equal(r.status,status,JSON.stringify(j));return j;}
await api({action:'start',name:'X',email:'invalid',consent:true},400);
let {attempt}=await api({action:'start',name:'Teste BD1 Local',email:'bd1@example.test',consent:true});
for(let stage=0;stage<7;stage++){
const w=createWorld(stage,attempt.seed),inputs=[];
function tick(mask,n=1){for(let i=0;i<n;i++){step(w,mask);const t=inputs.at(-1);if(t&&t[0]===mask&&t[1]<3600)t[1]++;else inputs.push([mask,1]);}}
function path(tx,ty){const cell=40,nx=39,ny=26;const blocked=(x,y)=>x<100||x>1450||y<110||y>930||w.walls.some(b=>x>b.x-24&&x<b.x+b.w+24&&y>b.y-24&&y<b.y+b.h+24);const sx=Math.round(w.player.x/cell),sy=Math.round(w.player.y/cell),gx=Math.round(tx/cell),gy=Math.round(ty/cell);let q=[[sx,sy]],prev=new Map([[sx+','+sy,null]]),end;for(let p=0;p<q.length;p++){const [x,y]=q[p];if(x===gx&&y===gy){end=x+','+y;break;}for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const a=x+dx,b=y+dy,k=a+','+b;if(a<0||a>=nx||b<0||b>=ny||blocked(a*cell,b*cell)||prev.has(k))continue;prev.set(k,x+','+y);q.push([a,b]);}}assert(end,'path '+tx+','+ty);const pts=[];while(prev.get(end)!==null){pts.push(end.split(',').map(Number).map(x=>x*cell));end=prev.get(end);}return pts.reverse();}
function move(x,y){for(const [tx,ty] of [...path(x,y),[x,y]]){let t=0;while(Math.hypot(w.player.x-tx,w.player.y-ty)>9){const dx=tx-w.player.x,dy=ty-w.player.y;tick(16|(dx>6?8:dx< -6?4:0)|(dy>6?2:dy< -6?1:0));assert(++t<600,'movement stuck stage '+stage+' '+JSON.stringify(w.player));}}}
function use(id){const o=w.objects.find(o=>o.id===id);assert(o,'object '+id);move(o.x,o.y);tick(16);tick(48);tick(16);}
function transport(a,b){use(a);use(b);}
if(stage===0){await api({action:'finish',stage,revision:attempt.revision,inputs:[]},400);transport('current','core');use('clientA');use('clientB');transport('schema','catalog');}
if(stage===1){transport('request','api');transport('sql','db');transport('lock','reservation');use('reservation');transport('index','internal');}
if(stage===2){for(let i=0;i<6;i++)transport('row'+i,i<2?'register':'reject');}
if(stage===3){transport('person','personPad');transport('project','projectPad');transport('relation','relationPad');transport('attribute','attributePad');transport('fan','leftFan');transport('fan','rightFan');use('bridge');}
if(stage===4){transport('bundle','splitter');for(const [a,b] of [['price','productTable'],['clientFK','orderTable'],['quantity','itemTable'],['name','clientTable'],['city','clientTable'],['pair','itemTable']])transport(a,b);}
if(stage===5){use('toolCREATE');use('forge');assert(w.flags.exists);assert.equal(w.flags.rows.length,0);use('toolINSERT');for(let i=0;i<4;i++)use('forge');use('where3');use('select');use('toolUPDATE');use('forge');use('where4');use('select');use('toolDELETE');use('forge');assert.equal(w.flags.rows.length,3);assert(w.flags.exists);}
if(stage===6){transport('left','joinPad');transport('group','groupPad');transport('having','havingPad');use('report');use('begin');transport('origin','destination');assert(w.flags.failed);use('rollback');assert.equal(w.flags.source,60);use('begin');transport('origin','destination');use('commit');assert.equal(w.flags.source+w.flags.dest,60);for(let i=0;i<2000&&!w.goals[2];i++)tick(16);}
assert(w.goals.every(Boolean),'goals stage '+stage+JSON.stringify(w.goals));use('exit');assert(w.finished,'portal');const verified=replay(stage,attempt.seed,inputs);assert.equal(score(verified),score(w));assert.deepEqual(verified.goals,w.goals);const result=await api({action:'finish',stage,revision:attempt.revision,inputs});attempt=result.attempt;assert.equal(attempt.stage,stage+1);assert.equal(attempt.state[stage].best,score(w));const again=await api({action:'finish',stage,revision:attempt.revision-1,inputs});assert.equal(again.attempt.score,attempt.score);console.log(JSON.stringify({stage:stage+1,ticks:w.tick,score:score(w),deaths:w.deaths,errors:w.errors,replayEntries:inputs.length}));
}
assert(attempt.completed);assert(attempt.score<=1000);assert.equal(chapters.reduce((n,c)=>n+c.max,0),1000);
assert.throws(()=>replay(0,1,[[256,1]]));assert.throws(()=>replay(0,1,[[0,-1]]));
const r=await fetch(base+'/api/professor');assert.equal(r.status,403);
console.log('PASS: all seven districts completed via movement, combat and interaction; server replay, saved score, idempotency, validation and teacher access checked.');
