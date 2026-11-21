/* ===== VacaBox v9 (sobrescreve funções antigas) ===== */
const VER=9;
const WEEK0=Date.UTC(2026,10,16,3),WEEK_MS=7*864e5,weekIdx=(t=Date.now())=>Math.floor((t-WEEK0)/WEEK_MS);
const esc=s=>String(s).replace(/[<>&"]/g,"");
const MEDAL=["🥇","🥈","🥉"],PL=["Ouro","Prata","Bronze"];
PG.rank="Rank";
const ZERO={m:0,cd:0,man:0,pr:0,us:0};
/* ---------- comidas e ingredientes ---------- */
const CAT={fib:"🌾 Fibras",ene:"⚡ Energia",pro:"💪 Proteínas",vit:"🍎 Vitaminas",min:"🧂 Minerais",doc:"🍯 Doces"};
const IT_RAW=[["capim","Capim","🌾",1,"fib",3,0,0,0,0],["feno","Feno","🪵",2,"fib",4,0,1,0,0],["palha","Palha","🌿",1,"fib",1,0,0,0,3],["trevo","Trevo","☘️",4,"fib",3,0,0,0,2],["alfafa","Alfafa","🥬",5,"fib",5,0,2,0,0],["cana","Cana-de-açúcar","🎋",3,"fib",3,0,0,1,0],["silagem","Silagem","🥗",6,"fib",12,0,0,0,2],
["milho","Milho","🌽",3,"ene",4,0,0,0,0],["aveia","Aveia","🥣",4,"ene",4,1,0,0,0],["cevada","Cevada","🌾",4,"ene",4,0,0,0,1],["arroz","Arroz","🍚",3,"ene",3,0,0,0,1],["mandioca","Mandioca","🥔",3,"ene",3,0,1,0,0],["batata","Batata-doce","🍠",4,"ene",4,0,1,0,0],["trigo","Trigo","🌾",3,"ene",3,1,0,0,0],["racao","Ração","🥫",3,"ene",8,0,0,0,0],
["soja","Soja","🫘",6,"pro",6,0,0,0,0],["farelo","Farelo de trigo","🍞",4,"pro",4,0,0,0,1],["algodao","Caroço de algodão","☁️",5,"pro",5,0,0,0,0],["amendoim","Amendoim","🥜",6,"pro",5,0,0,1,0],["linhaca","Linhaça","🌱",6,"pro",4,0,0,2,0],["girassol","Girassol","🌻",5,"pro",4,0,0,1,0],["ervilha","Ervilha","🟢",5,"pro",5,0,1,0,0],
["cenoura","Cenoura","🥕",4,"vit",3,2,0,0,0],["maca","Maçã","🍎",5,"vit",3,0,0,2,0],["abobora","Abóbora","🎃",4,"vit",3,0,2,0,0],["beterraba","Beterraba","🟣",4,"vit",4,1,0,0,0],["banana","Banana","🍌",5,"vit",3,0,0,0,2],["laranja","Laranja","🍊",5,"vit",3,0,0,1,0],["couve","Couve","🥦",4,"vit",3,0,1,0,0],["mixpremium","Mix Premium","⭐",12,"vit",18,3,0,3,0],
["sal","Sal mineral","🧂",3,"min",2,2,0,0,2],["calcio","Cálcio","🦴",5,"min",3,3,0,0,0],["vitamina","Vitaminas","💊",8,"min",5,2,0,0,0],["probiotico","Probiótico","🧪",10,"min",3,0,5,0,0],
["melaco","Melaço","🍯",4,"doc",4,0,0,1,0],["mel","Mel","🐝",8,"doc",3,1,0,3,0],["rapadura","Rapadura","🟫",5,"doc",4,0,0,2,0]];
const ITEMS={};IT_RAW.forEach(([id,n,e,p,c,m,cd,man,pr,us])=>ITEMS[id]={id,n,e,p,c,fx:{m,cd,man,pr,us}});
const SPECIAL={};[[["milho","soja"],"Ração Forte"],[["capim","trevo","alfafa"],"Pasto Verde Premium"],[["cenoura","maca"],"Salada Doce"],[["melaco","milho"],"Milho Caramelado"],[["mel","linhaca","aveia"],"Granola Real"],[["abobora","couve","probiotico"],"Mix Digestivo"],[["sal","calcio","vitamina"],"Reforço Mineral"],[["banana","mel"],"Banana com Mel"],[["soja","algodao","vitamina"],"Super Proteína"],[["rapadura","amendoim"],"Paçoca de Vaca"],[["beterraba","cenoura","maca"],"Suco Vermelho"],[["trigo","farelo"],"Pão da Roça"],[["girassol","linhaca","amendoim"],"Semente Dourada"],[["laranja","mel"],"Citrus Doce"],[["cana","melaco"],"Calda de Cana"],[["feno","alfafa","trevo"],"Campo Perfumado"]].forEach(([l,n])=>SPECIAL[l.slice().sort().join("+")]={n,x:1.5});
const PRE=["Mistura","Papa","Ração","Blend","Mix","Festival","Banquete","Combo"],FXK=["m","cd","man","pr","us"],FXC={},FXMAX={m:60,cd:35,man:70,pr:30,us:50};
const hstr=s=>{let h=7;for(const ch of s)h=(h*31+ch.charCodeAt(0))%100003;return h};
function mixFx(ids){const k=ids.join("+");if(FXC[k])return FXC[k];const its=ids.map(i=>ITEMS[i]),cats=new Set(its.map(x=>x.c)).size,syn=[1,1.3,1.7][cats-1]||1,sp=SPECIAL[k]?SPECIAL[k].x:1,fx={};
  FXK.forEach(f=>fx[f]=Math.min(FXMAX[f],+(its.reduce((a,x)=>a+x.fx[f],0)*syn*sp).toFixed(1)));return FXC[k]=fx}
function mixName(ids){const k=ids.join("+");if(SPECIAL[k])return SPECIAL[k].n;const ns=ids.map(i=>ITEMS[i].n);return `${PRE[hstr(k)%PRE.length]} de ${ns.length>2?ns.slice(0,-1).join(", ")+" e "+ns[ns.length-1]:ns.join(" e ")}`}
const mixId=ids=>"mix:"+ids.slice().sort().join("+");
function foodInfo(id){id=id||"capim";if(id.startsWith("mix:")){const ids=id.slice(4).split("+");return{id,n:mixName(ids),e:ids.map(i=>ITEMS[i]?ITEMS[i].e:"").join(""),fx:mixFx(ids),mix:true}}const it=ITEMS[id]||ITEMS.capim;return{id:it.id,n:it.n,e:it.e,fx:it.fx,p:it.p,c:it.c}}
const curFx=()=>state.trough.u>0?foodInfo(state.trough.id).fx:ZERO;
const fxText=fx=>[fx.m?`🥛 +${fx.m}% leite`:"",fx.cd?`⏱️ −${fx.cd}% descanso`:"",fx.man?`💩 −${fx.man}% esterco`:"",fx.pr?`💰 +${fx.pr}% no preço do leite`:"",fx.us?`🍽️ rende ${fx.us}% mais`:""].filter(Boolean).join(" · ")||"Sem bônus";
const manCap=()=>10+5*state.up.esterco;
const ladProg=k=>["seen","cowsNow","upSum","coinsNow"].includes(k)?st(k):Math.max(0,st(k)-(state.mb[k]||0));

/* ---------- normalização / migração do save ---------- */
function normalize(){
  const OLD=["capim","racao","silagem","mixpremium"];
  state.food=state.food&&!Array.isArray(state.food)?state.food:{};
  if(Array.isArray(state.stock)){state.food={};state.stock.forEach((n,i)=>{if(n>0)state.food[OLD[i]]=(state.food[OLD[i]]||0)+n});delete state.stock}
  state.recipes=state.recipes||[];state.trophies=state.trophies||[];if(!state.wk)state.wk={w:weekIdx(),base:st("earned")};state.mb=state.mb||{};state.offers=state.offers||[];state.calves=state.calves||[];state.bulls=state.bulls||[];state.steers=state.steers||[];
  state.trough=state.trough||{u:0,id:"capim"};if(state.trough.q!=null){state.trough.id=OLD[state.trough.q]||"capim";delete state.trough.q}if(!state.trough.id)state.trough.id="capim";
  state.worker=state.worker||{lvl:0,food:"capim",last:0,paid:0,on:true,strike:false};if(typeof state.worker.food!=="string")state.worker.food=OLD[state.worker.food]||"capim";
  state.up=Object.assign({pasto:0,cocho:0,ordenha:0,curral:0,tanque:0,salas:0,esterco:0},state.up);
  if((state.v||0)<9){const M=[0,2,4,5,7,9,11];state.bulls.forEach(b=>b.b=M[b.b]??b.b);state.calves.forEach(k=>{k.b=M[k.b]??k.b});state.steers.forEach(x=>x.b=M[x.b]??x.b);state.v=9}
  if(!state.farmSet&&state.farm&&state.farm!=="Minha Fazenda")state.farmSet=true;
  state.cows=(state.cows||[]).filter(c=>CBY.has(c.t));state.cows.forEach(c=>{if(c.L==null)c.L=rollL(CBY.get(c.t))});
  state.seen=[...new Set([...(state.seen||[]),...state.cows.map(c=>c.t)])].filter(id=>CBY.has(id));
}
function adopt(o){state=Object.assign(def(),o);for(const k of ["up","worker","stats","missions","contracts","dev"])state[k]=Object.assign(def()[k],o[k]);normalize();save();render()}
normalize();

/* ---------- avisos (fila, no topo) ---------- */
const TQ=[];let tBusy=false;
function toast(t){TQ.push(t);if(TQ.length>4)TQ.shift();if(!tBusy)nextToast()}
function nextToast(){const t=TQ.shift(),e=$("#toast");if(!t){tBusy=false;e.classList.add("hidden");return}tBusy=true;e.textContent=t;e.classList.remove("hidden");e.classList.remove("pop");void e.offsetWidth;e.classList.add("pop");setTimeout(nextToast,TQ.length?2400:4200)}
let annT=0;function announce(t){const e=$("#ann");e.textContent=t;e.classList.remove("hidden");clearTimeout(annT);annT=setTimeout(()=>e.classList.add("hidden"),6000)}

/* ---------- salvar (marca para a nuvem + cópia de segurança) ---------- */
const _save=save;let cloudDirty=false,bakAt=0;
save=function(){state.t=Date.now();_save();cloudDirty=true;const n=Date.now();if(n-bakAt>300000){bakAt=n;try{localStorage.setItem("vacabox_save_bak",JSON.stringify(state))}catch(e){}}};

/* ---------- caixas com chances exatas ---------- */
const BP={verde:[65,35],campo:[55,45],celeiro:[40,40,20],prata:[0,75,25],dourada:[0,0,60,38,2],cosmica:[0,0,0,65,33,2],arco:[0,0,0,0,64,34,2]};
BOXES.forEach(b=>{b.p=BP[b.id]});
function pickByP(box){const p=box.p||EXP,pool=box.ex?COWS.filter(c=>c.ex===box.ex):REG;let x=Math.random()*p.reduce((a,b)=>a+b,0),r=0;
  for(let i=0;i<p.length;i++){if(p[i]>0&&(x-=p[i])<=0){r=i;break}}
  let l=pool.filter(c=>c.r===r);if(!l.length)l=pool;return l[Math.floor(Math.random()*l.length)]}
const chips=p=>p.map((x,i)=>x?`<span class="badge ${RC[i]} bigchip">${RN[i]} <b>${x}%</b></span>`:"").join("");
function boxCard(b){return `<article class="box ${b.id==="arco"?"rb":""} ${b.ex?"exb":""}"><div class="box-emoji">${b.emoji}</div><h3>${b.name}</h3><div class="chips">${chips(b.p||EXP)}</div>
  ${b.ex?`<p class="dsc sm">⭐ ${COWS.filter(c=>c.ex===b.ex&&state.seen.includes(c.id)).length}/${COWS.filter(c=>c.ex===b.ex).length} vacas exclusivas descobertas</p>`:""}<div class="price">🪙 ${fmt(b.price)}</div>
  <button class="primary" onclick="openCase('${b.id}')" ${openingBusy||(state.coins<b.price&&!state.dev.free)||full()?"disabled":""}>${full()?"Fazenda cheia":"Abrir caixa"}</button></article>`}

/* ---------- vaca desenhada (visual mais suave e organizado) ---------- */
const RP=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join("");
const PATS=[
 f=>`<ellipse cx="99" cy="128" rx="28" ry="25"/><ellipse cx="157" cy="104" rx="27" ry="17"/><ellipse cx="194" cy="145" rx="31" ry="20"/>`,
 f=>RP(5,i=>`<rect x="${92+i*25}" y="86" width="10" height="84" rx="5" opacity=".6"/>`),
 f=>[[104,122,34],[160,142,26],[176,108,30]].map(([x,y,s])=>`<text x="${x}" y="${y}" font-size="${s}" opacity=".8" text-anchor="middle">★</text>`).join(""),
 f=>RP(10,i=>`<circle cx="${100+(i%5)*26}" cy="${112+Math.floor(i/5)*30}" r="7" opacity=".7"/>`),
 f=>[[106,128,32],[158,114,24],[190,150,26]].map(([x,y,s])=>`<text x="${x}" y="${y}" font-size="${s}" opacity=".75" text-anchor="middle">♥</text>`).join(""),
 f=>RP(4,i=>`<rect x="76" y="${98+i*16}" width="146" height="7" rx="3" opacity=".55"/>`),
 f=>`<path d="M76 146Q150 176 222 146V172H76Z" opacity=".6"/>`,
 f=>[[110,120],[146,136],[182,114],[200,148],[134,104]].map(([x,y])=>`<path d="M${x} ${y-13}l11 13-11 13-11-13Z" opacity=".65"/>`).join(""),
 f=>RP(22,i=>`<circle cx="${90+(i*37)%124}" cy="${98+(i*23)%64}" r="${2+i%3}" opacity=".7"/>`),
 f=>RP(3,i=>`<path d="M80 ${108+i*20}Q104 ${94+i*20} 128 ${108+i*20}T176 ${108+i*20}T224 ${108+i*20}" fill="none" stroke="${f}" stroke-width="8" opacity=".55"/>`),
 f=>`<path d="M84 100Q96 82 130 96Q150 112 132 136Q104 150 88 134Z" opacity=".85"/><path d="M168 118Q190 98 218 114Q226 140 204 156Q176 160 164 144Z" opacity=".85"/>`,
 f=>RP(3,i=>`<path d="M80 ${106+i*20}l20 -14 20 14 20 -14 20 14 20 -14 20 14 20 -14" fill="none" stroke="${f}" stroke-width="7" opacity=".6" stroke-linejoin="round"/>`),
 f=>RP(8,i=>`<path d="M${70+i*22} 170L${100+i*22} 88" stroke="${f}" stroke-width="8" opacity=".5"/>`),
 f=>RP(4,i=>`<circle cx="${108+(i%2)*56+(Math.floor(i/2)?18:0)}" cy="${116+Math.floor(i/2)*30}" r="15" fill="none" stroke="${f}" stroke-width="5" opacity=".6"/>`),
 f=>[[110,116],[150,138],[186,112],[202,150],[128,152]].map(([x,y])=>`<path d="M${x} ${y-13}L${x+12} ${y+9}L${x-12} ${y+9}Z" opacity=".65"/>`).join(""),
 f=>[[108,120],[152,142],[188,112]].map(([x,y])=>`<g opacity=".7">${RP(5,k=>`<ellipse cx="${x}" cy="${y-9}" rx="4.5" ry="8" transform="rotate(${k*72} ${x} ${y})"/>`)}<circle cx="${x}" cy="${y}" r="4" fill="#fff"/></g>`).join(""),
 f=>[[110,122],[152,142],[188,112]].map(([x,y])=>`<path d="M${x} ${y-14}a14 14 0 1 0 12 22a11 11 0 1 1 -12 -22Z" opacity=".7"/>`).join(""),
 f=>RP(12,i=>`<rect x="${82+(i%6)*24}" y="${96+Math.floor(i/6)*32+((i%6)%2?0:0)}" width="24" height="32" opacity="${(i+Math.floor(i/6))%2?.55:0}"/>`),
 f=>`<path d="M100 92Q150 150 200 92Z" opacity=".75"/>`,
 f=>[[108,118],[146,142],[184,114],[130,100],[198,148]].map(([x,y])=>`<path d="M${x} ${y-12}l10 6v12l-10 6-10-6v-12Z" opacity=".6"/>`).join(""),
 f=>[[112,120,-30],[150,138,20],[186,112,-20],[200,148,30]].map(([x,y,a])=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="16" transform="rotate(${a} ${x} ${y})" opacity=".7"/>`).join(""),
 f=>[[110,122],[152,146],[188,114],[132,106]].map(([x,y])=>`<path d="M${x-9} ${y}h18M${x} ${y-9}v18" stroke="${f}" stroke-width="6" stroke-linecap="round" opacity=".7"/>`).join(""),
 f=>`<path d="M150 90H190Q222 90 222 122V140Q222 166 192 166H150Z" opacity=".55"/>`,
 f=>`<ellipse cx="108" cy="124" rx="22" ry="28" opacity=".7" transform="rotate(-20 108 124)"/><ellipse cx="156" cy="140" rx="28" ry="14" opacity=".7" transform="rotate(10 156 140)"/><ellipse cx="190" cy="112" rx="24" ry="18" opacity=".7" transform="rotate(-10 190 112)"/><ellipse cx="204" cy="150" rx="14" ry="12" opacity=".7"/>`];
function cowSVG(c,extraClass=""){
  const K="#3a2d28",P=PATS[(c.pat|0)%PATS.length];
  return `<svg class="${extraClass}${c.r===6?" rbw":""}${c.r===5?" mglow":""}" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-label="${c.name}"><defs><clipPath id="bcl"><rect x="78" y="92" width="142" height="73" rx="30"/></clipPath></defs>
    <ellipse cx="150" cy="198" rx="105" ry="13" fill="#000" opacity=".16"/>
    <g>${glow(c)}
      <path d="M82 100 Q54 116 62 154" stroke="${K}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M82 100 Q54 116 62 154" stroke="${c.body}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M62 148 Q50 162 55 183 Q62 192 69 183 Q75 162 62 148Z" fill="${c.spots}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
      <rect x="95" y="155" width="16" height="39" rx="8" fill="${c.body}"/><rect x="128" y="158" width="16" height="36" rx="8" fill="${c.body}"/><rect x="181" y="155" width="16" height="39" rx="8" fill="${c.body}"/><rect x="207" y="153" width="16" height="41" rx="8" fill="${c.body}"/>
      <path d="M91 195h24M125 195h21M177 195h23M203 195h25" stroke="${K}" stroke-width="6" stroke-linecap="round"/>
      <rect x="78" y="92" width="142" height="73" rx="30" fill="${c.body}"/>
      <g clip-path="url(#bcl)"><g fill="${c.spots}">${P(c.spots)}</g><ellipse cx="150" cy="100" rx="66" ry="12" fill="#fff" opacity=".14"/><ellipse cx="150" cy="164" rx="72" ry="12" fill="#000" opacity=".1"/></g>
      <path d="M212 88 Q186 72 183 92 Q197 104 215 98Z" fill="${c.body}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><path d="M208 90 Q192 83 190 92 Q199 98 211 95Z" fill="#eaaaa4"/>
      <path d="M257 88 Q283 70 288 90 Q274 103 255 97Z" fill="${c.body}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><path d="M259 90 Q275 83 281 92 Q272 98 258 95Z" fill="#eaaaa4"/>
      <path d="M221 76 Q211 58 222 50 Q221 62 230 72Z" fill="#f6ebcc" stroke="${K}" stroke-width="1.6" stroke-linejoin="round"/><path d="M249 74 Q259 56 248 48 Q249 60 240 70Z" fill="#f6ebcc" stroke="${K}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M216 86 Q215 68 235 66 Q254 66 255 86 L263 112 Q268 138 246 140 L228 140 Q211 138 216 112Z" fill="${c.body}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M229 68 Q235 64 242 68 L240 92 Q235 96 230 92Z" fill="#fff" opacity=".5"/><path d="M225 69 Q235 56 246 69 Q235 63 225 69Z" fill="${c.spots}" stroke="${K}" stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="223" cy="114" r="6" fill="#ff8fa0" opacity=".28"/><circle cx="259" cy="114" r="6" fill="#ff8fa0" opacity=".28"/>
      <ellipse cx="228" cy="98" rx="6.5" ry="7.5" fill="#fff" stroke="${K}" stroke-width="1.4"/><circle cx="229.5" cy="99" r="4.2" fill="#1f1714"/><circle cx="231" cy="97" r="1.6" fill="#fff"/>
      <ellipse cx="250" cy="98" rx="6.5" ry="7.5" fill="#fff" stroke="${K}" stroke-width="1.4"/><circle cx="251.5" cy="99" r="4.2" fill="#1f1714"/><circle cx="253" cy="97" r="1.6" fill="#fff"/>
      <path d="M221 90 q4 -5 9 -3 M257 90 q-4 -5 -9 -3" stroke="${K}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="240" cy="127" rx="20" ry="12.5" fill="#f2b9af" stroke="${K}" stroke-width="1.8"/><ellipse cx="233" cy="125" rx="2.8" ry="3.8" fill="#7a3d3d"/><ellipse cx="247" cy="125" rx="2.8" ry="3.8" fill="#7a3d3d"/>
      <path d="M229 133 Q240 139 251 133" stroke="#7a3d3d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    </g>${acc(c)}</svg>`;
}
function glow(c){return c.r!==5?"":[[84,88,0],[232,62,.6],[112,178,1.2],[212,170,1.8],[160,84,.9],[70,130,.3]].map(([x,y,b])=>`<text x="${x}" y="${y}" font-size="15" fill="#ffc9c4" text-anchor="middle">✦<animate attributeName="opacity" values="0;1;0" dur="1.9s" begin="${b}s" repeatCount="indefinite"/></text>`).join("")}
function gacc(a){const K="#3a2d28",st=`stroke="${K}" stroke-width="1.8"`;switch(a){
 case"laco":return `<path d="M246 70l-14-8v16Z M246 70l14-8v16Z" fill="#ff5fa8" ${st}/><circle cx="246" cy="70" r="4" fill="#ff2f8a"/>`;
 case"oculos":return `<circle cx="228" cy="98" r="9" fill="#9fd8ff55" ${st}/><circle cx="250" cy="98" r="9" fill="#9fd8ff55" ${st}/><path d="M237 98h4" ${st}/>`;
 case"flor":return `<circle cx="212" cy="86" r="4" fill="#ffd447"/>`+[0,72,144,216,288].map(d=>`<ellipse cx="212" cy="79" rx="3.4" ry="5" fill="#ff7ab8" transform="rotate(${d} 212 86)"/>`).join("");
 case"sino":return `<path d="M206 136 Q224 150 250 144" stroke="#c23b3b" stroke-width="5" fill="none"/><circle cx="226" cy="152" r="6" fill="#ffd447" ${st}/>`;
 case"coroa":return `<path d="M220 70 L224 50 L232 62 L240 46 L248 62 L256 50 L258 70Z" fill="#ffd447" ${st} stroke-linejoin="round"/>`;
 case"cowboy":return `<ellipse cx="238" cy="70" rx="30" ry="6" fill="#a8743a" ${st}/><path d="M222 70 Q224 46 238 46 Q252 46 254 70Z" fill="#b8844a" ${st}/>`;
 case"cachecol":return `<path d="M204 134 Q226 152 254 144 L256 156 Q226 164 202 146Z" fill="#e0523a" ${st}/><path d="M214 150l-3 16h10l1-12Z" fill="#e0523a" ${st}/>`;
 case"fone":return `<path d="M210 92 Q238 40 266 92" stroke="#333" stroke-width="5" fill="none"/><rect x="204" y="86" width="10" height="18" rx="4" fill="#4a7ad8" ${st}/><rect x="262" y="86" width="10" height="18" rx="4" fill="#4a7ad8" ${st}/>`;
 case"estrela":return `<text x="222" y="78" font-size="20" fill="#ffd447" stroke="${K}" stroke-width=".8">★</text>`;
 case"gravata":return `<path d="M222 142l-12-8v16Z M234 142l12-8v16Z" fill="#2b4fa8" ${st}/><rect x="224" y="138" width="8" height="8" rx="2" fill="#1c3a80"/>`;
 case"bone":return `<path d="M216 72 Q216 50 238 48 Q260 50 258 72Z" fill="#3a7ad8" ${st}/><path d="M256 70 Q276 68 280 74 L256 76Z" fill="#2a5fb0" ${st}/>`;
 case"cartola":return `<rect x="218" y="40" width="40" height="30" rx="3" fill="#222" ${st}/><rect x="218" y="58" width="40" height="7" fill="#c23b3b"/><ellipse cx="238" cy="70" rx="28" ry="5" fill="#222" ${st}/>`;
 case"tiara":return `<path d="M222 70 Q238 52 254 70" stroke="#e8c14a" stroke-width="4" fill="none"/><circle cx="238" cy="58" r="4.5" fill="#6fd3ff" ${st}/>`;
 case"asas":return `<path d="M108 100 Q70 60 56 92 Q74 98 84 112Z" fill="#fff" opacity=".9" ${st}/><path d="M150 96 Q150 62 120 70 Q126 90 138 100Z" fill="#fff" opacity=".9" ${st}/>`;
 case"oculosol":return `<rect x="219" y="91" width="19" height="13" rx="5" fill="#222"/><rect x="241" y="91" width="19" height="13" rx="5" fill="#222"/><path d="M238 96h3" stroke="#222" stroke-width="3"/>`;
 case"bandana":return `<path d="M206 134 Q226 148 254 140 L238 166Z" fill="#d6453d" ${st}/><circle cx="232" cy="146" r="2" fill="#fff"/><circle cx="240" cy="152" r="2" fill="#fff"/>`;
 case"palha":return `<ellipse cx="238" cy="70" rx="32" ry="7" fill="#e6c97a" ${st}/><path d="M222 70 Q224 50 238 50 Q252 50 254 70Z" fill="#f0d98c" ${st}/><rect x="222" y="62" width="32" height="5" fill="#c23b3b"/>`;
 case"fita":return `<path d="M232 66l-12-12 2 16Z M244 66l12-12-2 16Z" fill="#7a5cff" ${st}/><circle cx="238" cy="66" r="4" fill="#5a3de0"/>`;
 case"capacete":return `<path d="M216 74 Q216 48 238 46 Q260 48 258 74Z" fill="#f2c230" ${st}/><rect x="214" y="70" width="46" height="6" rx="3" fill="#d9a400" ${st}/>`;
 case"gorro":return `<path d="M216 72 Q216 44 238 42 Q260 44 258 72Z" fill="#6b4ad8" ${st}/><rect x="214" y="66" width="46" height="9" rx="4" fill="#e9e3ff" ${st}/><circle cx="238" cy="40" r="5" fill="#e9e3ff" ${st}/>`;
 case"aureola":return `<ellipse cx="238" cy="48" rx="20" ry="5" fill="none" stroke="#ffd447" stroke-width="4"/>`;
 case"bigode":return `<path d="M226 134 Q233 128 240 134 Q247 128 254 134" stroke="#3a2d28" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
 case"tapaolho":return `<circle cx="228" cy="98" r="8" fill="#1d1d1d"/><path d="M216 90 L260 104" stroke="#1d1d1d" stroke-width="2.5"/>`;
 case"borboleta":return `<path d="M246 70 q-12 -12 -16 0 q4 12 16 0 M246 70 q12 -12 16 0 q-4 12 -16 0" fill="#ff9ad5" ${st}/><circle cx="246" cy="70" r="2.5" fill="#6a2a5a"/>`;
 default:return ""}}

/* ---------- páginas: início, Compêndio ---------- */
let compR=0,compN=60;
function render(){
  $("#coins").textContent=fmt(state.coins);renderNav();
  if(page==="home"){$("#uniqueCount").textContent=state.seen.length+"/"+COWS.length;$("#farmNm").textContent=state.farm;$("#totalCount").textContent=state.cows.length+"/"+farmCap();
    $("#boxes").innerHTML=[...BOXES,seasonBox()].map(boxCard).join("")}
  if(page==="comp")renderComp();if(page==="rank")renderRank();
  if(page==="farm")renderFarm();if(page==="shop")renderShop();if(page==="auction")renderAuction();if(page==="more")renderMore();if(page.startsWith("ev:"))renderEvent(page.slice(3));
}
function renderNav(){
  const ev=activeEvents();
  const items=[["home","📦 Caixas"],["farm","🏡 Minha Fazenda"],["comp","📚 Compêndio"],["shop","🛒 Loja"],["rank","🥇 Ranking"],...ev.map(e=>["ev:"+e.id,e.e+" "+e.n]),["auction","🔨 Leilão"],["more","📋 Mais"]];
  const h=items.map(([p,l])=>{const e=ev.find(x=>"ev:"+x.id===p);return `<button class="secondary ${page===p?"on":""} ${e?"evb":""}" ${e?`style="--eh:${e.h}"`:""} onclick="showPage('${p}')">${l}</button>`}).join("");
  if(renderNav.h!==h){const n=$("#nav");n.innerHTML=h;renderNav.h=h;navArrows();const on=n.querySelector&&n.querySelector(".on");if(on&&on.scrollIntoView)on.scrollIntoView({inline:"center",block:"nearest"})}
}
function renderComp(){
  const owned=new Set(state.seen),tabs=[0,1,2,3,4,5,6,-2],list=r=>COWS.filter(c=>r===-2?c.ex:(!c.ex&&c.r===r));
  const cur=list(compR),shown=cur.slice(0,compN),found=cur.filter(c=>owned.has(c.id)).length;
  $("#comp").innerHTML=`<h1 style="margin:0 0 6px">📚 Compêndio</h1><p class="dsc">Toque numa raridade para ver as pelagens dela. Você descobriu <b>${state.seen.length}</b> de <b>${COWS.length}</b>.</p>
   <div class="ctabs">${tabs.map(r=>{const l=list(r),n=l.filter(c=>owned.has(c.id)).length;return `<button class="ctab ${r>=0?RC[r]:"exc"} ${compR===r?"on":""}" data-a="ctab" data-r="${r}"><span>${r<0?"⭐ Exclusivas":RN[r]}</span><b>${l.length}</b><small>${n} descobertas</small></button>`}).join("")}</div>
   <h2>${compR<0?"⭐ Exclusivas":RN[compR]} · ${found}/${cur.length}</h2>
   <div class="collection">${shown.map(c=>{const o=owned.has(c.id);return `<div class="collection-card ${o?"":"locked"}">${o?`<div class="cow-art">${cowSVG(c)}</div>`:`<div class="silhouette">?</div>`}<h3>${o?c.name:"???"}</h3><span class="badge ${RC[c.r]}">${RN[c.r]}</span>${c.ex?" ⭐":""}</div>`}).join("")}</div>
   ${compN<cur.length?`<button class="primary" data-a="cmore" style="margin:14px auto;display:block">Mostrar mais (${cur.length-compN})</button>`:""}`;
}

/* ---------- cocho, loja e cozinha ---------- */
let selFood="capim",kSel=["","",""],lastMix="";
function foodOptions(sel){return Object.keys(state.food).filter(id=>state.food[id]>0).map(id=>{const f=foodInfo(id);return `<option value="${id}" ${id===sel?"selected":""}>${f.e} ${f.n} (${state.food[id]})</option>`}).join("")}
function troughHTML(){
  const cp=cap(),t=state.trough,fi=foodInfo(t.id),cm=manCap();
  if(!state.food[selFood])selFood=Object.keys(state.food).find(id=>state.food[id]>0)||"";
  return `<div class="panel"><h3>🪣 Cochos</h3>
    <div class="line dsc">🌾 Comida: <b>${t.u}/${cp}</b> ${t.u?`<small>(${fi.e} ${fi.n})</small>`:'<small style="color:#ff9a8a">(vazio: leite −30%)</small>'}<div class="bar"><i style="width:${t.u/cp*100}%"></i></div>
      ${t.u?`<small class="dsc sm">${fxText(fi.fx)}</small>`:""}
      ${selFood?`<div class="row"><select id="fsel">${foodOptions(selFood)}</select><button class="secondary" data-a="feedsel">Colocar no cocho</button></div>`:`<small class="dsc sm">Sem comida no estoque. Compre na 🛒 Loja.</small>`}</div>
    <div class="line dsc">💧 Água: <b>${state.water}/${cp}</b> ${state.water?"":'<small style="color:#ff9a8a">(vazia: leite −30%)</small>'}<div class="bar w"><i style="width:${state.water/cp*100}%"></i></div><button class="secondary" data-a="water">Encher água</button></div>
    <div class="line dsc">💩 Esterco no chão: <b>${state.manure}/${cm}</b> ${state.manure>=cm?'<small style="color:#ff9a8a">(sujo: leite −30%)</small>':""}<div class="bar m"><i style="width:${Math.min(100,state.manure/cm*100)}%"></i></div><button class="secondary" data-a="clean" ${state.manure?"":"disabled"}>Limpar e guardar</button></div>
    <div class="line dsc">🧺 Esterco guardado: <b>${state.dung}</b> <button class="secondary" data-a="selldung" ${state.dung?"":"disabled"}>Vender (🪙${dungTotal()})</button></div>
    <p class="dsc sm">Cada ordenha gasta 1 comida e 1 água. Comidas melhores dão bônus!</p></div>`}
function milkAmount(c){const t=type(c),space=tankCap()-state.milk;if(t.r===6)return Math.max(0,space);
  const care=(state.trough.u>0?1:.7)*(state.water>0?1:.7)*(state.manure>=manCap()?.7:1)*(1+curFx().m/100);
  return Math.max(0,Math.min(space,Math.max(1,Math.round(c.L*season().f*care*(1+.1*state.up.ordenha)*(1+.1*state.rb)))))}
function doMilk(c){
  const fx=curFx(),L=milkAmount(c);
  state.milk+=L;if(Math.random()*100>=fx.us)state.trough.u=Math.max(0,state.trough.u-1);state.water=Math.max(0,state.water-1);if(Math.random()*100>=fx.man)state.manure++;
  c.m=Date.now();S("milkings");S("milkL",L);return L}
function workerStep(){
  const cp=cap(),w=state.worker;let fi=w.food||"capim";
  if(state.manure>=Math.min(3,manCap())){state.dung+=state.manure;state.manure=0;return true}
  if(state.water<cp*.5){state.water=cp;return true}
  if(state.trough.u<cp*.5){
    if(!ITEMS[fi]&&!(state.food[fi]>0))fi="capim";
    if(state.trough.u>0&&state.trough.id!==fi)fi=state.trough.id;
    const need=cp-state.trough.u,have=state.food[fi]||0;
    if(have<need&&ITEMS[fi]){const buy=need-have,cost=buy*ITEMS[fi].p;if(state.coins>=cost){state.coins-=cost;state.food[fi]=have+buy;S("foodBought",buy)}}
    const put=Math.min(state.food[fi]||0,need);
    if(put>0){state.trough.u+=put;state.trough.id=fi;state.food[fi]-=put;return true}
  }
  if(state.milk<tankCap()){let n=0;for(const c of state.cows){if(n>=rooms()||state.milk>=tankCap())break;if(ready(c)&&!RM.some(r=>r&&r.c===c.u)){doMilk(c);n++}}if(n)return true}
  if(state.milk>=tankCap()*.5){sellMilk();return true}
  if(state.manure>0){state.dung+=state.manure;state.manure=0;return true}
  return false}
const UPS_S={pasto:"Aumenta a chance de a vaca evoluir e de a fusão dar certo.",cocho:"Cabe mais comida e água nos cochos.",ordenha:"Mais leite por vaca, e a ordenha e o descanso ficam mais rápidos.",curral:"Mais espaço para mais vacas na fazenda.",tanque:"Um tanque maior guarda mais leite.",salas:"Ordenhe várias vacas ao mesmo tempo.",esterco:"O chão aguenta mais esterco antes de atrapalhar o leite."};
Object.keys(UPS_S).forEach(k=>{if(UPS[k])UPS[k].s=UPS_S[k]});
UPS.pasto.d=l=>`+${2*l}% de chance`;UPS.cocho.d=l=>`${10+10*l} de comida e água`;UPS.curral.d=l=>`${8+3*l} vacas`;UPS.tanque.d=l=>`${100+50*l} litros`;UPS.salas.d=l=>`${1+l} sala(s)`;
UPS.ordenha.d=l=>`+${10*l}% leite · ${(1.8*.93**l).toFixed(1)}s · descanso ${clock(Math.max(20000,Math.round(120000*.96**l)))}`;
UPS.esterco={n:"💩 Chão de esterco",b:180,s:UPS_S.esterco,d:l=>`aguenta ${10+5*l} de esterco`};
function foodCard(it){return `<div class="item"><div class="ie">${it.e}</div><h3>${it.n}</h3><p class="dsc">${fxText(it.fx)}</p><p class="dsc sm">🪙${it.p} cada · você tem <b>${state.food[it.id]||0}</b></p>
  <div><button class="primary" data-a="buyf" data-id="${it.id}" data-n="10" ${state.coins<it.p*10?"disabled":""}>10× 🪙${fmt(it.p*10)}</button> <button class="secondary" data-a="buyf" data-id="${it.id}" data-n="50" ${state.coins<it.p*50?"disabled":""}>50× 🪙${fmt(it.p*50)}</button></div></div>`}
function renderShop(){
  const w=state.worker,wl=w.lvl,wm=wmax(),wf=foodInfo(w.food||"capim");
  const wopts=Object.keys(ITEMS).map(id=>`<option value="${id}" ${w.food===id?"selected":""}>${ITEMS[id].e} ${ITEMS[id].n}</option>`).join("")+Object.keys(state.food).filter(id=>id.startsWith("mix:")&&state.food[id]>0).map(id=>`<option value="${id}" ${w.food===id?"selected":""}>${foodInfo(id).e} ${foodInfo(id).n}</option>`).join("");
  $("#shop").innerHTML=`<h1 style="margin:0 0 14px">🛒 Loja</h1>
  <section class="shop-sec"><h2>🌾 Comidas e ingredientes</h2><p class="dsc">Cada comida dá um bônus. Misture ingredientes na 🍳 Cozinha (Minha Fazenda) para criar comidas ainda melhores!</p>
   ${Object.keys(CAT).map(c=>`<h3 class="dsc cat">${CAT[c]}</h3><div class="sgrid">${Object.values(ITEMS).filter(i=>i.c===c).map(foodCard).join("")}</div>`).join("")}</section>
  <section class="shop-sec"><h2>💩 Esterco</h2><div class="item wide"><div class="ie">🧺</div><div><p class="dsc">Você tem <b>${state.dung}</b> de esterco guardado. Cada um vale 🪙${fmt(DUNG*(1+.05*state.rb))}.</p><button class="primary" data-a="selldung" ${state.dung?"":"disabled"}>Vender tudo (🪙${dungTotal()})</button></div></div></section>
  <section class="shop-sec"><h2>🏗️ Melhorias da fazenda</h2><div class="sgrid">${Object.entries(UPS).map(([k,u])=>{const l=state.up[k],M=upMax(k);
    return `<div class="item"><h3>${u.n}</h3><div class="bar lv"><i style="width:${l/M*100}%"></i></div><p class="dsc sm">Nível ${l} de ${M}</p><p class="dsc">${u.s||""}</p><p class="dsc"><b>Agora:</b> ${u.d(l)}</p>
    ${l>=M?(M<100?`<p class="dsc"><b>Nível máximo por enquanto.</b> 🔒 Renasça para liberar +10 níveis (até 100).</p>`:`<p class="dsc"><b>Nível máximo!</b></p>`):`<p class="dsc"><b>Próximo:</b> ${u.d(l+1)}</p><button class="primary" data-a="up" data-k="${k}" ${state.coins<upCost(k)?"disabled":""}>Melhorar 🪙${fmt(upCost(k))}</button>`}</div>`}).join("")}</div></section>
  <section class="shop-sec"><h2>👷 Trabalhador</h2><div class="item wide"><div class="ie">👷</div><div>
   <p class="dsc">Ele faz o serviço por você: compra e coloca comida e água, limpa o esterco, ordenha as vacas e vende o leite. Só não abre caixas nem vende vacas. Trabalha só com o jogo aberto.</p>
   ${!wl?`<p class="dsc">Nível 1: uma tarefa a cada ${wki(1)/1000}s · salário 🪙${wkw(1)} a cada 10 min.</p><button class="primary" data-a="hire" ${state.coins<wkc(1)?"disabled":""}>Contratar 🪙${fmt(wkc(1))}</button>`
   :`<p class="dsc"><b>Nível ${wl} de ${wm}</b> · uma tarefa a cada ${(wki(wl)/1000).toFixed(1)}s · salário 🪙${fmt(wkw(wl))} a cada 10 min ${w.strike?'<b style="color:#ff9a8a">(em greve: sem moedas)</b>':""}</p><div class="bar lv"><i style="width:${wl/wm*100}%"></i></div>
    ${wl<wm?`<p class="dsc"><b>Próximo:</b> uma tarefa a cada ${(wki(wl+1)/1000).toFixed(1)}s · salário 🪙${fmt(wkw(wl+1))}</p><button class="primary" data-a="wup" ${state.coins<wkc(wl+1)?"disabled":""}>Melhorar 🪙${fmt(wkc(wl+1))}</button> `:(wm<100?`<p class="dsc">🔒 Renasça para liberar +10 níveis.</p>`:"")}
    <button class="secondary" data-a="wtoggle">${w.on?"⏸ Pausar":"▶ Retomar"}</button><p class="dsc">Comida que ele usa:</p><select id="wsel">${wopts}</select><p class="dsc sm">${wf.e} ${wf.n}: ${fxText(wf.fx)}</p>`}
  </div></div></section>
  ${bullsHTML()}${rebirthHTML()}`;
}
function bullsHTML(){return `<section class="shop-sec"><h2>🐂 Touros para procriação</h2><p class="dsc">Cada touro serve uma única vez. Raças melhores aumentam a chance de nascer uma fêmea parecida com a mãe. Quanto mais rara a vaca, mais difícil é nascer fêmea.</p><div class="sgrid">${BULLS.map((n,i)=>{const f=i/11;return `<div class="item"><div class="ie">🐂</div><h3>${n}</h3><p class="dsc">Raça ${i+1} de ${BULLS.length} ${"★".repeat(Math.ceil((i+1)/2))}</p><p class="dsc">Fêmea: ${Math.round(40+36*f)}% (vaca comum) · repete a mãe: ${Math.round(35+48*f)}%</p><p class="dsc sm">Você tem: <b>${state.bulls.filter(x=>x.b===i).length}</b></p>
  <button class="primary" data-a="buybull" data-i="${i}" ${state.coins<BULLP[i]?"disabled":""}>Comprar 🪙${fmt(BULLP[i])}</button></div>`}).join("")}</div></section>`}
BULLS.length=0;["Pé-duro","Crioulo","Nelore","Gir","Guzerá","Hereford","Angus","Brangus","Simental","Charolês","Limousin","Wagyu"].forEach(x=>BULLS.push(x));
BULLP.length=0;[300,500,800,1300,2000,3200,5000,8000,12000,20000,35000,80000].forEach(x=>BULLP.push(x));
function rebirthHTML(){const n=state.rb,need=25000*(n+1);return `<section class="shop-sec"><h2>♻️ Renascimento</h2><div class="item wide"><div class="ie">♻️</div><div>
  <p class="dsc">Recomece do zero e ganhe bônus para sempre! Você perde moedas, vacas, melhorias, comida e trabalhador, mas guarda o Compêndio, as conquistas e as estatísticas.</p>
  <p class="dsc"><b>Renascimentos:</b> ${n}</p><p class="dsc"><b>Agora:</b> 🥛 +${10*n}% leite · 🧬 +${2*n}% evolução · 💰 +${5*n}% vendas</p><p class="dsc"><b>Próximo:</b> 🥛 +${10*n+10}% · 🧬 +${2*n+2}% · 💰 +${5*n+5}% · +10 níveis nas melhorias</p>
  <p class="dsc">Para renascer: tenha 🪙${fmt(need)}.</p><button class="primary" data-a="rebirth" ${state.coins<need?"disabled":""}>Renascer</button></div></div></section>`}
function rebirth(){const need=25000*(state.rb+1);if(state.coins<need)return toast(`Você precisa de 🪙${fmt(need)} para renascer.`);
 if(!confirm(`Renascer? Você perde moedas, vacas, melhorias, comida e trabalhador, mas ganha bônus para sempre (nível ${state.rb+1}).`))return;
 const k={seen:state.seen,rb:state.rb+1,stats:state.stats,ach:state.ach,name:state.name,used:state.used,dev:state.dev,missions:state.missions,farm:state.farm,farmSet:state.farmSet,pid:state.pid,mt:state.mt,mb:state.mb,gs:state.gs,recipes:state.recipes,trophies:state.trophies,wk:state.wk,v:9};
 state=Object.assign(def(),k,{coins:1000+500*k.rb});normalize();save();toast(`♻️ Renasceu! Nível ${k.rb}.`);render()}
/* cozinha */
function kitchenHTML(){
  const have=Object.keys(state.food).filter(id=>state.food[id]>0&&ITEMS[id]),sel=kSel.filter(Boolean),ids=[...new Set(sel)].sort();
  const ok=ids.length>=2&&ids.length===sel.length&&ids.every(i=>(state.food[i]||0)>0),mix=ok?foodInfo(mixId(ids)):null,known=ok&&state.recipes.includes(mixId(ids));
  const opt=(n)=>`<select id="k${n}" data-k="${n}"><option value="">— ${n===2?"(opcional)":"escolha"} —</option>${have.map(id=>`<option value="${id}" ${kSel[n]===id?"selected":""}>${ITEMS[id].e} ${ITEMS[id].n} (${state.food[id]})</option>`).join("")}</select>`;
  return `<section><div class="panel"><h3>🍳 Cozinha</h3><p class="dsc">Misture 2 ou 3 ingredientes diferentes para criar uma comida melhor para as vacas. Ingredientes de tipos diferentes combinam melhor! Cada mistura rende 5 porções.</p>
   <div class="kslots">${opt(0)}<span>＋</span>${opt(1)}<span>＋</span>${opt(2)}</div>
   ${mix?`<div class="kprev"><div class="kemoji">${mix.e}</div><div><b class="dsc">${mix.n}</b> ${known?"":"<span class='badge new'>NOVA!</span>"}<p class="dsc">${fxText(mix.fx)}</p></div></div>`:`<p class="dsc sm">Escolha pelo menos 2 ingredientes diferentes que você tem no estoque (compre na 🛒 Loja).</p>`}
   <button class="primary" data-a="kmix" ${ok?"":"disabled"}>🍳 Misturar</button>${lastMix?`<p class="dsc">${lastMix}</p>`:""}</div>
   <div class="panel"><h3>📖 Receitas descobertas: ${state.recipes.length}</h3><p class="dsc sm">Existem milhares de combinações. Cada uma dá um bônus diferente!</p>
   ${state.recipes.length?state.recipes.slice().reverse().slice(0,60).map(id=>{const f=foodInfo(id);return `<div class="rec"><span class="rem">${f.e}</span><div><b class="dsc">${f.n}</b><p class="dsc sm">${fxText(f.fx)} · você tem ${state.food[id]||0}</p></div></div>`}).join(""):`<p class="dsc sm">Nenhuma receita ainda. Misture algo!</p>`}</div></section>`}
function doMix(){const sel=kSel.filter(Boolean),ids=[...new Set(sel)].sort();if(ids.length<2||ids.length!==sel.length||!ids.every(i=>(state.food[i]||0)>0))return toast("Escolha ingredientes diferentes que você tem.");
  ids.forEach(i=>state.food[i]--);const id=mixId(ids),f=foodInfo(id);state.food[id]=(state.food[id]||0)+5;S("mixes");
  if(!state.recipes.includes(id)){state.recipes.push(id);confetti();lastMix=`🎉 Nova receita: ${f.n}!`}else lastMix=`+5 porções de ${f.n}.`;toast(lastMix);kSel=["","",""];save();render()}

/* ---------- procriação ---------- */
const BULLCOW={name:"Touro",body:"#6b4a35",spots:"#2b1a12",r:0,pat:10,ac:"bigode"};
function nurseryHTML(){
  const now=Date.now(),free=state.cows.filter(c=>ready(c)&&!RM.some(r=>r&&r.c===c.u)),b=state.bulls;
  if(!free.some(c=>c.u===selCow))selCow=free[0]?.u||0;if(!b.some(x=>x.u===selBull))selBull=b[0]?.u||0;
  const card=k=>{const m=CBY.get(k.mt),grown=k.g<=now,sex=k.sex||"f";
    if(sex==="m")return `<div class="fcow"><div style="font-size:54px">🐂</div><h3>Boi ${BULLS[k.nb]}</h3><p class="dsc sm">Vale 🪙${fmt(k.v)} · não serve para procriar</p><div class="st" data-ct="${k.u}"></div><div class="bar cd"><i data-cbar="${k.u}"></i></div>${grown?`<button class="primary" data-a="sellcalf" data-u="${k.u}">Vender 🪙${fmt(k.v)}</button>`:`<p class="dsc sm">Venda liberada em 15 min</p>`}</div>`;
    if(k.rt)return `<div class="fcow"><div style="font-size:54px">🐮</div><h3>Fêmea</h3><p class="dsc sm">Filha de ${m.name}</p><p class="dsc sm">Raridade: ${grown?"pronta para revelar!":"❓ segredo"}</p><div class="st" data-ct="${k.u}"></div><div class="bar cd"><i data-cbar="${k.u}"></i></div>${grown?`<button class="primary" data-a="reveal" data-u="${k.u}">✨ Revelar</button>`:""}</div>`;
    return `<div class="fcow"><div style="font-size:54px">🐮</div><h3>Filho de ${m.name}</h3><p class="dsc sm">👩 ${k.pF}% vaca · 🐂 ${100-k.pF}% boi</p><div class="st" data-ct="${k.u}"></div><div class="bar cd"><i data-cbar="${k.u}"></i></div>${grown?`<button class="primary" data-a="reveal" data-u="${k.u}">✨ Revelar</button>`:""}</div>`};
  return `<section><div class="panel"><h3>💕 Procriação</h3>
    ${b.length?`<p class="dsc">🐂 Seus touros: ${b.map(x=>`<span class="badge">${BULLS[x.b]}</span>`).join(" ")}</p>`:`<p class="dsc">Você não tem touros. Compre na 🛒 Loja (cada um serve uma vez).</p>`}
    <div class="line"><select id="bCow">${free.map(c=>`<option value="${c.u}" ${c.u===selCow?"selected":""}>${cname(c)} (${RN[type(c).r]})</option>`).join("")||"<option>Nenhuma vaca disponível</option>"}</select>
    <select id="bBull">${b.map(x=>`<option value="${x.u}" ${x.u===selBull?"selected":""}>${BULLS[x.b]}</option>`).join("")||"<option>Sem touros</option>"}</select></div>
    <button class="primary" data-a="breed" ${free.length&&b.length&&state.calves.length<6?"":"disabled"}>💕 Procriar</button>
    <p class="dsc">A vaca descansa 10 min. O bezerro cresce em 15 min. Fêmea: a raridade aparece depois. Macho: aparece na hora.</p></div>
  <h3 class="dsc">🍼 Bezerros (${state.calves.length}/6)</h3><div class="pasture">${state.calves.length?state.calves.map(card).join(""):`<div class="empty">Nenhum bezerro por enquanto.</div>`}</div>
  <h3 class="dsc">🐂 Bois para vender</h3><div class="pasture">${state.steers.length?state.steers.map(x=>`<div class="fcow"><div style="font-size:54px">🐂</div><h3>Boi ${BULLS[x.b]}</h3><button class="secondary" data-a="sellsteer" data-u="${x.u}">Vender 🪙${fmt(x.v)}</button></div>`).join(""):`<div class="empty">Nenhum boi.</div>`}</div></section>`}
function doBreed(){
  const cw=cowBy(selCow),bl=state.bulls.find(x=>x.u===selBull);if(!cw||!bl||!ready(cw)||state.calves.length>=6)return;
  const m=type(cw),n=bl.b,f=n/11,pF=m.r>=6?1:Math.round((40+36*f)*RF[m.r]),pS=Math.round(35+48*f),pU=m.r>=6?0:Math.round(2+12*f);
  state.bulls=state.bulls.filter(x=>x!==bl);cw.rest=Date.now()+BREST;
  const fem=Math.random()*100<pF,k={u:uid(),mt:cw.t,b:n,g:Date.now()+CALF,pF,pS,pU,sex:fem?"f":"m"};
  if(fem){const q=Math.random()*100;let t;if(q<pU&&m.r<6)t=pickFrom(REG.filter(x=>x.r===m.r+1));else if(q<pU+pS)t=m;else t=pickFrom(REG.filter(x=>x.r===m.r));k.rt=t.id}
  else{const nb=Math.random()*100<25+10*n?n:Math.max(0,n-1);k.nb=nb;k.v=Math.round(BULLP[nb]*.45*(1+.1*m.r))}
  state.calves.push(k);S("bred");save();showBreed(cw,k);render()}
function showBreed(cw,k){
  $("#breedBody").innerHTML=`<div class="modal-title">💕 Procriação</div><div class="bscene"><div class="bcow">${cowSVG(type(cw))}</div><div class="bbull">${cowSVG(BULLCOW)}</div><div class="bheart">💕</div><div class="bsmoke" id="bsm"><i></i><i></i><i></i><i></i><i></i></div><div class="breveal hidden" id="brv"></div></div><p class="dsc" id="bres" style="min-height:64px"></p><button class="primary" id="bok" disabled onclick="closeBreed()">Ok</button>`;
  $("#breedModal").classList.remove("hidden");
  setTimeout(()=>{const e=$("#bsm");if(e)e.classList.add("puff")},1900);
  setTimeout(()=>{const f=k.sex==="f";$("#brv").textContent=f?"🐮":"🐂";$("#brv").classList.remove("hidden");$("#bres").innerHTML=f?`🐮 <b>É uma fêmea!</b><br>Em 15 minutos você descobre a raridade dela.`:`🐂 <b>É um macho (${BULLS[k.nb]})!</b><br>Ele vale 🪙${fmt(k.v)}. Dá para vender em 15 minutos.`;$("#bok").disabled=false},3300)}
const closeBreed=()=>$("#breedModal").classList.add("hidden");
function revealCalf(k){
  if(k.g>Date.now())return toast("Ainda está crescendo.");const m=CBY.get(k.mt);
  if(k.sex==="m")return;
  let t=k.rt&&CBY.get(k.rt);
  if(!t){if(Math.random()*100<(k.pF??50)){const q=Math.random()*100;t=(q<(k.pU||0)&&m.r<6)?pickFrom(REG.filter(x=>x.r===m.r+1)):q<(k.pU||0)+(k.pS||40)?m:pickFrom(REG.filter(x=>x.r===m.r))}
    else{const b=Math.min(11,k.b||0),v=Math.round(BULLP[b]*.45*(1+.1*m.r));state.steers.push({u:uid(),b,v});state.calves=state.calves.filter(x=>x!==k);S("reveals");return toast(`🐂 Era um boi! Vale 🪙${fmt(v)}.`)}}
  if(full())return toast("Fazenda cheia! Venda uma vaca ou melhore o curral.");
  newCow(t);discover(t);S("reveals");state.calves=state.calves.filter(x=>x!==k);toast(`🐮 Nasceu ${t.name} (${RN[t.r]})${t.id===k.mt?" — igual à mãe!":""}`)}
function sellCalf(k){if(k.g>Date.now())return toast("O boi ainda está crescendo.");earn(k.v);S("steersSold");state.calves=state.calves.filter(x=>x!==k);toast(`🐂 Boi vendido: +🪙${fmt(k.v)}`)}

/* ---------- leilão simplificado ---------- */
function renderAuction(){
  const el=$("#auction"),v=av();
  const head=`<h1 style="margin:0 0 8px">🔨 Leilão</h1>${ONLINE?`<p class="dsc sm" style="color:#7be28a">🌐 Online: pessoas reais, um jogador por vez</p>`:`<div class="evban">Modo offline: jogadores simulados 🤖</div>`}`;
  if(!v){el.innerHTML=head+`<div class="empty">Conectando ao leilão…</div>`;aSigLast="";return}
  aSigLast=aSig(v);
  const claims=(v.claims||[]).map(c=>`<div class="evban">🎉 Você ganhou um leilão (🪙${fmt(c.bid)})! <button class="primary" data-a="aclaim" data-key="${c.key}">Resgatar vaca</button></div>`).join("");
  const t=v.cow,mine=!!(v.turn&&v.turn.me),joined=!!v.me;let box="";
  if(v.phase==="reg")box=`<div class="turnbox"><p class="dsc">⏳ Começa em <b id="aReg"></b></p>${joined?`<p class="dsc">✅ Você está dentro!</p>`:`<button class="primary big" data-a="ajoin" ${full()?"disabled":""}>${full()?"Fazenda cheia":"Entrar no leilão"}</button>`}</div>`;
  else if(v.phase==="live")box=`<div class="turnbox ${mine?"mine":""}"><p class="turnmsg">${mine?"🔔 SUA VEZ!":`Vez de ${v.turn?v.turn.name:"—"}`}</p><div class="bar ${mine?"":"w"}"><i id="aTurnBar"></i></div><div class="time sm" id="aTurnT"></div>
    ${joined&&v.me.in?(mine?`<p class="dsc">Escolha quanto subir:</p><div class="abtns">${v.buttons.map((x,i)=>`<button class="primary" data-a="abid" data-p="${i}">+🪙${fmt(x)}</button>`).join("")}</div>`:`<p class="dsc sm">Aguarde a sua vez…</p>`)+`<button class="secondary" data-a="apass">🚪 Sair do leilão</button>`:`<p class="dsc sm">${joined?"Você saiu deste leilão.":"Você não entrou neste leilão."}</p>`}</div>`;
  else box=`<div class="evban" id="aRes">${v.res}</div><p class="dsc sm">Próximo leilão em <b id="aNext"></b></p>`;
  el.innerHTML=head+claims+`<div class="limitbar">🏁 LIMITE <b>🪙${fmt(v.cap)}</b></div><div class="panel auc"><div class="aucL"><div class="cow-art" style="height:130px">${cowSVG(t)}</div><h2 style="margin:4px 0">${t.name}</h2><span class="badge ${RC[v.r]} bigchip">${RN[v.r]}</span></div>
   <div class="aucR"><p class="dsc">Lance atual</p><div class="bigp" id="aBid"></div><p class="dsc">Líder: <b id="aLead"></b></p>${box}<div class="parts" id="aOrder"></div></div></div><div class="alog" id="aLog"></div>`;
  updAuction();
}

/* ---------- contas, nuvem e backup ---------- */
let ACC=null;try{ACC=JSON.parse(localStorage.getItem("vb_acct")||"null")}catch(e){}
let lastCloudTs=+localStorage.getItem("vb_cts")||0,syncBusy=false,acctMode="login",pendingCloud=null;
async function apiRaw(path,body){try{const r=await fetch(BASE+path,{method:body?"POST":"GET",headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined});return{ok:r.ok,status:r.status,j:await r.json().catch(()=>({}))}}catch(e){return{ok:false,status:0,j:{}}}}
const hasProgress=s=>!!s&&((s.stats&&s.stats.earned>0)||(s.cows&&s.cows.length>0));
const sumry=(s,ts)=>`🪙${fmt((s.stats&&s.stats.earned)||0)} ganhos · ${(s.cows||[]).length} vacas · ${(s.seen||[]).length} pelagens · ♻️${s.rb||0}${ts?`<br><small>salvo em ${new Date(ts).toLocaleString("pt-BR")}</small>`:""}`;
function openAcct(mode){acctMode=mode;$("#acctTitle").textContent=mode==="create"?"Criar conta":"Entrar";$("#acctGo").textContent=mode==="create"?"Criar conta":"Entrar";$("#acctMsg").textContent="";$("#acct").classList.remove("hidden")}
const closeAcct=()=>$("#acct").classList.add("hidden");
async function doAuth(){
  const u=$("#aUser").value.trim().toLowerCase(),p=$("#aPass").value;$("#acctMsg").textContent="Conectando…";
  const r=await apiRaw(acctMode==="create"?"/api/account/register":"/api/account/login",{user:u,pass:p});
  if(!r.ok){$("#acctMsg").textContent=({400:"Use nome de 3 a 20 letras ou números e senha com 6 ou mais caracteres.",401:"Usuário ou senha incorretos.",409:"Esse nome já existe. Escolha outro.",429:"Muitas tentativas. Espere um pouco."})[r.status]||"Não foi possível conectar.";return}
  ACC={user:r.j.user,token:r.j.token};localStorage.setItem("vb_acct",JSON.stringify(ACC));closeAcct();$("#aPass").value="";await afterLogin()}
async function afterLogin(){
  const r=await apiRaw("/api/account/load?token="+ACC.token);
  if(r.status===401){ACC=null;localStorage.removeItem("vb_acct");return toast("Entre de novo na sua conta.")}
  const cloud=r.j&&r.j.save;
  if(!cloud){await cloudPush();toast("Conta pronta! Seu progresso foi guardado na nuvem.");return afterAuth()}
  if(!hasProgress(state)){adopt(cloud);lastCloudTs=r.j.ts;localStorage.setItem("vb_cts",lastCloudTs);cloudDirty=false;toast("Progresso da conta carregado!");return afterAuth()}
  pendingCloud={save:cloud,ts:r.j.ts};
  $("#syncBody").innerHTML=`<div class="modal-title">Qual progresso usar?</div><div class="syncopt"><b>☁️ Da conta ${ACC.user}</b><p class="dsc">${sumry(cloud,r.j.ts)}</p><button class="primary" data-a="syncpick" data-w="cloud">Usar o da conta</button></div><div class="syncopt"><b>📱 Deste aparelho</b><p class="dsc">${sumry(state,state.t)}</p><button class="secondary" data-a="syncpick" data-w="local">Usar o deste aparelho</button></div><p class="dsc sm">O outro progresso não é apagado deste aparelho: guardamos uma cópia de segurança.</p>`;
  $("#sync").classList.remove("hidden")}
function syncPick(w){
  $("#sync").classList.add("hidden");
  try{localStorage.setItem("vacabox_save_prelogin",JSON.stringify(state))}catch(e){}
  if(w==="cloud"&&pendingCloud){adopt(pendingCloud.save);lastCloudTs=pendingCloud.ts;localStorage.setItem("vb_cts",lastCloudTs);cloudDirty=false;toast("Progresso da conta carregado!")}
  else{cloudPush();toast("Seu progresso deste aparelho foi guardado na conta.")}
  pendingCloud=null;afterAuth()}
function afterAuth(){if(!state.farmSet)showName(true);render()}
async function cloudPush(){
  if(!ACC||!ONLINE||syncBusy)return;syncBusy=true;const r=await apiRaw("/api/account/save",{token:ACC.token,save:state});syncBusy=false;
  if(r.ok){lastCloudTs=r.j.ts;localStorage.setItem("vb_cts",lastCloudTs);cloudDirty=false}else if(r.status===401){ACC=null;localStorage.removeItem("vb_acct");toast("Sua sessão acabou. Entre de novo.")}}
async function cloudCheck(){
  if(!ACC||!ONLINE)return;const r=await apiRaw("/api/account/load?token="+ACC.token+"&only=ts");
  if(r.ok&&r.j.ts>lastCloudTs&&!cloudDirty){const f=await apiRaw("/api/account/load?token="+ACC.token);if(f.ok&&f.j.save){adopt(f.j.save);lastCloudTs=f.j.ts;localStorage.setItem("vb_cts",lastCloudTs);cloudDirty=false;toast("Progresso atualizado de outro aparelho.")}}}
async function bootSync(){
  const r=await apiRaw("/api/account/load?token="+ACC.token);if(r.status===401){ACC=null;localStorage.removeItem("vb_acct");return}
  if(r.j&&r.j.save&&r.j.ts>(state.t||0)&&r.j.ts>lastCloudTs){adopt(r.j.save);lastCloudTs=r.j.ts;localStorage.setItem("vb_cts",lastCloudTs);cloudDirty=false;toast("Progresso da conta carregado.")}else if(hasProgress(state))cloudPush()}
function showName(force){const e=$("#nameModal");$("#nameIn").value=state.farmSet?state.farm:"";$("#nameMsg").textContent="";$("#nameX").classList.toggle("hidden",!!force);e.classList.remove("hidden")}
function saveName(){const v=$("#nameIn").value.trim().slice(0,24);if(v.length<2)return $("#nameMsg").textContent="Digite pelo menos 2 letras.";state.farm=v;state.farmSet=true;save();pushScore();if(ACC)cloudPush();$("#nameModal").classList.add("hidden");toast(`🏡 Bem-vindo à ${v}!`);render()}
function exportBackup(){const blob=new Blob([JSON.stringify({vacabox:9,t:Date.now(),save:state})],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`vacabox-backup-${String(state.farm||"fazenda").replace(/[^\w]+/g,"-")}-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();toast("📤 Backup salvo no seu aparelho.")}
function importBackup(file){const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result),sv=j.save||j;if(!sv||!Array.isArray(sv.cows)||typeof sv.coins!=="number")throw 0;if(!confirm("Trocar o progresso atual por este backup?"))return;try{localStorage.setItem("vacabox_save_before_import",JSON.stringify(state))}catch(e){}adopt(sv);toast("📥 Backup restaurado!");if(ACC)cloudPush()}catch(e){toast("Esse arquivo não é um backup válido.")}};r.readAsText(file)}
function perfHTML(){
  const acc=ACC?`<p class="dsc">✅ Conectado como <b>${ACC.user}</b>. Seu progresso é salvo na nuvem sozinho.</p><button class="secondary" data-a="cloudnow">☁️ Salvar agora</button> <button class="secondary" data-a="acctout">Sair da conta</button>`:ONLINE?`<p class="dsc">Entre para guardar seu progresso na nuvem e jogar em qualquer aparelho. Seu progresso atual não será perdido.</p><button class="primary" data-a="acctopen" data-m="login">Entrar</button> <button class="secondary" data-a="acctopen" data-m="create">Criar conta</button>`:`<p class="dsc">Contas precisam do servidor online (veja COMO-HOSPEDAR.txt).</p>`;
  return `<div class="panel"><h3>👤 Conta</h3>${acc}</div>
  <div class="panel"><h3>🏡 Minha fazenda</h3><p class="dsc">Nome: <b>${state.farm}</b> <button class="secondary" data-a="fname">✏️ Mudar</button></p><p class="dsc">♻️ Renascimentos: <b>${state.rb}</b> · 📚 Pelagens: <b>${state.seen.length}/${COWS.length}</b> · 💰 Ganhos: <b>🪙${fmt(st("earned"))}</b></p><p class="dsc sm">Para dar nome a uma vaca, toque no ✏️ no cartão dela.</p></div>
  <div class="panel"><h3>💾 Backup do progresso</h3><p class="dsc">Salve seu progresso num arquivo para nunca perder. Você pode restaurar quando quiser.</p><button class="primary" data-a="bkexp">📤 Exportar backup</button> <button class="secondary" data-a="bkimp">📥 Importar backup</button></div>
  <div class="panel"><h3>🏆 Meus troféus (${state.trophies.length})</h3>${state.trophies.length?`<div class="trophies">${state.trophies.slice().reverse().map(trophyCard).join("")}</div>`:`<p class="dsc sm">Fique no top 3 do ranking semanal para ganhar troféus exclusivos.</p>`}</div>
  <p class="dsc sm">Modo: ${ONLINE?"🌐 online":"📴 offline"}</p>`}
/* novidades */
const NEWS_V="9.2";
const NEWS=["🐛 <b>Corrigido:</b> ao escolher o tempo do contrato (5, 15 ou 30 min), o menu de desenvolvedor aparecia. Isso não acontece mais.","🥇 <b>Ranking semanal:</b> agora é uma aba ao lado da Loja e reinicia a cada 7 dias.","🏆 <b>Troféus:</b> o top 1, 2 e 3 da semana ganham um troféu exclusivo de ouro, prata ou bronze, com a semana e o nome da fazenda.","✨ O nome do top 1 brilha em <b>ouro</b>, o do top 2 em <b>prata</b> e o do top 3 em <b>bronze</b>.","⏳ Uma barra no topo mostra quanto tempo falta para a semana acabar."];
function showNews(){$("#newsTitle").textContent="🎉 Novidades da versão "+NEWS_V;$("#newsList").innerHTML=NEWS.map(x=>`<li>${x}</li>`).join("");$("#news").classList.remove("hidden")}
function closeNews(){$("#news").classList.add("hidden");try{localStorage.setItem("vb_news",NEWS_V)}catch(e){}}

/* ---------- ações novas (antes das antigas) ---------- */
const _ea=extraAction;
extraAction=function(a,b,c){
  const id=b.dataset.id;
  switch(a){
   case"feedsel":{const f=selFood,have=state.food[f]||0;if(!have)return toast("Escolha uma comida do estoque."),true;if(state.trough.u>0&&state.trough.id!==f)return toast("Esvazie o cocho antes de trocar de comida."),true;
     const n=Math.min(have,cap()-state.trough.u);if(n<=0)return toast("O cocho está cheio."),true;state.trough.u+=n;state.trough.id=f;state.food[f]-=n;if(!state.food[f])delete state.food[f];S("care");S("feeds");save();render();return true}
   case"buyf":{const it=ITEMS[id],n=+b.dataset.n;if(it&&state.coins>=it.p*n){state.coins-=it.p*n;state.food[id]=(state.food[id]||0)+n;S("foodBought",n)}save();render();return true}
   case"kmix":doMix();return true;
   case"ctab":compR=+b.dataset.r;compN=60;renderComp();return true;
   case"cmore":compN+=60;renderComp();return true;
   case"breed":doBreed();return true;
   case"reveal":{const k=state.calves.find(x=>x.u===+b.dataset.u);if(k)revealCalf(k);save();render();return true}
   case"sellcalf":{const k=state.calves.find(x=>x.u===+b.dataset.u);if(k)sellCalf(k);save();render();return true}
   case"acctopen":openAcct(b.dataset.m);return true;
   case"acctout":ACC=null;localStorage.removeItem("vb_acct");toast("Você saiu da conta. Seu progresso continua neste aparelho.");renderMore();return true;
   case"cloudnow":cloudPush().then(()=>toast("☁️ Progresso salvo na nuvem."));return true;
   case"bkexp":exportBackup();return true;
   case"bkimp":$("#bkFile").click();return true;
   case"syncpick":syncPick(b.dataset.w);return true;
   case"fname":showName(false);return true;
  }
  return _ea(a,b,c)};
document.addEventListener("change",e=>{const t=e.target;if(t.id==="fsel")selFood=t.value;else if(t.id==="wsel"){state.worker.food=t.value;save();render()}else if(t.dataset&&t.dataset.k!=null){kSel[+t.dataset.k]=t.value;renderFarm()}});

/* ---------- relógio extra ---------- */
const _et=extraTick;let annKey=0,cloudAt=0,cloudChk=0;
extraTick=function(){_et();const now=Date.now();
  document.querySelectorAll("[data-cct]").forEach(e=>{const id=e.dataset.cct,cd=(state.contracts.tryAt[id]||0)+1800000-now;if(cd<=0){renderMore();return}e.textContent=clock(cd);const bar=document.querySelector(`[data-ccb="${id}"]`);if(bar)setBar(bar,1-cd/1800000)});
  if(ONLINE&&page!=="auction"&&now-avAt>5000)pollAuction();
  const v=av();if(v&&v.r>=4&&v.key!==annKey&&(v.phase==="reg"||v.phase==="live")){annKey=v.key;announce(`🔔 Leilão de vaca ${RN[v.r]}! Vá em 🔨 Leilão.`)}
  if(ACC&&ONLINE){if(cloudDirty&&now-cloudAt>20000){cloudAt=now;cloudPush()}else if(!cloudDirty&&now-cloudChk>45000){cloudChk=now;cloudCheck()}}};
addEventListener("pagehide",()=>{try{if(ACC&&ONLINE&&cloudDirty)navigator.sendBeacon(BASE+"/api/account/save",new Blob([JSON.stringify({token:ACC.token,save:state})],{type:"application/json"}))}catch(e){}});

/* ---------- abertura ---------- */
$("#bkFile").addEventListener("change",e=>{const f=e.target.files[0];if(f)importBackup(f);e.target.value=""});
setTimeout(()=>{const b=$("#boot");if(!b)return;b.classList.add("out");setTimeout(()=>{b.remove&&b.remove();let seen="";try{seen=localStorage.getItem("vb_news")}catch(e){}if(seen!==NEWS_V)showNews()},700)},2300);
let dTry=0,dBusy=false,dBoot=false;const dT=setInterval(async()=>{if(++dTry>60)return clearInterval(dT);if(!ONLINE&&!dBusy){dBusy=true;await detectOnline();dBusy=false;if(ONLINE&&dTry>1)toast("🌐 Conectado ao servidor!")}if(ONLINE&&!dBoot){dBoot=true;if(ACC)bootSync();clearInterval(dT)}},3000);
/* ---------- ranking semanal + troféus ---------- */
const weekly=()=>Math.max(0,st("earned")-state.wk.base);
const clockD=ms=>{ms=Math.max(0,Math.floor(ms/1000));const d=Math.floor(ms/86400),h=Math.floor(ms%86400/3600),m=Math.floor(ms%3600/60),s=ms%60;return(d?d+"d ":"")+[h,m,s].map(x=>String(x).padStart(2,"0")).join(":")};
const wkRange=w=>{const f=d=>d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});return f(new Date(WEEK0+w*WEEK_MS))+" – "+f(new Date(WEEK0+(w+1)*WEEK_MS-1))};
async function pushScore(){if(!ONLINE)return;lastPush=Date.now();try{await api("/api/score",{pid:state.pid,name:state.farm,score:Math.round(weekly()),week:weekIdx()})}catch(e){}}
async function fetchRank(){if(!ONLINE)return;rkAt=Date.now();try{RK=await api("/api/ranking?pid="+state.pid);if(page==="rank")renderRank()}catch(e){}}
async function checkTrophies(){if(!ONLINE)return;trAt=Date.now();const r=await apiRaw("/api/trophies?pid="+state.pid);if(!r.ok||!r.j.awards||!r.j.awards.length)return;
  for(const a of r.j.awards){const id=`w${a.week}p${a.place}`;if(!state.trophies.some(t=>t.id===id)){state.trophies.push({id,week:a.week,place:a.place,farm:a.name,score:a.score});toast(`🏆 Você ganhou o troféu de ${PL[a.place-1].toUpperCase()}! Semana ${a.week+1}`);confetti()}await apiRaw("/api/trophy/claim",{pid:state.pid,week:a.week})}
  save();if(page==="rank"||page==="more")render()}
let trAt=0;
function trophySVG(t){const c=[["#ffd23f","#b8860b"],["#e3e9f1","#7f8c99"],["#d9965b","#8a5a2b"]][t.place-1],gem=`hsl(${(t.week*47)%360},80%,60%)`;
  return `<svg class="trophy" viewBox="0 0 200 240"><ellipse cx="100" cy="228" rx="62" ry="8" fill="#0005"/><rect x="62" y="198" width="76" height="22" rx="6" fill="${c[1]}"/><rect x="74" y="186" width="52" height="16" rx="4" fill="${c[0]}"/><rect x="90" y="150" width="20" height="40" fill="${c[1]}"/>
  <path d="M52 40h96v34q0 52-48 62q-48-10-48-62Z" fill="${c[0]}" stroke="${c[1]}" stroke-width="4"/><path d="M52 52H28q-4 40 30 56M148 52h24q4 40-30 56" fill="none" stroke="${c[1]}" stroke-width="8" stroke-linecap="round"/>
  <circle cx="100" cy="64" r="13" fill="${gem}" stroke="#fff8" stroke-width="2"/><text x="100" y="106" font-size="17" font-weight="900" text-anchor="middle" fill="#3a2d28">TOP ${t.place}</text><text x="100" y="124" font-size="11" font-weight="800" text-anchor="middle" fill="#3a2d28">Semana ${t.week+1}</text>
  <text x="100" y="213" font-size="10" font-weight="900" text-anchor="middle" fill="#2a1a00">${esc(t.farm).slice(0,16)}</text></svg>`}
const trophyCard=t=>`<div class="trophycard tp${t.place}">${trophySVG(t)}<b>${MEDAL[t.place-1]} ${PL[t.place-1]}</b><small>Semana ${t.week+1} · ${wkRange(t.week)}</small><small>${fmt(t.score)} pontos</small></div>`;
function renderRank(){
  const w=weekIdx();let list=null,rank=0,total=0,note="",last=null;
  if(ONLINE){if(RK&&RK.week===w){list=RK.top;rank=RK.rank;total=RK.total;last=RK.last}else if(Date.now()-rkAt>3000)fetchRank()}
  else{const d=(Date.now()-(WEEK0+w*WEEK_MS))/864e5,me={n:state.farm+" (você)",s:weekly(),me:1},all=[me,...RIV.map((n,i)=>({n,s:Math.round((200+i*i*70+rnd(i+3)*500)*(d+.2))}))].sort((a,b)=>b.s-a.s);
    list=all.map((x,i)=>({...x,rank:i+1}));rank=list.find(x=>x.me).rank;total=list.length;note=`<div class="evban">Modo offline: rivais simulados e sem troféus. Conecte ao servidor online para disputar com pessoas reais.</div>`}
  $("#rankv").innerHTML=`<div class="weekbar"><div class="wkt">🥇 Ranking da semana ${w+1} · ${wkRange(w)}</div><div class="bar big"><i id="wkBar"></i></div><div class="time" id="wkTime"></div><small class="dsc sm">até o ranking reiniciar</small></div>
   ${note}<p class="dsc">Vale quem ganhar mais moedas na semana. 🥇 Top 1 ganha o troféu de <b>ouro</b>, 🥈 Top 2 de <b>prata</b> e 🥉 Top 3 de <b>bronze</b>, exclusivos da semana!</p>
   ${list?`<p class="dsc">Você está em <b>${rank}º</b> de ${total} jogadores · sua semana: <b>🪙${fmt(weekly())}</b></p>
   ${list.map((x,i)=>{const p=x.rank||i+1;return `<div class="fuse rkrow ${p<=3?"rk"+p:""} ${x.me?"me":""}"><span class="rkn">${p<=3?MEDAL[p-1]:p+"º"} <b class="nm">${esc(x.n)}</b></span><b>🪙 ${fmt(x.s)}</b></div>`}).join("")}`:`<div class="empty">Carregando ranking…</div>`}
   ${last&&last.top&&last.top.length?`<h3 class="dsc cat">Vencedores da semana passada</h3>${last.top.map(x=>`<div class="fuse rkrow rk${x.place}"><span class="rkn">${MEDAL[x.place-1]} <b class="nm">${esc(x.n)}</b></span><b>🪙 ${fmt(x.s)}</b></div>`).join("")}`:""}
   <h3 class="dsc cat">🏆 Meus troféus (${state.trophies.length})</h3>${state.trophies.length?`<div class="trophies">${state.trophies.slice().reverse().map(trophyCard).join("")}</div>`:`<p class="dsc sm">Termine uma semana no top 3 para ganhar um troféu exclusivo.</p>`}`;
  tickRank()}
function tickRank(){if(!$("#wkTime"))return;const w=weekIdx(),end=WEEK0+(w+1)*WEEK_MS,left=end-Date.now();$("#wkTime").textContent=clockD(left);setBar($("#wkBar"),1-left/WEEK_MS)}
{const _et2=extraTick;extraTick=function(){_et2();const now=Date.now();
  if(state.wk.w!==weekIdx()){state.wk={w:weekIdx(),base:st("earned")};save();if(ONLINE)pushScore();if(page==="rank")renderRank()}
  if(page==="rank"){tickRank();if(ONLINE&&now-rkAt>10000)fetchRank()}
  if(ONLINE&&now-trAt>60000)checkTrophies()}}
render();detectOnline();
