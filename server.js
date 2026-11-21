// VacaBox: servidor online (ranking, leilão por turnos e trocas entre jogadores reais).
// Sem dependências. Uso: node server.js   (porta 3000 por padrão)
// Ele também serve o jogo (index.html etc.), então basta hospedar esta pasta como app Node.
// Opcional: UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN guardam os dados num Redis gratuito (sobrevive a reinícios).
const http=require("http"),fs=require("fs"),path=require("path"),crypto=require("crypto"),zlib=require("zlib"),AE=require("./auction-engine.js");
const PORT=+process.env.PORT||3000,BOT=process.env.HOUSE_BOT!=="0",DEBUG=process.env.DEBUG==="1",DATA=path.join(__dirname,"data.json");
const UR=process.env.UPSTASH_REDIS_REST_URL,UT=process.env.UPSTASH_REDIS_REST_TOKEN;
let skew=0;const now=()=>Date.now()+skew;
let D={players:{},trades:{},results:{},accounts:{},sessions:{}};try{D={...D,...JSON.parse(fs.readFileSync(DATA,"utf8"))}}catch(e){}
async function loadRemote(){if(!UR)return;try{const r=await fetch(UR+"/get/vacabox",{headers:{Authorization:"Bearer "+UT}}),j=await r.json();if(j.result)D={...D,...JSON.parse(j.result)};console.log("dados carregados do Redis")}catch(e){console.log("falha ao ler Redis:",e.message)}}
async function saveRemote(){if(!UR)return;try{await fetch(UR,{method:"POST",headers:{Authorization:"Bearer "+UT},body:JSON.stringify(["SET","vacabox",JSON.stringify(D)])})}catch(e){}}
const saveD=()=>{fs.writeFile(DATA,JSON.stringify(D),()=>{});saveRemote()};setInterval(saveD,30000);
const SAVES=path.join(__dirname,"saves");try{fs.mkdirSync(SAVES)}catch(e){}
const hashPw=(pw,salt)=>crypto.scryptSync(pw,salt,32).toString("hex"),okUser=u=>/^[a-z0-9_]{3,20}$/.test(u);
const attempts={};const tooMany=k=>{const t=Date.now();attempts[k]=(attempts[k]||[]).filter(x=>t-x<600000);return attempts[k].length>=10},bad=k=>(attempts[k]=attempts[k]||[]).push(Date.now());
const newSession=u=>{const t=crypto.randomBytes(24).toString("hex");D.sessions[t]={u,t:now()};for(const k of Object.keys(D.sessions))if(now()-D.sessions[k].t>90*86400000)delete D.sessions[k];return t};
const CACHE={};
async function saveBlob(u,str){const gz="gz:"+zlib.gzipSync(str).toString("base64");CACHE[u]=gz;try{await fs.promises.writeFile(path.join(SAVES,u+".json"),gz)}catch(e){}if(UR){try{await fetch(UR,{method:"POST",headers:{Authorization:"Bearer "+UT},body:JSON.stringify(["SET","vbsave:"+u,gz])})}catch(e){}}}
async function loadBlob(u){let g=CACHE[u]||null;if(!g&&UR){try{const r=await fetch(UR+"/get/vbsave:"+encodeURIComponent(u),{headers:{Authorization:"Bearer "+UT}}),j=await r.json();if(j.result)g=j.result}catch(e){}}
  if(!g){try{g=fs.readFileSync(path.join(SAVES,u+".json"),"utf8")}catch(e){return null}}
  try{return g.startsWith("gz:")?zlib.gunzipSync(Buffer.from(g.slice(3),"base64")).toString():g}catch(e){return null}}
const cleanName=n=>String(n||"Fazenda").replace(/[<>&"]/g,"").slice(0,24)||"Fazenda",okPid=p=>/^[a-z0-9]{6,40}$/.test(String(p||""));
let AU=null;
function settle(){
  if(!AU||!AU.over||AU.settled)return;AU.settled=true;
  if(AU.winner&&!AU.p[AU.winner].bot)D.results[AU.key]={pid:AU.winner,name:AU.p[AU.winner].name,bid:AU.bid,r:AU.r,pick:AU.pick,claimed:false,t:now()};
  for(const k of Object.keys(D.results))if(now()-D.results[k].t>6*3600000)delete D.results[k];
}
function step(){
  const t=now(),k=Math.floor(t/AE.SLOT);
  if(!AU||AU.key!==k){settle();AU=AE.create(k);if(BOT)AE.addBot(AU,"bot1","Casa 🤖",k)}
  AE.step(AU,t);settle();
}
setInterval(step,500);
function pub(pid){step();const o=AE.pub(AU,pid,now());
  o.claims=Object.entries(D.results).filter(([k,r])=>r.pid===pid&&!r.claimed).map(([k,r])=>({key:+k,bid:r.bid,r:r.r,pick:r.pick}));
  o.players=Object.keys(D.players).length;return o}
const J=(res,code,o)=>{res.writeHead(code,{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Cache-Control":"no-store"});res.end(JSON.stringify(o))};
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript",".css":"text/css",".json":"application/json",".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain; charset=utf-8"};
const HIDE=new Set(["server.js","data.json","package.json"]);
http.createServer((req,res)=>{
  const u=new URL(req.url,"http://x"),p=u.pathname;
  if(req.method==="OPTIONS"){res.writeHead(204,{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type"});return res.end()}
  if(!p.startsWith("/api/")){
    const f=p==="/"?"index.html":decodeURIComponent(p.slice(1)),full=path.join(__dirname,f);
    if(!full.startsWith(__dirname)||HIDE.has(f)||f.startsWith("saves")||f.startsWith(".")||!fs.existsSync(full)||fs.statSync(full).isDirectory()){res.writeHead(404);return res.end("404")}
    res.writeHead(200,{"Content-Type":MIME[path.extname(full)]||"application/octet-stream"});return fs.createReadStream(full).pipe(res)}
  let body="";const lim=p==="/api/account/save"?4e6:20000;req.on("data",c=>{body+=c;if(body.length>lim)req.destroy()});
  req.on("end",async()=>{
    let b={};try{if(body)b=JSON.parse(body)}catch(e){return J(res,400,{error:"json"})}
    const pid=b.pid||u.searchParams.get("pid");
    try{
      if(p==="/api/ping")return J(res,200,{vacabox:1,players:Object.keys(D.players).length});
      if(p==="/api/_skew"&&DEBUG){skew+=+b.ms||0;step();return J(res,200,{skew})}
      const ip=String(req.headers["x-forwarded-for"]||req.socket.remoteAddress||"").split(",")[0].trim();
      if(p==="/api/account/register"&&req.method==="POST"){const u=String(b.user||"").trim().toLowerCase(),pw=String(b.pass||"");
        if(tooMany("r"+ip))return J(res,429,{error:"muitas"});bad("r"+ip);
        if(!okUser(u)||pw.length<6||pw.length>100)return J(res,400,{error:"dados"});if(D.accounts[u])return J(res,409,{error:"existe"});
        const salt=crypto.randomBytes(16).toString("hex");D.accounts[u]={salt,hash:hashPw(pw,salt),t:now(),ts:0};const token=newSession(u);saveD();return J(res,200,{user:u,token})}
      if(p==="/api/account/login"&&req.method==="POST"){const u=String(b.user||"").trim().toLowerCase(),pw=String(b.pass||""),k="l"+ip+u;
        if(tooMany(k))return J(res,429,{error:"muitas"});const a=D.accounts[u];
        if(!a||!crypto.timingSafeEqual(Buffer.from(hashPw(pw,a.salt),"hex"),Buffer.from(a.hash,"hex"))){bad(k);return J(res,401,{error:"login"})}
        const token=newSession(u);saveD();return J(res,200,{user:u,token})}
      if(p==="/api/account/save"&&req.method==="POST"){const ss=D.sessions[b.token];if(!ss)return J(res,401,{error:"sessao"});
        if(!b.save||typeof b.save!=="object"||!Array.isArray(b.save.cows))return J(res,400,{error:"save"});
        await saveBlob(ss.u,JSON.stringify(b.save));D.accounts[ss.u].ts=now();return J(res,200,{ts:D.accounts[ss.u].ts})}
      if(p==="/api/account/load"){const ss=D.sessions[u.searchParams.get("token")];if(!ss)return J(res,401,{error:"sessao"});const a=D.accounts[ss.u];
        if(u.searchParams.get("only")==="ts")return J(res,200,{ts:a.ts||0});const raw=await loadBlob(ss.u);return J(res,200,{save:raw?JSON.parse(raw):null,ts:a.ts||0})}
      if(!okPid(pid))return J(res,400,{error:"pid"});
      if(p==="/api/score"&&req.method==="POST"){const s=Math.max(0,Math.min(1e15,+b.score||0)),o=D.players[pid]||{s:0};D.players[pid]={n:cleanName(b.name),s:Math.max(o.s,s),t:now()};return J(res,200,{ok:1})}
      if(p==="/api/ranking"){const all=Object.entries(D.players).map(([id,x])=>({id,n:x.n,s:x.s})).sort((a,c)=>c.s-a.s),top=all.slice(0,50).map(x=>({n:x.n,s:x.s,me:x.id===pid})),i=all.findIndex(x=>x.id===pid);
        if(i>=50)top.push({n:all[i].n,s:all[i].s,me:true});return J(res,200,{top,rank:i<0?all.length+1:i+1,total:all.length})}
      if(p==="/api/auction"&&req.method==="GET")return J(res,200,pub(pid));
      if(p==="/api/auction/join"){step();AE.join(AU,pid,cleanName(b.name));return J(res,200,pub(pid))}
      if(p==="/api/auction/bid"){step();AE.doBid(AU,pid,+b.p,now());step();return J(res,200,pub(pid))}
      if(p==="/api/auction/pass"){step();AE.pass(AU,pid,now());step();return J(res,200,pub(pid))}
      if(p==="/api/auction/claim"){const r=D.results[b.key];if(!r||r.pid!==pid||r.claimed)return J(res,404,{error:"nada"});r.claimed=true;return J(res,200,{bid:r.bid,r:r.r,pick:r.pick})}
      if(p==="/api/trade/offer"){const c=b.cow||{};if(!c.t)return J(res,400,{error:"cow"});let code;do{code=String(100000+Math.floor(Math.random()*900000))}while(D.trades[code]);
        D.trades[code]={pid,cow:{t:String(c.t).slice(0,40),L:Math.max(1,Math.min(9999,+c.L||1)),nick:String(c.nick||"").slice(0,16)},t:now()};
        for(const k of Object.keys(D.trades))if(now()-D.trades[k].t>48*3600000)delete D.trades[k];return J(res,200,{code})}
      if(p==="/api/trade/redeem"){const x=D.trades[b.code];if(!x)return J(res,404,{error:"codigo"});delete D.trades[b.code];return J(res,200,{cow:x.cow})}
      if(p==="/api/trade/cancel"){const x=D.trades[b.code];if(!x||x.pid!==pid)return J(res,404,{error:"codigo"});delete D.trades[b.code];return J(res,200,{cow:x.cow})}
      return J(res,404,{error:"rota"});
    }catch(e){console.error(e);J(res,500,{error:"erro"})}
  });
}).listen(PORT,async()=>{await loadRemote();step();console.log(`VacaBox online em http://localhost:${PORT}  (bot da casa: ${BOT?"ligado":"desligado"}, Redis: ${UR?"sim":"não"})`)});
process.on("SIGINT",()=>{fs.writeFileSync(DATA,JSON.stringify(D));process.exit()});
