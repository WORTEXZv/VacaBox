/* ===== VacaBox v10 · núcleo =====
   Diamantes 💎 · raridades Ultimate (3.500 vacas) · leite fixo da Única · Etapas · Passe · Marcos · Habilidades
   Tudo aqui é aditivo: sobrescreve funções antigas em vez de editá-las. Ajuste os números nas constantes. */
(function(){
"use strict";
const VB=window.VB=window.VB||{};
VB.act={};VB.mods=[];VB.deltas=[];VB.tickers=[];VB.afterRender=[];VB.sfx=VB.sfx||function(){};
const H=VB.H=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const dayKey=(t=Date.now())=>{const d=new Date(t);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
VB.dayKey=dayKey;

/* ---------- estado novo (state.x) ---------- */
const XD=()=>({dia:0,init:0,ult:{n:0},sk:{},tix:{},sets:{},cos:{},hist:{},last:null,etab:"box",pot:{},buf:{},lv:{xp:0,seen:1},pity:{},
 pm:{d:"",base:{},list:[],bonus:0,w:-1,wbase:{},wlist:[]},cfg:{sell:{},keepNew:1,auto:{on:0,box:"verde",gap:4,stopR:5,reserve:0},as:{n:0,sold:0,coins:0}},
 pass:{s:-1,xp:0,own:0,cl:{}},
 prof:{av:"",fr:"wood",ba:"pasto",nc:"white",na:"none",ti:"",bio:"",bd:[],pet:0,fx:"none",st:""},
 opts:{snd:1,theme:"dark",fs:1,notif:0,lite:-1},
 farm:{vet:0,vax:0,sick:{},dairy:{q:[],st:{}},decor:{own:{},on:{},pos:{}},shownAt:0},
 login:{last:"",streak:0,spin:""},show:{w:-1,done:0,claimed:-1},boss:{w:-1,c:0,sent:0,cl:{}},soc:{friends:[],clan:null,gifts:{},code:""}});
const dm=(t,d)=>{for(const k in d){if(d[k]&&typeof d[k]==="object"&&!Array.isArray(d[k])){if(!t[k]||typeof t[k]!=="object")t[k]={};dm(t[k],d[k])}else if(t[k]===undefined)t[k]=d[k]}};
const PASS_LV=90,PASS_XP=20,PASS_DAYS=14,XV="11";
const passIdx=()=>Math.floor((Date.now()-WEEK0)/(PASS_DAYS*864e5));
function initX(){
  if(!state.x||typeof state.x!=="object")state.x={};
  let x=state.x;
  if(x.ok!==XV){dm(x,XD());x.ok=XV;if(!x.init){x.init=1;state.cows.forEach(c=>c.v10=1);x.last=null}}
  if(x.pass.s!==passIdx())x.pass={s:passIdx(),xp:0,own:0,cl:{}};
  return x}
VB.X=()=>initX();
VB.addDia=(n,quiet)=>{const x=initX();const bonus=Math.random()<.05*VB.sk("garimpo")?1:0;x.dia+=n+bonus;if(!quiet)toast(`💎 +${n+bonus} diamante${n+bonus>1?"s":""}!`);VB.sfx("dia");return n+bonus};
VB.xp=()=>{};   /* o XP do passe agora só vem das missões do próprio passe */
VB.passXp=n=>{const x=initX();x.pass.xp+=n*(1+.06*VB.sk("passo"))};
VB.PASS={LV:PASS_LV,XP:PASS_XP,DAYS:PASS_DAYS,idx:passIdx};

/* ---------- raridades Ultimate (acima da Única) ---------- */
const UR=[["Soberana","#6fd8ff"],["Celestial","#b39bff"],["Primordial","#ff8fcf"],["Eterna","#ffd45f"],["Transcendente","#7dffb8"],["Infinita","#ff7b7b"],["Suprema","#ffffff"]];
const UL=[260,420,700,1100,1800,3000,5000],USELL=[2e4,5e4,12e4,3e5,75e4,2e6,5e6];
VB.UR=UR;VB.ULT0=7;
UR.forEach((u,j)=>{RN.push(u[0]);RC.push("u"+(7+j));MILK.push([UL[j],UL[j]]);SELL.push(USELL[j]);DIFF.push(.02)});
MILK[6]=[150,150];                       // Única: quantidade fixa (não enche mais o tanque)
const NO="Fênix Dragão Grifo Unicórnio Pégaso Quimera Hidra Kraken Sereia Titã Valquíria Minotauro Basilisco Leviatã Behemoth Esfinge Centauro Mantícora Naga Roc Golem Djinn Serafim Colosso Lobo-Alado".split(" ");
const AD=["Solar Lunar Estelar Cometa Aurora Abissal Cristalina Ígnea Glacial Celeste Dourada Prateada Safira Esmeralda Rubra Violeta Onírica Rúnica Sagrada Etérea",
"Nebular Zodiacal Eclíptica Orbital Galáctica Polar Meteórica Luminosa Radiante Silente Boreal Austral Vespertina Matutina Equinocial Solsticial Perene Imortal Lendária Gloriosa",
"Ancestral Original Primeva Genesis Alfa Telúrica Oceânica Tectônica Elemental Cósmica Selvagem Fundadora Imemorial Arcaica Tribal Totêmica Eólica Magmática Verdejante Rochosa",
"Perpétua Duradoura Inabalável Atemporal Vitalícia Perene-Real Sempiterna Incorrupta Inquebrável Sagrada-Real Constante Indelével Vigilante Eterna-Viva Soberba Estoica Resoluta Intacta Venerável Perenial",
"Prismática Holográfica Dimensional Paradoxal Quântica Astral Fractal Espectral Translúcida Ressonante Vórtice Singular Metafísica Onisciente Transmutada Oracular Harmônica Cintilante Ascendente Sublime",
"Ilimitada Insondável Incontável Ilusória Imensurável Sem-Fim Vasta Abundante Profunda Total Plena Absoluta-Infinita Eônica Transfinita Omnipresente Ubíqua Perpétua-Infinita Incomensurável Pandimensional Ilimitável",
"Suprema Divina Onipotente Magnânima Majestosa Imperial Coroada Reluzente Celebrada Triunfal Invicta Altíssima Excelsa Insuperável Final Definitiva Derradeira Ômega Apoteótica Consagrada"].map(s=>s.split(" "));
for(let j=0;j<7;j++){const r=7+j;for(let i=0;i<500;i++){const n=i%25,a=Math.floor(i/25),h=(i*137.508+j*40)%360,sa=58+j*5,li=46+(i%5)*4;
  const c={id:`u${r}_${i}`,name:NO[n]+" "+AD[j][a],r,weight:1,ult:1,body:`hsl(${h|0},${sa}%,${li}%)`,spots:`hsl(${((h+150+j*20)%360)|0},${sa}%,${Math.max(18,li-30)}%)`,pat:(i*3+j)%10};
  COWS.push(c);CBY.set(c.id,c)}}
VB.ULTCOWS=COWS.filter(c=>c.ult);

/* ---------- efeitos visuais das Ultimate no SVG ---------- */
const _cs=cowSVG;
cowSVG=function(c,ex){let s=_cs(c,ex);
  if(c&&c.r>=7){const j=c.r-7,col=UR[j][1],rb=j===6;
    s=s.replace('class="','class="ult u'+c.r+' ');
    const halo=`<defs><radialGradient id="ug${c.r}"><stop offset="0" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs><circle cx="150" cy="105" r="${96+j*2}" fill="url(#ug${c.r})"><animate attributeName="r" values="${90+j*2};${102+j*2};${90+j*2}" dur="${3.2-j*.2}s" repeatCount="indefinite"/></circle>`;
    const stars=[[60,40,0],[240,34,.5],[40,120,1],[262,110,1.5],[150,18,.8],[96,170,1.2],[210,176,.3],[28,70,.9],[276,60,1.7]].slice(0,4+j).map(([x,y,b])=>`<text x="${x}" y="${y}" font-size="${14+j}" fill="${col}" text-anchor="middle">${j>3?"✦":"✧"}<animate attributeName="opacity" values="0;1;0" dur="${1.8-j*.08}s" begin="${b}s" repeatCount="indefinite"/></text>`).join("");
    s=s.replace(/>/,">"+halo).replace("</svg>",stars+"</svg>");}
  return s};

/* ---------- multiplicadores de leite e overrides ---------- */
VB.mm=c=>VB.mods.reduce((a,f)=>a*f(c),1);
VB.sk=id=>{const x=state.x;return x&&x.sk&&x.sk[id]||0};
VB.mods.push(()=>1+.04*VB.sk("milk"));
VB.mods.push(c=>{const t=type(c);return t&&t.r>=7?1+.03*VB.sk("aura"):1});
milkAmount=function(c){const t=type(c),space=tankCap()-state.milk;
  const care=(state.trough.u>0?1:.7)*(state.water>0?1:.7)*(state.manure>=manCap()?.7:1)*(1+curFx().m/100);
  const v=c.L*season().f*care*(1+.1*state.up.ordenha)*(1+.1*state.rb)*VB.mm(c);
  return Math.max(0,Math.min(space,Math.max(1,Math.round(v))))};
const _dm=doMilk;
doMilk=function(c){const u0=state.trough.u,L=_dm(c);
  if(state.trough.u<u0&&Math.random()<.04*VB.sk("racao"))state.trough.u=u0;
  (VB.onMilk||[]).forEach(f=>{try{f(c,L)}catch(e){console.error(e)}});return L};
const _sm=sellMilk;
sellMilk=function(){const g=_sm(),b=(VB.sellBonus?VB.sellBonus():0);if(b>0)earn(g*b);return g*(1+b)};
VB.sellBonus=()=>.03*VB.sk("sell");
const _pb=pickByP;
pickByP=function(box){let a=_pb(box);const L=VB.sk("luck");if(L&&!box.ex&&Math.random()<.04*L){const b=_pb(box);if(b.r>a.r)a=b}return a};
const _db=doBreed;
doBreed=function(){const cw=cowBy(selCow);if(cw&&type(cw).r>=7)return toast("🚫 Vacas Ultimate não podem procriar.");return _db()};
const _tg=window.tradeGen;
if(typeof _tg==="function")tradeGen=function(cw){if(cw&&type(cw).r>=7){toast("🚫 Vacas Ultimate não podem ser trocadas.");return}return _tg(cw)};

/* ---------- vacas novas: migração e ganchos ---------- */
function ensureCows(){let ch=0;const fresh=true;
  for(const c of state.cows){if(c.v10)continue;c.v10=1;const t=type(c);if(!t)continue;
    if(t.r>=6)c.L=MILK[t.r][0];
    if(VB.newCowHook)VB.newCowHook(c,t,fresh);ch++}
  for(const c of state.cows){const t=type(c);if(t&&t.r>=6&&c.L!==MILK[t.r][0])c.L=MILK[t.r][0]}
  if(ch)save();return ch}
VB.ensureCows=ensureCows;
const _rcalf=revealCalf;
revealCalf=function(k){const n0=state.cows.length,m=state.cows.find(c=>c.t===k.mt);const tr=m&&m.tr;
  _rcalf(k);if(state.cows.length>n0&&tr){const nc=state.cows[state.cows.length-1];nc.v10=0;nc.inh=tr}};

/* ---------- topo: 💎 e botão de perfil ---------- */
function setupTop(){const co=document.querySelector(".coins");if(!co||$("#rbar"))return;
  const rb=document.createElement("div");rb.id="rbar";rb.className="rbar";co.parentNode.insertBefore(rb,co);rb.appendChild(co);
  rb.insertAdjacentHTML("beforeend",`<div class="dias" title="Diamantes">💎 <span id="dias">0</span></div><button class="pfbtn" id="pfBtn" data-x="pf" aria-label="Abrir perfil"></button>`)}
VB.avatar=function(size,pf){pf=pf||state.x.prof;const t=pf.av&&CBY.get(pf.av)||null;
  const svg=t?cowSVG(t).replace('viewBox="0 0 300 220"','viewBox="190 34 100 100"'):`<span class="avdef">🐄</span>`;
  return `<div class="avt fr-${pf.fr||"none"}" style="--s:${size}px"><div class="avin">${svg}</div></div>`};
let pfSig="";
function paintTop(){const x=state.x;if($("#dias"))$("#dias").textContent=fmt(x.dia);
  const sig=x.prof.av+"|"+x.prof.fr;if(sig!==pfSig&&$("#pfBtn")){pfSig=sig;$("#pfBtn").innerHTML=VB.avatar(40)}}

/* ---------- navegação e páginas ---------- */
function mkPage(id,key){if(!document.getElementById("page"+key)){const d=document.createElement("div");d.id="page"+key;d.className="page hidden";d.innerHTML=`<div id="${id}v"></div>`;document.querySelector(".container").appendChild(d)}PG[id]=key}
mkPage("pass","Pass");mkPage("etapas","Etapas");
renderNav=function(){const ev=activeEvents();
  const items=[["home","📦 Caixas"],["farm","🏡 Fazenda"],["comp","📚 Compêndio"],["shop","🛒 Loja"],["pass","🎟️ Passe"]];
  if(state.rb>=1||state.x.ult.n>0)items.push(["etapas","🌌 Etapas"]);
  items.push(["rank","🥇 Ranking"],...ev.map(e=>["ev:"+e.id,e.e+" "+e.n]),["auction","🔨 Leilão"],["more","📋 Mais"]);
  const h=items.map(([p,l])=>{const e=ev.find(x=>"ev:"+x.id===p);return `<button class="secondary ${page===p?"on":""} ${e?"evb":""}" ${e?`style="--eh:${e.h}"`:""} onclick="showPage('${p}')">${l}</button>`}).join("");
  if(renderNav.h!==h){const n=$("#nav");n.innerHTML=h;renderNav.h=h;navArrows();const on=n.querySelector(".on");if(on&&on.scrollIntoView)on.scrollIntoView({inline:"center",block:"nearest"})}};
const _render=render;
render=function(){initX();_render();paintTop();
  if(page==="pass")renderPass();if(page==="etapas")renderEtapas();
  if(page==="home"&&VB.decorHome)VB.decorHome();
  (VB.afterRender||[]).forEach(f=>{try{f()}catch(e){console.error(e)}})};
document.addEventListener("click",e=>{const b=e.target.closest("[data-x]");if(!b||b.disabled)return;const f=VB.act[b.dataset.x];if(f){e.preventDefault();f(b,e)}});

/* ---------- caixas Ultimate ---------- */
const ULTB=[[1,30,"🔮"],[5,80,"🌠"],[10,170,"🪐"],[15,350,"🌀"],[20,700,"☄️"],[25,1400,"🌌"],[30,2800,"👑"]].map(([rb,price,e],k)=>({k,rb,price,e,n:"Caixa Ultimate "+["I","II","III","IV","V","VI","VII"][k]}));
VB.ULTB=ULTB;
/* chances: quanto melhor a caixa, mais difícil é tirar as vacas mais altas dela */
const TOPS=[3,2,1.6,1.2,.9,.6,0],MAINS=[70,60,52,45,38,32,26];
function ultOdds(k){const w=Array(7).fill(0),top=TOPS[k],sec=top*6;w[k]=MAINS[k];if(k+1<7)w[k+1]=sec;if(k+2<7)w[k+2]=top;
  const rest=100-w.reduce((a,b)=>a+b,0);if(k>0)w[k-1]=rest;else w[k]+=rest;return w}
function ultPity(k){const o=ultOdds(k),t=Math.min(6,k+1);return{t,n:Math.max(10,Math.min(40,Math.round(70/Math.max(.5,o[t]))))}}
VB.ultOdds=ultOdds;VB.ultPity=ultPity;
function pickUlt(k,force){const o=ultOdds(k).slice(),pt=ultPity(k);if(force)for(let i=0;i<pt.t;i++)o[i]=0;
  const tot=o.reduce((a,b)=>a+b,0);let r=Math.random()*tot,j=pt.t;for(let i=0;i<7;i++){if(o[i]>0&&(r-=o[i])<=0){j=i;break}}
  const l=VB.ULTCOWS.filter(c=>c.r===7+j);return l[Math.floor(Math.random()*l.length)]}
async function openUlt(k){if(openingBusy)return;const b=ULTB[k],x=initX();
  if(state.rb<b.rb)return toast(`🔒 Precisa de ${b.rb} renascimentos.`);
  if(full())return toast("Sua fazenda está cheia! Venda vacas ou melhore o Curral.");
  if(x.dia<b.price&&!state.dev.free)return toast("💎 Diamantes insuficientes.");
  openingBusy=true;if(!state.dev.free)x.dia-=b.price;x.ult.n++;S("ultBoxes");save();render();showModal();
  try{const icon=$("#caseWrap .case-icon");icon.textContent=b.e;VB.sfx("shake");icon.classList.add("shake");await animateProgress(1700);icon.classList.remove("shake");icon.classList.add("openCaseAnim");await delay(480);
    const pt=ultPity(k),key="u"+k,pc=x.pity[key]||0,cow=pickUlt(k,pc+1>=pt.n),isNew=!state.seen.includes(cow.id);x.pity[key]=cow.r-7>=pt.t?0:pc+1;
    S("gotU"+cow.r);newCow(cow);if(isNew)state.seen.push(cow.id);save();await delay(120);showResult(cow,isNew)}
  catch(err){console.error(err);openingBusy=false;$("#modal").classList.add("hidden");render()}}
VB.act.ult=b=>openUlt(+b.dataset.k);
const _sr=showResult;
showResult=function(c,isNew){ensureCows();_sr(c,isNew);const cc=state.cows[state.cows.length-1];
  if(cc&&cc.sh){const e=$("#resultName");e.innerHTML=H(c.name)+' <span class="shb">✨ Brilhante</span>'}
  if(c.r>=5&&VB.revealFx)VB.revealFx(c);else VB.sfx(c.r>=3?"good":"pop")};
VB.act.tix=b=>{const x=initX(),id=b.dataset.id;if(!(x.tix[id]>0))return;if(full())return toast("Fazenda cheia!");
  x.tix[id]--;if(!x.tix[id])delete x.tix[id];const f=state.dev.free;state.dev.free=true;openCase(id);state.dev.free=f;save()};

/* ---------- habilidades (pontos = renascimentos) ---------- */
const SK=[["milk","🥛","Ordenha Dourada",l=>`+${4*l}% de leite`],["luck","🍀","Faro de Sorte",l=>`${4*l}% de chance de sortear de novo nas caixas`],["sell","💰","Negociante",l=>`+${3*l}% na venda de leite`],
["racao","🌾","Economia de Ração",l=>`${4*l}% de chance de não gastar comida`],["garimpo","💎","Garimpeiro",l=>`${5*l}% de chance de +1 💎 em cada ganho`],["imune","🩺","Imunidade",l=>`−${8*l}% de chance de doença`],
["shiny","✨","Olho de Colecionador",l=>`+${.5*l}% de chance de vaca brilhante`],["laticinio","🧀","Laticínios Eficientes",l=>`+${6*l}% de valor na Fábrica`],["aura","🌟","Aura Ultimate",l=>`+${3*l}% de leite nas vacas Ultimate`],["passo","🎟️","Passe Veloz",l=>`+${6*l}% de XP do Passe`]];
VB.SK=SK;const SKMAX=5,skCost=l=>Math.ceil(l/2);
const skSpent=()=>SK.reduce((a,s)=>{let t=0;for(let l=1;l<=(state.x.sk[s[0]]||0);l++)t+=skCost(l);return a+t},0);
VB.skFree=()=>Math.max(0,state.rb-skSpent());
VB.act.skup=b=>{const id=b.dataset.id,x=initX(),l=(x.sk[id]||0)+1;if(l>SKMAX)return;if(VB.skFree()<skCost(l))return toast("Sem pontos de habilidade.");x.sk[id]=l;VB.sfx("good");save();render()};
VB.act.skreset=()=>{if(!confirm("Redistribuir todos os pontos de habilidade?"))return;state.x.sk={};save();render()};

/* ---------- Etapas ---------- */
function renderEtapas(){const x=initX(),el=$("#etapasv");
  if(state.rb<1&&!x.ult.n){el.innerHTML=`<h1>🌌 Etapas</h1><div class="empty">🔒 Renasça uma vez (Loja → Renascimento) para liberar as Etapas e as Caixas Ultimate.</div>`;return}
  const tabs=[["box","📦 Caixas Ultimate"],["sk","🌳 Habilidades"],["col","📖 Coleção Ultimate"]];
  let body="";
  if(x.etab==="box"){
    body=`<p class="dsc">Cada <b>5 renascimentos</b> libera uma Caixa Ultimate nova: mais cara e com raridades melhores. Elas só aceitam 💎 Diamantes e guardam as vacas acima da Única.</p><div class="ugrid">`+ULTB.map(b=>{
      const lock=state.rb<b.rb,odds=ultOdds(b.k),pt=ultPity(b.k),pc=x.pity["u"+b.k]||0,can=!lock&&x.dia>=b.price&&!full();
      return `<article class="ubox ${lock?"lock":""}" style="--uc:${UR[Math.min(6,b.k+1)][1]}"><div class="ue">${lock?"🔒":b.e}</div><h3>${b.n}</h3>
      <div class="chips">${odds.map((p,j)=>p>0?`<span class="badge u${7+j} bigchip">${UR[j][0]} <b>${fmt(Math.round(p*100)/100)}%</b></span>`:"").join("")}</div>
      <div class="pity"><div class="bar lv"><i style="width:${Math.min(100,pc/pt.n*100)}%"></i></div><small>🎯 <b>${UR[pt.t][0]}</b> ou melhor garantida em ${pt.n} aberturas · faltam <b>${Math.max(1,pt.n-pc)}</b></small></div>
      <div class="price dprice">💎 ${fmt(b.price)}</div>
      ${lock?`<p class="dsc sm">Desbloqueia com <b>${b.rb}</b> renascimentos (você tem ${state.rb})</p>`:""}
      <button class="primary" data-x="ult" data-k="${b.k}" ${can||state.dev.free&&!lock&&!full()?"":"disabled"}>${full()?"Fazenda cheia":x.dia<b.price&&!lock?"Faltam 💎 "+fmt(b.price-x.dia):"Abrir caixa"}</button></article>`}).join("")+`</div>
      <p class="dsc sm">Onde ganhar 💎: <b>Marcos</b> (difíceis), <b>Passe</b>, <b>Bônus diário</b> (7 dias seguidos), troféus do ranking, exposição e chefe global.</p>`}
  else if(x.etab==="sk"){
    body=`<p class="dsc">Você ganha <b>1 ponto</b> a cada renascimento. Os pontos valem para sempre. <b>Pontos livres: ${VB.skFree()}</b> / ${state.rb} <button class="secondary" data-x="skreset">↺ Redistribuir</button></p><div class="skgrid">`+SK.map(([id,e,n,d])=>{const l=x.sk[id]||0,nx=l+1,cost=nx<=SKMAX?skCost(nx):0;
      return `<div class="sk ${l?"on":""}"><div class="ske">${e}</div><div><b>${n}</b><br><small>${l?d(l):"Ainda não aprendida"}</small><div class="skpips">${Array.from({length:SKMAX},(_,i)=>`<i class="${i<l?"f":""}"></i>`).join("")}</div></div>
      <button class="primary" data-x="skup" data-id="${id}" ${l>=SKMAX||VB.skFree()<cost?"disabled":""}>${l>=SKMAX?"MAX":"+1 · "+cost+" pt"}</button></div>`}).join("")+`</div>`}
  else{
    body=`<p class="dsc">Você descobriu <b>${VB.ULTCOWS.filter(c=>state.seen.includes(c.id)).length}</b> de <b>${VB.ULTCOWS.length}</b> vacas Ultimate. Veja todas no Compêndio.</p><div class="ugrid">`+UR.map((u,j)=>{const l=VB.ULTCOWS.filter(c=>c.r===7+j),n=l.filter(c=>state.seen.includes(c.id)).length;
      return `<div class="ubox" style="--uc:${u[1]}"><span class="badge u${7+j}">${u[0]}</span><div class="dsc">${n}/500</div><div class="bar lv"><i style="width:${n/5}%"></i></div><small>🥛 ${fmt(MILK[7+j][0])} L fixos por ordenha</small></div>`}).join("")+`</div><button class="primary" onclick="compR=7;compN=60;showPage('comp')">📚 Abrir no Compêndio</button>`}
  el.innerHTML=`<h1 style="margin:0 0 6px">🌌 Etapas</h1><div class="xhead"><span>♻️ Renascimentos: <b>${state.rb}</b></span><span>💎 <b>${fmt(x.dia)}</b></span><span>🌳 Pontos: <b>${VB.skFree()}</b></span></div>
  <div class="tabs">${tabs.map(([k,l])=>`<button class="secondary ${x.etab===k?"on":""}" data-x="etab" data-t="${k}">${l}</button>`).join("")}</div>${body}`}
VB.act.etab=b=>{state.x.etab=b.dataset.t;render()};

/* ---------- Passe ---------- */
const BT=["campo","celeiro","prata","dourada","cosmica"];
const boxName=id=>(allBoxes().find(b=>b.id===id)||{name:id}).name;
VB.boxName=boxName;
function giveRew(list){if(list.some(i=>i.k==="cow")&&full()){toast("Fazenda cheia! Libere espaço para receber a vaca.");return false}
  for(const i of list){if(i.k==="coin")earn(i.a);else if(i.k==="dia")VB.addDia(i.a,true);else if(i.k==="box"){state.x.tix[i.id]=(state.x.tix[i.id]||0)+1}
    else if(i.k==="pot"){state.x.pot[i.id]=(state.x.pot[i.id]||0)+(i.n||1)}
    else if(i.k==="cos"){state.x.cos[i.t+":"+i.id]=1}
    else if(i.k==="cow"){const l=REG.filter(c=>c.r===i.r),t=l[Math.floor(Math.random()*l.length)];newCow(t);if(!state.seen.includes(t.id))state.seen.push(t.id);toast(`🐄 Você ganhou ${t.name} (${RN[t.r]})!`);confetti()}}
  return true}
VB.giveRew=giveRew;
const passLvl=()=>Math.min(PASS_LV,Math.floor(pass().xp/PASS_XP));
VB.passLvl=passLvl;const pass=()=>initX().pass;
function renderPass(){if(VB.renderPass)VB.renderPass()}
VB.decorHome=function(){const x=state.x,t=Object.entries(x.tix).filter(([id,n])=>n>0);let e=$("#tixstrip");if(e)e.remove();if(!t.length)return;
  $("#boxes").insertAdjacentHTML("beforebegin",`<div class="panel" id="tixstrip"><h3>🎟️ Você tem caixas grátis</h3>${t.map(([id,n])=>`<button class="secondary" data-x="tix" data-id="${id}">Abrir ${H(boxName(id))} ×${n}</button>`).join("")}</div>`)};

/* ---------- Marcos: bem mais difíceis e dão 💎 ---------- */
const LADH={};MK.forEach(m=>{LADH[m[0]]=LAD[m[0]].map((g,t)=>Math.ceil(g*(4+.4*t)))});
const mrew=(m,t)=>Math.round(mkRew(m,t)*(4+.4*t)),marcoDia=t=>(t+1)%6===0?1+Math.floor((t+1)/18):0;
function marcosHTML(){return `<p class="dsc">Marcos são missões permanentes <b>muito difíceis</b>. Algumas etapas pagam 🪙 e, de vez em quando, 💎 <b>(poucos!)</b>. Ao resgatar, o contador zera e a próxima etapa fica mais difícil.</p>`+MK.map(m=>{const k=m[0],lad=LADH[k],t=state.mt[k]||0;
  if(t>=lad.length)return `<div class="fuse locked"><span>✅ <b>${m[1]} ${m[2]}</b> · todas concluídas</span></div>`;
  const g=lad[t],p=Math.min(g,ladProg(k)),d=marcoDia(t);
  return `<div class="fuse"><span><b>${mkLabel(m,g)}</b> <small>(etapa ${t+1}/${lad.length})</small><br><small>${fmt(p)}/${fmt(g)} · prêmio 🪙${fmt(mrew(m,t))}${d?` · <b class="dtxt">💎 ${d}</b>`:""}</small><div class="bar lv"><i style="width:${p/g*100}%"></i></div></span><button class="primary" data-a="mlad" data-k="${k}" ${p>=g?"":"disabled"}>Resgatar</button></div>`}).join("")}
const _ea=extraAction;
extraAction=function(a,b,c){
  if(a==="mlad"){const k=b.dataset.k,m=MK.find(x=>x[0]===k),t=state.mt[k]||0;
    if(m&&LADH[k][t]!=null&&ladProg(k)>=LADH[k][t]){const r=mrew(m,t),d=marcoDia(t);state.coins+=r;state.mt[k]=t+1;state.mb[k]=st(k);VB.xp(60);
      toast(`Marco cumprido! +🪙${fmt(r)}${d?" · 💎 +"+d:""}`);if(d)VB.addDia(d,true);VB.sfx("claim");save();render()}return true}
  if(a==="mclaim"){const m=state.missions.list[+b.dataset.i],was=m&&m.done,r=_ea(a,b,c);if(m&&!was&&m.done){VB.xp(20);VB.sfx("claim")}return r}
  return _ea(a,b,c)};
const _rm=renderMore;
renderMore=function(){if(moreTab==="perf")moreTab="mis";_rm();const root=$("#more"),tabs=root&&root.querySelector(".tabs");if(!tabs)return;
  const pf=tabs.querySelector('[data-t="perf"]');if(pf)pf.remove();
  (VB.moreTabs||[]).forEach(([k,l])=>{if(!tabs.querySelector(`[data-t="${k}"]`))tabs.insertAdjacentHTML("beforeend",`<button class="secondary ${moreTab===k?"on":""}" data-a="mtab" data-t="${k}">${l}</button>`)});
  let html=null;if(moreTab==="lad")html=marcosHTML();else if(VB.moreBody&&VB.moreBody[moreTab])html=VB.moreBody[moreTab]();
  if(html!=null){while(tabs.nextSibling)tabs.nextSibling.remove();tabs.insertAdjacentHTML("afterend",html)}};

/* ---------- renascimento preserva o que é permanente ---------- */
const _rb=rebirth;
rebirth=function(){const before=state.rb,keep=state.x;_rb();
  if(state.rb>before){state.x=keep;state.x.farm={vet:0,sick:{},dairy:{q:[],st:{}},decor:keep.farm.decor,shownAt:0};state.x.last=null;initX();
    if(state.rb===1)toast("🌌 Nova aba liberada: Etapas! Use 💎 nas Caixas Ultimate.");else if(ULTB.some(b=>b.rb===state.rb))toast("🌌 Nova Caixa Ultimate liberada!");
    toast(`🌳 +1 ponto de habilidade (Etapas)`);save();render()}};

/* ---------- ticker: estatísticas, XP, histórico ---------- */
function trackStats(){const x=initX(),cur={milkL:st("milkL"),earned:st("earned"),boxes:st("boxes"),milkings:st("milkings"),auctions:st("auctions")};
  if(!x.last){x.last=cur;return}
  const d={};for(const k in cur)d[k]=Math.max(0,cur[k]-x.last[k]);x.last=cur;
  if(!(d.milkL||d.earned||d.boxes||d.milkings||d.auctions))return;
  VB.xp(d.milkings*.4+d.boxes*2+d.auctions*3);
  const h=x.hist[dayKey()]||(x.hist[dayKey()]={l:0,c:0,b:0,m:0});h.l+=d.milkL;h.c+=d.earned;h.b+=d.boxes;h.m+=d.milkings;
  const ks=Object.keys(x.hist).sort();while(ks.length>60)delete x.hist[ks.shift()];
  VB.deltas.forEach(f=>{try{f(d)}catch(e){console.error(e)}})}
setInterval(()=>{try{if(!state.x||!state.x.init){initX()}ensureCows();trackStats();VB.tickers.forEach(f=>f())}catch(e){console.error(e)}},1000);
let sv=0;setInterval(()=>{if(Date.now()-sv>15000){sv=Date.now();save()}},5000);

/* ---------- menu dev ---------- */
const _od=openDev;
openDev=function(){_od();$("#devBody").insertAdjacentHTML("beforeend",`<div class="devgrid" style="margin-top:12px"><button class="secondary" data-x="devdia">💎 +1.000 diamantes</button><button class="secondary" data-x="devxp">🎟️ +1 nível no Passe</button></div>`)};
VB.act.devdia=()=>{state.x.dia+=1000;save();render()};VB.act.devxp=()=>{state.x.pass.xp+=PASS_XP;save();render()};

/* ---------- boot ---------- */
setupTop();initX();ensureCows();
PG.pass="Pass";PG.etapas="Etapas";
render();
})();
