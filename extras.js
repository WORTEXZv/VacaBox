/* ===== VacaBox v7: extras ===== */
const CFG=window.VB_CONFIG||{},BASE=(CFG.server||"").replace(/\/$/,"");
let ONLINE=false;
async function api(path,body){const c=new AbortController(),t=setTimeout(()=>c.abort(),6000);
  try{const r=await fetch(BASE+path,{method:body?"POST":"GET",headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined,signal:c.signal});if(!r.ok)throw new Error(r.status);return await r.json()}finally{clearTimeout(t)}}
async function detectOnline(){try{const j=await api("/api/ping");ONLINE=!!(j&&j.vacabox)}catch(e){ONLINE=false}if(ONLINE){pushScore();render()}}
let lastPush=0;
async function pushScore(){if(!ONLINE)return;lastPush=Date.now();try{await api("/api/score",{pid:state.pid,name:state.farm,score:Math.round(st("earned"))})}catch(e){}}

/* ---- eventos ---- */
const hr=()=>Math.floor(Date.now()/3600000),mdNow=()=>{const d=new Date();return (d.getMonth()+1)*100+d.getDate()};
const mdTxt=n=>String(n%100).padStart(2,"0")+"/"+String(Math.floor(n/100)).padStart(2,"0");
const RNDEV=EVENTS.filter(x=>x.k==="r");
function activeEvents(){
  const out=[],md=mdNow();
  EVENTS.forEach((e,i)=>{let until=0;
    if(e.k==="d"){if(e.f<=e.t?(md>=e.f&&md<=e.t):(md>=e.f||md<=e.t))until=1}
    else for(const o of [0,1]){const s=hr()-o;if(rnd(s*7.3+1)<.01&&Math.floor(rnd(s*3.1+5)*RNDEV.length)===RNDEV.indexOf(e))until=(s+2)*3600000}
    const f=state.dev.force.find(x=>x.id===e.id&&x.until>Date.now());if(f)until=Math.max(until,f.until);
    if(until)out.push({...e,until})});
  return out;
}
const contractMult=()=>Math.max(1,...state.contracts.act.filter(a=>a.until>Date.now()).map(a=>a.m));

/* ---- navegação com rolagem ---- */
function renderNav(){
  const ev=activeEvents();
  const items=[["home","📦 Caixas"],["farm","🏡 Minha Fazenda"],["shop","🛒 Loja"],...ev.map(e=>["ev:"+e.id,e.e+" "+e.n]),["auction","🔨 Leilão"],["more","📋 Mais"]];
  const h=items.map(([p,l])=>{const e=ev.find(x=>"ev:"+x.id===p);return `<button class="secondary ${page===p?"on":""} ${e?"evb":""}" ${e?`style="--eh:${e.h}"`:""} onclick="showPage('${p}')">${l}</button>`}).join("");
  if(renderNav.h!==h){const n=$("#nav");n.innerHTML=h;renderNav.h=h;navArrows();const on=n.querySelector&&n.querySelector(".on");if(on&&on.scrollIntoView)on.scrollIntoView({inline:"center",block:"nearest"})}
}
function navArrows(){const n=$("#nav");if(!n||n.scrollWidth==null)return;const can=n.scrollWidth>n.clientWidth+4;$("#navL").classList.toggle("hidden",!can||n.scrollLeft<4);$("#navR").classList.toggle("hidden",!can||n.scrollLeft+n.clientWidth>=n.scrollWidth-4)}
(function(){const n=$("#nav");let down=false,sx=0,sl=0,moved=false;
  $("#navL").addEventListener("click",()=>n.scrollBy({left:-220,behavior:"smooth"}));$("#navR").addEventListener("click",()=>n.scrollBy({left:220,behavior:"smooth"}));
  n.addEventListener("scroll",navArrows);addEventListener("resize",navArrows);
  n.addEventListener("wheel",e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){n.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
  n.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"){down=true;moved=false;sx=e.clientX;sl=n.scrollLeft}});
  addEventListener("pointermove",e=>{if(down){const d=e.clientX-sx;if(Math.abs(d)>5)moved=true;n.scrollLeft=sl-d}});
  addEventListener("pointerup",()=>{down=false});
  n.addEventListener("click",e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true)})();

/* ---- páginas de evento ---- */
function renderEvent(id){
  const ev=activeEvents().find(e=>e.id===id);
  if(!ev){$("#event").innerHTML=`<div class="empty">Este evento terminou.</div>`;return}
  const cows=COWS.filter(c=>c.ex===id),b=eventBox(ev),n=activeEvents().length;
  $("#event").innerHTML=`<div class="evpage" style="--eh:${ev.h}"><div class="evhead"><div class="evbig">${ev.e}</div><div><h1>${ev.n}</h1><p>${ev.d}</p>
    <div class="evtag">💰 Leite vale +2× (agora ${n} evento(s) = ${n*2}×) · ${ev.k==="r"?`termina em <b id="evT">${clock(ev.until-Date.now())}</b>`:`disponível até ${mdTxt(ev.t)}`}</div></div></div>
    <div class="boxes one">${boxCard(b)}</div><h2>⭐ Vacas exclusivas deste evento</h2>
    <div class="collection">${cows.map(c=>{const o=state.seen.includes(c.id);return `<div class="collection-card ${o?"":"locked"}">${o?`<div class="cow-art">${cowSVG(c)}</div>`:`<div class="silhouette">?</div>`}<h3>${o?c.name:"???"}</h3><span class="badge ${RC[c.r]}">${RN[c.r]}</span></div>`}).join("")}</div>
    <small style="color:#aeb6a9">Estas vacas só saem desta caixa. Depois do evento a caixa some, mas as vacas ficam com você.</small></div>`;
}

/* ---- procriação ---- */
const RF=[1,.9,.8,.65,.5,.35];
const calfF=(r,n)=>r>=6?1:Math.round((40+6*n)*RF[r]);
function bullsHTML(){return `<section class="shop-sec"><h2>🐂 Touros para procriação</h2><div class="sgrid">${BULLS.map((n,i)=>`<div class="item"><div class="ie">🐂</div><h3>${n}</h3><small>Raça ${i+1}/7 ${"★".repeat(i+1)}</small><small>👩 bezerra: ${calfF(0,i)}% em vacas Comuns, só ${calfF(5,i)}% em Míticas e 1% em Únicas</small><small>Repete a mãe: ${35+8*i}%</small><small>Uso único. Você tem: <b>${state.bulls.filter(x=>x.b===i).length}</b></small>
  <button class="primary" data-a="buybull" data-i="${i}" ${state.coins<BULLP[i]?"disabled":""}>Comprar 🪙${fmt(BULLP[i])}</button></div>`).join("")}</div><small>Quanto melhor a raridade da vaca, menor a chance de nascer bezerra, mesmo com o melhor touro. Raças maiores ajudam mais.</small></section>`}
function nurseryHTML(){
  const now=Date.now(),free=state.cows.filter(c=>ready(c)&&!RM.some(r=>r&&r.c===c.u)),b=state.bulls;
  if(!free.some(c=>c.u===selCow))selCow=free[0]?.u||0;if(!b.some(x=>x.u===selBull))selBull=b[0]?.u||0;
  return `<section><div class="panel"><h3>💕 Procriação</h3>
    ${b.length?`<div>🐂 Touros: ${b.map(x=>`<span class="badge">${BULLS[x.b]}</span>`).join(" ")}</div>`:`<small>Compre touros na 🛒 Loja. Cada um serve uma vez.</small>`}
    <div class="line"><select id="bCow">${free.map(c=>`<option value="${c.u}" ${c.u===selCow?"selected":""}>${cname(c)} (${RN[type(c).r]})</option>`).join("")||"<option>Nenhuma vaca disponível</option>"}</select>
    <select id="bBull">${b.map(x=>`<option value="${x.u}" ${x.u===selBull?"selected":""}>${BULLS[x.b]}</option>`).join("")||"<option>Sem touros</option>"}</select></div>
    <button class="primary" data-a="breed" ${free.length&&b.length&&state.calves.length<6?"":"disabled"}>💕 Procriar</button>
    <small>A vaca descansa 10 min (sem leite). O bezerro cresce por 15 min e então revela se é vaca ou boi.</small></div>
  <h3>🍼 Bezerros (${state.calves.length}/6)</h3>
  <div class="pasture">${state.calves.length?state.calves.map(k=>{const m=COWS.find(x=>x.id===k.mt);return `<div class="fcow"><div style="font-size:54px">🐮</div><h3>Filho de ${m.name}</h3><small>Pai: ${BULLS[k.b]}</small>
    <small>👩 ${k.pF}% vaca · 🐂 ${100-k.pF}% boi</small><small>Repete a mãe: ${k.pS}% · sobe raridade: ${k.pU}%</small>
    <div class="st" data-ct="${k.u}"></div><div class="bar cd"><i data-cbar="${k.u}"></i></div>
    ${k.g<=now?`<button class="primary" data-a="reveal" data-u="${k.u}">✨ Revelar</button>`:""}</div>`}).join(""):`<div class="empty">Nenhum bezerro por enquanto.</div>`}</div>
  <h3>🐂 Bois para vender</h3><div class="pasture">${state.steers.length?state.steers.map(x=>`<div class="fcow"><div style="font-size:54px">🐂</div><h3>Boi ${BULLS[x.b]}</h3><small>Não serve para procriar</small><button class="secondary" data-a="sellsteer" data-u="${x.u}">Vender 🪙${fmt(x.v)}</button></div>`).join(""):`<div class="empty">Nenhum boi.</div>`}</div></section>`;
}
function reveal(k){
  if(k.g>Date.now())return;const m=COWS.find(x=>x.id===k.mt);
  if(Math.random()*100<k.pF){
    if(full())return toast("Fazenda cheia! Venda uma vaca ou melhore o curral.");
    let n;const q=Math.random()*100;
    if(q<k.pU&&m.r<6)n=pickFrom(REG.filter(x=>x.r===m.r+1));else if(q<k.pU+k.pS)n=m;else n=pickFrom(REG.filter(x=>x.r===m.r));
    newCow(n);discover(n);toast(`🐮 Nasceu uma vaca: ${n.name} (${RN[n.r]})!`);
  }else{
    const b=k.b,nb=Math.random()*100<25+10*b?b:Math.max(0,b-1),v=Math.round(BULLP[nb]*.45*(1+.1*m.r));
    state.steers.push({u:uid(),b:nb,v});toast(`🐂 Nasceu um boi ${BULLS[nb]} (vale 🪙${fmt(v)}).`);
  }
  S("reveals");state.calves=state.calves.filter(x=>x!==k);
}

/* ---- missões (diárias + marcos) e conquistas ---- */
const MK=[
["milkings","Ordenhe","vezes",10,1.2,35,0],["milkL","Produza","litros de leite",60,1.22,50,0],["milkSold","Venda","litros de leite",50,1.22,45,0],["earned","Ganhe","moedas no total",500,1.25,70,0],
["boxes","Abra","caixas",3,1.18,50,0],["care","Cuide dos cochos","vezes",3,1.2,30,0],["dungSold","Venda","unidades de esterco",5,1.22,30,0],["guessWins","Acerte","chutes de preço",1,1.2,60,0],
["got0","Ganhe","vacas Comuns",3,1.2,30,0],["got1","Ganhe","vacas Incomuns",3,1.2,40,0],
["evos","Evolua","vacas",1,1.2,150,1],["fuses","Faça","fusões",1,1.2,120,1],["trades","Faça","trocas",1,1.25,100,1],["eventBoxes","Abra","caixas de evento ou estação",1,1.2,150,1],["cowsSold","Venda","vacas",2,1.2,40,1],["got2","Ganhe","vacas Raras",2,1.2,60,1],["got3","Ganhe","vacas Épicas",1,1.2,100,1],
["bred","Procrie","vezes",1,1.2,120,2],["reveals","Revele","bezerros",1,1.2,100,2],["steersSold","Venda","bois",1,1.2,60,2],["auctions","Participe de","leilões",1,1.22,100,2],["got4","Ganhe","vacas Lendárias",1,1.2,250,2],
["auctionsWon","Vença","leilões",1,1.25,300,3],["got5","Ganhe","vacas Míticas",1,1.2,800,3],["got6","Ganhe","vacas Únicas",1,1.3,5000,4],["sales","Venda leite","vezes",3,1.18,40,0],["sellsHigh","Venda leite","vezes com o preço acima de 3,00",1,1.2,70,0],["feeds","Coloque comida nos cochos","vezes",3,1.2,30,0],["waters","Encha a água","vezes",3,1.2,30,0],["cleans","Limpe e guarde esterco","vezes",2,1.2,30,0],
["upgrades","Compre","melhorias",1,1.2,90,0],["foodBought","Compre","unidades de comida",20,1.22,40,0],["guesses","Dê","chutes de preço",2,1.2,40,0],["workerActs","Seu trabalhador deve fazer","ações",10,1.22,50,1],["evtMilk","Venda","litros de leite durante eventos",30,1.22,80,1],
["auctionBids","Dê","lances em leilões",3,1.22,70,2],["bullsBought","Compre","touros",1,1.22,80,2],["cowsNow","Tenha","vacas ao mesmo tempo",5,1.1,80,0,0],["upSum","Some","níveis de melhorias",3,1.12,100,0,0],["coinsNow","Tenha","moedas de uma vez",1000,1.25,120,0,0],
["seen","Descubra","pelagens no livro",5,1.1,120,0,0]];
const r2=n=>{const p=10**Math.max(0,String(Math.round(n)).length-2);return Math.max(1,Math.round(n/p)*p)};
const LAD={};MK.forEach(m=>{const a=[];for(let t=0;t<60;t++){let g=r2(m[3]*m[4]**t);if(a.length&&g<=a[a.length-1])g=a[a.length-1]+1;if(m[0]==="seen"&&g>COWS.length)break;a.push(g)}LAD[m[0]]=a});
const mkLabel=(m,n)=>`${m[1]} ${fmt(n)} ${m[2]}`,mkRew=(m,t)=>Math.max(1,Math.round(m[5]*.1*(1+t)**1.1));
const MCOUNT=MK.reduce((a,m)=>a+LAD[m[0]].length,0)+MK.filter(m=>m[7]!==0).length*60;
function ensureMissions(){
  const d=new Date(),key=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();if(state.missions.day===key)return;
  const stg=stage(),pool=MK.filter(m=>m[7]!==0&&m[6]<=stg),seed=d.getFullYear()*400+d.getMonth()*31+d.getDate(),pk=[];
  for(let j=0;pk.length<Math.min(5,pool.length)&&j<80;j++){const m=pool[Math.floor(rnd(seed+j*7.7)*pool.length)];if(!pk.includes(m))pk.push(m)}
  state.missions={day:key,list:pk.map((m,j)=>{const lad=LAD[m[0]],lvl=Math.min(lad.length-1,2+stg*8+state.rb*6),t=Math.max(0,Math.min(lad.length-1,lvl+Math.floor(rnd(seed+j*3.3)*6)-2)),g=Math.max(1,Math.min(/^got/.test(m[0])?[40,20,6,3,2,1,1][+m[0].slice(3)]:1e12,Math.round(lad[t]*.2)));
    return{k:m[0],g,t:mkLabel(m,g),base:st(m[0]),r:Math.max(1,Math.round(mkRew(m,t)*.5)),done:false}})};save();
}
const mprog=m=>Math.min(m.g,st(m.k)-m.base);
const ACH=[
 {g:"Especiais",id:"a1",n:"Primeira caixa",t:()=>st("boxes")>=1,r:100},{g:"Especiais",id:"a2",n:"Colecionador (50 pelagens)",t:()=>state.seen.length>=50,r:2000},
 {g:"Especiais",id:"a3",n:"Colecionador (100 pelagens)",t:()=>state.seen.length>=100,r:8000},{g:"Especiais",id:"a4",n:"Colecionador (todas as pelagens)",t:()=>state.seen.length>=COWS.length,r:200000},
 {g:"Especiais",id:"a5",n:"Renascido",t:()=>state.rb>=1,r:5000},{g:"Especiais",id:"a6",n:"Renascido 5 vezes",t:()=>state.rb>=5,r:50000},
 {g:"Especiais",id:"a7",n:"Fazenda grande (4 salas)",t:()=>state.up.salas>=3,r:1500},{g:"Especiais",id:"a8",n:"Fazenda com nome",t:()=>state.farm!=="Minha Fazenda",r:200},
 {g:"Especiais",id:"a9",n:"Vaca com apelido",t:()=>state.cows.some(c=>c.nick),r:200},{g:"Especiais",id:"a10",n:"Contratado",t:()=>state.contracts.act.length>=1,r:3000},
 {g:"Especiais",id:"a11",n:"Trabalhador contratado",t:()=>state.worker.lvl>=1,r:1000},{g:"Especiais",id:"a12",n:"Trabalhador no nível máximo",t:()=>state.worker.lvl>=7,r:20000},
 {g:"Especiais",id:"a13",n:"Todas as melhorias no nível 5",t:()=>Object.keys(UPS).every(k=>state.up[k]>=Math.min(5,upMax(k))),r:10000},
 ...RN.map((n,i)=>({g:"Raridades",id:"r"+i,n:`Descubra uma vaca ${n}`,t:()=>state.seen.some(id=>COWS.find(x=>x.id===id).r===i),r:[100,200,400,800,2000,6000,25000][i]})),
 ...EVENTS.map(e=>({g:"Eventos",id:"e_"+e.id,n:`Complete as vacas: ${e.n}`,t:()=>COWS.filter(c=>c.ex===e.id).every(c=>state.seen.includes(c.id)),r:15000})),
 ...SEASONS.map((s,i)=>({g:"Eventos",id:"e_s"+i,n:`Complete as vacas: ${s.n}`,t:()=>COWS.filter(c=>c.ex==="s"+i).every(c=>state.seen.includes(c.id)),r:6000}))];
ACH.forEach(a=>{a.r=Math.max(10,Math.round(a.r/10))});
MK.forEach(m=>LAD[m[0]].forEach((g,t)=>{if(t%5===4)ACH.push({g:`${m[1]} ${m[2].split(" ")[0]==="vezes"?"(vezes)":m[2]}`,id:`L${m[0]}${t}`,n:mkLabel(m,g),t:()=>st(m[0])>=g,r:Math.max(1,Math.round(mkRew(m,t)*1.5))})}));
function checkAch(){let c=0;for(const a of ACH)if(!state.ach[a.id]&&a.t()){state.ach[a.id]=1;state.coins+=a.r;c++;if(c<=2)toast(`🏆 Conquista: ${a.n} (+🪙${fmt(a.r)})`)}if(c){save();if(page==="more")renderMore()}}

/* ---- contratos ---- */
const CN=["Laticínios Santa Aurora","Cooperativa Vale Verde","Queijaria Montanha","Sorveteria Gelato Real","Exportadora LeiteMundo","Padaria Pão Quente","Doceria Mel & Leite","Mercado Bom Preço","Restaurante Sabor da Roça","Hotel Fazenda Boa Vista","Escola Municipal Campo Belo","Hospital Santa Clara","Cafeteria Grão Dourado","Pizzaria Mussarela Real","Confeitaria Doce Sonho","Supermercado Rede Forte","Feira do Produtor","Cooperativa Sol Nascente","Fábrica de Iogurte Cremosa","Chocolateria Cacau Fino","Rede Hotel Estrela","Atacadão do Leite","Queijos do Vale","Manteiga Real","Sorvetes Polar","Biscoitos Crocante","Frigorífico União","Indústria Lácteos Brasil","Companhia Aérea Nuvem","Cruzeiros Mar Azul","Parque Temático Vaca Feliz","Rede Fast Food Burger Rei","Associação de Chefs Reunidos","Banco de Alimentos Esperança","Embaixada Gourmet","Resort Ilha Dourada","Laboratório Nutri Vida","Estação Espacial Lactônia","Colônia Marciana Leite","Império Galáctico do Leite"];
const CE=["🏭","🤝","🧀","🍦","🌍","🥖","🍰","🛒","🍽️","🏨","🏫","🏥","☕","🍕","🧁","🏪","🥬","🌞","🥛","🍫"];
const CM=[["milkSold","Venda","L de leite",300],["milkL","Produza","L de leite",600],["earned","Ganhe","moedas",8000],["boxes","Abra","caixas",8],["milkings","Ordenhe","vezes",50],["cowsSold","Venda","vacas",6],["evos","Evolua","vacas",3],["fuses","Faça","fusões",3],["bred","Procrie","vezes",3],["sales","Venda leite","vezes",15],["upgrades","Compre","melhorias",8],["foodBought","Compre","unidades de comida",150],["workerActs","Faça seu trabalhador agir","vezes",80],["sellsHigh","Venda leite com preço alto","vezes",5],["evtMilk","Venda","L de leite em eventos",100],["guessWins","Acerte","chutes de preço",4],["reveals","Revele","bezerros",3],["trades","Faça","trocas",2],["auctionBids","Dê","lances em leilões",8],["got2","Ganhe","vacas Raras",4]];
const COMPANIES=CN.map((n,i)=>{const m=CM[i%CM.length],g=r2(m[3]*1.22**Math.floor(i/2));return{id:"c"+i,n,e:CE[i%CE.length],u:r2(600*1.34**i),ch:Math.max(.03,+(.3-.0075*i).toFixed(3)),k:m[0],g,t:`${m[1]} ${fmt(g)} ${m[2]}`}});
const CDUR=[[5,1.8],[15,1.5],[30,1.3]];

/* ---- gráfico do preço do leite e chute ---- */
function miniChart(){
  const s=slot(),N=24,W=200,H=46,mn=1,mx=4.2,X=i=>i/N*(W-6),Y=v=>H-(v-mn)/(mx-mn)*H;
  const pr=[],tr=[];for(let i=N;i>=0;i--){pr.push(price(s-i));tr.push(trendAt(s-i))}
  const P=a=>a.map((v,i)=>X(i).toFixed(1)+","+Y(v).toFixed(1)).join("L");
  return `<svg class="mini" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="M${P(tr)}" fill="none" stroke="#8fc7ff" stroke-dasharray="3 3" stroke-width="1.2" opacity=".8"/><path d="M0,${H}L${P(pr)}L${W-6},${H}Z" fill="#e2b63f33"/><path d="M${P(pr)}" fill="none" stroke="#ffd76a" stroke-width="2" stroke-linejoin="round"/><circle cx="${W-6}" cy="${Y(pr[N]).toFixed(1)}" r="3.5" fill="#fff"><animate attributeName="r" values="3;5.5;3" dur="1.6s" repeatCount="indefinite"/></circle></svg>`;
}
function guessBtns(){
  const g=state.guess;
  if(g&&g.slot===slot())return `<div class="guess">🎯 Seu chute: <b>${g.dir>0?"📈 vai subir":"📉 vai cair"}</b> · sequência ${state.gs}</div><div class="row"><button class="secondary" data-a="chartOpen">📊 Gráfico completo</button></div>`;
  return `<div class="guess">🎯 O próximo preço vai…</div><div class="row"><button class="secondary" data-a="guess" data-dir="1">📈 Subir</button><button class="secondary" data-a="guess" data-dir="-1">📉 Cair</button><button class="secondary" data-a="chartOpen">📊 Gráfico</button></div>`;
}
function openChart(){
  const s=slot(),B=48,F=24,W=680,H=300,L=44,R=12,T=16,Bm=26,mn=1,mx=4.4,X=i=>L+i/(B+F)*(W-L-R),Y=v=>T+(1-(v-mn)/(mx-mn))*(H-T-Bm);
  const pr=[],tr=[];for(let i=-B;i<=F;i++){tr.push(trendAt(s+i));if(i<=0)pr.push(price(s+i))}
  const P=(a,o)=>a.map((v,i)=>X(i+o).toFixed(1)+","+Y(v).toFixed(1)).join("L");
  let g="";for(let v=1;v<=4.01;v+=.5)g+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#ffffff22"/><text x="${L-6}" y="${Y(v)+4}" fill="#aeb6a9" font-size="11" text-anchor="end">${v.toFixed(1)}</text>`;
  let sb="";for(let i=-B+1;i<=F;i++){if(SEI((s+i)*SLOT_MS)!==SEI((s+i-1)*SLOT_MS))sb+=`<line x1="${X(i+B)}" x2="${X(i+B)}" y1="${T}" y2="${H-Bm}" stroke="#8fc7ff" stroke-dasharray="4 4"/><text x="${X(i+B)+4}" y="${T+12}" fill="#8fc7ff" font-size="11">${season((s+i)*SLOT_MS).i} ${season((s+i)*SLOT_MS).n}</text>`}
  const sl=trendAt(s+3)-trendAt(s),hint=sl>.004?"📈 a tendência da estação é de ALTA":sl<-.004?"📉 a tendência da estação é de QUEDA":"➖ a tendência está estável";
  const cur=pr[pr.length-1],prev=pr[pr.length-2];
  $("#chartBody").innerHTML=`<div class="modal-title">📊 Preço do leite</div><p style="margin:0 0 8px">Agora: <b class="bigp" style="font-size:26px">🪙 ${cur.toFixed(2)}</b> (${cur>prev?"▲":cur<prev?"▼":"■"} ${Math.abs(cur-prev).toFixed(2)}) · ${hint}</p>
   <div class="bigchart"><svg viewBox="0 0 ${W} ${H}">${g}${sb}<path d="M${P(tr,0)}" fill="none" stroke="#8fc7ff" stroke-width="2" stroke-dasharray="6 5"/><path d="M${P(pr,0)}" fill="none" stroke="#ffd76a" stroke-width="3" stroke-linejoin="round"/>
   <line x1="${X(B)}" x2="${X(B)}" y1="${T}" y2="${H-Bm}" stroke="#fff" opacity=".6"/><circle cx="${X(B)}" cy="${Y(cur)}" r="6" fill="#fff"><animate attributeName="r" values="5;8;5" dur="1.6s" repeatCount="indefinite"/></circle>
   <text x="${X(B/2)}" y="${H-8}" fill="#aeb6a9" font-size="12" text-anchor="middle">passado (2 h)</text><text x="${X(B+F/2)}" y="${H-8}" fill="#8fc7ff" font-size="12" text-anchor="middle">tendência (próx. 1 h)</text></svg></div>
   <small style="color:#aeb6a9">Linha amarela = preços reais. Linha azul tracejada = tendência da estação (o preço real oscila ao redor dela).</small>
   <div class="time sm" id="cTime"></div><small>até o próximo preço</small>${guessBtns()}`;
  $("#chart").classList.remove("hidden");
}
const closeChart=()=>$("#chart").classList.add("hidden");
function resolveGuess(){
  const g=state.guess;if(!g||slot()<=g.slot)return;
  const a=price(g.slot),b=price(g.slot+1),ok=(b-a)*g.dir>0;state.guess=null;S("guesses");
  if(ok){state.gs++;S("guessWins");const r=5*(1+Math.min(state.gs-1,9))*(1+stage());state.coins+=r;toast(`🎯 Acertou! O preço ${b>a?"subiu":"caiu"} (${a.toFixed(2)} → ${b.toFixed(2)}). +🪙${fmt(r)}`)}
  else{state.gs=0;toast(`🎯 Errou: ${a.toFixed(2)} → ${b.toFixed(2)}. Tente de novo!`)}
  save();if(page==="farm")renderFarm();
}

/* ---- tela "Mais" ---- */
let moreTab="mis",lastCode="",RK=null,rkAt=0,chartOn=false;
async function fetchRank(){if(!ONLINE)return;rkAt=Date.now();try{RK=await api("/api/ranking?pid="+state.pid);if(page==="more"&&moreTab==="rank")renderMore()}catch(e){}}
const RIV=["Tião da Roça","Maria Leiteira","Seu Zé","Dona Cida","Fazenda Boa Vista","Chico Boi","Vovó Nina","Capitão Vaca","Lia do Pasto","Rancho Sol","Pedro Tropeiro","Joana Mu","Sítio Verde","Beto Berrante","Cia do Leite"];
const rivScore=(i,t=Date.now())=>Math.round((1500+i*i*i*900+rnd(i+3)*4000)*(1+(t-Date.UTC(2026,10,1))/864e5*(.25+rnd(i)*.4)));
function renderMore(){
  ensureMissions();const now=Date.now();
  const tabs=[["mis","📋 Diárias"],["lad","🪜 Marcos"],["ach","🏆 Conquistas"],["con","🤝 Contratos"],["rank","🥇 Ranking"],["tro","🔁 Trocas"],["perf","👤 Perfil"]];
  let body="";
  if(moreTab==="mis")body=`<p style="color:#aeb6a9">5 missões novas por dia, sorteadas entre mais de ${fmt(MCOUNT)} possibilidades (marcos + diárias). Elas ficam mais difíceis e valiosas conforme você avança (nível de progresso ${stage()+1}).</p>`+state.missions.list.map((m,i)=>{const p=mprog(m);return `<div class="fuse"><span><b>${m.t}</b><br><small>${fmt(p)}/${fmt(m.g)} · prêmio 🪙${fmt(m.r)}</small><div class="bar lv"><i style="width:${p/m.g*100}%"></i></div></span>${m.done?"✅":`<button class="primary" data-a="mclaim" data-i="${i}" ${p>=m.g?"":"disabled"}>Resgatar</button>`}</div>`}).join("");
  if(moreTab==="lad")body=`<p style="color:#aeb6a9">Missões permanentes: cada uma libera a próxima, cada vez mais difícil.</p>`+MK.map(m=>{const k=m[0],lad=LAD[k],t=state.mt[k]||0;if(t>=lad.length)return `<div class="fuse locked"><span>✅ <b>${m[1]} ${m[2]}</b> · todas concluídas</span></div>`;
    const g=lad[t],p=Math.min(g,st(k));return `<div class="fuse"><span><b>${mkLabel(m,g)}</b> <small>(missão ${t+1}/${lad.length})</small><br><small>${fmt(p)}/${fmt(g)} · prêmio 🪙${fmt(mkRew(m,t))}</small><div class="bar lv"><i style="width:${p/g*100}%"></i></div></span><button class="primary" data-a="mlad" data-k="${k}" ${p>=g?"":"disabled"}>Resgatar</button></div>`}).join("");
  if(moreTab==="ach"){const gs={};ACH.forEach(a=>(gs[a.g]=gs[a.g]||[]).push(a));const tot=ACH.filter(a=>state.ach[a.id]).length;
    body=`<p style="color:#aeb6a9">🏆 ${tot}/${ACH.length} conquistas</p>`+Object.entries(gs).map(([g,l])=>`<details class="det"><summary>${g} · ${l.filter(a=>state.ach[a.id]).length}/${l.length}</summary>${l.map(a=>`<div class="fuse ${state.ach[a.id]?"":"locked"}"><span>${state.ach[a.id]?"🏆":"🔒"} <b>${a.n}</b></span><small>🪙${fmt(a.r)}</small></div>`).join("")}</details>`).join("")}
  if(moreTab==="con"){const un=COMPANIES.filter(c=>st("earned")>=c.u),lk=COMPANIES.filter(c=>st("earned")<c.u);
  body=`<p style="color:#aeb6a9">Empresas pagam mais pelo leite. Cumpra a missão, tente o contrato (chance baixa, 30 min entre tentativas) e escolha a duração: <b>5 min = ×1.8</b>, <b>15 min = ×1.5</b>, <b>30 min = ×1.3</b>. Você desbloqueou <b>${un.length}/${COMPANIES.length}</b> empresas — novas aparecem conforme você ganha mais moedas.</p>`+un.map(c=>{
    const act=state.contracts.act.find(a=>a.id===c.id&&a.until>now),pend=state.contracts.pend.includes(c.id),q=state.contracts.qual[c.id],p=q?Math.min(c.g,st(c.k)-q.base):0,cd=(state.contracts.tryAt[c.id]||0)+1800000-now;
    let act2;if(act)act2=`<b>✅ Ativo ×${act.m}</b><br><small>termina em ${clock(act.until-now)}</small>`;
    else if(pend)act2=CDUR.map((d,i)=>`<button class="primary" data-a="cdur" data-id="${c.id}" data-d="${i}">${d[0]} min · ×${d[1]}</button>`).join(" ");
    else if(!q)act2=`<button class="primary" data-a="cstart" data-id="${c.id}">Aceitar missão</button>`;
    else if(p<c.g)act2="⏳ em andamento";else if(cd>0)act2=`<small>tente em ${clock(cd)}</small>`;else act2=`<button class="primary" data-a="ctry" data-id="${c.id}">Tentar contrato</button>`;
    return `<div class="fuse"><span>${c.e} <b>${c.n}</b><br><small>Missão: ${c.t} · chance ${(c.ch*100).toFixed(c.ch<.1?1:0)}%</small>${q&&p<c.g?`<div class="bar lv"><i style="width:${p/c.g*100}%"></i></div><small>${fmt(p)}/${fmt(c.g)}</small>`:""}</span><div>${act2}</div></div>`}).join("")+(lk.length?`<div class="fuse locked"><span>🔒 <b>${lk.length} empresas trancadas</b><br><small>A próxima exige 🪙${fmt(lk[0].u)} ganhos no total.</small></span></div>`:"")}
  
  if(moreTab==="rank"){
    if(ONLINE){body=`<p style="color:#aeb6a9">🌐 Ranking online com jogadores reais. Pontuação = moedas ganhas no total.</p><button class="secondary" data-a="rankrefresh">🔄 Atualizar</button>`+(RK?`<p>Você está em <b>${RK.rank}º</b> de ${RK.total} jogadores.</p>`+RK.top.map((x,i)=>`<div class="fuse ${x.me?"me":""}"><span>${i+1}º <b>${x.n}</b></span><b>🪙 ${fmt(x.s)}</b></div>`).join(""):"<div class='empty'>Carregando…</div>")}
    else{const me={n:state.farm+" (você)",s:st("earned"),me:1},all=[me,...RIV.map((n,i)=>({n,s:rivScore(i)}))].sort((a,b)=>b.s-a.s);
      body=`<div class="evban">⚠️ Modo offline: rivais simulados. Para jogar com pessoas reais, hospede o servidor (veja o LEIA-ME).</div>`+all.map((x,i)=>`<div class="fuse ${x.me?"me":""}"><span>${i+1}º <b>${x.n}</b></span><b>🪙 ${fmt(x.s)}</b></div>`).join("")}}
  if(moreTab==="tro")body=`<p style="color:#aeb6a9">${ONLINE?"🌐 Trocas online: gere um código de 6 números e passe para um amigo; ele digita aqui para receber.":"Modo offline: o código tem só números e pode ser usado em outro aparelho."} A vaca sai da sua fazenda assim que o código é gerado.</p>
    <div class="panel"><h3>📤 Oferecer uma vaca</h3><button class="primary" data-a="topen" ${state.cows.length?"":"disabled"}>🐄 Escolher vaca e gerar código</button>
    ${lastCode?`<div class="codebox">${lastCode}</div><button class="secondary" data-a="tcopy">📋 Copiar código</button>`:""}
    ${state.offers.length?`<h3 style="margin-top:12px">Ofertas aguardando</h3>${state.offers.map((o,i)=>`<div class="line"><b>${fmtCode(o.code)}</b> · ${type({t:o.t}).name} <button class="secondary" data-a="tcancel" data-i="${i}">Cancelar e recuperar</button></div>`).join("")}`:""}</div>
    <div class="panel"><h3>📥 Resgatar um código</h3><input id="tIn" class="codein" inputmode="numeric" placeholder="Digite o código (só números)"><br><button class="primary" data-a="tredeem">Resgatar vaca</button></div>`;
  if(moreTab==="perf")body=`<div class="panel"><h3>👤 Perfil</h3><p>Nome da fazenda: <b>${state.farm}</b> <button class="secondary" data-a="fname">✏️ Mudar</button></p><p>Renascimentos: <b>${state.rb}</b> · Pelagens: <b>${state.seen.length}/${COWS.length}</b> · Moedas ganhas: <b>🪙${fmt(st("earned"))}</b></p>
    <p>Modo: <b>${ONLINE?"🌐 online":"📴 offline (simulado)"}</b></p><small>Para dar nome a uma vaca, toque no ✏️ no cartão dela na fazenda.</small></div>`;
  $("#more").innerHTML=`<h1 style="margin:0 0 12px">📋 Mais</h1><div class="tabs">${tabs.map(([k,l])=>`<button class="secondary ${moreTab===k?"on":""}" data-a="mtab" data-t="${k}">${l}</button>`).join("")}</div>${body}`;
}

/* ---- trocas por código numérico ---- */
const pad=(n,l)=>String(n).padStart(l,"0");
const offCode=c=>{const idx=COWS.findIndex(x=>x.id===c.t),L=Math.min(9999,c.L||1),nn=Math.floor(Math.random()*1e6);return pad(idx,3)+pad(L,4)+pad(nn,6)+pad((idx*7+L*13+nn*17+31)%997,3)};
const fmtCode=s=>s.length===16?`${s.slice(0,3)}-${s.slice(3,7)}-${s.slice(7,13)}-${s.slice(13)}`:s.replace(/^(\d{3})(\d{3})$/,"$1 $2");
function offParse(d){if(d.length!==16)return null;const idx=+d.slice(0,3),L=+d.slice(3,7),nn=+d.slice(7,13),ck=+d.slice(13);if((idx*7+L*13+nn*17+31)%997!==ck||!COWS[idx])return null;return{t:COWS[idx].id,L,n:d.slice(7,13)}}
function openPick(){$("#pickBody").innerHTML=`<div class="modal-title">Escolha a vaca para oferecer</div><div class="pickgrid">${state.cows.map(c=>`<button class="pickcard" data-a="tpick" data-u="${c.u}"><div class="cow-art">${cowSVG(type(c))}</div><b>${cname(c)}</b><small>${RN[type(c).r]} · ${type(c).r===6?"enche o tanque":c.L+" L"}</small></button>`).join("")}</div>`;$("#pick").classList.remove("hidden")}
const closePick=()=>$("#pick").classList.add("hidden");
async function tradeGen(cw){
  if(!confirm(`Gerar código de ${cname(cw)}? A vaca sai da sua fazenda agora.`))return;
  try{
    if(ONLINE){const j=await api("/api/trade/offer",{pid:state.pid,cow:{t:cw.t,L:cw.L,nick:cw.nick||""}});lastCode=fmtCode(j.code);state.offers.push({code:j.code,t:cw.t,L:cw.L,nick:cw.nick||""})}
    else lastCode=fmtCode(offCode(cw));
    state.cows=state.cows.filter(x=>x!==cw);save();closePick();render();
  }catch(e){toast("Não foi possível gerar o código agora.")}
}
async function tradeRedeem(){
  const d=($("#tIn").value||"").replace(/\D/g,"");if(!d)return toast("Digite o código.");if(full())return toast("Fazenda cheia!");
  try{
    if(ONLINE){const j=await api("/api/trade/redeem",{pid:state.pid,code:d});const t=COWS.find(x=>x.id===j.cow.t);if(!t)throw 0;newCow(t,j.cow.L,j.cow.nick);discover(t);S("trades");toast(`🔁 Você recebeu ${t.name}!`)}
    else{const o=offParse(d);if(!o)return toast("Código inválido.");if(state.used.includes(o.n))return toast("Este código já foi usado aqui.");
      state.used.push(o.n);const t=COWS.find(x=>x.id===o.t);newCow(t,o.L);discover(t);S("trades");toast(`🔁 Você recebeu ${t.name}!`)}
    save();render();
  }catch(e){toast("Código inválido ou já usado.")}
}
async function tradeCancel(i){const o=state.offers[i];if(!o)return;try{await api("/api/trade/cancel",{pid:state.pid,code:o.code});const t=COWS.find(x=>x.id===o.t);newCow(t,o.L,o.nick);state.offers.splice(i,1);lastCode="";toast("Vaca recuperada!");save();render()}catch(e){state.offers.splice(i,1);toast("Esta oferta já foi resgatada ou expirou.");save();render()}}

/* ---- leilão por turnos (online com pessoas reais; offline com jogadores simulados) ---- */
const AE=window.AuctionEngine,AC=AE.AC;
let A=null,AV=null,avAt=0,avBusy=false,aSigLast="";const claiming=new Set();
const BOTN=["Ana 🤖","Bruno 🤖","Carla 🤖","Diego 🤖","Elisa 🤖"];
const cowOf=(r,pick)=>{const p=REG.filter(c=>c.r===r);return p[Math.floor(pick*p.length)%p.length]};
function aLocal(){const k=Math.floor(Date.now()/AE.SLOT);if(A&&A.key===k)return A;
  A=AE.create(k);const n=2+Math.floor(rnd(k)*3);for(let i=0;i<n;i++)AE.addBot(A,"b"+i,BOTN[i],k*7+i);A.settled=false;return A}
function offlineStep(){const L=aLocal();AE.step(L,Date.now());
  if(L.over&&!L.settled){L.settled=true;if(L.winner===state.pid){
    if(state.coins<L.bid&&!state.dev.inf)L.res+=" (você não tinha moedas: vaca perdida)";else if(full())L.res+=" (fazenda cheia: vaca perdida)";
    else{if(!state.dev.inf)state.coins-=L.bid;const cow=cowOf(L.r,L.pick);newCow(cow);discover(cow);S("auctionsWon");toast(`🎉 Você venceu o leilão: ${cow.name} por 🪙${fmt(L.bid)}!`);save();render()}}}}
function av(){
  const now=Date.now();
  if(ONLINE){if(!AV)return null;const d=now-avAt;return{...AV,el:AV.elapsed+d,regLeft:Math.max(0,AV.regLeft-d),turn:AV.turn?{...AV.turn,dl:avAt+(AV.turn.dl-AV.now)}:null,cow:cowOf(AV.r,AV.pick),claims:AV.claims||[]}}
  const L=aLocal(),P=AE.pub(L,state.pid,now);return{...P,cow:cowOf(P.r,P.pick),claims:[]};
}
async function pollAuction(){
  if(avBusy||!ONLINE)return;avBusy=true;
  try{AV=await api(`/api/auction?pid=${state.pid}`);avAt=Date.now();for(const c of AV.claims||[])tryClaim(c)}catch(e){}
  avBusy=false;if(page==="auction")updAuction();
}
async function tryClaim(c){
  if(claiming.has(c.key))return;if(state.coins<c.bid&&!state.dev.inf)return;if(full())return;claiming.add(c.key);
  try{const r=await api("/api/auction/claim",{pid:state.pid,key:c.key});if(!state.dev.inf)state.coins-=r.bid;const cow=cowOf(r.r,r.pick);newCow(cow);discover(cow);S("auctionsWon");toast(`🎉 Você venceu o leilão: ${cow.name} por 🪙${fmt(r.bid)}!`);save();render()}catch(e){}
  claiming.delete(c.key);
}
const aTable=()=>`<div class="panel"><h3>Limites e botões de lance por raridade</h3>${AC.map((c,i)=>`<div class="line"><span class="badge ${RC[i]}">${RN[i]}</span> limite 🪙${fmt(c)} · botões: ${AE.AB[i].map(x=>"+"+fmt(x)).join(" · ")}</div>`).join("")}</div>`;
const aSig=v=>[v.key,v.phase,v.turn&&v.turn.name,v.me&&v.me.in,v.over,(v.claims||[]).length,v.round,!!v.me].join("|");
function renderAuction(){
  const el=$("#auction"),v=av();
  const head=`<h1 style="margin:0 0 12px">🔨 Leilão</h1>${ONLINE?`<small style="color:#7be28a">🌐 Online — jogadores reais, um de cada vez</small>`:`<div class="evban">⚠️ Modo offline: disputando contra jogadores simulados 🤖. Hospede o servidor para jogar com pessoas reais.</div>`}`;
  if(!v){el.innerHTML=head+`<div class="empty">Conectando ao leilão…</div>`+aTable();aSigLast="";return}
  aSigLast=aSig(v);
  const claims=(v.claims||[]).map(c=>`<div class="evban">🎉 Você venceu um leilão (🪙${fmt(c.bid)})! <button class="primary" data-a="aclaim" data-key="${c.key}">Resgatar vaca</button></div>`).join("");
  const t=v.cow,mine=!!(v.turn&&v.turn.me),joined=!!v.me;
  let box="";
  if(v.phase==="reg")box=`<div class="turnbox">📝 <b>Inscrições abertas</b> — o leilão começa em <b id="aReg"></b><br>${joined?"✅ Você está inscrito. Aguarde os outros jogadores.":`<button class="primary" data-a="ajoin" ${full()?"disabled":""}>${full()?"Fazenda cheia":"Entrar no leilão"}</button>`}</div>`;
  else if(v.phase==="live")box=`<div class="turnbox ${mine?"mine":""}">🔔 <b>Rodada ${v.round}</b> · Vez de <b>${v.turn?v.turn.name:"—"}${mine?" (VOCÊ!)":""}</b><div class="bar ${mine?"":"w"}"><i id="aTurnBar"></i></div><div class="time sm" id="aTurnT"></div>
    ${joined&&v.me.in?`<div class="abtns">${v.buttons.map((x,i)=>`<button class="${mine?"primary":"secondary"}" data-a="abid" data-p="${i}" ${mine?"":"disabled"}>+🪙${fmt(x)}</button>`).join("")}</div><button class="secondary" data-a="apass">🚪 Sair do leilão</button>`:`<small>${joined?"Você saiu deste leilão.":"Você não se inscreveu neste leilão."}</small>`}</div>`;
  else box=`<div class="evban" id="aRes">${v.res}</div><small>Próximo leilão em <b id="aNext"></b></small>`;
  el.innerHTML=head+claims+`<div class="panel auc"><div class="aucL"><div class="cow-art" style="height:130px">${cowSVG(t)}</div><h2 style="margin:4px 0">${t.name}</h2><span class="badge ${RC[v.r]}">${RN[v.r]}</span></div>
   <div class="aucR"><div>Lance atual: <b class="bigp" id="aBid"></b></div><div>Líder: <b id="aLead"></b> · Lance inicial 🪙${fmt(v.start)} · Limite 🪙${fmt(v.cap)}</div>${box}
   <div class="parts" id="aOrder"></div><div class="alog" id="aLog"></div></div></div>`+aTable();
  updAuction();
}
function updAuction(){
  if(page!=="auction")return;const v=av();if(!v)return;
  if(aSig(v)!==aSigLast){renderAuction();return}
  const now=Date.now(),T=x=>{const e=$(x);return e};
  if($("#aBid")){$("#aBid").textContent="🪙"+fmt(v.bid);$("#aLead").textContent=v.leader||"—"}
  if($("#aReg"))$("#aReg").textContent=clock(v.regLeft);
  if($("#aTurnT")&&v.turn){const r=Math.max(0,v.turn.dl-now);$("#aTurnT").textContent=Math.ceil(r/1000)+"s";setBar($("#aTurnBar"),r/AE.TURN)}
  if($("#aNext"))$("#aNext").textContent=clock(AE.SLOT-(v.el%AE.SLOT));
  if($("#aOrder"))$("#aOrder").innerHTML=(v.order||[]).map(o=>`<span class="badge ${o.in?"":"locked"} ${o.turn?"turn":""}">${o.turn?"▶️":o.lead?"👑":o.in?"🟢":"⚪"} ${o.n}${o.me?" (você)":""}</span>`).join(" ");
  if($("#aLog"))$("#aLog").innerHTML=(v.log||[]).map(l=>`<div>${l}</div>`).join("");
}

/* ---- ações ---- */
function extraAction(a,b,c){
  const i=+b.dataset.i;
  if(a==="buybull"){if(state.coins>=BULLP[i]){state.coins-=BULLP[i];state.bulls.push({u:uid(),b:i});S("bullsBought")}save();render();return true}
  if(a==="breed"){const cw=cowBy(selCow),bl=state.bulls.find(x=>x.u===selBull);if(!cw||!bl||!ready(cw)||state.calves.length>=6)return true;
    state.bulls=state.bulls.filter(x=>x!==bl);cw.rest=Date.now()+BREST;const n=bl.b,r=type(cw).r;
    state.calves.push({u:uid(),mt:cw.t,b:n,g:Date.now()+CALF,pF:calfF(r,n),pS:35+8*n,pU:r>=6?0:2+2*n});S("bred");toast("💕 Procriação feita! O bezerro cresce em 15 min.");save();render();return true}
  if(a==="reveal"){const k=state.calves.find(x=>x.u===+b.dataset.u);if(k)reveal(k);save();render();return true}
  if(a==="sellsteer"){const x=state.steers.find(s=>s.u===+b.dataset.u);if(x){earn(x.v);S("steersSold");state.steers=state.steers.filter(s=>s!==x)}save();render();return true}
  if(a==="mtab"){moreTab=b.dataset.t;if(moreTab==="rank")fetchRank();renderMore();return true}
  if(a==="mclaim"){const m=state.missions.list[i];if(m&&!m.done&&mprog(m)>=m.g){m.done=true;state.coins+=m.r;toast(`Missão cumprida! +🪙${fmt(m.r)}`);save();render()}return true}
  if(a==="mlad"){const k=b.dataset.k,m=MK.find(x=>x[0]===k),t=state.mt[k]||0;if(m&&LAD[k][t]!=null&&st(k)>=LAD[k][t]){state.coins+=mkRew(m,t);state.mt[k]=t+1;toast(`Missão cumprida! +🪙${fmt(mkRew(m,t))}`);save();render()}return true}
  if(a==="cstart"){state.contracts.qual[b.dataset.id]={base:st(COMPANIES.find(x=>x.id===b.dataset.id).k)};save();renderMore();return true}
  if(a==="ctry"){const co=COMPANIES.find(x=>x.id===b.dataset.id);state.contracts.tryAt[co.id]=Date.now();
    if(Math.random()<co.ch){state.contracts.pend.push(co.id);toast(`🤝 ${co.n} quer fechar contrato! Escolha a duração.`);confetti()}else toast(`${co.n} recusou desta vez. Tente de novo em 30 min.`);save();render();return true}
  if(a==="cdur"){const id=b.dataset.id,[mi,m]=CDUR[+b.dataset.d];state.contracts.act.push({id,until:Date.now()+mi*60000,m});state.contracts.pend=state.contracts.pend.filter(x=>x!==id);toast(`Contrato fechado por ${mi} min: leite ×${m}!`);save();render();return true}
  if(a==="fname"){const n=prompt("Nome da sua fazenda:",state.farm);if(n&&n.trim()){state.farm=n.trim().slice(0,24);save();pushScore();render()}return true}
  if(a==="cnick"&&c){const n=prompt("Nome da vaca (deixe vazio para voltar ao padrão):",c.nick||type(c).name);if(n!==null){c.nick=n.trim().slice(0,16);save();render()}return true}
  if(a==="topen"){openPick();return true}
  if(a==="tpick"){const cw=cowBy(+b.dataset.u);if(cw)tradeGen(cw);return true}
  if(a==="tcopy"){const d=lastCode.replace(/\D/g,"");try{navigator.clipboard.writeText(d);toast("Código copiado!")}catch(e){}return true}
  if(a==="tredeem"){tradeRedeem();return true}
  if(a==="tcancel"){tradeCancel(i);return true}
  if(a==="rankrefresh"){fetchRank();return true}
  if(a==="chartOpen"){chartOn=true;openChart();return true}
  if(a==="guess"){if(!state.guess||state.guess.slot!==slot()){state.guess={slot:slot(),dir:+b.dataset.dir};save();toast("🎯 Chute registrado! Resultado no próximo preço.");if(chartOn)openChart();render()}return true}
  if(a==="milkall"){let space=tankCap()-state.milk,n=0;const fr=state.cows.filter(x=>ready(x)&&!RM.some(r=>r&&r.c===x.u)).sort((x,y)=>type(y).r-type(x).r);
    for(const x of fr){const ri=freeRoom();if(ri<0)break;const est=milkAmount(x);if(est<=0||est>space)continue;space-=est;milkCow(x,ri);n++}
    if(!n)toast("Nenhuma vaca pode ser ordenhada agora (tanque quase cheio, salas ocupadas ou vacas descansando).");return true}
  if(a==="ajoin"){if(full())return toast("Fazenda cheia!"),true;
    if(ONLINE){api("/api/auction/join",{pid:state.pid,name:state.farm}).then(j=>{AV=j;avAt=Date.now();S("auctions");renderAuction()}).catch(()=>toast("Não foi possível entrar."))}
    else{if(AE.join(aLocal(),state.pid,state.farm)){S("auctions");renderAuction()}else toast("As inscrições já fecharam.")}return true}
  if(a==="abid"){const v=av(),i2=+b.dataset.p;if(!v||!v.turn||!v.turn.me)return toast("Não é a sua vez!"),true;const nb=Math.min(v.cap,v.bid+v.buttons[i2]);
    if(state.coins<nb&&!state.dev.inf)return toast("Moedas insuficientes!"),true;S("auctionBids");
    if(ONLINE){api("/api/auction/bid",{pid:state.pid,name:state.farm,p:i2}).then(j=>{AV=j;avAt=Date.now();renderAuction()}).catch(()=>toast("Lance recusado."))}
    else{AE.doBid(aLocal(),state.pid,i2,Date.now());renderAuction()}return true}
  if(a==="apass"){if(ONLINE){api("/api/auction/pass",{pid:state.pid}).then(j=>{AV=j;avAt=Date.now();renderAuction()}).catch(()=>{})}else{AE.pass(aLocal(),state.pid,Date.now());renderAuction()}return true}
  if(a==="aclaim"){tryClaim({key:+b.dataset.key,bid:0});setTimeout(()=>pollAuction(),400);return true}
  return false;
}
let lastEv="",tk=0;
function extraTick(){
  tk++;const now=Date.now();
  if(state.dev.inf)state.coins=Math.max(state.coins,1e12);
  const ev=activeEvents(),k=ev.map(e=>e.id).join();
  if(k!==lastEv){for(const e of ev)if(!lastEv.split(",").includes(e.id)&&lastEv!==null)toast(`${e.e} Evento: ${e.n}! Veja a nova aba.`);lastEv=k;
    if(page.startsWith("ev:")&&!ev.some(e=>"ev:"+e.id===page)){showPage("home")}else render()}
  resolveGuess();
  const ac=state.contracts.act.filter(a=>a.until>now);if(ac.length!==state.contracts.act.length){state.contracts.act=ac;toast("⏱️ Um contrato terminou. Tente renovar em Mais → Contratos.");save()}
  if(tk%3===0)checkAch();
  if(tk%5===0)ensureMissions();
  if(ONLINE){if(now-lastPush>30000)pushScore();if(page==="auction"&&now-avAt>900)pollAuction();if(page==="more"&&moreTab==="rank"&&now-rkAt>10000)fetchRank()}
  else offlineStep();
  updAuction();
  if(chartOn){if(!$("#cTime"))chartOn=false;else{$("#cTime").textContent=clock(SLOT_MS-now%SLOT_MS);if(extraTick.cs!==slot()){extraTick.cs=slot();openChart()}}}
  if(page==="more"&&moreTab==="con"&&tk%5===0)renderMore();
  const t=$("#evT");if(t&&page.startsWith("ev:")){const e=ev.find(x=>"ev:"+x.id===page);if(e&&e.until>1)t.textContent=clock(e.until-now)}
}

/* ---- menu secreto de desenvolvedor: toque 7x no logo ---- */
let bc=0,bt=0;
$("#brand").addEventListener("click",()=>{const n=Date.now();bc=n-bt<1500?bc+1:1;bt=n;
  if(bc>=7){bc=0;const c=prompt("Código de desenvolvedor:");if(c==="vacadev")openDev();else if(c!==null)toast("Código incorreto")}});
function openDev(){
  const d=state.dev;
  $("#devBody").innerHTML=`<div class="modal-title">🛠️ Modo desenvolvedor</div><div class="devgrid">
   <button class="secondary" data-d="money">💰 +1.000.000 moedas</button>
   <button class="secondary" data-d="inf">♾️ Dinheiro infinito: ${d.inf?"LIGADO":"desligado"}</button>
   <button class="secondary" data-d="free">🎁 Caixas grátis: ${d.free?"LIGADO":"desligado"}</button>
   <button class="secondary" data-d="skip">⏩ Zerar todos os tempos</button>
   <button class="secondary" data-d="book">📖 Liberar livro de pelagens</button>
   <button class="secondary" data-d="max">⬆️ Tudo no máximo</button>
   <button class="secondary" data-d="fill">🪣 Encher cochos e água</button>
   <button class="secondary" data-d="bulls">🐂 +1 touro de cada raça</button>
   <button class="secondary" data-d="rbup">♻️ +1 renascimento (sem reset)</button>
   <button class="secondary" data-d="stage">📈 Avançar progresso (missões/contratos)</button>
   <button class="secondary" data-d="export">📤 Exportar save</button>
   <button class="secondary" data-d="import">📥 Importar save</button>
   <button class="secondary" data-d="clearev">🧹 Encerrar eventos forçados</button>
   <button class="secondary" data-d="wipe" style="background:#6a2a2a">🗑️ Reiniciar do zero absoluto</button></div>
   <div class="line"><select id="dSeason"><option value="">Estação automática</option>${SEASONS.map((s,i)=>`<option value="${i}" ${d.season===i?"selected":""}>${s.i} ${s.n}</option>`).join("")}</select> <button class="secondary" data-d="season">Aplicar</button></div>
   <div class="line"><select id="dEv">${EVENTS.map(e=>`<option value="${e.id}">${e.e} ${e.n}</option>`).join("")}</select> <button class="secondary" data-d="event">Forçar evento (1h)</button></div>
   <div class="line"><select id="dCow">${COWS.map(c=>`<option value="${c.id}">${c.name} (${RN[c.r]})</option>`).join("")}</select> <button class="secondary" data-d="give">Dar vaca</button></div>`;
  $("#dev").classList.remove("hidden");
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-d]");if(!b)return;const k=b.dataset.d,d=state.dev;
  if(k==="money")state.coins+=1e6;
  else if(k==="inf")d.inf=!d.inf;else if(k==="free")d.free=!d.free;
  else if(k==="skip"){state.cows.forEach(c=>{c.m=0;c.rest=0;c.at=0});state.calves.forEach(c=>c.g=0);state.worker.last=0;state.contracts.tryAt={}}
  else if(k==="book")state.seen=COWS.map(c=>c.id);
  else if(k==="max"){for(const u in UPS)state.up[u]=upMax(u);state.worker.lvl=wmax();if(!state.worker.paid)state.worker.paid=slot()}
  else if(k==="fill"){state.trough={u:cap(),q:3};state.water=cap();state.manure=0}
  else if(k==="bulls")BULLS.forEach((_,i)=>state.bulls.push({u:uid(),b:i}));
  else if(k==="rbup")state.rb++;
  else if(k==="stage")S("earned",600000);
  else if(k==="season"){const v=$("#dSeason").value;d.season=v===""?null:+v}
  else if(k==="event")d.force.push({id:$("#dEv").value,until:Date.now()+3600000});
  else if(k==="clearev")d.force=[];
  else if(k==="give"){const t=COWS.find(x=>x.id===$("#dCow").value);newCow(t);discover(t)}
  else if(k==="export"){const s=JSON.stringify(state);try{navigator.clipboard.writeText(s);toast("Save copiado!")}catch(x){prompt("Copie o save:",s)}return}
  else if(k==="import"){const s=prompt("Cole o save:");if(!s)return;try{const o=JSON.parse(s);localStorage.setItem("vacabox_save",JSON.stringify(o));location.reload()}catch(x){toast("Save inválido")}return}
  else if(k==="wipe"){if(confirm("Apagar TUDO e recomeçar do zero absoluto?")&&confirm("Tem certeza? Não dá para desfazer.")){window.WIPED=1;localStorage.removeItem("vacabox_save");location.reload()}return}
  save();render();openDev();
});
function closeDev(){$("#dev").classList.add("hidden")}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeDev();closeChart();closePick()}});
render();detectOnline();
