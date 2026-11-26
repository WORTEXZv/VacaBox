/* ===== VacaBox v11 · núcleo =====
   desempenho (modo leve) · avisos à direita · nível do fazendeiro · poções · caixas (garantia, vender/manter, auto)
   Passe novo (90 níveis, 14 dias, missões próprias) · página Missões · bônus diário em janela */
(function(){
"use strict";
const VB=window.VB,H=VB.H,X=()=>VB.X(),RR=Math.round,now=()=>Date.now();
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const mkPage=(id,key)=>{if(!document.getElementById("page"+key)){const d=document.createElement("div");d.id="page"+key;d.className="page hidden";d.innerHTML=`<div id="${id}v"></div>`;document.querySelector(".container").appendChild(d)}PG[id]=key};

/* ---------- desempenho: modo leve (automático no celular) ---------- */
const AUTO=(()=>{try{return matchMedia("(pointer:coarse)").matches||innerWidth<820||(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)}catch(e){return false}})();
VB.lite=()=>{const o=X().opts.lite;return o===1||(o===-1&&AUTO)};
const applyLite=()=>document.documentElement.classList.toggle("lite",VB.lite());VB.applyLite=applyLite;
const _cs11=cowSVG;
cowSVG=function(c,ex){let s=_cs11(c,ex);if(VB.lite())s=s.replace(/<animate[^>]*\/>/g,"").replace(/<animate[^>]*>[^<]*<\/animate>/g,"");return s};
VB.act.lite=b=>{X().opts.lite=+b.dataset.v;applyLite();save();VB.renderPF&&VB.renderPF();render()};

/* ---------- avisos (toast) à direita, ao centro, com animação e botão X ---------- */
document.body.insertAdjacentHTML("beforeend",`<div id="vbt" aria-live="polite"></div>`);
const tbox=document.getElementById("vbt");let lastT="",lastTa=0;
function closeT(el){if(!el||el.classList.contains("out"))return;el.classList.add("out");setTimeout(()=>el.remove(),260)}
toast=function(t){t=String(t);if(t===lastT&&now()-lastTa<900)return;lastT=t;lastTa=now();
  const el=document.createElement("div");el.className="vt";el.innerHTML=`<span class="vtx"></span><button class="vtc" aria-label="Fechar aviso">✕</button>`;el.querySelector(".vtx").textContent=t;
  el.querySelector(".vtc").onclick=()=>closeT(el);tbox.appendChild(el);const live=[...tbox.children].filter(e=>!e.classList.contains("out"));while(live.length>4)closeT(live.shift());
  let tm=setTimeout(()=>closeT(el),5200);el.onmouseenter=()=>clearTimeout(tm);el.onmouseleave=()=>{tm=setTimeout(()=>closeT(el),2500)}};

/* ---------- nível do fazendeiro ---------- */
const xpFor=l=>(l-1)*(l-1)*60,lvOf=xp=>Math.floor(Math.sqrt(xp/60))+1;
const buffOn=id=>(X().buf[id]||0)>now();VB.buffOn=buffOn;
VB.lvl=()=>{const xp=X().lv.xp,l=lvOf(xp),cur=xp-xpFor(l),need=xpFor(l+1)-xpFor(l);return{l,cur,need,xp}};
VB.addPXP=n=>{if(!(n>0))return;const x=X(),before=lvOf(x.lv.xp);x.lv.xp+=n*(buffOn("xp")?2:1);const a=lvOf(x.lv.xp);
  for(let l=before+1;l<=a;l++){toast(`⭐ Nível ${l} do Fazendeiro!`);VB.sfx("claim");if(l%5===0)earn(RR(120*l*clamp(Math.sqrt(st("earned")/200000),1,3)));if(l%10===0)VB.addDia(1,true)}};
VB.mods.push(()=>1+Math.min(.25,.005*(VB.lvl().l-1)));
VB.deltas.push(d=>VB.addPXP(d.milkings+d.boxes*4+d.auctions*6+d.milkL*.02));

/* ---------- poções ---------- */
const pp=b=>Math.max(10,RR(b*clamp(Math.sqrt(st("earned")/400000),1,2.5)/10)*10);
const POT=[
 {id:"xp",e:"🧪",n:"Poção de XP",d:"Dobra o XP do Fazendeiro por 30 min.",dur:1800,c:400},
 {id:"leite",e:"🥛",n:"Poção do Leite",d:"+40% de leite em todas as ordenhas por 20 min.",dur:1200,c:700},
 {id:"sorte",e:"🍀",n:"Poção da Sorte",d:"+25% de chance de sortear de novo ao abrir caixas por 30 min.",dur:1800,c:1200},
 {id:"ouro",e:"💰",n:"Poção do Ouro",d:"+30% de moedas ao vender leite por 20 min.",dur:1200,c:600},
 {id:"brilho",e:"✨",n:"Poção Brilhante",d:"Chance de vaca brilhante ×5 por 30 min.",dur:1800,dia:3},
 {id:"tempo",e:"⏩",n:"Poção do Tempo",d:"Corta pela metade o tempo que falta de bezerros, evolução e laticínios.",c:1000},
 {id:"pronta",e:"⚡",n:"Poção Relâmpago",d:"Deixa todas as vacas prontas para ordenhar agora.",c:800},
 {id:"vacina",e:"💉",n:"Vacina do Rebanho",d:"Cura todas as doentes e protege o rebanho por 2 h.",c:900}];
VB.POT=POT;
VB.mods.push(()=>buffOn("leite")?1.4:1);
VB.sellBonus=()=>.03*VB.sk("sell")+(buffOn("ouro")?.3:0);
const _nh=VB.newCowHook;
VB.newCowHook=(c,t,f)=>{_nh&&_nh(c,t,f);if(!c.sh&&f&&buffOn("brilho")&&Math.random()<.1){c.sh=1;setTimeout(()=>toast(`✨ ${t.name} nasceu BRILHANTE!`),600)}};
VB.act.potbuy=b=>{const p=POT.find(x=>x.id===b.dataset.id),x=X();if(!p)return;
  if(p.dia){if(x.dia<p.dia)return toast("💎 Diamantes insuficientes.");x.dia-=p.dia}else{const c=pp(p.c);if(state.coins<c)return toast("Moedas insuficientes.");state.coins-=c}
  x.pot[p.id]=(x.pot[p.id]||0)+1;VB.sfx("good");save();render()};
VB.act.potuse=b=>{const p=POT.find(x=>x.id===b.dataset.id),x=X();if(!p||!(x.pot[p.id]>0))return;const t=now();
  if(p.id==="tempo"){state.calves.forEach(k=>{k.g=t+Math.max(0,k.g-t)/2});state.cows.forEach(c=>{const r=EVO-(t-c.at);if(r>0)c.at+=r/2});x.farm.dairy.q.forEach(j=>{j.end=t+Math.max(0,j.end-t)/2})}
  else if(p.id==="pronta"){state.cows.forEach(c=>{c.m=0;c.rest=0})}
  else if(p.id==="vacina"){state.cows.forEach(c=>delete c.sick);x.farm.vax=t+7200000}
  else x.buf[p.id]=Math.max(x.buf[p.id]||0,t)+p.dur*1000;
  x.pot[p.id]--;S("potions");VB.sfx("good");toast(`${p.e} ${p.n} usada!`);save();render()};
const buffChips=()=>{const x=X(),l=POT.filter(p=>p.dur&&buffOn(p.id));return l.length?`<div class="buffs">${l.map(p=>`<span class="bf">${p.e} ${p.n} · <b data-bf="${p.id}">${clockD(x.buf[p.id]-now())}</b></span>`).join("")}</div>`:""};
VB.buffChips=buffChips;
function potHTML(){const x=X();
  return `<section class="shop-sec"><h2>🧪 Poções</h2><p class="dsc">Poções dão bônus por tempo limitado ou efeitos na hora. Compre e use quando quiser.</p>${buffChips()}
  <div class="sgrid">${POT.map(p=>`<div class="item potc"><div class="ie">${p.e}</div><h3>${p.n}</h3><p class="dsc">${p.d}</p><p class="dsc sm">Você tem: <b>${x.pot[p.id]||0}</b></p>
  <div class="row"><button class="primary" data-x="potbuy" data-id="${p.id}">${p.dia?"💎 "+p.dia:"🪙 "+fmt(pp(p.c))}</button><button class="secondary" data-x="potuse" data-id="${p.id}" ${(x.pot[p.id]||0)>0?"":"disabled"}>Usar</button></div></div>`).join("")}</div></section>`}
const _rs=renderShop;
renderShop=function(){_rs();const h=$("#shop h1");if(h)h.insertAdjacentHTML("afterend",potHTML())};

/* ---------- caixas: garantia, vender/manter e abertura automática ---------- */
function pityInfo(box){const p=box.p||EXP;let r=-1;for(let i=p.length-1;i>=0;i--)if(p[i]>=.5){r=i;break}if(r<0)for(let i=p.length-1;i>=0;i--)if(p[i]>0){r=i;break}
  if(r<=0||p[r]>25)return null;return{r,n:clamp(RR(70/p[r]),10,80)}}
VB.pityInfo=pityInfo;
const _pb=pickByP;
pickByP=function(box){const x=X(),pi=pityInfo(box);let a=_pb(box);
  if(buffOn("sorte")&&!box.ex&&Math.random()<.25){const b=_pb(box);if(b.r>a.r)a=b}
  if(!pi)return a;const k=box.id,pc=x.pity[k]||0;
  if(pc+1>=pi.n&&a.r<pi.r){for(let i=0;i<500&&a.r<pi.r;i++)a=_pb(box);
    if(a.r<pi.r){const pool=(box.ex?COWS.filter(c=>c.ex===box.ex):REG).filter(c=>c.r>=pi.r);if(pool.length)a=pool[Math.floor(Math.random()*pool.length)]}}
  x.pity[k]=a.r>=pi.r?0:pc+1;return a};
function decorBoxes(){document.querySelectorAll(".box").forEach(el=>{if(el.querySelector(".pity"))return;const bt=el.querySelector("button[onclick^=\"openCase\"]");if(!bt)return;
  const id=(bt.getAttribute("onclick").match(/'([^']+)'/)||[])[1],box=allBoxes().find(b=>b.id===id);if(!box)return;const pi=pityInfo(box);if(!pi)return;
  const pc=X().pity[id]||0,left=Math.max(1,pi.n-pc);
  el.querySelector(".price").insertAdjacentHTML("beforebegin",`<div class="pity"><div class="bar lv"><i style="width:${Math.min(100,pc/pi.n*100)}%"></i></div><small>🎯 <b>${RN[pi.r]}</b> ou melhor garantida em ${pi.n} aberturas · <b>faltam ${left}</b></small></div>`)})}
VB.afterRender.push(()=>{if(page==="home"||page.startsWith("ev:"))decorBoxes()});

const sellRule=(c,isNew)=>{const x=X();return !!x.cfg.sell[c.r]&&!(x.cfg.keepNew&&isNew)};
const _sr=showResult;
showResult=function(c,isNew){_sr(c,isNew);const x=X();
  if(sellRule(c,isNew)){const cc=[...state.cows].reverse().find(k=>k.t===c.id);if(cc){const v=sellValue(cc);state.cows=state.cows.filter(k=>k!==cc);earn(v);x.cfg.as.sold++;x.cfg.as.coins+=v;S("cowsSold");save();
    const e=$("#resultName");if(e)e.insertAdjacentHTML("afterend",`<p class="autosold">💰 Vendida automaticamente por 🪙${fmt(v)}</p>`)}}};
let autoNext=0;
function quickOpen(){const x=X(),c=x.cfg.auto,box=allBoxes().find(b=>b.id===c.box);if(!box){c.on=0;return}
  if(state.coins<box.price+(+c.reserve||0)){c.on=0;toast("⏸️ Abertura automática pausada: moedas insuficientes.");save();render();return}
  if(full()){c.on=0;toast("⏸️ Abertura automática pausada: fazenda cheia. Marque raridades para vender.");save();render();return}
  state.coins-=box.price;S("boxes");if(box.ex)S("eventBoxes");const cow=pickCow(box),isNew=!state.seen.includes(cow.id);S("got"+cow.r);if(isNew)state.seen.push(cow.id);
  if(sellRule(cow,isNew)){const v=sellValue({u:uid(),t:cow.id,L:rollL(cow)});earn(v);x.cfg.as.sold++;x.cfg.as.coins+=v}else newCow(cow);
  x.cfg.as.n++;if(cow.r>=4||isNew&&cow.r>=2)toast(`${isNew?"🆕 ":""}${RN[cow.r]}: ${cow.name}`);
  if(cow.r>=c.stopR){c.on=0;toast(`⭐ ${cow.name} (${RN[cow.r]})! Abertura automática pausada.`);VB.sfx("good")}
  if(x.cfg.as.n%10===0)toast(`🤖 Automático: ${x.cfg.as.n} caixas · ${x.cfg.as.sold} vendidas (+🪙${fmt(x.cfg.as.coins)})`);
  save();const ce=$("#coins");if(ce)ce.textContent=fmt(state.coins);if(page==="home")render()}
VB.tickers.push(()=>{const c=X().cfg.auto;if(!c.on||openingBusy||now()<autoNext)return;autoNext=now()+Math.max(1,c.gap)*1000;try{quickOpen()}catch(e){console.error(e);c.on=0}});
document.body.insertAdjacentHTML("beforeend",`<div id="boxcfg" class="modal hidden"><div class="modal-card wide"><button class="xbtn" data-x="bcx">✕</button><div id="boxcfgb"></div></div></div>`);
function cfgHTML(){const x=X(),cf=x.cfg,a=cf.auto,boxes=allBoxes();
  return `<div class="modal-title">⚙️ Configurar caixas</div>
  <div class="panel"><h3>💰 O que fazer com cada vaca ao abrir</h3><p class="dsc">Marque <b>Vender</b> para vender na hora as vacas daquela raridade. As outras ficam na fazenda.</p>
  <div class="cfgr">${RN.slice(0,7).map((n,r)=>`<button class="cfgb ${cf.sell[r]?"sell":"keep"}" data-x="bcr" data-r="${r}"><span class="badge ${RC[r]}">${n}</span><b>${cf.sell[r]?"💰 Vender":"✅ Manter"}</b></button>`).join("")}</div>
  <label class="chk"><input type="checkbox" id="bcKeep" ${cf.keepNew?"checked":""}> Nunca vender vacas <b>novas</b> do Compêndio</label></div>
  <div class="panel"><h3>🤖 Abertura automática</h3><p class="dsc">Abre caixas sozinha, seguindo as regras acima. Pausa quando faltar moeda, a fazenda encher ou aparecer a raridade escolhida.</p>
  <button class="${a.on?"primary":"secondary"} big" data-x="bca">${a.on?"⏸️ Ligada · tocar para desligar":"▶️ Ligar abertura automática"}</button>
  <div class="cfgf"><label>Caixa<select id="bcBox">${boxes.map(b=>`<option value="${b.id}" ${a.box===b.id?"selected":""}>${b.emoji} ${H(b.name)} · 🪙${fmt(b.price)}</option>`).join("")}</select></label>
  <label>Intervalo<select id="bcGap">${[[1,"1 segundo"],[2,"2 segundos"],[4,"4 segundos"],[8,"8 segundos"],[15,"15 segundos"]].map(([v,l])=>`<option value="${v}" ${a.gap===v?"selected":""}>${l}</option>`).join("")}</select></label>
  <label>Parar ao achar<select id="bcStop">${RN.slice(2,7).map((n,i)=>`<option value="${i+2}" ${a.stopR===i+2?"selected":""}>${n} ou melhor</option>`).join("")}</select></label>
  <label>Guardar moedas<input id="bcRes" type="number" min="0" step="100" value="${a.reserve||0}"></label></div>
  <p class="dsc sm">Neste modo: ${cf.as.n} caixas abertas · ${cf.as.sold} vendidas · 🪙${fmt(cf.as.coins)} ganhos com vendas.</p></div>`}
const renderCfg=()=>{$("#boxcfgb").innerHTML=cfgHTML()};
VB.act.boxcfg=()=>{renderCfg();$("#boxcfg").classList.remove("hidden")};
VB.act.bcx=()=>{$("#boxcfg").classList.add("hidden");render()};
VB.act.bcr=b=>{const s=X().cfg.sell,r=+b.dataset.r;s[r]=s[r]?0:1;save();renderCfg()};
VB.act.bca=()=>{const a=X().cfg.auto;a.on=a.on?0:1;if(a.on)autoNext=0;save();renderCfg();render()};
document.addEventListener("change",e=>{const t=e.target,cf=X().cfg;if(!t.closest||!t.closest("#boxcfg"))return;
  if(t.id==="bcKeep")cf.keepNew=t.checked?1:0;if(t.id==="bcBox")cf.auto.box=t.value;if(t.id==="bcGap")cf.auto.gap=+t.value;if(t.id==="bcStop")cf.auto.stopR=+t.value;if(t.id==="bcRes")cf.auto.reserve=Math.max(0,+t.value||0);save()});
(function addGear(){const f=document.querySelector(".hero .farmline");if(f&&!document.getElementById("gearB"))f.insertAdjacentHTML("afterend",`<p><button id="gearB" class="secondary" data-x="boxcfg">⚙️ Configurar caixas</button> <span id="autoChip"></span></p>`)})();
VB.afterRender.push(()=>{const c=$("#autoChip");if(c)c.innerHTML=X().cfg.auto.on?`<span class="bf">🤖 Abertura automática ligada</span>`:""});

/* ---------- Passe: 90 níveis · 14 dias · missões próprias ---------- */
const P=VB.PASS,PL=P.LV,PX=P.XP;
const sc=()=>clamp(Math.sqrt(st("earned")/100000),1,6),coinA=(L,m)=>Math.min(3000,RR((100+L*9)*sc()*m/10)*10);
const BSEQ=["campo","celeiro","prata","dourada","cosmica"],PSEQ=["xp","leite","sorte","tempo","pronta","ouro","vacina"];
function passRew(L,prem){
  if(!prem){
    if(L===90)return[{k:"cow",r:6},{k:"dia",a:5}];if(L===60)return[{k:"cow",r:5},{k:"dia",a:2}];if(L===30)return[{k:"cow",r:4}];
    if([15,45,75].includes(L))return[{k:"dia",a:1}];
    if(L%10===0)return[{k:"box",id:BSEQ[Math.min(4,Math.floor(L/20))]}];
    if(L%5===0)return[{k:"pot",id:PSEQ[(L/5)%PSEQ.length],n:1}];
    return[{k:"coin",a:coinA(L,1)}]}
  const sp={10:[{k:"cos",t:"fr",id:"neon"}],20:[{k:"cos",t:"na",id:"fire"}],28:[{k:"cos",t:"ba",id:"premium"}],30:[{k:"cow",r:5},{k:"dia",a:2}],40:[{k:"cos",t:"fx",id:"aurea"}],50:[{k:"cos",t:"fr",id:"passgold"}],
    60:[{k:"cow",r:6},{k:"dia",a:5}],70:[{k:"cos",t:"ba",id:"passcosmos"}],80:[{k:"cos",t:"nc",id:"g_passgold"}],90:[{k:"cow",r:6},{k:"dia",a:30},{k:"cos",t:"ti",id:"Lenda do Passe"}]};
  if(sp[L])return sp[L];if([15,45,75].includes(L))return[{k:"dia",a:2}];
  if(L%5===0)return[{k:"box",id:L%10===5&&L>=50?"arco":"cosmica"}];if(L%7===0)return[{k:"pot",id:PSEQ[(L/7)%PSEQ.length],n:2}];
  if(L%3===0)return[{k:"dia",a:1}];return[{k:"coin",a:coinA(L,1.6)}]}
const potBy=id=>POT.find(p=>p.id===id)||{e:"🧪",n:id};
const icoOf=i=>i.k==="coin"?"🪙":i.k==="dia"?"💎":i.k==="box"?((allBoxes().find(b=>b.id===i.id)||{}).emoji||"🎟️"):i.k==="pot"?potBy(i.id).e:i.k==="cow"?"🐄":"✨";
const labOf=i=>i.k==="coin"?fmt(i.a):i.k==="dia"?"×"+i.a:i.k==="box"?VB.boxName(i.id).replace("Caixa ","Cx. "):i.k==="pot"?potBy(i.id).n+(i.n>1?" ×"+i.n:""):i.k==="cow"?RN[i.r]:(VB.cosName?VB.cosName(i.t,i.id):i.id);
VB.passRew=passRew;
const pass=()=>X().pass,lvl=()=>Math.min(PL,Math.floor(pass().xp/PX));
VB.act.pbuy=b=>{const x=X(),p=x.pass,t=+b.dataset.t,price=t===1?200:p.own>=1?450:650;if(p.own>=t)return;if(x.dia<price)return toast(`💎 Faltam ${price-x.dia} diamantes.`);
  if(!confirm(`Comprar o Passe ${t===1?"Básico":"Premium"} por 💎 ${price}?`))return;x.dia-=price;p.own=t;VB.sfx("good");confetti();toast("🎟️ Passe ativado!");save();render()};
VB.act.pclaim=b=>{const p=pass(),L=+b.dataset.l,pr=+b.dataset.p,k=(pr?"p":"f")+L;if(p.cl[k]||lvl()<L||p.own<(pr?2:1))return;if(VB.giveRew(passRew(L,pr))){p.cl[k]=1;VB.sfx("claim");save();render()}};
VB.act.pall=()=>{const p=pass(),lv=lvl();let n=0;for(let L=1;L<=lv;L++)for(const pr of[0,1]){const k=(pr?"p":"f")+L;if(!p.cl[k]&&p.own>=(pr?2:1)&&VB.giveRew(passRew(L,pr))){p.cl[k]=1;n++}}if(n){toast(`🎁 ${n} recompensas resgatadas!`);VB.sfx("claim")}save();render()};
VB.act.pgo=()=>{const c=document.querySelector(`.pcol[data-l="${Math.min(PL,lvl()+1)}"]`);if(c)c.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})};
/* missões do passe */
const PM=[["milkings","Ordenhe {g} vezes",12],["milkL","Produza {g} L de leite",160],["boxes","Abra {g} caixas",3],["earned","Ganhe {g} moedas",900],["feeds","Alimente os cochos {g} vezes",4],["sales","Venda leite {g} vezes",3],["seenN","Descubra {g} vaca(s) nova(s)",1],["dairyMade","Faça {g} laticínio(s)",2],["care","Cuide dos cochos {g} vezes",5]];
const curS=()=>({milkings:st("milkings"),milkL:st("milkL"),boxes:st("boxes"),earned:st("earned"),feeds:st("feeds"),sales:st("sales"),seenN:state.seen.length,dairyMade:st("dairyMade"),care:st("care")});
const goalOf=(k,b,m)=>{const f=1+.35*Math.log10(1+st("earned")/2000);return Math.max(1,RR((k==="earned"?b*f*f:k==="seenN"?b:b*f)*m))};
function genMissions(seed,n,m,xps){const idx=PM.map((_,i)=>i).sort((a,b)=>rnd(seed+a*7.3)-rnd(seed+b*7.3)).slice(0,n);return idx.map((i,j)=>({k:PM[i][0],g:goalOf(PM[i][0],PM[i][2],m),xp:xps[j]}))}
const dayN=()=>Math.floor((now()-new Date().getTimezoneOffset()*-60000)/864e5);
function ensurePM(){const x=X(),pm=x.pm,d=VB.dayKey(),w=weekIdx();
  if(pm.d!==d){pm.d=d;pm.base=curS();pm.list=genMissions(dayN()*3.1,6,1,[12,14,16,20,24,30]).map(m=>({...m,done:0}));pm.bonus=0}
  if(pm.w!==w){pm.w=w;pm.wbase=curS();pm.wlist=genMissions(w*5.7+11,3,6,[80,90,100]).map(m=>({...m,done:0}))}
  return pm}
const pmprog=(m,base)=>Math.max(0,(curS()[m.k]||0)-(base[m.k]||0));
const mtxt=m=>PM.find(p=>p[0]===m.k)[1].replace("{g}",fmt(m.g));
VB.act.pmc=b=>{const pm=ensurePM(),w=b.dataset.w==="1",l=w?pm.wlist:pm.list,m=l[+b.dataset.i];if(!m||m.done||pmprog(m,w?pm.wbase:pm.base)<m.g)return;m.done=1;VB.passXp(m.xp);VB.sfx("claim");
  if(!w&&pm.list.every(q=>q.done)&&!pm.bonus){pm.bonus=1;VB.passXp(20);toast("🎉 Todas as missões do dia! +20 XP bônus")}save();render()};
const mRow=(m,i,w,base)=>{const p=Math.min(m.g,pmprog(m,base)),ok=p>=m.g;return `<div class="pmrow ${m.done?"dn":""}"><div class="pmt"><b>${H(mtxt(m))}</b><div class="bar lv"><i style="width:${p/m.g*100}%"></i></div><small>${fmt(p)} / ${fmt(m.g)}</small></div>
  ${m.done?`<span class="pmd">✅</span>`:`<button class="${ok?"primary":"secondary"}" data-x="pmc" data-i="${i}" data-w="${w?1:0}" ${ok?"":"disabled"}>+${m.xp} XP</button>`}</div>`};
const leftTxt=ms=>clockD(ms);
VB.renderPass=function renderPass(){const x=X(),p=x.pass,lv=lvl(),pm=ensurePM(),xpIn=lv>=PL?PX:p.xp%PX,end=WEEK0+(p.s+1)*P.DAYS*864e5,total=P.DAYS*864e5,prem=p.own>=2;
  const claimable=[0,1].reduce((a,pr)=>a+Array.from({length:lv},(_,i)=>i+1).filter(L=>!p.cl[(pr?"p":"f")+L]&&p.own>=(pr?2:1)).length,0);
  const cell=(L,pr)=>{const it=passRew(L,pr),need=pr?2:1,got=p.cl[(pr?"p":"f")+L],reach=lv>=L,own=p.own>=need,main=it[0];
    return `<div class="pc ${pr?"prem":"free"} ${got?"got":reach&&own?"rdy":""}"><div class="pi">${icoOf(main)}${it.length>1?`<em>+${it.length-1}</em>`:""}</div><div class="pt">${H(labOf(main))}</div><div class="ps">${got?"✅":reach&&own?`<button class="primary" data-x="pclaim" data-l="${L}" data-p="${pr}">Resgatar</button>`:own?"🔒":"🎟️"}</div></div>`};
  const mIn=ensurePM().list.filter(m=>m.done).length;
  $("#passv").innerHTML=`<h1 style="margin:0 0 8px">🎟️ Passe da Temporada ${p.s+1}</h1>
  <div class="passhead"><div class="phl"><div class="plvb">Nível <b>${lv}</b> / ${PL}</div><div class="bar lv big"><i style="width:${xpIn/PX*100}%"></i></div><div class="dsc">${Math.floor(xpIn)} / ${PX} XP para o próximo nível</div></div>
  <div class="ptim"><div class="dsc">⏳ A temporada termina em</div><div class="ptc" data-pt="t">${leftTxt(end-now())}</div><div class="bar"><i data-pt="bar" style="width:${(1-(end-now())/total)*100}%"></i></div></div></div>
  <p class="dsc">O XP do passe vem <b>só das missões</b> aqui embaixo. Conclua as 6 diárias e as 3 semanais!</p>
  <div class="pbuy"><div class="pcard ${p.own>=1?"own":""}"><h3>🎟️ Passe Básico</h3><p class="dsc">Recompensas simples, caixas, poções e uma vaca Mítica no nível 60.</p><div class="price dprice">💎 200</div><button class="primary" data-x="pbuy" data-t="1" ${p.own>=1?"disabled":""}>${p.own>=1?"✅ Ativo":"Comprar"}</button></div>
  <div class="pcard prm ${prem?"own":""}"><h3>👑 Passe Premium</h3><p class="dsc">Tudo do Básico + trilha premium: 💎, visuais exclusivos e vacas Únicas.</p><div class="price dprice">💎 650${p.own===1?` <small>(💎 450 com o Básico)</small>`:""}</div><button class="primary" data-x="pbuy" data-t="2" ${prem?"disabled":""}>${prem?"✅ Ativo":"Comprar"}</button></div></div>
  <div class="pbar"><button class="secondary" data-x="pgo">📍 Ir para o meu nível</button>${claimable?`<button class="primary big" data-x="pall">🎁 Resgatar tudo (${claimable})</button>`:""}</div>
  <div class="ptwrap" id="ptwrap"><div class="ptr"><div class="plab"><div class="pl0">Nível</div><div class="pl1">Básico</div><div class="pl2">👑 Premium</div></div>
  ${Array.from({length:PL},(_,i)=>i+1).map(L=>`<div class="pcol ${lv>=L?"reach":""} ${L%10===0?"mile":""}" data-l="${L}"><div class="plv">${L}</div>${cell(L,0)}${cell(L,1)}</div>`).join("")}</div></div>
  <h2 class="mh">📋 Missões do passe</h2><div class="panel"><h3>☀️ Diárias <small>(${mIn}/6 · novas em <b data-pt="d">${clockD(new Date().setHours(24,0,0,0)-now())}</b>)</small></h3>${pm.list.map((m,i)=>mRow(m,i,false,pm.base)).join("")}</div>
  <div class="panel"><h3>📅 Semanais <small>(novas em <b data-pt="w">${clockD(WEEK0+(weekIdx()+1)*WEEK_MS-now())}</b>)</small></h3>${pm.wlist.map((m,i)=>mRow(m,i,true,pm.wbase)).join("")}</div>`;
  if(!VB.renderPass.sc){VB.renderPass.sc=1;setTimeout(()=>{const c=document.querySelector(`.pcol[data-l="${Math.max(1,Math.min(PL,lvl()))}"]`),w=$("#ptwrap");if(c&&w)w.scrollLeft=Math.max(0,c.offsetLeft-w.clientWidth/2)},60)}};
VB.tickers.push(()=>{if(page!=="pass")return;const p=pass(),end=WEEK0+(p.s+1)*P.DAYS*864e5,t=document.querySelector('[data-pt="t"]');if(!t)return;
  if(end<=now()){render();return}t.textContent=leftTxt(end-now());const b=document.querySelector('[data-pt="bar"]');if(b)b.style.width=(1-(end-now())/(P.DAYS*864e5))*100+"%";
  const d=document.querySelector('[data-pt="d"]');if(d)d.textContent=clockD(new Date().setHours(24,0,0,0)-now());const w=document.querySelector('[data-pt="w"]');if(w)w.textContent=clockD(WEEK0+(weekIdx()+1)*WEEK_MS-now());
  if(ensurePM().d!==VB.dayKey())render()});
VB.tickers.push(()=>{document.querySelectorAll("[data-bf]").forEach(e=>{e.textContent=clockD(X().buf[e.dataset.bf]-now())})});

/* ---------- navegação, Missões, Mais e bônus diário ---------- */
mkPage("miss","Miss");PG.miss="Miss";
const MT=[["mis","📋 Diárias"],["lad","🪜 Marcos"],["ach","🏆 Conquistas"],["con","🤝 Contratos"]];let missTab="mis";
const _rm=renderMore;VB.v11rm=_rm;
function renderMiss(){const sv=moreTab;moreTab=missTab;_rm();moreTab=sv;const root=$("#more"),tabs=root&&root.querySelector(".tabs");let html="";
  if(tabs){for(let n=tabs.nextSibling;n;n=n.nextSibling)html+=n.outerHTML||"";}root.innerHTML="";
  $("#missv").innerHTML=`<h1 style="margin:0 0 12px">🎯 Missões</h1><div class="tabs">${MT.map(([k,l])=>`<button class="secondary ${missTab===k?"on":""}" data-x="mt" data-t="${k}">${l}</button>`).join("")}</div>${html}`}
VB.act.mt=b=>{missTab=b.dataset.t;render()};
let moTab="x_show";VB.act.mo=b=>{moTab=b.dataset.t;render()};
VB.moreBody=VB.moreBody||{};
VB.moreBody.x_news=()=>`<div class="panel"><h3>📰 Novidades</h3><p class="dsc">Veja o que mudou na versão mais recente do jogo.</p><button class="primary" onclick="showNews()">Ver novidades</button></div>`;
renderMore=function(){if(!$("#pf").classList.contains("hidden")&&VB.renderPF)VB.renderPF();if(page==="miss")return renderMiss();if(page!=="more")return;
  const tabs=[["x_show","🏅 Exposição"],["x_boss","🌍 Chefe"],["x_news","📰 Novidades"]];if(!VB.moreBody[moTab])moTab="x_show";
  $("#more").innerHTML=`<h1 style="margin:0 0 12px">📋 Mais</h1><div class="tabs">${tabs.map(([k,l])=>`<button class="secondary ${moTab===k?"on":""}" data-x="mo" data-t="${k}">${l}</button>`).join("")}</div>${VB.moreBody[moTab]()}`};
const missBadge=()=>{try{ensureMissions();return state.missions.list.filter(m=>!m.done&&mprog(m)>=m.g).length+MK.filter(m=>{const t=state.mt[m[0]]||0;return false}).length}catch(e){return 0}};
renderNav=function(){const ev=activeEvents(),x=X();
  const items=[["home","📦 Caixas"],["pass","🎟️ Passe"]];if(state.rb>=1||x.ult.n>0)items.push(["etapas","🌌 Etapas"]);
  items.push(["farm","🏡 Fazenda"],["comp","📚 Compêndio"],["shop","🛒 Loja"],["miss","🎯 Missões"+(missBadge()?` <span class="dot">${missBadge()}</span>`:"")],["rank","🥇 Ranking"],...ev.map(e=>["ev:"+e.id,e.e+" "+e.n]),["auction","🔨 Leilão"],["more","📋 Mais"]);
  const h=items.map(([p,l])=>{const e=ev.find(q=>"ev:"+q.id===p);return `<button class="secondary ${page===p?"on":""} ${e?"evb":""}" ${e?`style="--eh:${e.h}"`:""} onclick="showPage('${p}')">${l}</button>`}).join("");
  if(renderNav.h!==h){const n=$("#nav");n.innerHTML=h;renderNav.h=h;navArrows();const on=n.querySelector(".on");if(on&&on.scrollIntoView)on.scrollIntoView({inline:"center",block:"nearest"})}};
const _r11=render;
render=function(){_r11();if(page==="miss")renderMiss();if(page==="more")renderMore()};
/* bônus diário em janela */
document.body.insertAdjacentHTML("beforeend",`<div id="bonusM" class="modal hidden"><div class="modal-card"><button class="xbtn" data-x="bonx">✕</button><div class="modal-title">🎁 Bônus do dia</div><div id="bonusB"></div></div></div>`);
const bonusHTML=()=>VB.moreBody.x_bonus?VB.moreBody.x_bonus():"";
VB.act.bonx=()=>$("#bonusM").classList.add("hidden");
VB.act.bonus=()=>{$("#bonusB").innerHTML=bonusHTML();$("#bonusM").classList.remove("hidden")};
document.addEventListener("click",e=>{const b=e.target.closest("[data-x=lclaim],[data-x=spin]");if(b&&!$("#bonusM").classList.contains("hidden"))setTimeout(()=>{$("#bonusB").innerHTML=bonusHTML();paintGift()},b.dataset.x==="spin"?4400:120)});
const bonusPending=()=>{const l=X().login;return l.last!==VB.dayKey()||l.spin!==VB.dayKey()};
function paintGift(){let g=$("#giftB");const rb=$("#rbar");if(!rb)return;if(!bonusPending()){if(g)g.remove();return}if(!g){rb.insertAdjacentHTML("afterbegin",`<button id="giftB" class="giftb" data-x="bonus" title="Bônus do dia">🎁</button>`)}}
VB.afterRender.push(paintGift);
let bonusShown=false;VB.tickers.push(()=>{if(bonusShown||$("#boot"))return;bonusShown=true;
  if(bonusPending()&&localStorage.getItem("vb_bonus_day")!==VB.dayKey()){try{localStorage.setItem("vb_bonus_day",VB.dayKey())}catch(e){}
    const go=()=>{if($("#news").classList.contains("hidden"))VB.act.bonus();else setTimeout(go,700)};setTimeout(go,900)}});

applyLite();render();
})();
