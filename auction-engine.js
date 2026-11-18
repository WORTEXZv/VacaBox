// Motor do leilão por turnos (usado pelo servidor e pelo modo offline do jogo).
(function(root){
const AC=[100,500,750,1500,10000,50000,500000];
const AB=[[1,2,3,5,10,20],[5,10,20,40,80,150],[10,20,40,75,150,300],[20,50,100,200,400,750],[100,250,500,1000,2500,5000],[500,1000,2500,5000,10000,20000],[5000,10000,25000,50000,100000,200000]];
const AW=[40,28,17,9,4,1.5,.5],SLOT=900000,REGMS=60000,LIVE=600000,TURN=10000;
const rnd=n=>{const x=Math.sin(n*12.9898)*43758.5453;return x-Math.floor(x)};
const pickIdx=(x,w)=>{let t=w.reduce((a,b)=>a+b,0)*x;for(let i=0;i<w.length;i++){t-=w[i];if(t<=0)return i}return w.length-1};
function create(key){const r=pickIdx(rnd(key*9.1),AW),cap=AC[r],start=Math.max(1,Math.round(cap*.02));
  return{key,r,pick:rnd(key*3.7),cap,start,bid:start,leader:null,order:[],p:{},phase:"reg",turn:null,round:0,idx:-1,log:[],res:"",over:false,winner:null}}
const lg=(L,t)=>{L.log.unshift(t);L.log.length=Math.min(L.log.length,12)};
function join(L,id,name){if(L.phase!=="reg"||L.p[id])return false;L.p[id]={name,in:true};L.order.push(id);lg(L,`${name} entrou`);return true}
function addBot(L,id,name,seed){L.p[id]={name,in:true,bot:{max:Math.round(L.cap*(.12+rnd(seed)*.8)),nx:0}};L.order.push(id)}
const active=L=>L.order.filter(id=>L.p[id].in);
function end(L,now){if(L.over)return;L.over=true;L.phase="over";L.turn=null;
  if(L.leader){L.winner=L.leader;L.res=`${L.p[L.leader].name} venceu por 🪙${L.bid}.`}else L.res="Ninguém deu lance. Leilão encerrado."}
function checkEnd(L,now){if(L.over||L.phase!=="live")return;const others=active(L).filter(id=>id!==L.leader).length;
  if(L.leader&&others===0)end(L,now);else if(!L.leader&&active(L).length===0)end(L,now)}
function setTurn(L,id,now){L.turn={pid:id,dl:now+TURN};const b=L.p[id].bot;if(b)b.nx=now+1500+Math.random()*3500}
function advance(L,now){
  const n=L.order.length;for(let k=0;k<n;k++){const prev=L.idx;L.idx=(L.idx+1)%n;if(L.idx<=prev&&prev>=0)L.round++;
    const id=L.order[L.idx];if(L.p[id].in&&id!==L.leader){setTurn(L,id,now);return}}
  end(L,now)}
function out(L,id,why,now){const p=L.p[id];if(!p||!p.in)return;p.in=false;lg(L,`${p.name} ${why}`);
  if(L.turn&&L.turn.pid===id){L.turn=null;advance(L,now)}checkEnd(L,now)}
function doBid(L,id,i,now){
  if(L.phase!=="live"||!L.turn||L.turn.pid!==id||now>L.turn.dl)return false;
  const nb=Math.min(L.cap,L.bid+AB[L.r][i]);if(!(i>=0&&i<6))return false;
  L.bid=nb;L.leader=id;lg(L,`${L.p[id].name}: 🪙${nb}`);if(nb>=L.cap){end(L,now);return true}
  advance(L,now);checkEnd(L,now);return true}
function pass(L,id,now){if(L.phase==="over")return false;out(L,id,"saiu do leilão",now);return true}
function step(L,now){
  if(L.over)return;const el=now-L.key*SLOT;
  if(L.phase==="reg"&&el>=REGMS){
    const real=L.order.filter(id=>!L.p[id].bot).length;
    if(real===0){L.over=true;L.phase="over";L.res="Ninguém se inscreveu. Leilão cancelado.";return}
    if(L.order.length<2){L.over=true;L.phase="over";L.res="Sem concorrentes: leilão cancelado.";lg(L,"cancelado");return}
    L.phase="live";L.round=1;L.idx=-1;lg(L,"🔔 Leilão começou! Cada um tem sua vez.");advance(L,now);return}
  if(L.phase!=="live")return;
  if(el>=LIVE){end(L,now);return}
  const t=L.turn;if(!t)return;const p=L.p[t.pid];
  if(p.bot){if(now>=p.bot.nx){const i=Math.floor(Math.random()*4),nb=Math.min(L.cap,L.bid+AB[L.r][i]);
      if(nb>p.bot.max)out(L,t.pid,"desistiu",now);else doBid(L,t.pid,i,now)}}
  else if(now>t.dl)out(L,t.pid,"perdeu a vez e saiu",now);
}
function pub(L,pid,now){
  const me=L.p[pid],el=now-L.key*SLOT;
  return{key:L.key,r:L.r,pick:L.pick,cap:L.cap,start:L.start,bid:L.bid,buttons:AB[L.r],leader:L.leader?L.p[L.leader].name:null,lead:L.leader===pid,
    phase:L.phase,over:L.over,res:L.res,elapsed:el,now,regLeft:Math.max(0,REGMS-el),round:L.round,
    order:L.order.map(id=>({n:L.p[id].name,in:L.p[id].in,lead:id===L.leader,turn:!!(L.turn&&L.turn.pid===id),me:id===pid,bot:!!L.p[id].bot})),
    turn:L.turn?{name:L.p[L.turn.pid].name,me:L.turn.pid===pid,dl:L.turn.dl}:null,
    me:me?{in:me.in}:null,log:L.log}}
const api={AC,AB,AW,SLOT,REGMS,LIVE,TURN,create,join,addBot,step,doBid,pass,pub,advance};
if(typeof module!=="undefined"&&module.exports)module.exports=api;else root.AuctionEngine=api;
})(typeof window!=="undefined"?window:globalThis);
