/* ===== VacaBox v11 · fazenda: clima, decoração, veterinário e vacas de eventos ===== */
(function(){
"use strict";
const VB=window.VB,H=VB.H,X=()=>VB.X(),RR=Math.round,now=()=>Date.now(),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

/* =====================  CLIMA  ===================== */
const WE={
 sol:{e:"☀️",n:"Ensolarado",m:1,d:"Tempo firme. Sem efeito.",w:30},
 nublado:{e:"☁️",n:"Nublado",m:1.03,d:"Fresquinho: +3% de leite.",w:16},
 garoa:{e:"🌦️",n:"Garoa",m:1.05,d:"+5% de leite e enche a água devagar.",w:10},
 chuva:{e:"🌧️",n:"Chuva",m:1.1,d:"+10% de leite e a água dos cochos enche sozinha.",w:14},
 calor:{e:"🥵",n:"Onda de calor",m:.85,d:"−15% de leite. Galpão e árvores ajudam.",w:10},
 frio:{e:"🥶",n:"Frio intenso",m:.9,d:"−10% de leite. Galpão ajuda.",w:8},
 neve:{e:"❄️",n:"Neve",m:.8,d:"−20% de leite. Só no inverno.",w:0},
 vento:{e:"🌬️",n:"Ventania",m:.95,d:"−5% de leite.",w:8},
 neblina:{e:"🌫️",n:"Neblina",m:1,d:"Sem efeito. Vacas sonolentas.",w:7},
 tempestade:{e:"⛈️",n:"Tempestade",m:.75,d:"−25% de leite e mais doenças.",w:6},
 granizo:{e:"🧊",n:"Granizo",m:.7,d:"−30% de leite e pode machucar vacas.",w:2},
 arco:{e:"🌈",n:"Arco-íris",m:1.2,d:"+20% de leite! Dá sorte.",w:0}};
const WK=Object.keys(WE),SLOT=5400000;
function pickW(slot){const sea=SEI(slot*SLOT);let tot=0;const ws=WK.map(k=>{let p=WE[k].w;
  if(k==="calor")p*=sea===1?2.4:sea===3?0:1;if(k==="frio")p*=sea===3?3:sea===1?0:.6;if(k==="chuva"||k==="garoa")p*=sea===0?1.6:1;if(k==="granizo")p*=sea===1?2:1;if(k==="neve")p=sea===3?6:0;tot+=p;return p});
  let r=rnd(slot*5.31+2)*tot;for(let i=0;i<WK.length;i++){r-=ws[i];if(r<=0)return WK[i]}return "sol"}
function slotW(slot){let k=pickW(slot);const pv=pickW(slot-1);
  if(rnd(slot*9.7+1)<.35&&!["arco","granizo"].includes(pv))k=pv;
  if((pv==="chuva"||pv==="garoa"||pv==="tempestade")&&k!=="chuva"&&rnd(slot*3.3+8)<.16&&SEI(slot*SLOT)!==3)k="arco";return k}
VB.weather=(t=now())=>{const id=slotW(Math.floor(t/SLOT));return{id,...WE[id]}};
VB.forecast=n=>{const s0=Math.floor(now()/SLOT);return Array.from({length:n},(_,i)=>({t:(s0+i+1)*SLOT,...WE[slotW(s0+i+1)],id:slotW(s0+i+1)}))};
const decorFx=k=>{const d=X().farm.decor;return Math.min(k==="milk"?.15:.9,Object.keys(d.on).filter(id=>d.on[id]).reduce((a,id)=>{const it=DEC.find(x=>x.id===id);return a+(it&&it.f&&it.f[k]||0)},0))};
VB.decorFx=decorFx;
VB.wMult=()=>{const w=VB.weather();let m=w.m;if(m<1)m=1-(1-m)*(1-Math.min(.9,decorFx("shelter")));return m};
let wTick=0,wHail=-1;
VB.tickers.push(()=>{const t=now();if(t-wTick<120000)return;wTick=t;const w=VB.weather();
  if(["chuva","garoa","tempestade"].includes(w.id)&&state.water<cap()){state.water=Math.min(cap(),state.water+(w.id==="garoa"?1:2));if(page==="farm")render()}
  const slot=Math.floor(t/SLOT);if(w.id==="granizo"&&wHail!==slot){wHail=slot;if(Math.random()>decorFx("shelter")){const h=state.cows.filter(c=>!c.sick);if(h.length){const c=h[Math.floor(Math.random()*h.length)];VB.makeSick(c,"pata");toast(`🧊 O granizo machucou ${cname(c)}!`)}}}});

/* =====================  DECORAÇÃO  ===================== */
const DEC=[
 ["cerca","🪵","Cerca rústica",400,0,null,{}],["flores","🌻","Canteiro de flores",600,0,null,{}],["arvore","🌳","Árvore frondosa",900,0,null,{health:.1}],["espantalho","🧑‍🌾","Espantalho",1500,0,null,{}],
 ["lago","🏞️","Lago",2500,0,null,{milk:.02}],["moinho","🌬️","Moinho de vento",3500,0,null,{milk:.02}],["galpao","🏠","Galpão",6000,0,null,{shelter:.6}],["fonte","⛲","Fonte de pedra",9000,0,null,{milk:.03}],
 ["balanco","🛝","Parque das vacas",12000,0,null,{milk:.02,health:.05}],["coreto","🎪","Coreto",25000,0,null,{milk:.03}],["estatua","🗿","Estátua do Fazendeiro",60000,0,null,{milk:.04}],["castelo","🏰","Castelo do Queijo",250000,0,null,{milk:.06}],
 ["gold","🏆","Troféu Dourado",0,50,null,{milk:.05}],["ovni","🛸","Ovni de estimação",0,120,null,{milk:.08}],
 ["celeiro","🏚️","Celeiro vermelho",4500,0,null,{shelter:.3}],["trator","🚜","Trator",7000,0,null,{}],["feno","🌾","Fardos de feno",700,0,null,{}],["cavalo","🐎","Cavalo",3000,0,null,{}],
 ["galinha","🐔","Galinheiro",1200,0,null,{}],["porco","🐖","Porquinho",1500,0,null,{}],["ovelha","🐑","Ovelhinha",1500,0,null,{}],["pato","🦆","Patos no lago",1100,0,null,{}],
 ["cachorro","🐕","Cachorro pastor",2000,0,null,{health:.03}],["gato","🐈","Gato do celeiro",1800,0,null,{}],["colmeia","🐝","Colmeia",3200,0,null,{milk:.01}],["pomar","🍎","Pomar",4000,0,null,{}],
 ["horta","🥕","Horta",2200,0,null,{}],["pedras","🪨","Pedras",500,0,null,{}],["banco","🪑","Banco de praça",900,0,null,{}],["lanterna","🏮","Lanternas",1300,0,null,{}],
 ["barraca","⛺","Barraca de camping",2600,0,null,{}],["farol","🗼","Torre de vigia",11000,0,null,{health:.04}],["ponte","🌉","Ponte",8000,0,null,{}],["tenda","🎠","Carrossel",30000,0,null,{milk:.02}],
 /* itens de eventos (compre durante o evento e fique para sempre) */
 ["j_fogueira","🔥","Fogueira junina",3000,0,"junina",{milk:.01}],["j_milho","🌽","Milharal",1800,0,"junina",{}],["j_bandeira","🎏","Bandeirinhas",1200,0,"junina",{}],
 ["c_mascara","🎭","Máscara gigante",3000,0,"carnaval",{}],["c_confete","🎊","Chuva de confete",1800,0,"carnaval",{milk:.01}],["c_bumbo","🥁","Bumbo de bloco",2400,0,"carnaval",{}],
 ["m_buque","💐","Buquê gigante",3000,0,"maes",{milk:.01}],["m_laco","🎀","Laço de carinho",1500,0,"maes",{}],["m_casa","🏡","Casinha da mamãe",4000,0,"maes",{health:.03}],
 ["k_urso","🧸","Urso gigante",3000,0,"criancas",{milk:.01}],["k_balao","🎈","Balões",1200,0,"criancas",{}],["k_pipa","🪁","Pipa",1800,0,"criancas",{}],
 ["n_arvore","🎄","Árvore de Natal",4000,0,"natal",{milk:.01}],["n_boneco","⛄","Boneco de neve",2000,0,"natal",{}],["n_presente","🎁","Presentes",1500,0,"natal",{}],
 ["h_abobora","🎃","Abóbora gigante",3000,0,"halloween",{milk:.01}],["h_teia","🕸️","Teia de aranha",1500,0,"halloween",{}],["h_lapide","🪦","Lápide",2000,0,"halloween",{}],
 ["p_ovo","🥚","Ovo gigante",3000,0,"pascoa",{milk:.01}],["p_coelho","🐰","Coelhinho",2000,0,"pascoa",{}],["p_cesta","🧺","Cesta de ovos",1500,0,"pascoa",{}],
 ["v_fogos","🎆","Fogos de artifício",3000,0,"virada",{milk:.01}],["v_taca","🥂","Taças",1500,0,"virada",{}],["v_relogio","⏰","Relógio da virada",2000,0,"virada",{}],
 ["a_alien","👽","Alienígena amigo",3000,0,"alien",{milk:.01}],["a_nave","🛰️","Satélite",2000,0,"alien",{}],
 ["u_vulcao","🌋","Vulcãozinho",3000,0,"vulcao",{milk:.01}],["u_lava","🔥","Poça de lava",1500,0,"vulcao",{}],
 ["l_louca","🤪","Espantalho maluco",2000,0,"louca",{}],["g_gelo","🧊","Bloco de gelo",2000,0,"geada",{}],["g_boneco","🥶","Estátua de gelo",3000,0,"geada",{milk:.01}],
 ["o_doce","🍯","Pote de condensado",2500,0,"condensado",{milk:.01}],["r_ancora","⚓","Âncora",2500,0,"mar",{}],["r_concha","🐚","Concha gigante",1800,0,"mar",{}],
 ["t_fantasma","👻","Fantasminha",2500,0,"terror",{}],["t_morcego","🦇","Morcegos",1500,0,"terror",{}],["d_dino","🦖","Dinossauro",3500,0,"prehist",{milk:.01}],["d_osso","🦴","Ossos",1200,0,"prehist",{}]
].map(a=>({id:a[0],e:a[1],n:a[2],p:a[3],dia:a[4],ev:a[5],f:a[6]}));
VB.DEC=DEC;
const evName=id=>{const e=EVENTS.find(x=>x.id===id);return e?e.e+" "+e.n:id};
const evActive=id=>activeEvents().some(e=>e.id===id);
VB.act.decbuy=b=>{const d=DEC.find(x=>x.id===b.dataset.id),f=X().farm.decor;if(!d||f.own[d.id])return;
  if(d.ev&&!evActive(d.ev))return toast(`🔒 Só durante o evento ${evName(d.ev)}.`);
  if(d.dia){if(X().dia<d.dia)return toast("💎 Diamantes insuficientes.");X().dia-=d.dia}else{if(state.coins<d.p)return toast("Moedas insuficientes.");state.coins-=d.p}
  f.own[d.id]=1;f.on[d.id]=1;VB.sfx("good");save();render()};
VB.act.decon=b=>{const f=X().farm.decor,id=b.dataset.id;f.on[id]=!f.on[id];save();render()};
let dcat="all";VB.act.dcat=b=>{dcat=b.dataset.c;render()};
VB.decorHTML=()=>{const f=X().farm.decor,cats=[["all","Todos"],["own","Meus"],["ev","Eventos"],["gen","Fazenda"]];
  const list=DEC.filter(d=>dcat==="all"||(dcat==="own"?f.own[d.id]:dcat==="ev"?d.ev:!d.ev));
  return `<section><h2>🎨 Decoração</h2><p class="dsc">Compre objetos e arrume sua fazenda. Itens de evento só são vendidos durante o evento, mas ficam seus para sempre. Você tem <b>${Object.keys(f.own).length}</b> de ${DEC.length} itens. Para mover os objetos, toque em <b>✏️ Arrumar fazenda</b> no quadro lá em cima.</p>
  <div class="tabs">${cats.map(([k,l])=>`<button class="secondary ${dcat===k?"on":""}" data-x="dcat" data-c="${k}">${l}</button>`).join("")}</div>
  <div class="sgrid">${list.map(d=>{const lock=d.ev&&!evActive(d.ev)&&!f.own[d.id];return `<div class="item ${lock?"lockd":""}"><div class="ie">${d.e}</div><h3>${d.n}</h3><p class="dsc sm">${d.ev?evName(d.ev)+" · ":""}${d.f.milk?`+${d.f.milk*100}% de leite `:""}${d.f.health?`−${d.f.health*100}% de doenças `:""}${d.f.shelter?`abrigo ${d.f.shelter*100}% `:""}${Object.keys(d.f).length?"":"Só enfeite"}</p>
  ${f.own[d.id]?`<button class="${f.on[d.id]?"secondary":"primary"}" data-x="decon" data-id="${d.id}">${f.on[d.id]?"✅ Colocado · guardar":"Colocar"}</button>`:lock?`<button class="secondary" disabled>🔒 ${evName(d.ev)}</button>`:`<button class="primary" data-x="decbuy" data-id="${d.id}">${d.dia?"💎 "+d.dia:"🪙 "+fmt(d.p)}</button>`}</div>`}).join("")||`<div class="empty">Nada por aqui.</div>`}</div></section>`};

/* cena: clima + objetos arrastáveis */
let editing=false,selDec=null;VB.dragging=false;
const defPos=i=>[8+((i*37+i*i*5)%80),18+((i*23)%44)];
function decItems(){const f=X().farm.decor;return DEC.filter(d=>f.on[d.id]).map((d,i)=>{const p=f.pos[d.id]||defPos(i),z=(f.sz&&f.sz[d.id])||1;return{d,x:p[0],y:p[1],z}})}
function sceneHTML(){const w=VB.weather(),hr=new Date().getHours(),night=hr<6||hr>=19,pet=VB.petCow(),items=decItems(),fc=VB.forecast(5),shel=Math.round(decorFx("shelter")*100);
  const sky=w.id==="calor"?"hot":w.id==="neve"?"snow":"";
  const objs=items.map(({d,x,y,z})=>`<span class="dc ${selDec===d.id&&editing?"sel":""}" data-did="${d.id}" style="left:${x}%;top:${y}%;font-size:${RR(30*z)}px;z-index:${10+RR(y)}">${d.e}</span>`).join("");
  return `<div class="sceneW"><div class="scene ${night?"night":""} w-${w.id} ${editing?"edit":""}" id="scene"><div class="sun">${night?"🌙":w.id==="nublado"||w.id==="neblina"?"":"☀️"}</div>
  <div class="cl c1">☁️</div><div class="cl c2">☁️</div><div class="rain"></div><div class="snow"></div><div class="wind"></div><div class="fog"></div><div class="rbow"></div>${night?`<div class="stars">✦ ✧ ✦ ✧ ✦</div>`:""}<div class="grass"></div>${objs}
  ${pet?`<div class="spet">${cowSVG(type(pet))}<small>🐾 ${H(cname(pet))}</small></div>`:""}
  <div class="wlabel">${w.e} <b>${w.n}</b></div></div>
  <div class="wpanel"><div class="wnow"><span class="wbig">${w.e}</span><div><b>${w.n}</b><br><span>${w.d}</span>${shel?`<br><span>🏠 Abrigo reduz ${shel}% das penalidades</span>`:""}</div></div>
  <div class="wfc"><small>Próximas horas</small><div class="wfl">${fc.map(f=>`<div class="wf"><span>${f.e}</span><small>${new Date(f.t).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</small></div>`).join("")}</div></div>
  <div class="wed"><button class="secondary" data-x="dedit">${editing?"✅ Pronto":"✏️ Arrumar fazenda"}</button>${editing?`<button class="secondary" data-x="dsz" data-v="1">➕</button><button class="secondary" data-x="dsz" data-v="-1">➖</button><button class="secondary" data-x="dstore">📥 Guardar</button><button class="secondary" data-x="dreset">↩️ Resetar</button>`:""}</div></div>
  ${editing?`<p class="dsc sm">Arraste os objetos pelo quadro. Toque num objeto para escolher e use ➕ ➖ para o tamanho.</p>`:""}</div>`}
VB.sceneHTML=sceneHTML;
VB.act.dedit=()=>{editing=!editing;selDec=null;render()};
VB.act.dsz=b=>{if(!selDec)return toast("Toque num objeto primeiro.");const f=X().farm.decor;f.sz=f.sz||{};f.sz[selDec]=clamp(((f.sz[selDec])||1)+.25*+b.dataset.v,.5,3);save();render()};
VB.act.dstore=()=>{if(!selDec)return toast("Toque num objeto primeiro.");X().farm.decor.on[selDec]=false;selDec=null;save();render()};
VB.act.dreset=()=>{const f=X().farm.decor;f.pos={};f.sz={};save();render()};
/* arrastar */
let drag=null;
document.addEventListener("pointerdown",e=>{if(!editing)return;const el=e.target.closest&&e.target.closest("#scene .dc");if(!el)return;const sc=document.getElementById("scene"),r=sc.getBoundingClientRect();
  drag={el,id:el.dataset.did,r,ox:e.clientX-(r.left+parseFloat(el.style.left)/100*r.width),oy:e.clientY-(r.top+parseFloat(el.style.top)/100*r.height)};selDec=drag.id;VB.dragging=true;
  document.querySelectorAll("#scene .dc").forEach(x=>x.classList.toggle("sel",x===el));el.setPointerCapture&&el.setPointerCapture(e.pointerId);e.preventDefault()},{passive:false});
document.addEventListener("pointermove",e=>{if(!drag)return;const x=clamp((e.clientX-drag.ox-drag.r.left)/drag.r.width*100,0,92),y=clamp((e.clientY-drag.oy-drag.r.top)/drag.r.height*100,2,86);drag.el.style.left=x+"%";drag.el.style.top=y+"%";drag.el.style.zIndex=10+RR(y);drag.x=x;drag.y=y;e.preventDefault()},{passive:false});
const endDrag=()=>{if(!drag)return;if(drag.x!=null){X().farm.decor.pos[drag.id]=[RR(drag.x*10)/10,RR(drag.y*10)/10];save()}drag=null;VB.dragging=false};
document.addEventListener("pointerup",endDrag);document.addEventListener("pointercancel",endDrag);

/* =====================  VETERINÁRIO  ===================== */
const DZ={mastite:{e:"🥛",n:"Mastite",m:.45,c:1,d:"−55% de leite"},carrapato:{e:"🪲",n:"Carrapato",m:.7,c:.6,d:"−30% de leite · contagioso",spread:1},febre:{e:"🌡️",n:"Febre",m:.55,c:1.2,d:"−45% de leite"},
 verme:{e:"🪱",n:"Verminose",m:.75,c:.5,d:"−25% de leite"},pata:{e:"🦶",n:"Pata machucada",m:.6,c:.9,d:"−40% de leite"}};
const DK=Object.keys(DZ),SICK_MS=5400000;
VB.dzMult=c=>(DZ[c.dz]||{m:.6}).m;
const vetCost=c=>RR((SELL[type(c).r]*.06+40)*(DZ[c.dz]||{c:1}).c*(1-.1*X().farm.vet));VB.vetCost=vetCost;
VB.makeSick=(c,dz)=>{c.sick=now();c.dz=dz||DK[Math.floor(Math.random()*DK.length)]};
const vaxOn=()=>(X().farm.vax||0)>now();
const risk=c=>{const f=X().farm,w=VB.weather().id;let p=.000085*(w==="tempestade"?2.5:w==="frio"||w==="neve"||w==="granizo"?1.6:1)*(state.manure>=manCap()?1.5:1)*(1-.08*VB.sk("imune"))*(1-.12*f.vet)*(1-decorFx("health"));if(c.tr==="rob")p*=.3;return vaxOn()?0:p};
VB.tickers.push(()=>{const t=now();if(t%10000>1100)return;const f=X().farm,sick=state.cows.filter(c=>c.sick);
  for(const c of sick)if(t-c.sick>SICK_MS){delete c.sick;delete c.dz}
  if(vaxOn()){return}
  if(f.vet>=3&&f.auto&&sick.length){for(const c of sick){const p=RR(vetCost(c)*1.2);if(state.coins>=p){state.coins-=p;delete c.sick;delete c.dz;S("cures");toast(`🩺 Assistente curou ${cname(c)} (−🪙${fmt(p)})`)}}}
  const cap0=Math.max(1,state.cows.length*.3);let n=state.cows.filter(c=>c.sick).length;
  for(const c of state.cows){if(c.sick||n>=cap0)continue;if(Math.random()<risk(c)){VB.makeSick(c);n++;if(page!=="farm")toast(`🤒 ${cname(c)} adoeceu de ${DZ[c.dz].n}! Veja a aba Vet.`);else render();VB.sfx("pop")}}
  /* contágio */
  for(const c of sick){if(!(DZ[c.dz]||{}).spread)continue;for(const o of state.cows){if(o.sick||n>=cap0)continue;if(Math.random()<.0025*(1-.15*f.vet)){VB.makeSick(o,"carrapato");n++}}}});
const cureOne=(c,fee)=>{delete c.sick;delete c.dz;S("cures");VB.addPXP&&VB.addPXP(3)};
VB.act.cure=b=>{const c=cowBy(+b.dataset.u);if(!c||!c.sick)return;const p=vetCost(c);if(state.coins<p)return toast("Moedas insuficientes.");state.coins-=p;cureOne(c);VB.sfx("good");toast(`💊 ${cname(c)} foi curada!`);save();render()};
VB.act.treat=b=>{const c=cowBy(+b.dataset.u);if(!c||!c.sick)return;c.sick=Math.min(c.sick,now()-SICK_MS+1800000);toast(`🍵 Tratamento caseiro: ${cname(c)} melhora em 30 min.`);save();render()};
VB.act.cureall=()=>{const l=state.cows.filter(c=>c.sick),p=l.reduce((a,c)=>a+vetCost(c),0);if(!l.length)return;if(state.coins<p)return toast("Moedas insuficientes.");state.coins-=p;l.forEach(c=>cureOne(c));VB.sfx("good");toast(`💊 ${l.length} vacas curadas!`);save();render()};
VB.act.vetup=()=>{const f=X().farm,l=f.vet,cost=3000*Math.pow(3,l);if(l>=5)return;if(state.coins<cost)return toast("Moedas insuficientes.");state.coins-=cost;f.vet++;VB.sfx("good");save();render()};
const vaxCost=()=>RR((200+state.cows.length*60)*Math.max(1,Math.sqrt(st("earned")/60000))/10)*10;
VB.act.vax=()=>{const c=vaxCost();if(state.coins<c)return toast("Moedas insuficientes.");state.coins-=c;X().farm.vax=now()+7200000;VB.sfx("good");toast("💉 Rebanho vacinado por 2 horas!");save();render()};
VB.act.vauto=()=>{const f=X().farm;f.auto=!f.auto;save();render()};
VB.vetHTML=()=>{const f=X().farm,sick=state.cows.filter(c=>c.sick),n=Math.max(1,state.cows.length),hp=RR((1-sick.length/n)*100),per=state.cows.reduce((a,c)=>a+risk(c),0)*360,rk=vaxOn()?["Protegido","ok"]:per<.2?["Baixo","ok"]:per<.6?["Médio","mid"]:["Alto","bad"];
  const left=(f.vax||0)-now(),top=[...state.cows].filter(c=>!c.sick).sort((a,b)=>risk(b)-risk(a)).slice(0,6);
  return `<section><h2>🩺 Veterinário</h2>
  <div class="vetp"><div class="vst"><span class="vbig">${hp}%</span><small>Saúde do rebanho</small><div class="bar lv"><i style="width:${hp}%"></i></div></div><div class="vst"><span class="vbig ${rk[1]}">${rk[0]}</span><small>Risco de doença agora</small></div><div class="vst"><span class="vbig">${sick.length}</span><small>Vacas doentes</small></div></div>
  <div class="panel"><h3>💉 Vacina do rebanho</h3><p class="dsc">${vaxOn()?`✅ Protegido por mais <b>${clockD(left)}</b>.`:"Protege todas as vacas de doenças por 2 horas."}</p><button class="primary" data-x="vax">Vacinar 🪙${fmt(vaxCost())}</button></div>
  <div class="panel"><h3>🏥 Clínica nível ${f.vet}/5</h3><p class="dsc">Cada nível: −12% de doenças e −10% no custo dos remédios. No nível 3 você libera o <b>Assistente</b>, que cura sozinho (custo +20%).</p>
  ${f.vet<5?`<button class="primary" data-x="vetup">Melhorar 🪙${fmt(3000*Math.pow(3,f.vet))}</button>`:"<b>Nível máximo!</b>"} ${f.vet>=3?`<button class="${f.auto?"primary":"secondary"}" data-x="vauto">🤖 Assistente: ${f.auto?"ligado":"desligado"}</button>`:""}</div>
  ${sick.length?`<div class="panel"><h3>🤒 Doentes (${sick.length})</h3>${sick.map(c=>{const z=DZ[c.dz]||DZ.febre;return `<div class="fuse"><span>${z.e} <b>${H(cname(c))}</b> · ${z.n}<br><small>${z.d} · se cura sozinha em ${clock(SICK_MS-(now()-c.sick))}</small></span><span class="row"><button class="secondary" data-x="treat" data-u="${c.u}">🍵 Caseiro</button><button class="primary" data-x="cure" data-u="${c.u}">💊 🪙${fmt(vetCost(c))}</button></span></div>`}).join("")}<button class="primary" data-x="cureall">💊 Curar todas</button></div>`:`<div class="empty">🐄 Todas as vacas estão saudáveis!</div>`}
  ${top.length&&!vaxOn()?`<div class="panel"><h3>⚠️ Maior risco</h3>${top.map(c=>`<div class="fuse"><span>${H(cname(c))}${c.tr==="rob"?" 🛡️":""}</span><div class="bar lv" style="width:40%"><i class="rk" style="width:${clamp(risk(c)/.00025*100,4,100)}%"></i></div></div>`).join("")}<p class="dsc sm">Dicas: limpe o esterco, tenha um galpão contra mau tempo e vacine antes de tempestades.</p></div>`:""}</section>`};

/* =====================  VACAS DE EVENTOS: cores e acessórios temáticos  ===================== */
const hx=h=>{h=h.replace("#","");if(h.length===3)h=[...h].map(c=>c+c).join("");const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let hh=0,s=0;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60}return[hh,s*100,l*100]};
const tw=(h,dh,dl)=>{const[a,s,l]=hx(h);return `hsl(${(a+dh+360)%360},${clamp(s,25,95)}%,${clamp(l+dl,22,86)}%)`};
const TH={ /* A, B = cores do tema; emo = enfeites flutuantes; head = acessório de cabeça para eventos que não têm um */
 junina:{A:"#e8503a",B:"#ffd447",emo:["🌽","🔥","🎏","🎶"],head:"palha"},carnaval:{A:"#ff4fa3",B:"#4fd1ff",emo:["🎭","🎊","🥁","✨"],head:"mascara"},maes:{A:"#e75480",B:"#ffc4d9",emo:["💐","🌷","💖","🎀"],head:"flores"},criancas:{A:"#4fa8ff",B:"#ffd447",emo:["🧸","🎈","🪁","🍬"],head:"festa"},
 natal:{A:"#d63a3a",B:"#2f8f4e",emo:["❄️","🎄","🎁","⭐"]},halloween:{A:"#ff8a1f",B:"#7a1fd0",emo:["🎃","🦇","🕸️","👻"]},pascoa:{A:"#ff7ab8",B:"#ffd447",emo:["🥚","🐰","🍫","🌷"]},virada:{A:"#ffd447",B:"#7a4ff0",emo:["🎆","🥂","✨","🎇"]},
 alien:{A:"#9dff6b",B:"#5b3fa8",emo:["👽","🛸","⭐","🌌"]},vulcao:{A:"#ff7a1a",B:"#ffd447",emo:["🌋","🔥","💥","✨"]},louca:{A:"#ff6fd8",B:"#fff35c",emo:["🤪","🌀","⚡","🎲"]},geada:{A:"#6fb7e8",B:"#e8f4ff",emo:["❄️","🧊","⛄","✨"]},
 condensado:{A:"#ffc43a",B:"#a8741a",emo:["🍯","🍮","🥛","✨"]},mar:{A:"#1d4f7a",B:"#6ee7ff",emo:["🌊","⚓","🐚","🐟"]},terror:{A:"#7a1fd0",B:"#ff2a2a",emo:["👻","🦇","🕸️","💀"]},prehist:{A:"#b8844a",B:"#f1e6c8",emo:["🦖","🦴","🌋","🌿"]},
 s0:{A:"#ff6fb0",B:"#7ac96b",emo:["🌸","🦋","🌷","🐝"]},s1:{A:"#ffd447",B:"#4fd6ff",emo:["☀️","🌴","🍉","🕶️"]},s2:{A:"#d9822b",B:"#b5532f",emo:["🍂","🍁","🌰","🍄"]},s3:{A:"#7aa6e8",B:"#e8f4ff",emo:["❄️","⛄","🧣","☕"]}};
const K="#2a2420";
/* geometria da vaca (viewBox 300x220): cabeça x216-265 / y66-140 · orelhas esq. 183-215 e dir. 255-288 · corpo x78-220 / y92-165 · pescoço (junção) x≈213-222 */
const HEAD={
 palha:i=>`<ellipse cx="238" cy="70" rx="32" ry="6" fill="#e8c46a" stroke="${K}" stroke-width="2"/><path d="M220 70Q222 50 238 50Q254 50 256 70Z" fill="#f2d98a" stroke="${K}" stroke-width="2"/><path d="M221 66h34" stroke="#e8503a" stroke-width="4"/>${i%3?`<circle cx="258" cy="66" r="3" fill="#e8503a"/>`:""}`,
 mascara:i=>{const c=["#ff4fa3","#4fd1ff","#ffd447"][i%3];return `<path fill-rule="evenodd" d="M213 90Q238 80 264 90Q262 108 250 107Q238 102 228 107Q215 108 213 90ZM222 98a6 6 0 1 0 12 0a6 6 0 1 0 -12 0ZM244 98a6 6 0 1 0 12 0a6 6 0 1 0 -12 0Z" fill="${c}" stroke="${K}" stroke-width="2"/><path d="M256 76Q270 54 284 60Q274 70 262 82Z" fill="#ffd447" stroke="${K}" stroke-width="1.4"/><path d="M258 80Q276 68 286 76Q274 82 264 88Z" fill="#4fd1ff" stroke="${K}" stroke-width="1.4"/>`},
 flores:i=>[[221,77],[228,70],[236,67],[244,69],[251,76]].map(([x,y],k)=>`<circle cx="${x}" cy="${y}" r="5" fill="${["#ff7ab8","#ffd447","#fff","#ff9fcb","#ffd447"][(k+i)%5]}" stroke="${K}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="1.6" fill="#e8a020"/>`).join(""),
 festa:i=>`<path d="M224 72L240 24L255 72Z" fill="${["#4fa8ff","#ff7a7a","#7dff6b"][i%3]}" stroke="${K}" stroke-width="2"/><path d="M229 58h22M234 44h12" stroke="#fff" stroke-width="3"/><circle cx="240" cy="23" r="5" fill="#ffd447" stroke="${K}" stroke-width="1.2"/>`};
/* coleira na junção cabeça-pescoço + pingente pendurado nela */
const COLLAR=[(A,B)=>`<rect x="209" y="106" width="14" height="40" rx="7" fill="${A}" stroke="${K}" stroke-width="1.6"/>`,
 (A,B)=>`<rect x="209" y="106" width="14" height="40" rx="7" fill="${A}" stroke="${K}" stroke-width="1.6"/><path d="M211 114h10M211 122h10M211 130h10M211 138h10" stroke="${B}" stroke-width="2.4"/>`,
 (A,B)=>`<rect x="209" y="106" width="14" height="40" rx="7" fill="${A}" stroke="${K}" stroke-width="1.6"/>`+[114,124,134].map(y=>`<circle cx="216" cy="${y}" r="2.6" fill="${B}"/>`).join("")];
const PEND=[
 (A,B)=>`<circle cx="216" cy="153" r="6" fill="#ffd23f" stroke="${K}" stroke-width="1.5"/><circle cx="216" cy="157" r="1.6" fill="${K}"/>`,
 (A,B)=>`<path d="M212 145l4 7 4-7Z" fill="${B}" stroke="${K}" stroke-width="1.2"/><circle cx="216" cy="157" r="6.5" fill="${A}" stroke="${K}" stroke-width="1.5"/><text x="216" y="160.5" font-size="9" text-anchor="middle" fill="${B}">★</text>`,
 (A,B)=>`<path d="M216 150l2.3 4.7 5.1.7-3.7 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.7-3.6 5.1-.7Z" fill="${B}" stroke="${K}" stroke-width="1.2" stroke-linejoin="round"/>`,
 (A,B)=>[0,72,144,216,288].map(a=>`<ellipse cx="216" cy="151" rx="2.9" ry="4.6" fill="${A}" stroke="${K}" stroke-width=".8" transform="rotate(${a} 216 155)"/>`).join("")+`<circle cx="216" cy="155" r="2.6" fill="${B}"/>`,
 (A,B)=>`<path d="M216 164c-9-6-9-13-3.500-13 2 0 3.500 1.500 3.500 3 0-1.500 1.500-3 3.500-3 5.500 0 5.500 7-3.500 13Z" fill="${A}" stroke="${K}" stroke-width="1.2"/>`];
const NECK=(i,A,B)=>COLLAR[i%3](A,B)+PEND[(i*2+(i>>2))%5](A,B);
/* brincos e laços presos nas orelhas e no topo da cabeça */
const EAR=[(A,B)=>`<circle cx="198" cy="94" r="4" fill="${A}" stroke="${K}" stroke-width="1.2"/>`,(A,B)=>`<rect x="268" y="88" width="7" height="9" rx="2" fill="${B}" stroke="${K}" stroke-width="1.2"/>`,
 (A,B)=>`<path d="M235 67l-9-6v12Z M235 67l9-6v12Z" fill="${A}" stroke="${K}" stroke-width="1.2"/><circle cx="235" cy="67" r="2.8" fill="${B}"/>`,(A,B)=>`<text x="271" y="98" font-size="11" fill="${B}" stroke="${K}" stroke-width=".4" text-anchor="middle">✦</text>`];
const PATCH=[[108,142],[150,146],[186,140],[128,122],[170,122]];
const _acc=acc;
acc=function(c){let s=_acc(c);if(!c.ex)return s;const T=TH[c.ex];if(!T)return s;const i=(+String(c.id).split("_").pop()||0),A=T.A,B=T.B;
  if(!s&&T.head)s=HEAD[T.head](i);
  s+=NECK(i,A,B)+EAR[(i>>1)%EAR.length](A,B);
  const e1=T.emo[i%T.emo.length],e2=T.emo[(i+2)%T.emo.length],p1=PATCH[i%5],p2=PATCH[(i+2)%5];
  s+=`<text x="${p1[0]}" y="${p1[1]}" font-size="20" text-anchor="middle" opacity=".92">${e1}</text><text x="${p2[0]}" y="${p2[1]}" font-size="13" text-anchor="middle" opacity=".8">${e2}</text>`;return s};
(function themeCows(){COWS.forEach(c=>{if(!c.ex)return;const T=TH[c.ex],P=PAL[c.ex];if(!T)return;const i=(+String(c.id).split("_").pop()||0),b=P&&P[i%P.length]||[T.A,T.B];
  if(i>=3||!P){const k=Math.floor(i/3);c.body=tw(b[0],k*9,(k%2?6:-4));c.spots=tw(b[1],-k*7,(k%2?-4:5))}c.pat=(i*3+(P?P.length:1))%10})})();
})();
