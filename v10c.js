/* ===== VacaBox v10 · perfil, social, estatísticas, exposição e chefe global ===== */
(function(){
"use strict";
const VB=window.VB,H=VB.H,X=()=>VB.X(),RR=n=>Math.round(n);
const hasR=r=>state.seen.some(id=>{const c=CBY.get(id);return c&&c.r>=r&&!c.ex});
const hasEx=e=>state.seen.some(id=>{const c=CBY.get(id);return c&&c.ex===e});
const lvPass=()=>Math.min(30,Math.floor(X().pass.xp/120));

/* ---------- catálogo de cosméticos ---------- */
const T=(...a)=>a;
const COS={
fr:[T("none","Sem moldura","",()=>1),T("wood","Madeira","Grátis",()=>1),T("silver","Prata","Descubra 60 pelagens",()=>state.seen.length>=60),T("gold","Ouro","Renasça 1 vez",()=>state.rb>=1),T("emerald","Esmeralda","Descubra 150 pelagens",()=>state.seen.length>=150),
 T("ruby","Rubi","Ganhe um troféu do ranking",()=>state.trophies.length>=1),T("ice","Gelo","Renasça 3 vezes",()=>state.rb>=3),T("fire","Fogo","Renasça 5 vezes",()=>state.rb>=5),T("neon","Neon","Passe Premium (nível 10)",()=>0),
 T("rainbow","Arco-íris","Tenha uma vaca Única",()=>hasR(6)),T("cosmic","Cósmica","Descubra uma vaca Ultimate",()=>hasR(7)),T("crown","Coroa Suprema","Renasça 15 vezes",()=>state.rb>=15)],
ba:[T("pasto","Pasto","Grátis","linear-gradient(135deg,#3f7d32,#a8d672)",()=>1),T("entardecer","Entardecer","Grátis","linear-gradient(135deg,#ff7e5f,#feb47b,#6a4c93)",()=>1),T("noite","Noite estrelada","Grátis","radial-gradient(circle at 20% 30%,#fffa 1px,transparent 2px) 0 0/38px 38px,radial-gradient(circle at 70% 70%,#fff8 1px,transparent 2px) 0 0/52px 52px,linear-gradient(160deg,#0b1026,#2a1f5e)",()=>1),
 T("oceano","Oceano","Descubra 30 pelagens","linear-gradient(135deg,#0f4c75,#3282b8,#bbe1fa)",()=>state.seen.length>=30),T("aurora","Aurora","Descubra 80 pelagens","linear-gradient(120deg,#0f2027,#2c5364,#7ee8a5,#a779e8)",()=>state.seen.length>=80),
 T("doce","Doce de leite","Ganhe 🪙100 mil no total","linear-gradient(135deg,#c68642,#f1c27d,#fff3d6)",()=>st("earned")>=1e5),T("neve","Neve","Renasça 1 vez","linear-gradient(135deg,#e6f3ff,#a4c8f0,#ffffff)",()=>state.rb>=1),T("vulcao","Vulcão","Renasça 2 vezes","linear-gradient(135deg,#1a0a05,#8a1c0e,#ff9a2f)",()=>state.rb>=2),
 T("galaxia","Galáxia","Tenha uma vaca Mítica","radial-gradient(circle at 30% 30%,#7d7fe0,transparent 45%),radial-gradient(circle at 75% 60%,#c06ae0,transparent 50%),#10102a",()=>hasR(5)),
 T("ouro","Ouro real","Tenha uma vaca Única","linear-gradient(135deg,#7a5200,#ffd23f,#fff3b0,#ffd23f,#7a5200)",()=>hasR(6)),T("arcoiris","Arco-íris","Tenha uma vaca Única e 3 renascimentos","linear-gradient(90deg,#ff4d4d,#ffb84d,#f5ff4d,#4dff88,#4dd2ff,#9d4dff,#ff4dd2)",()=>hasR(6)&&state.rb>=3),
 T("cosmos","Cosmos Ultimate","Descubra uma vaca Ultimate","conic-gradient(from 200deg at 50% 120%,#6fd8ff,#b39bff,#ff8fcf,#ffd45f,#6fd8ff)",()=>hasR(7)),T("junina","Festa Junina","Descubra uma vaca da Festa Junina","repeating-linear-gradient(90deg,#e8503a 0 22px,#ffd447 22px 44px,#2f8f4e 44px 66px)",()=>hasEx("junina")),
 T("natal","Natal","Descubra uma vaca de Natal","linear-gradient(135deg,#9b1b1b,#fff,#1f6f3f)",()=>hasEx("natal")),T("premium","Premium","Passe Premium (nível 28)","repeating-linear-gradient(45deg,#2a1a4a 0 12px,#3b2670 12px 24px)",()=>0)],
nc:[T("white","Branco","Grátis","#ffffff",()=>1),T("gold","Dourado","Grátis","#ffd76a",()=>1),T("pink","Rosa","Grátis","#ff8fb8",()=>1),T("cyan","Ciano","Grátis","#6fe3ff",()=>1),T("green","Verde","Grátis","#8dff9c",()=>1),T("lilac","Lilás","Grátis","#c3a3ff",()=>1),T("red","Vermelho","Grátis","#ff6b6b",()=>1),T("orange","Laranja","Grátis","#ffa94d",()=>1),
 T("g_sunset","Pôr do sol","Descubra 40 pelagens","linear-gradient(90deg,#ff7e5f,#feb47b)",()=>state.seen.length>=40),T("g_ocean","Oceano","Renasça 1 vez","linear-gradient(90deg,#00c6ff,#3a7bff)",()=>state.rb>=1),T("g_forest","Floresta","Renasça 2 vezes","linear-gradient(90deg,#11998e,#38ef7d)",()=>state.rb>=2),
 T("g_neon","Neon","Ganhe 🪙1 milhão no total","linear-gradient(90deg,#ff00cc,#5b5bff)",()=>st("earned")>=1e6),T("g_gold","Ouro líquido","Tenha uma vaca Mítica","linear-gradient(90deg,#b8860b,#ffd700,#fff3b0)",()=>hasR(5)),T("g_rb","Arco-íris","Tenha uma vaca Única","linear-gradient(90deg,#ff4d4d,#ffb84d,#f5ff4d,#4dff88,#4dd2ff,#9d4dff,#ff4dd2)",()=>hasR(6))],
na:[T("none","Sem animação","",()=>1),T("pulse","Pulsar","Grátis",()=>1),T("shine","Brilho","Descubra 20 pelagens",()=>state.seen.length>=20),T("float","Flutuar","Descubra 50 pelagens",()=>state.seen.length>=50),T("neon","Neon piscante","Renasça 1 vez",()=>state.rb>=1),T("ice","Gelo cintilante","Renasça 3 vezes",()=>state.rb>=3),
 T("glitch","Glitch","Ganhe um troféu",()=>state.trophies.length>=1),T("rainbow","Arco-íris vivo","Tenha uma vaca Única",()=>hasR(6)),T("fire","Fogo","Passe Premium (nível 20)",()=>0)],
ti:[T("","Sem título","",()=>1),T("Fazendeiro Iniciante","Fazendeiro Iniciante","Grátis",()=>1),T("Ordenhador","Ordenhador","Ordenhe 100 vezes",()=>st("milkings")>=100),T("Mestre do Leite","Mestre do Leite","Produza 10 mil L",()=>st("milkL")>=1e4),T("Colecionador","Colecionador","Descubra 100 pelagens",()=>state.seen.length>=100),
 T("Renascido","Renascido","Renasça 1 vez",()=>state.rb>=1),T("Lenda Viva","Lenda Viva","Renasça 10 vezes",()=>state.rb>=10),T("Campeão da Semana","Campeão da Semana","Ganhe um troféu",()=>state.trophies.length>=1),T("Caçador de Raridades","Caçador de Raridades","Tenha uma vaca Mítica",()=>hasR(5)),
 T("Dono de uma Única","Dono de uma Única","Tenha uma vaca Única",()=>hasR(6)),T("Ultimate","Ultimate","Descubra uma vaca Ultimate",()=>hasR(7)),T("Mestre das Caixas","Mestre das Caixas","Abra 500 caixas",()=>st("boxes")>=500),T("Magnata do Leite","Magnata do Leite","Ganhe 🪙10 milhões",()=>st("earned")>=1e7),
 T("Laticinista","Laticinista","Faça 50 laticínios",()=>st("dairyMade")>=50),T("Veterinário de Plantão","Veterinário de Plantão","Cure 10 vacas",()=>st("cures")>=10),T("Fazendeiro Brilhante","Fazendeiro Brilhante","Tenha uma vaca brilhante",()=>state.cows.some(c=>c.sh)),
 T("Mestre do Passe","Mestre do Passe","Chegue ao nível 30 do Passe",()=>lvPass()>=30),T("Cooperado","Cooperado","Entre numa cooperativa",()=>!!X().soc.clan),T("Rei da Exposição","Rei da Exposição","Participe de uma exposição",()=>X().show.done>=1)]};
const BADGES=[["tro","🏆","Troféu do ranking",()=>state.trophies.length>0],["rb","♻️","Renascido",()=>state.rb>0],["sh","✨","Vaca brilhante",()=>state.cows.some(c=>c.sh)],["ult","🌌","Ultimate",()=>hasR(7)],["prem","👑","Passe Premium",()=>X().pass.own>=2],["dia","💎","Rico em diamantes (100+)",()=>X().dia>=100],
["col","📚","500 pelagens",()=>state.seen.length>=500],["uni","🌈","Dona de uma Única",()=>hasR(6)],["cop","🤝","Cooperado",()=>!!X().soc.clan],["fab","🧀","Laticinista",()=>st("dairyMade")>=20]];
const find=(t,id)=>COS[t].find(i=>i[0]===id);
const owned=(t,id)=>{const i=find(t,id);return !!(i&&(X().cos[t+":"+id]||i[t==="ba"||t==="nc"?4:3]()))};
VB.cosName=(t,id)=>{const i=find(t,id);return i?(({fr:"Moldura ",ba:"Banner ",nc:"Cor ",na:"Nome ",ti:""})[t]||"")+i[1]:id};
const bgOf=id=>{const i=find("ba",id);return i?i[3]:COS.ba[0][3]};
const ncOf=id=>{const i=find("nc",id);return i?i[3]:"#fff"};
function pname(name,p){const c=ncOf(p.nc),g=/gradient/.test(c);return `<span class="pname na-${p.na&&p.na!=="none"?p.na:"x"}" style="${g?`background:${c};-webkit-background-clip:text;background-clip:text;color:transparent`:`color:${c}`}">${H(name)}</span>`}
function profCard(name,p,extra){const bd=(p.bd||[]).map(id=>(BADGES.find(b=>b[0]===id)||[0,""])[1]).join(" ");
  return `<div class="pcardx"><div class="pban" style="background:${bgOf(p.ba)}"></div><div class="pav">${VB.avatar(84,p)}</div><div class="pinfo"><div class="pnm">${pname(name,p)}</div>${p.ti?`<div class="ptit">« ${H(p.ti)} »</div>`:""}${bd?`<div class="pbd">${bd}</div>`:""}${p.bio?`<p class="pbio">${H(p.bio)}</p>`:""}
  <div class="pmini"><span>♻️ ${p.rb||0}</span><span>📚 ${p.seen||0}</span><span>🐄 ${p.cows||0}</span>${p.tro?`<span>🏆 ${p.tro}</span>`:""}${p.prem?`<span>👑</span>`:""}${p.clan?`<span>🤝 ${H(p.clan)}</span>`:""}</div>${extra||""}</div></div>`}

/* ---------- dados públicos do meu perfil ---------- */
function pubProfile(){const x=X(),pf=x.prof,top=[...state.cows].sort((a,b)=>type(b).r-type(a).r||b.L-a.L).slice(0,6).map(c=>({t:c.t,sh:c.sh?1:0})),pet=VB.petCow();
  return{av:pf.av,fr:pf.fr,ba:pf.ba,nc:pf.nc,na:pf.na,ti:pf.ti,bio:pf.bio,bd:pf.bd,fx:pf.fx||"none",st:pf.st||"",lv:VB.lvl?VB.lvl().l:1,rb:state.rb,seen:state.seen.length,cows:state.cows.length,top,tro:state.trophies.length,pet:pet?{t:pet.t,sh:pet.sh?1:0}:null,earned:RR(st("earned")),clan:x.soc.clan?x.soc.clan.name:"",prem:x.pass.own>=2?1:0}}
let pubAt=0;VB.tickers.push(()=>{if(ONLINE&&Date.now()-pubAt>60000){pubAt=Date.now();apiRaw("/api/profile/set",{pid:state.pid,name:state.farm,p:pubProfile()})}});

/* ---------- vizinhos simulados (modo offline) ---------- */
const BOTS=[["Fazenda Dona Marta","💐"],["Sítio do Seu Zé","🌽"],["Estância Boa Vista","🏞️"],["Casa 🤖","🤖"]];
function botProfile(i){const reg=COWS.filter(c=>!c.ult&&!c.ex),pick=k=>reg[Math.floor(rnd(i*31+k)*reg.length)],fr=["wood","silver","gold","emerald","ruby"][i%5],top=[0,1,2,3,4,5].map(k=>({t:pick(k+3).id,sh:0})).sort((a,b)=>CBY.get(b.t).r-CBY.get(a.t).r);
  return{av:top[0].t,fr,ba:COS.ba[i%6][0],nc:COS.nc[(i*3)%8][0],na:["pulse","none","shine","float"][i%4],ti:["Fazendeiro Iniciante","Colecionador","Mestre do Leite","Renascido"][i%4],bio:["Amo minhas vacas! 🐄","Cuidando do pasto desde sempre.","Venha visitar!","Beep boop, leite fresco. 🤖"][i%4],bd:["tro","rb"].slice(0,i%3),rb:i,seen:40+i*37,cows:8+i*5,top,tro:i%2,earned:50000*(i+1)*(i+1),clan:"",prem:i===3?1:0}}
const bots=()=>BOTS.map((b,i)=>({pid:"bot"+i,name:b[0],p:botProfile(i)}));
async function getProfile(pid){if(pid.startsWith("bot")){const b=bots()[+pid.slice(3)];return b?{name:b.name,p:b.p}:null}
  if(!ONLINE)return null;const r=await apiRaw("/api/profile/get?pid="+state.pid+"&target="+encodeURIComponent(pid));return r.ok&&r.j.p?{name:r.j.name,p:r.j.p}:null}

/* ---------- modal do perfil ---------- */
document.body.insertAdjacentHTML("beforeend",`<div id="pf" class="modal hidden"><div class="modal-card wide pfcard"><button class="xbtn" data-x="pfx">✕</button><div id="pfBody"></div></div></div>`);
let ptab="me",psub="friends",avR=-1,avN=48,view=null,fMsg="";
const PTABS=[["me","👤 Perfil"],["soc","🤝 Social"],["stat","📈 Estatísticas"],["acc","☁️ Conta"],["opt","⚙️ Config"]];
VB.act.pf=()=>{view=null;$("#pf").classList.remove("hidden");renderPF()};
VB.act.pfx=()=>{$("#pf").classList.add("hidden");render()};
VB.act.ptab=b=>{ptab=b.dataset.t;view=null;renderPF()};
document.addEventListener("click",e=>{if(e.target.closest("#pf [data-a]"))setTimeout(()=>{if(!$("#pf").classList.contains("hidden"))renderPF()},80)});
$("#pf").addEventListener("click",e=>{if(e.target.id==="pf")VB.act.pfx()});

function optGrid(t,cur,fn){return `<div class="cgrid">${COS[t].map(i=>{const ok=owned(t,i[0]);return `<button class="copt ${cur===i[0]?"sel":""} ${ok?"":"lk"}" data-x="cset" data-t="${t}" data-id="${H(i[0])}" title="${ok?"":"🔒 "+H(i[2])}">${fn(i)}<small>${H(i[1])}</small>${ok?"":`<em>🔒 ${H(i[2])}</em>`}</button>`}).join("")}</div>`}
VB.act.cset=b=>{const t=b.dataset.t,id=b.dataset.id;if(!owned(t,id))return toast("🔒 "+find(t,id)[2]);X().prof[({fr:"fr",ba:"ba",nc:"nc",na:"na",ti:"ti"})[t]]=id;VB.sfx("pop");save();renderPF();paintTopSoon()};
const paintTopSoon=()=>render();
VB.act.avset=b=>{X().prof.av=b.dataset.id;VB.sfx("pop");save();renderPF();render()};
VB.act.avr=b=>{avR=+b.dataset.r;avN=48;renderPF()};VB.act.avmore=()=>{avN+=48;renderPF()};
VB.act.bdt=b=>{const pf=X().prof,id=b.dataset.id,i=pf.bd.indexOf(id);if(i>=0)pf.bd.splice(i,1);else if(pf.bd.length<3)pf.bd.push(id);else toast("Máximo de 3 emblemas.");save();renderPF()};
document.addEventListener("input",e=>{if(e.target.id==="pfBio"){X().prof.bio=e.target.value.replace(/[<>&"]/g,"").slice(0,70);save();const p=$("#pfPrev");if(p)p.innerHTML=profCard(state.farm,pubProfile())}});

function meHTML(){const x=X(),pf=x.prof,seen=state.seen.map(id=>CBY.get(id)).filter(Boolean),list=seen.filter(c=>avR<0||c.r===avR).slice(0,avN),tot=seen.filter(c=>avR<0||c.r===avR).length;
  const rars=[-1,...Array.from({length:14},(_,i)=>i)].filter(r=>r<0||seen.some(c=>c.r===r));
  return `<div id="pfPrev">${profCard(state.farm,pubProfile())}</div>
  <details class="det" open><summary>📸 Foto de perfil (vacas descobertas)</summary><div class="tabs">${rars.map(r=>`<button class="secondary ${avR===r?"on":""}" data-x="avr" data-r="${r}">${r<0?"Todas":RN[r]}</button>`).join("")}</div>
  <div class="avgrid">${list.map(c=>`<button class="avopt ${pf.av===c.id?"sel":""}" data-x="avset" data-id="${c.id}" title="${H(c.name)} · ${RN[c.r]}">${VB.avatar(54,{av:c.id,fr:"none"})}</button>`).join("")||`<div class="empty">Descubra vacas para usá-las como foto.</div>`}</div>
  ${list.length<tot?`<button class="secondary" data-x="avmore">Mostrar mais (${tot-list.length})</button>`:""}</details>
  <details class="det"><summary>🖼️ Moldura</summary>${optGrid("fr",pf.fr,i=>`<div class="frprev">${VB.avatar(48,{av:pf.av,fr:i[0]})}</div>`)}</details>
  <details class="det"><summary>🏞️ Banner</summary>${optGrid("ba",pf.ba,i=>`<div class="baprev" style="background:${i[3]}"></div>`)}</details>
  <details class="det"><summary>🎨 Cor do nome</summary>${optGrid("nc",pf.nc,i=>`<div class="ncprev">${pname("Aa Bb",{nc:i[0],na:"none"})}</div>`)}</details>
  <details class="det"><summary>✨ Animação do nome</summary>${optGrid("na",pf.na,i=>`<div class="ncprev">${pname("Nome",{nc:pf.nc,na:i[0]})}</div>`)}</details>
  <details class="det"><summary>🏷️ Título</summary>${optGrid("ti",pf.ti,i=>`<div class="tiprev">${i[0]?"« "+H(i[1])+" »":"—"}</div>`)}</details>
  <details class="det"><summary>🏅 Emblemas (até 3)</summary><div class="cgrid">${BADGES.map(b=>{const ok=b[3]();return `<button class="copt ${pf.bd.includes(b[0])?"sel":""} ${ok?"":"lk"}" ${ok?`data-x="bdt" data-id="${b[0]}"`:"disabled"}><div class="bde">${b[1]}</div><small>${b[2]}</small></button>`}).join("")}</div></details>
  <details class="det"><summary>💬 Biografia</summary><input id="pfBio" class="codein" maxlength="70" placeholder="Conte algo sobre a sua fazenda" value="${H(pf.bio)}"></details>
  <p class="dsc sm">🐾 Vaca de estimação: ${VB.petCow()?H(cname(VB.petCow())):"nenhuma"} — escolha na aba Fazenda (botão 🐾 no cartão da vaca). Nome da fazenda: <b>${H(state.farm)}</b> <button class="secondary" data-a="fname">✏️</button></p>`}

/* ---------- social ---------- */
const rewGift=()=>RR(Math.max(1,Math.sqrt(st("earned")/5000))*200);
VB.act.psub=b=>{psub=b.dataset.t;fMsg="";renderPF()};
VB.act.fadd=async()=>{const v=($("#fCode").value||"").trim().toLowerCase();if(!v)return;const s=X().soc;if(s.friends.some(f=>f.pid===v)){fMsg="Já é seu amigo.";return renderPF()}
  if(v===state.pid){fMsg="Esse é o seu próprio código 😄";return renderPF()}const r=await getProfile(v);if(!r){fMsg=ONLINE?"Código não encontrado.":"Amigos reais precisam do servidor online.";return renderPF()}
  s.friends.push({pid:v,name:r.name});fMsg="✅ Amigo adicionado!";save();renderPF()};
VB.act.frem=b=>{const s=X().soc;s.friends=s.friends.filter(f=>f.pid!==b.dataset.pid);save();renderPF()};
VB.act.fvisit=async b=>{const r=await getProfile(b.dataset.pid);if(!r){toast("Não foi possível abrir essa fazenda agora.");return}view={pid:b.dataset.pid,name:r.name,p:r.p};renderPF()};
VB.act.vback=()=>{view=null;renderPF()};
VB.act.fgift=async b=>{const pid=b.dataset.pid,s=X().soc,day=VB.dayKey(),g=s.gifts;if(g.d!==day){g.d=day;g.n=0;g.to=[]}
  if(g.n>=3)return toast("Você já enviou 3 presentes hoje.");if(g.to.includes(pid))return toast("Já enviou presente a essa fazenda hoje.");
  if(pid.startsWith("bot")){g.n++;g.to.push(pid);VB.xp(5);toast("🎁 Presente enviado! O vizinho agradeceu. (+5 XP do Passe)");save();return renderPF()}
  const r=await apiRaw("/api/gift/send",{pid:state.pid,name:state.farm,to:pid,k:b.dataset.k});if(r.ok){g.n++;g.to.push(pid);VB.xp(5);toast("🎁 Presente enviado!")}else toast(r.status===429?"Limite de presentes atingido.":"Não foi possível enviar.");save();renderPF()};
let inbox=[],inAt=0;
async function loadInbox(){inAt=Date.now();if(ONLINE){const r=await apiRaw("/api/gift/inbox?pid="+state.pid);inbox=r.ok?r.j.gifts||[]:[]}
  else{const d=VB.dayKey(),g=X().soc.gifts;inbox=g.botd===d?[]:[{id:"bot",fn:"Casa 🤖",k:"coin"}]}}
VB.act.gclaim=async b=>{const id=b.dataset.id,gi=inbox.find(x=>String(x.id)===id);if(!gi)return;
  if(id==="bot"){X().soc.gifts.botd=VB.dayKey()}else{const r=await apiRaw("/api/gift/claim",{pid:state.pid,id:gi.id});if(!r.ok)return toast("Presente indisponível.")}
  if(gi.k==="tix"){X().tix.verde=(X().tix.verde||0)+1;toast("🎟️ Caixa Verde recebida!")}else{const c=rewGift();earn(c);toast(`🪙 +${fmt(c)} de ${gi.fn}!`)}VB.sfx("claim");save();await loadInbox();renderPF();render()};
function socHTML(){const s=X().soc,tabs=[["friends","👥 Amigos e presentes"],["clan","🤝 Cooperativa"]];
  const head=`<div class="tabs">${tabs.map(([k,l])=>`<button class="secondary ${psub===k?"on":""}" data-x="psub" data-t="${k}">${l}</button>`).join("")}</div>`;
  if(view)return `<button class="secondary" data-x="vback">← Voltar</button>`+profCard(view.name,view.p)+
    `<div class="panel"><h3>🐄 Vitrine</h3><div class="vitr">${(view.p.top||[]).map(t=>{const c=CBY.get(t.t);return c?`<div class="vc ${t.sh?"shiny":""}"><div class="cow-art">${cowSVG(c)}</div><span class="badge ${RC[c.r]}">${RN[c.r]}</span><small>${H(c.name)}${t.sh?" ✨":""}</small></div>`:""}).join("")}</div>
    ${view.p.pet?`<p class="dsc sm">🐾 Estimação: ${H((CBY.get(view.p.pet.t)||{name:"?"}).name)}</p>`:""}<p class="dsc sm">🪙 ${fmt(view.p.earned||0)} ganhos no total</p>
    <button class="primary" data-x="fgift" data-pid="${H(view.pid)}" data-k="coin">🎁 Enviar presente</button> ${s.friends.some(f=>f.pid===view.pid)?"":`<button class="secondary" data-x="fadd2" data-pid="${H(view.pid)}" data-n="${H(view.name)}">➕ Adicionar amigo</button>`}</div>`;
  if(psub==="friends"){if(Date.now()-inAt>30000)loadInbox().then(()=>{if(ptab==="soc"&&psub==="friends"&&!view)renderPF()});
    return head+`<div class="panel"><h3>🆔 Meu código de amigo</h3><p class="dsc"><code class="mycode">${H(state.pid)}</code> <button class="secondary" data-x="copyid">📋 Copiar</button></p><div class="row"><input id="fCode" class="codein" placeholder="Cole o código de um amigo"><button class="primary" data-x="fadd">Adicionar</button></div><p class="dsc sm" style="color:#ffd76a">${H(fMsg)}</p>${ONLINE?"":`<p class="dsc sm">📴 Modo offline: mostrando vizinhos simulados. Online você encontra jogadores reais.</p>`}</div>
    ${inbox.length?`<div class="panel"><h3>🎁 Presentes recebidos</h3>${inbox.map(g=>`<div class="fuse"><span>${H(g.fn)} enviou ${g.k==="tix"?"🎟️ uma caixa":"🪙 moedas"}</span><button class="primary" data-x="gclaim" data-id="${g.id}">Receber</button></div>`).join("")}</div>`:""}
    <div class="panel"><h3>👥 ${ONLINE?"Amigos":"Vizinhos"}</h3>${[...s.friends,...(ONLINE?[]:bots().map(b=>({pid:b.pid,name:b.name})))].map(f=>`<div class="fuse"><span>${H(f.name)}</span><span><button class="secondary" data-x="fvisit" data-pid="${H(f.pid)}">👀 Visitar</button> <button class="secondary" data-x="fgift" data-pid="${H(f.pid)}" data-k="coin">🎁</button>${f.pid.startsWith("bot")?"":` <button class="secondary" data-x="frem" data-pid="${H(f.pid)}">✕</button>`}</span></div>`).join("")||`<div class="empty">Nenhum amigo ainda.</div>`}</div>`}
  return head+clanHTML()}
VB.act.fadd2=b=>{const s=X().soc;if(!s.friends.some(f=>f.pid===b.dataset.pid)){s.friends.push({pid:b.dataset.pid,name:b.dataset.n});toast("✅ Amigo adicionado!");save();renderPF()}};
VB.act.copyid=()=>{try{navigator.clipboard.writeText(state.pid);toast("📋 Código copiado!")}catch(e){toast("Selecione e copie o código.")}};

/* cooperativas */
const CLANS0=[["Vale Verde","🌿"],["Leite & Mel","🍯"],["Os Ordenhadores","🥛"],["Pasto Real","👑"]];
let clanData=null,clanAt=0,clanTop=[];
const weekScore=()=>Math.max(0,st("earned")-state.wk.base);
async function loadClan(){clanAt=Date.now();const s=X().soc;
  if(ONLINE){const r=await apiRaw("/api/clan/me?pid="+state.pid);clanData=r.ok?r.j.clan:null;const t=await apiRaw("/api/clan/top");clanTop=t.ok?t.j.top||[]:[];s.clan=clanData?{id:clanData.id,name:clanData.name,emoji:clanData.emoji}:null}
  else{const w=weekIdx();clanTop=CLANS0.map(([n,e],i)=>({id:"c"+i,name:n,emoji:e,members:6+i*3,total:RR((40000+rnd(w*3+i)*60000)*(i+1)*Math.sqrt(1+st("earned")/1e5))}));
    if(s.clan){const c=clanTop.find(x=>x.id===s.clan.id);if(c){c.total+=weekScore();c.members++;clanData={...c,mine:true,list:[{n:state.farm,s:weekScore()},...[1,2,3].map(k=>({n:["Marta","Zé","Lia"][k-1],s:RR(c.total/(c.members*1.3)*(.6+rnd(k+w)))}))]}}}else clanData=null;clanTop.sort((a,b)=>b.total-a.total)}}
VB.act.cjoin=async b=>{const s=X().soc;if(ONLINE){const r=await apiRaw("/api/clan/join",{pid:state.pid,name:state.farm,id:b.dataset.id});if(!r.ok)return toast("Não foi possível entrar.")}else{const c=clanTop.find(x=>x.id===b.dataset.id);s.clan={id:c.id,name:c.name,emoji:c.emoji}}
  toast("🤝 Você entrou na cooperativa! +3% de leite.");VB.sfx("good");save();await loadClan();renderPF()};
VB.act.cleave=async()=>{if(!confirm("Sair da cooperativa?"))return;if(ONLINE)await apiRaw("/api/clan/leave",{pid:state.pid});X().soc.clan=null;save();await loadClan();renderPF()};
VB.act.ccreate=async()=>{const n=($("#cName").value||"").replace(/[<>&"]/g,"").trim().slice(0,16);if(n.length<3)return toast("Nome com 3 a 16 letras.");if(!ONLINE)return toast("Criar cooperativas exige o servidor online.");
  const r=await apiRaw("/api/clan/create",{pid:state.pid,name:state.farm,cn:n,emoji:"🐄"});if(!r.ok)return toast(r.j.error==="existe"?"Esse nome já existe.":"Não foi possível criar.");await loadClan();renderPF()};
function clanHTML(){if(Date.now()-clanAt>20000)loadClan().then(()=>{if(ptab==="soc"&&psub==="clan"&&!view)renderPF()});const c=clanData;
  if(c)return `<div class="panel"><h3>${c.emoji} ${H(c.name)}</h3><p class="dsc">👥 ${c.members} membros · 🪙 ${fmt(c.total)} ganhos na semana · benefício: <b>+3% de leite</b></p>${(c.list||[]).map((m,i)=>`<div class="fuse"><span>${i+1}. ${H(m.n)}</span><b>🪙 ${fmt(m.s)}</b></div>`).join("")}<button class="secondary" data-x="cleave">Sair da cooperativa</button></div>`+topClans();
  return `<div class="panel"><h3>🤝 Cooperativas</h3><p class="dsc">Junte-se a outros fazendeiros: a soma dos ganhos da semana define o ranking da cooperativa, e todos os membros ganham <b>+3% de leite</b>.</p>${ONLINE?`<div class="row"><input id="cName" class="codein" maxlength="16" placeholder="Nome da nova cooperativa"><button class="primary" data-x="ccreate">Criar</button></div>`:""}</div>`+topClans(true)}
function topClans(join){return `<div class="panel"><h3>🏆 Ranking de cooperativas</h3>${clanTop.map((c,i)=>`<div class="fuse"><span>${MEDAL[i]||i+1+"."} ${c.emoji} <b>${H(c.name)}</b> · 👥 ${c.members}</span><span>🪙 ${fmt(c.total)} ${join?`<button class="primary" data-x="cjoin" data-id="${H(c.id)}">Entrar</button>`:""}</span></div>`).join("")||`<div class="empty">Carregando…</div>`}</div>`}
VB.mods.push(()=>X().soc.clan?1.03:1);

/* ---------- estatísticas ---------- */
function bars(v,col){const mx=Math.max(1,...v),w=100/v.length;return `<svg viewBox="0 0 100 60" preserveAspectRatio="none" class="chart">${v.map((n,i)=>{const h=n/mx*52;return `<rect x="${i*w+.8}" y="${58-h}" width="${w-1.6}" height="${Math.max(.6,h)}" rx="1.2" fill="${col}"/>`}).join("")}</svg>`}
function statHTML(){const x=X(),days=Array.from({length:14},(_,i)=>VB.dayKey(Date.now()-(13-i)*864e5)),h=days.map(d=>x.hist[d]||{l:0,c:0,b:0,m:0}),cnt=Array(14).fill(0);state.cows.forEach(c=>cnt[type(c).r]++);
  const cols=["#596052","#438c59","#4778c7","#8c51c7","#e8b100","#b3141a","#ffffff",...VB.UR.map(u=>u[1])],tc=Math.max(1,state.cows.length);
  const tile=(e,n,l)=>`<div class="stile"><span>${e}</span><b>${n}</b><small>${l}</small></div>`;
  return `<div class="stiles">${tile("🥛",fmt(st("milkL")),"litros produzidos")}${tile("🪙",fmt(st("earned")),"moedas ganhas")}${tile("📦",fmt(st("boxes")),"caixas abertas")}${tile("🐄",state.cows.length+"/"+farmCap(),"vacas na fazenda")}${tile("📚",state.seen.length+"/"+COWS.length,"pelagens")}${tile("💎",fmt(x.dia),"diamantes")}${tile("♻️",state.rb,"renascimentos")}${tile("🧀",fmt(st("dairyMade")),"laticínios")}</div>
  <div class="panel"><h3>🥛 Leite produzido (14 dias)</h3>${bars(h.map(a=>a.l),"#4aa3ff")}<div class="axis"><span>${days[0].slice(5)}</span><span>hoje: ${fmt(h[13].l)} L</span></div></div>
  <div class="panel"><h3>🪙 Moedas ganhas (14 dias)</h3>${bars(h.map(a=>a.c),"#e2b63f")}<div class="axis"><span>${days[0].slice(5)}</span><span>hoje: ${fmt(h[13].c)}</span></div></div>
  <div class="panel"><h3>📦 Caixas abertas (14 dias)</h3>${bars(h.map(a=>a.b),"#a56bff")}</div>
  <div class="panel"><h3>🐄 Meu rebanho por raridade</h3><div class="stack">${cnt.map((n,r)=>n?`<i style="width:${n/tc*100}%;background:${cols[r]}" title="${RN[r]}: ${n}"></i>`:"").join("")}</div><div class="legend">${cnt.map((n,r)=>n?`<span><i style="background:${cols[r]}"></i>${RN[r]} ${n}</span>`:"").join("")||"Sem vacas."}</div></div>
  <div class="panel"><h3>📚 Progresso do Compêndio</h3>${Array.from({length:14},(_,r)=>{const l=COWS.filter(c=>!c.ex&&c.r===r),n=l.filter(c=>state.seen.includes(c.id)).length;return r>=7&&!n&&state.rb<1?"":`<div class="prg"><span>${RN[r]}</span><div class="bar lv"><i style="width:${n/l.length*100}%;background:${cols[r]}"></i></div><small>${n}/${l.length}</small></div>`}).join("")}</div>`}

/* ---------- conta e config ---------- */
function accHTML(){return perfHTML()}
function optHTML(){const o=X().opts;
  return `<div class="panel"><h3>🔊 Som</h3><button class="${o.snd?"primary":"secondary"}" data-x="opt" data-k="snd">${o.snd?"Ligado":"Desligado"}</button></div>
  <div class="panel"><h3>🌗 Tema</h3><button class="${o.theme==="dark"?"primary":"secondary"}" data-x="opt" data-k="theme" data-v="dark">🌙 Escuro</button> <button class="${o.theme==="light"?"primary":"secondary"}" data-x="opt" data-k="theme" data-v="light">☀️ Claro</button></div>
  <div class="panel"><h3>🔠 Tamanho da interface</h3>${[[.9,"Pequeno"],[1,"Normal"],[1.12,"Grande"],[1.25,"Enorme"]].map(([v,l])=>`<button class="${o.fs===v?"primary":"secondary"}" data-x="opt" data-k="fs" data-v="${v}">${l}</button>`).join(" ")}</div>
  <div class="panel"><h3>🔔 Notificações</h3><p class="dsc sm">Avisos quando as vacas estiverem prontas e quando houver bônus diário (com o app instalado ou a aba em segundo plano).</p><button class="${o.notif?"primary":"secondary"}" data-x="notif">${o.notif?"Ligadas":"Desligadas — ativar"}</button></div>
  <div class="panel"><h3>📰 Novidades</h3><button class="secondary" onclick="showNews()">Ver novidades da versão</button></div>`}
function renderPF(){if(VB.renderPF2)return VB.renderPF2();const el=$("#pfBody");if(!el)return;const x=X();
  const body=ptab==="me"?meHTML():ptab==="soc"?socHTML():ptab==="stat"?statHTML():ptab==="acc"?accHTML():optHTML();
  const card=el.closest(".modal-card"),sc=card?card.scrollTop:0,op=[...el.querySelectorAll("details")].map(d=>d.open),key=ptab+(view?"v":"");
  el.innerHTML=`<div class="pftabs tabs">${PTABS.map(([k,l])=>`<button class="secondary ${ptab===k?"on":""}" data-x="ptab" data-t="${k}">${l}</button>`).join("")}</div>${body}`;
  if(renderPF.k===key)el.querySelectorAll("details").forEach((d,i)=>{if(op[i]!=null)d.open=op[i]});renderPF.k=key;if(card)card.scrollTop=sc}
VB.renderPF=renderPF;

/* ---------- exposição de gado ---------- */
const cowScore=c=>{const t=type(c);return RR((SELL[t.r]/10+c.L*3)*(c.sh?1.5:1)+(c.tr?150:0)+(VB.petCow()&&VB.petCow().u===c.u?100:0))};
const SN=["Dona Marta","Seu Zé","Tia Lia","Compadre Tião","Vó Nena","Chico","Dona Rita","Seu Mané","Bia","Nhô Quim","Mãe Joana"];
const rivals=w=>SN.map((n,i)=>({n:"Fazenda "+n,s:RR(Math.max(300,Math.sqrt(st("earned")+1e4))*9*(.45+rnd(w*13+i)*1.6))}));
async function showBoard(w,mine){if(ONLINE){const r=await apiRaw("/api/show/top?pid="+state.pid+"&w="+w);if(r.ok)return{top:r.j.top||[],rank:r.j.rank||0}}
  const all=[...rivals(w),...(mine!=null?[{n:state.farm,s:mine,me:1}]:[])].sort((a,b)=>b.s-a.s);return{top:all.slice(0,10).map((x,i)=>({...x,rank:i+1})),rank:all.findIndex(x=>x.me)+1}}
let sb={top:[],rank:0};
VB.act.shsub=async b=>{const x=X(),sh=x.show,w=weekIdx(),c=cowBy(+$("#shsel").value);if(!c||sh.w===w)return;const sc=cowScore(c);
  x.show={...sh,w,sc,cow:{t:c.t,sh:c.sh?1:0},done:(sh.done||0)+1};if(ONLINE)await apiRaw("/api/show/submit",{pid:state.pid,name:state.farm,score:sc,cow:x.show.cow});VB.xp(30);VB.sfx("good");toast(`🏅 ${cname(c)} entrou na exposição com ${fmt(sc)} pontos!`);save();await loadShow();render()};
VB.act.shclaim=async()=>{const x=X(),sh=x.show,pw=weekIdx()-1;if(sh.w!==pw||sh.claimed===pw)return;const bd=await showBoard(pw,sh.sc),rk=bd.rank||99;
  const coin=RR(Math.max(1,Math.sqrt(st("earned")/5000))*(rk===1?4000:rk<=3?2500:rk<=10?1200:500)),dia=rk===1?3:rk===2?2:rk===3?1:0;earn(coin);if(dia)VB.addDia(dia,true);sh.claimed=pw;toast(`🏆 Exposição: ${rk}º lugar! +🪙${fmt(coin)}${dia?" · 💎 "+dia:""}`);if(rk<=3)confetti();VB.sfx("claim");save();render()};
async function loadShow(){const sh=X().show;sb=await showBoard(weekIdx(),sh.w===weekIdx()?sh.sc:null);if(page==="more"&&moreTab==="x_show")render()}
VB.moreTabs.push(["x_show","🏅 Exposição"]);
VB.moreBody.x_show=()=>{const x=X(),sh=x.show,w=weekIdx(),pw=w-1,free=state.cows.filter(c=>!c.sick),can=sh.w!==w,claim=sh.w===pw&&sh.claimed!==pw;
  if(VB._shAt!==w+"|"+Math.floor(Date.now()/20000)){VB._shAt=w+"|"+Math.floor(Date.now()/20000);loadShow()}
  return `<div class="panel"><h3>🏅 Exposição de Gado (semanal)</h3><p class="dsc">Inscreva a sua melhor vaca! A nota vale pela raridade, litros, brilho e traço. Premiação na virada da semana: 1º 💎3 · 2º 💎2 · 3º 💎1, e moedas para o top 10.</p>
  ${claim?`<button class="primary big" data-x="shclaim">🏆 Resgatar prêmio da semana passada</button>`:""}
  ${can?(free.length?`<div class="row"><select id="shsel">${[...free].sort((a,b)=>cowScore(b)-cowScore(a)).map(c=>`<option value="${c.u}">${H(cname(c))} · ${RN[type(c).r]} · ${fmt(cowScore(c))} pts</option>`).join("")}</select><button class="primary" data-x="shsub">Inscrever</button></div>`:`<div class="empty">Você não tem vacas saudáveis.</div>`):`<p class="dsc">✅ Inscrita: <b>${H((CBY.get(sh.cow.t)||{name:"?"}).name)}</b> com <b>${fmt(sh.sc)}</b> pontos.</p>`}</div>
  <div class="panel"><h3>📊 Classificação desta semana</h3>${sb.top.map(t=>`<div class="fuse ${t.me?"me":""}"><span>${MEDAL[t.rank-1]||t.rank+"."} ${H(t.n)}</span><b>${fmt(t.s)}</b></div>`).join("")||`<div class="empty">Carregando…</div>`}${sb.rank?`<p class="dsc sm">Sua posição: ${sb.rank}º</p>`:""}</div>`};

/* ---------- chefe global ---------- */
const BT=[[25,"🪙",s=>({coin:RR(s*2)}),"Moedas"],[50,"🎟️",s=>({tix:"celeiro"}),"Caixa do Celeiro"],[75,"🪙",s=>({coin:RR(s*6)}),"Moedas+"],[100,"💎",s=>({dia:3,tix:"prata"}),"💎 3 + Caixa Prateada"]];
let bossD=null,bossAt=0;
VB.deltas.push(d=>{const b=X().boss,w=weekIdx();if(b.w!==w){b.w=w;b.c=0;b.sent=0;b.cl={}}b.c+=d.milkL});
async function loadBoss(){bossAt=Date.now();const b=X().boss,w=weekIdx();if(b.w!==w){b.w=w;b.c=0;b.sent=0;b.cl={}}
  if(ONLINE){if(b.c>b.sent){const d=b.c-b.sent,r=await apiRaw("/api/boss/add",{pid:state.pid,w,l:d});if(r.ok)b.sent=b.c}const r=await apiRaw("/api/boss?pid="+state.pid);if(r.ok)bossD=r.j}
  else{const goal=2e6,fr=Math.min(1,(Date.now()-(WEEK0+w*WEEK_MS))/WEEK_MS);bossD={total:RR(goal*(fr*.9+.04*rnd(w))+b.c),goal,players:37,mine:b.c}}
  if(page==="more"&&moreTab==="x_boss")render()}
VB.act.bclaim=b=>{const x=X().boss,pct=+b.dataset.p,t=BT.find(a=>a[0]===pct),sc=Math.max(1,Math.sqrt(st("earned")/5000))*500;if(x.cl[pct])return;const r=t[2](sc);
  if(r.coin)earn(r.coin);if(r.dia)VB.addDia(r.dia,true);if(r.tix)X().tix[r.tix]=(X().tix[r.tix]||0)+1;x.cl[pct]=1;VB.sfx("claim");toast("🌍 Recompensa do chefe resgatada!");save();render()};
VB.moreTabs.push(["x_boss","🌍 Chefe"]);
VB.moreBody.x_boss=()=>{if(Date.now()-bossAt>15000)loadBoss();const x=X().boss,d=bossD,left=WEEK0+(weekIdx()+1)*WEEK_MS-Date.now();
  if(!d)return `<div class="empty">Carregando o chefe…</div>`;const pct=Math.min(100,d.total/d.goal*100);
  return `<div class="panel bosspn"><h3>🐉 Vaca Gigante Devoradora de Leite</h3><p class="dsc">Todos os jogadores produzem leite para encher a barriga da vaca gigante. Meta da comunidade: <b>${fmt(d.goal)} L</b> · termina em ${clockD(left)}.</p>
  <div class="bossbar"><i style="width:${pct}%"></i><span>${fmt(d.total)} / ${fmt(d.goal)} L (${pct.toFixed(1)}%)</span></div><p class="dsc sm">Sua contribuição: <b>${fmt(x.c)} L</b> ${x.c<500?"· produza ao menos 500 L para receber recompensas":""} · ${d.players} jogadores</p>
  ${BT.map(([p,e,f,n])=>{const ok=pct>=p&&x.c>=500,got=x.cl[p];return `<div class="fuse"><span>${e} Meta ${p}% → ${n}</span>${got?"✅":`<button class="${ok?"primary":"secondary"}" data-x="bclaim" data-p="${p}" ${ok?"":"disabled"}>Resgatar</button>`}</div>`}).join("")}</div>`};

VB.v10c={COS,owned,find,bgOf,ncOf,BADGES,hasR,hasEx,statHTML,getProfile,bots,cowScore,rivals,bars,pname,profCard,pubProfile,botProfile};
/* ---------- troféus do ranking pagam 💎 ---------- */
VB.tickers.push(()=>{const x=X();x.paid=x.paid||{};for(const t of state.trophies){if(!x.paid[t.id]){x.paid[t.id]=1;const d=[20,12,8][t.place-1]||0;if(d)VB.addDia(d)}}});
})();

/* ---------- novidades da versão 10 ---------- */
(function(){
const VB=window.VB;
const N10=["💎 <b>Diamantes:</b> nova moeda no topo da tela. Ganhe nos <b>Marcos</b> (bem mais difíceis), no <b>Passe</b>, no <b>Bônus diário</b>, nos troféus do ranking, na exposição e no chefe global.",
"🎟️ <b>Passe da Temporada:</b> Passe Gratuito por 💎200 e Premium por 💎650, com 30 níveis de recompensas.",
"🌌 <b>Etapas:</b> depois do 1º renascimento surge uma aba nova com as <b>Caixas Ultimate</b> (cada 5 renascimentos libera uma mais cara) e <b>3.500 vacas novas</b> em 7 raridades acima da Única, mais a árvore de habilidades.",
"🥛 <b>Vacas Únicas</b> não enchem mais o tanque: agora dão 150 L fixos. As Ultimate dão ainda mais.",
"👤 <b>Perfil novo:</b> toque na foto redonda ao lado das moedas. Escolha a foto entre as vacas do Compêndio, molduras, banners, nomes coloridos e animados, títulos e emblemas. Lá também ficam Social (amigos, presentes, cooperativas), Estatísticas e Configurações.",
"🏡 <b>Fazenda viva:</b> clima, doenças e veterinário, traços das vacas, vacas brilhantes ✨, vaca de estimação 🐾, decoração, Fábrica de Laticínios e recompensas por coleção.",
"🎁 <b>Mais:</b> bônus de login com sequência, roleta diária, exposição de gado semanal e chefe global. Eventos novos: Festa Junina, Carnaval, Dia das Mães e Dia das Crianças.",
"🔊 Sons, animação de raridades altas, notificações, modo claro e tamanho da interface (Perfil → Config)."];
window.showNews=function(){$("#newsTitle").textContent="🎉 Novidades da versão 10";$("#newsList").innerHTML=N10.map(x=>`<li>${x}</li>`).join("");$("#news").classList.remove("hidden")};
window.closeNews=function(){$("#news").classList.add("hidden");try{localStorage.setItem("vb_news",NEWS_V);localStorage.setItem("vb_news10","1")}catch(e){}};
try{if(localStorage.getItem("vb_news10")!=="1"&&state.seen.length>0)showNews();else if(!$("#news").classList.contains("hidden")&&localStorage.getItem("vb_news10")==="1")closeNews()}catch(e){}
})();
