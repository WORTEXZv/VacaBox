/* ===== VacaBox v10 · vida na fazenda ===== */
(function(){
"use strict";
const VB=window.VB,H=VB.H,X=()=>VB.X();
const RR=n=>Math.round(n);

/* ---------- eventos brasileiros ---------- */
[{id:"junina",n:"Festa Junina",e:"🌽",h:38,f:601,t:630,cows:["Caipira","Quadrilha","Pamonha"],d:"Fogueira acesa, bandeirinhas no ar e quadrilha no pasto!",
  x:["Canjica","Fogueira de São João","Balão","Bandeirinha","Pé-de-moleque","Milho Verde","Quentão","Sanfoneira","Chapéu de Palha","Arraiá","Cocada Junina","Rainha do Milho"],pal:[["#ffd447","#b5532f"],["#e8503a","#fff3c2"],["#7fc04a","#f2d24b"]]},
 {id:"carnaval",n:"Carnaval",e:"🎭",h:310,f:201,t:301,cows:["Confete","Serpentina","Bloco"],d:"O pasto virou sambódromo! Plumas, glitter e muito leite.",
  x:["Passista","Frevo","Máscara","Marchinha","Pierrô","Colombina","Abadá","Trio Elétrico","Samba","Fantasia","Purpurina","Rainha da Folia"],pal:[["#ff4fa3","#ffd447"],["#4fd1ff","#ff4fa3"],["#7dff6b","#8a3fff"]]},
 {id:"maes",n:"Dia das Mães",e:"💐",h:335,f:501,t:512,cows:["Mamãe","Buquê","Carinho"],d:"Um carinho para todas as mães do rebanho!",
  x:["Abraço","Rosa","Bolo de Mãe","Cartão","Colo","Ninho","Laço de Fita","Café da Manhã","Avó","Ternura","Dedicada","Mãe Suprema"],pal:[["#ffc4d9","#c2185b"],["#fff0f5","#e75480"],["#f8bbd0","#6a1b4d"]]},
 {id:"criancas",n:"Dia das Crianças",e:"🧸",h:200,f:1001,t:1015,cows:["Pipa","Pião","Bolinha de Gude"],d:"Brinquedos espalhados pelo pasto: hora de brincar!",
  x:["Peteca","Brigadeiro","Bexiga","Ursinho","Escorregador","Pula-Corda","Carrinho","Boneca","Gibi","Pirulito","Balanço","Criança Suprema"],pal:[["#6ec6ff","#ffd447"],["#ff7a7a","#fff3c2"],["#a98bff","#7dff6b"]]}
].forEach(ev=>{if(EVENTS.some(e=>e.id===ev.id))return;EVENTS.push({id:ev.id,n:ev.n,e:ev.e,h:ev.h,k:"d",f:ev.f,t:ev.t,cows:ev.cows,d:ev.d});EXTRA[ev.id]=ev.x;PAL[ev.id]=ev.pal;
  [...ev.cows,...ev.x].forEach((n,i)=>{const c=mkEx(ev.id,n,EVR[i],ev.h,i,EVW[EVR[i]]);COWS.push(c);CBY.set(c.id,c)})});

/* ---------- traços, brilhantes e mods ---------- */
const TRS={ord:["💪","Ordeira","+12% de leite"],sor:["🍀","Sortuda","Às vezes rende moedas extras ao ordenhar"],rob:["🛡️","Robusta","70% menos chance de doença"],gul:["🍽️","Gulosa","+15% de leite com o cocho cheio"],
fri:["❄️","Friorenta","+20% no inverno, −8% no verão"],cal:["☀️","Calorenta","+20% no verão, −8% no inverno"],chu:["🌧️","Chuvisqueira","+20% de leite na chuva"],cor:["🐮","Mãe coruja","Passa o traço a 100% dos bezerros"]};
const TK=Object.keys(TRS);VB.TRS=TRS;
VB.newCowHook=(c,t,fresh)=>{c.tr=c.inh&&TRS[c.inh]&&Math.random()<(c.inh==="cor"?1:.65)?c.inh:TK[Math.floor(Math.random()*TK.length)];delete c.inh;
  if(fresh&&Math.random()<.02+.005*VB.sk("shiny")){c.sh=1;setTimeout(()=>{toast(`✨ ${t.name} nasceu BRILHANTE! (+25% de leite)`);VB.sfx("good")},600)}};
VB.mods.push(c=>{let m=VB.wMult();const sea=SEI(Date.now());
  if(c.sh)m*=1.25;if(c.sick)m*=VB.dzMult(c);
  switch(c.tr){case"ord":m*=1.12;break;case"gul":if(state.trough.u>=cap()*.9)m*=1.15;break;case"fri":m*=sea===3?1.2:sea===1?.92:1;break;case"cal":m*=sea===1?1.2:sea===3?.92:1;break;case"chu":if(VB.weather().id==="chuva")m*=1.2;break}
  if(X().prof.pet&&c.u===X().prof.pet)m*=1.05;
  return m*(1+VB.decorFx("milk")+VB.setBonus())});
VB.onMilk=VB.onMilk||[];
VB.onMilk.push((c,L)=>{if(c.tr==="sor"&&Math.random()<.15){const g=RR(L*3*(1+state.rb*.1));earn(g);toast(`🍀 ${cname(c)} deu sorte! +🪙${fmt(g)}`)}});

/* ---------- pet ---------- */
VB.act.pet=b=>{const x=X(),u=+b.dataset.u;x.prof.pet=x.prof.pet===u?0:u;toast(x.prof.pet?"🐾 Vaca de estimação escolhida! (+5% de leite)":"Estimação removida.");save();render()};
VB.petCow=()=>cowBy(X().prof.pet);

/* ---------- fábrica de laticínios ---------- */
const PRD=[["queijo","🧀","Queijo",40,600,1.8],["manteiga","🧈","Manteiga",25,360,1.6],["iogurte","🍶","Iogurte",15,240,1.5],["doce","🍮","Doce de leite",60,1200,2.4],["sorvete","🍨","Sorvete",80,1800,3]];
const dai=()=>X().farm.dairy,dlvl=()=>dai().lvl||0,dslots=()=>1+dlvl(),dval=p=>RR(p[3]*2.6*p[5]*(1+.05*dlvl())*(1+.06*VB.sk("laticinio"))*(1+state.rb*.05));
VB.act.dstart=b=>{const p=PRD.find(x=>x[0]===b.dataset.id),d=dai();if(d.q.length>=dslots())return toast("Todas as máquinas estão ocupadas.");if(state.milk<p[3])return toast(`Precisa de ${p[3]} L de leite no tanque.`);
  state.milk-=p[3];d.q.push({p:p[0],end:Date.now()+p[4]*1000/(1+.12*dlvl())});S("dairyMade");VB.sfx("pop");save();render()};
VB.act.dsell=()=>{const d=dai();let g=0;for(const [id,n] of Object.entries(d.st)){const p=PRD.find(x=>x[0]===id);if(p&&n>0){g+=n*dval(p)}}if(!g)return;d.st={};earn(g);S("dairySold");VB.sfx("claim");toast(`🧀 Vendeu laticínios: +🪙${fmt(g)}`);save();render()};
VB.act.dup=()=>{const d=dai(),l=dlvl(),c=8000*Math.pow(3,l);if(l>=5)return;if(state.coins<c)return toast("Moedas insuficientes.");state.coins-=c;d.lvl=l+1;VB.sfx("good");save();render()};
VB.tickers.push(()=>{const d=dai(),now=Date.now();let ch=0;d.q=d.q.filter(j=>{if(j.end<=now){d.st[j.p]=(d.st[j.p]||0)+1;ch++;return false}return true});
  if(ch){toast("🧀 Laticínio pronto!");VB.sfx("good");if(page==="farm")render()}
  document.querySelectorAll("[data-dq]").forEach(e=>{const j=d.q[+e.dataset.dq];if(j){e.textContent=clock(j.end-now)}})});
function dairyHTML(){const d=dai(),stock=Object.entries(d.st).filter(([k,n])=>n>0);
  return `<section><h2>🏭 Fábrica de Laticínios</h2><p class="dsc">Transforme o leite do tanque em queijo, manteiga e mais. Vale bem mais do que vender o leite puro! Máquinas: <b>${d.q.length}/${dslots()}</b> · nível <b>${dlvl()}/5</b> ${dlvl()<5?`<button class="secondary" data-x="dup">Melhorar 🪙${fmt(8000*Math.pow(3,dlvl()))}</button>`:""}</p>
  <div class="sgrid">${PRD.map(p=>`<div class="item"><div class="ie">${p[1]}</div><h3>${p[2]}</h3><small>Usa ${p[3]} L · ${clock(p[4]*1000/(1+.12*dlvl()))} · vale 🪙${fmt(dval(p))}</small><button class="primary" data-x="dstart" data-id="${p[0]}" ${state.milk>=p[3]&&d.q.length<dslots()?"":"disabled"}>Produzir</button></div>`).join("")}</div>
  ${d.q.length?`<div class="panel"><h3>⚙️ Em produção</h3>${d.q.map((j,i)=>{const p=PRD.find(x=>x[0]===j.p);return `<div class="fuse"><span>${p[1]} ${p[2]}</span><b data-dq="${i}">${clock(j.end-Date.now())}</b></div>`}).join("")}</div>`:""}
  <div class="panel"><h3>📦 Estoque</h3>${stock.length?stock.map(([k,n])=>{const p=PRD.find(x=>x[0]===k);return `<span class="badge uncommon bigchip">${p[1]} ${p[2]} ×${n}</span> `}).join("")+`<br><button class="primary" data-x="dsell">Vender tudo 🪙${fmt(stock.reduce((a,[k,n])=>a+n*dval(PRD.find(x=>x[0]===k)),0))}</button>`:`<small class="dsc sm">Vazio.</small>`}</div></section>`}

/* ---------- injeção na aba Fazenda ---------- */
const FT={fab:()=>dairyHTML(),dec:()=>VB.decorHTML(),vet:()=>VB.vetHTML()};
const _rf=renderFarm;
renderFarm=function(){_rf();const f=$("#farm");if(!f)return;
  const tabs=f.querySelector(".tabs");
  if(tabs){tabs.insertAdjacentHTML("beforeend",`<button class="secondary ${farmTab==="fab"?"on":""}" data-a="ftab" data-t="fab">🏭 Fábrica</button><button class="secondary ${farmTab==="dec"?"on":""}" data-a="ftab" data-t="dec">🎨 Decoração</button><button class="secondary ${farmTab==="vet"?"on":""}" data-a="ftab" data-t="vet">🩺 Vet${state.cows.some(c=>c.sick)?" 🔴":""}</button>`)}
  const g=f.querySelector(".fgrid");if(g&&FT[farmTab]&&g.firstElementChild){g.firstElementChild.outerHTML=FT[farmTab]()}
  if(!VB.dragging)f.insertAdjacentHTML("afterbegin",VB.sceneHTML()+(state.cows.some(c=>c.sick)?`<div class="evban sickban">🤒 ${state.cows.filter(c=>c.sick).length} vaca(s) doente(s). <button class="primary" data-a="ftab" data-t="vet">Ir ao Veterinário</button></div>`:"")+(VB.buffChips?VB.buffChips():""));
  f.querySelectorAll(".fcow").forEach(el=>{const st0=el.querySelector("[data-cd]");if(!st0)return;const c=cowBy(+st0.dataset.cd);if(!c)return;const t=type(c);if(!c.tr)c.tr=TK[Math.floor(Math.random()*TK.length)];
    if(c.sh)el.classList.add("shiny");if(c.sick)el.classList.add("sickc");
    const sm=[...el.querySelectorAll("small")].find(s=>/enche o tanque/.test(s.textContent));if(sm)sm.textContent="🥛 "+c.L+" L (fixo)";
    const tr=TRS[c.tr],badge=el.querySelector(".badge");
    if(badge)badge.insertAdjacentHTML("afterend",`${c.sh?` <span class="shb">✨</span>`:""}${c.sick?` <span class="sickb">🤒</span>`:""}${X().prof.pet===c.u?` <span class="petb">🐾</span>`:""}${tr?`<br><span class="trait" title="${H(tr[2])}">${tr[0]} ${tr[1]}</span>`:""}`);
    const row=el.querySelector(".row");if(row)row.insertAdjacentHTML("beforeend",`<button class="secondary" data-x="pet" data-u="${c.u}" title="Vaca de estimação (+5% de leite)">🐾</button>${c.sick?`<button class="primary" data-x="cure" data-u="${c.u}">💊 ${fmt(VB.vetCost(c))}</button>`:""}`)})};

/* ---------- coleções: recompensas por conjunto ---------- */
const PCT=[25,50,75,100];
function setGroups(){const g=[];for(let r=0;r<=13;r++){const l=COWS.filter(c=>!c.ex&&c.r===r);g.push({k:"r"+r,n:(r>=7?"🌌 ":"")+RN[r],r,l})}g.push({k:"ex",n:"⭐ Exclusivas",r:3,l:COWS.filter(c=>c.ex)});return g}
let SG=null;const sg=()=>SG||(SG=setGroups());
function setRew(g,pct){const r=g.r,coin=g.k==="ex"?RR(40000*pct/25):RR(SELL[r]*Math.min(g.l.length,40)*pct/25*2);const dia=r>=6&&g.k!=="ex"?(pct===100?(r-5)*5:pct===50?(r-5):0):g.k==="ex"&&pct===100?10:0;return{coin,dia,bonus:r>=7?.01:.005}}
VB.setBonus=()=>{const s=X().sets;return Object.keys(s).reduce((a,k)=>{const g=sg().find(x=>x.k===k.split(":")[0]);return a+(g?setRew(g,+k.split(":")[1]).bonus:0)},0)};
const setProg=g=>{const own=new Set(state.seen);return g.l.filter(c=>own.has(c.id)).length};
VB.act.setclaim=b=>{const k=b.dataset.k,pct=+b.dataset.p,g=sg().find(x=>x.k===k),key=k+":"+pct,s=X().sets;if(s[key]||!g||setProg(g)*100<g.l.length*pct)return;
  const r=setRew(g,pct);s[key]=1;earn(r.coin);if(r.dia)VB.addDia(r.dia,true);toast(`🏅 Coleção ${g.n} ${pct}%: +🪙${fmt(r.coin)}${r.dia?" · 💎 "+r.dia:""} · +${r.bonus*100}% de leite`);VB.sfx("claim");save();render()};
function setsHTML(){const gs=sg(),tot=gs.reduce((a,g)=>a+PCT.filter(p=>!X().sets[g.k+":"+p]&&setProg(g)*100>=g.l.length*p).length,0);
  return `<details class="det setsd" ${tot?"open":""}><summary>🏅 Recompensas de coleção ${tot?`<span class="badge new">${tot} disponível</span>`:""} · bônus permanente: +${(VB.setBonus()*100).toFixed(1)}% de leite</summary>
  ${gs.filter(g=>g.l.length&&(g.r<7||state.rb>=1||setProg(g)>0)).map(g=>{const n=setProg(g);return `<div class="fuse setrow"><span><b>${g.n}</b> · ${n}/${g.l.length}<div class="bar lv"><i style="width:${n/g.l.length*100}%"></i></div></span><span class="setp">${PCT.map(p=>{const got=X().sets[g.k+":"+p],ok=n*100>=g.l.length*p,r=setRew(g,p);
    return got?`<button class="secondary" disabled>✅ ${p}%</button>`:`<button class="${ok?"primary":"secondary"}" data-x="setclaim" data-k="${g.k}" data-p="${p}" ${ok?"":"disabled"} title="🪙${fmt(r.coin)}${r.dia?" 💎"+r.dia:""}">${p}%</button>`}).join("")}</span></div>`}).join("")}</details>`}
const _rcm=renderComp;
renderComp=function(){_rcm();const c=$("#comp"),t=c&&c.querySelector(".ctabs");if(!t)return;
  if(state.rb>=1||VB.ULTCOWS.some(u=>state.seen.includes(u.id)))t.insertAdjacentHTML("beforeend",VB.UR.map((u,j)=>{const l=VB.ULTCOWS.filter(c=>c.r===7+j),n=l.filter(c=>state.seen.includes(c.id)).length;return `<button class="ctab u${7+j} ${compR===7+j?"on":""}" data-a="ctab" data-r="${7+j}"><span>${u[0]}</span><b>${l.length}</b><small>${n} descobertas</small></button>`}).join(""));
  t.insertAdjacentHTML("afterend",setsHTML())};

/* ---------- bônus diário: sequência + roleta ---------- */
const STREAK=[[1,0,0],[2,0,0],[3,"campo",0],[4,0,0],[5,"celeiro",0],[6,0,0],[7,"prata",2]];
const canLogin=()=>X().login.last!==VB.dayKey();
VB.act.lclaim=()=>{const l=X().login;if(!canLogin())return;const y=new Date(Date.now()-864e5),was=l.last===VB.dayKey(+y);l.streak=was?(l.streak%7)+1:1;l.last=VB.dayKey();
  const [d,box,dia]=STREAK[l.streak-1],coin=RR(Math.min(4,Math.max(1,Math.sqrt(st("earned")/50000)))*60*d);earn(coin);if(box)X().tix[box]=(X().tix[box]||0)+1;if(dia)VB.addDia(dia,true);VB.xp(20);
  VB.sfx("claim");toast(`🎁 Dia ${l.streak}: +🪙${fmt(coin)}${box?" + 🎟️ caixa":""}${dia?" + 💎 "+dia:""}`);if(l.streak===7)confetti();save();render()};
const SPIN=[["🪙",40,s=>{const g=RR(Math.min(4,Math.max(1,Math.sqrt(st("earned")/50000)))*80);earn(g);return`🪙 ${fmt(g)} moedas`}],["💰",18,s=>{const g=RR(Math.min(4,Math.max(1,Math.sqrt(st("earned")/50000)))*240);earn(g);return`💰 ${fmt(g)} moedas!`}],["🥕",20,s=>{state.food.cenoura=(state.food.cenoura||0)+15;return"🥕 15 cenouras"}],
["🎟️",14,s=>{X().tix.campo=(X().tix.campo||0)+1;return"🎟️ Caixa do Campo grátis"}],["💎",3,s=>{VB.addDia(1,true);return"💎 1 diamante!"}],["🍀",5,s=>{state.food.mel=(state.food.mel||0)+5;return"🍯 5 méis"}]];
let spinning=false;
VB.act.spin=async()=>{const l=X().login;if(l.spin===VB.dayKey()||spinning)return;spinning=true;const el=$("#spinbox");
  let r=Math.random()*100,pick=SPIN[0];for(const s of SPIN){r-=s[1];if(r<=0){pick=s;break}}
  for(let i=0;i<18;i++){if(el)el.textContent=SPIN[i%SPIN.length][0];VB.sfx("tick");await new Promise(r=>setTimeout(r,60+i*12))}
  if(el)el.textContent=pick[0];const msg=pick[2]();l.spin=VB.dayKey();VB.xp(10);spinning=false;VB.sfx("claim");toast("🎰 "+msg);save();render()};
VB.moreTabs=[["x_bonus","🎁 Bônus"]];VB.moreBody={};
VB.moreBody.x_bonus=()=>{const l=X().login,ok=canLogin(),y=l.last===VB.dayKey(Date.now()-864e5),cur=ok?(y?l.streak%7:0):l.streak%7||(l.streak?7:0);
  return `<div class="panel"><h3>🎁 Bônus de login (${l.streak} dia${l.streak===1?"":"s"} seguidos)</h3><div class="streak">${STREAK.map(([d,box,dia],i)=>`<div class="sday ${i<cur?"got":i===cur&&ok?"now":""}"><b>Dia ${d}</b><span>${dia?"💎":box?"🎟️":"🪙"}</span></div>`).join("")}</div>
  <button class="primary big" data-x="lclaim" ${ok?"":"disabled"}>${ok?"Resgatar bônus de hoje":"✅ Volte amanhã"}</button><p class="dsc sm">Faltou um dia? A sequência recomeça. O dia 7 dá 💎 e uma caixa Prateada.</p></div>
  <div class="panel"><h3>🎰 Roleta diária</h3><div class="spinbox" id="spinbox">${l.spin===VB.dayKey()?"✅":"🎰"}</div><button class="primary big" data-x="spin" ${l.spin===VB.dayKey()?"disabled":""}>${l.spin===VB.dayKey()?"Volte amanhã":"Girar!"}</button></div>`};

/* ---------- sons (WebAudio) e animação de raridades ---------- */
let AC=null;const ac=()=>{try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();return AC}catch(e){return null}};
const tone=(f,t0,d,type="sine",v=.07)=>{const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,a.currentTime+t0);g.gain.exponentialRampToValueAtTime(v,a.currentTime+t0+.02);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+t0+d);o.connect(g);g.connect(a.destination);o.start(a.currentTime+t0);o.stop(a.currentTime+t0+d+.05)};
VB.sfx=function(n,r){if(!X().opts.snd)return;
  const S={pop:()=>tone(520,0,.1,"triangle"),tick:()=>tone(900,0,.04,"square",.03),dia:()=>{tone(880,0,.12);tone(1320,.1,.2)},claim:()=>{tone(660,0,.1);tone(880,.09,.1);tone(1100,.18,.18)},good:()=>{tone(523,0,.12,"triangle");tone(659,.1,.12,"triangle");tone(784,.2,.2,"triangle")},
  shake:()=>{for(let i=0;i<6;i++)tone(110+i*8,i*.22,.18,"sawtooth",.03)},
  reveal:()=>{const base=[392,523,659,784,1047,1319];(r>=7?[262,392,523,659,784,1047,1319,1568]:base).forEach((f,i)=>tone(f,i*.11,.35,"triangle",.08))}};
  (S[n]||S.pop)()};
document.addEventListener("pointerdown",()=>{ac()},{once:true});
VB.revealFx=function(c){VB.sfx("reveal",c.r);const col=c.r>=7?VB.UR[c.r-7][1]:c.r===6?"#ffffff":"#ff4d4d",o=document.createElement("div");o.className="rvfx"+(c.r>=7?" big":"");o.style.setProperty("--rc",col);
  o.innerHTML=`<i></i><b>${H(RN[c.r])}</b>`;document.body.appendChild(o);const mc=document.querySelector("#modal .modal-card");if(mc){mc.classList.add("rvshake");setTimeout(()=>mc.classList.remove("rvshake"),1400)}setTimeout(()=>o.remove(),2600)};

/* ---------- notificações ---------- */
let lastN=0,lastReady=0;
VB.act.notif=async()=>{const o=X().opts;if(!("Notification"in window))return toast("Seu navegador não suporta notificações.");
  if(o.notif){o.notif=0;save();render();return}const p=await Notification.requestPermission();o.notif=p==="granted"?1:0;toast(o.notif?"🔔 Notificações ligadas!":"Permissão negada pelo navegador.");save();render()};
VB.notify=(t,b)=>{try{if(!X().opts.notif||Notification.permission!=="granted")return;if(navigator.serviceWorker&&navigator.serviceWorker.ready)navigator.serviceWorker.ready.then(r=>r.showNotification(t,{body:b,icon:"icon-192.png",badge:"icon-192.png",tag:"vb"})).catch(()=>new Notification(t,{body:b,icon:"icon-192.png"}));else new Notification(t,{body:b,icon:"icon-192.png"})}catch(e){}};
VB.tickers.push(()=>{if(!document.hidden||!X().opts.notif)return;const n=state.cows.filter(c=>ready(c)).length;
  if(n>=Math.max(1,state.cows.length*.6)&&Date.now()-lastN>900000&&!lastReady){lastN=Date.now();lastReady=1;VB.notify("🐄 VacaBox","Suas vacas estão prontas para ordenhar!")}if(n===0)lastReady=0;
  if(canLogin()&&Date.now()-lastN>3600000&&new Date().getHours()>=9){lastN=Date.now();VB.notify("🎁 VacaBox","Seu bônus diário está esperando!")}});

/* ---------- tema, tamanho e opções ---------- */
function applyOpts(){const o=X().opts;document.documentElement.classList.toggle("light",o.theme==="light");document.body.style.zoom=o.fs===1?"":String(o.fs)}
VB.applyOpts=applyOpts;
VB.act.opt=b=>{const o=X().opts,k=b.dataset.k,v=b.dataset.v;if(k==="snd")o.snd=o.snd?0:1;else if(k==="theme")o.theme=v;else if(k==="fs")o.fs=+v;applyOpts();save();render()};
applyOpts();
})();
