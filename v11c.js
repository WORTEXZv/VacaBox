/* ===== VacaBox v11 · perfil, social, exposição, chefe, ranking e avisos ===== */
(function(){
"use strict";
const VB=window.VB,H=VB.H,X=()=>VB.X(),RR=Math.round,now=()=>Date.now(),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const C=VB.v10c,COS=C.COS,hasR=C.hasR,hasEx=C.hasEx,lv=()=>VB.lvl().l,seenN=()=>state.seen.length;

/* ===================== COSMÉTICOS NOVOS ===================== */
const T=(...a)=>a,add=(t,list)=>list.forEach(i=>{if(!COS[t].some(x=>x[0]===i[0]))COS[t].push(i)});
add("fr",[T("bronze","Bronze","Descubra 10 pelagens",()=>seenN()>=10),T("leaf","Folhas","Renasça 2 vezes",()=>state.rb>=2),T("wave","Ondas","Descubra 200 pelagens",()=>seenN()>=200),T("bolt","Raios","Produza 100 mil L de leite",()=>st("milkL")>=1e5),
 T("pixel","Pixel","Faça login 7 dias seguidos",()=>X().login.streak>=7),T("diamond","Diamante","Tenha 💎 200 ao mesmo tempo",()=>X().dia>=200),T("ghost","Fantasma","Descubra uma vaca de Halloween",()=>hasEx("halloween")),T("candy","Doce","Descubra uma vaca de Páscoa",()=>hasEx("pascoa")),
 T("party","Festa","Descubra uma vaca de Carnaval",()=>hasEx("carnaval")),T("lv25","Veterano","Chegue ao nível 25",()=>lv()>=25),T("lv50","Lenda","Chegue ao nível 50",()=>lv()>=50),T("passgold","Dourado do Passe","Passe Premium (nível 50)",()=>0)]);
add("ba",[T("campo","Campo de flores","Chegue ao nível 3","linear-gradient(180deg,#8fd3ff,#cdeccc 55%,#5fae4a),radial-gradient(circle at 20% 80%,#ff7ab8 3px,transparent 4px) 0 0/34px 34px",()=>lv()>=3),
 T("celeiro","Celeiro","Descubra 20 pelagens","linear-gradient(180deg,#f3b98a,#b5532f 60%,#5a2b17)",()=>seenN()>=20),T("deserto","Deserto","Chegue ao nível 8","linear-gradient(180deg,#ffb86b,#ffe2a8 60%,#d9a45a)",()=>lv()>=8),
 T("montanhas","Montanhas","Chegue ao nível 10","linear-gradient(180deg,#6aa5e8,#cfe3f7 50%,#4a6a5a 52%,#2a3f35)",()=>lv()>=10),T("floresta","Floresta","Renasça 1 vez","linear-gradient(135deg,#0b3d2a,#2f8f4e,#9be09b)",()=>state.rb>=1),
 T("nuvens","Nuvens","Descubra 50 pelagens","linear-gradient(180deg,#7ec0ff,#fff)",()=>seenN()>=50),T("chuvab","Dia de chuva","Chegue ao nível 15","linear-gradient(180deg,#4a5a6a,#9fb0c0),repeating-linear-gradient(100deg,transparent 0 10px,#fff3 10px 11px)",()=>lv()>=15),
 T("neonc","Cidade neon","Ganhe 🪙5 milhões","linear-gradient(135deg,#1a0033,#6a00ff 50%,#00e5ff)",()=>st("earned")>=5e6),T("carnavalb","Carnaval","Descubra uma vaca de Carnaval","linear-gradient(120deg,#ff4fa3,#ffd447,#4fd1ff,#7dff6b)",()=>hasEx("carnaval")),
 T("maesb","Dia das Mães","Descubra uma vaca do Dia das Mães","linear-gradient(135deg,#ffc4d9,#ff7ab8,#fff0f5)",()=>hasEx("maes")),T("criancasb","Dia das Crianças","Descubra uma vaca do Dia das Crianças","linear-gradient(135deg,#6ec6ff,#ffd447,#ff7a7a)",()=>hasEx("criancas")),
 T("halloweenb","Halloween","Descubra uma vaca de Halloween","linear-gradient(180deg,#1a0a2a,#6a1fb0 60%,#ff8a1f)",()=>hasEx("halloween")),T("pascoab","Páscoa","Descubra uma vaca de Páscoa","linear-gradient(135deg,#ffd0e8,#cfe8ff,#fff3a0)",()=>hasEx("pascoa")),
 T("viradab","Virada","Descubra uma vaca da Virada","radial-gradient(circle at 30% 30%,#ffd447 2px,transparent 3px) 0 0/40px 40px,linear-gradient(160deg,#0b1026,#3a1f7a)",()=>hasEx("virada")),
 T("alienb","Invasão","Descubra uma vaca alienígena","radial-gradient(circle at 70% 30%,#9dff6b55,transparent 40%),linear-gradient(160deg,#0b1026,#2b2d5c)",()=>hasEx("alien")),T("marb","Mar","Descubra uma vaca da Frente Marítima","linear-gradient(180deg,#9fe0ff,#1d6fa8 60%,#0b3d6a)",()=>hasEx("mar")),
 T("passcosmos","Cosmos do Passe","Passe Premium (nível 70)","conic-gradient(from 210deg at 50% 130%,#ff8fcf,#6fd8ff,#ffd45f,#b39bff,#ff8fcf)",()=>0)]);
add("nc",[T("mint","Menta","Grátis","#9fffd8",()=>1),T("coral","Coral","Grátis","#ff9a8a",()=>1),T("g_fire","Chamas","Renasça 5 vezes","linear-gradient(90deg,#ff3d00,#ffb300)",()=>state.rb>=5),T("g_ice","Gelo","Renasça 3 vezes","linear-gradient(90deg,#7ad7f0,#ffffff,#3a7bd5)",()=>state.rb>=3),
 T("g_toxic","Tóxico","Descubra uma vaca alienígena","linear-gradient(90deg,#9dff6b,#00c853)",()=>hasEx("alien")),T("g_royal","Real","Chegue ao nível 30","linear-gradient(90deg,#6a00ff,#ffd700)",()=>lv()>=30),T("g_candy","Algodão-doce","Descubra uma vaca de Páscoa","linear-gradient(90deg,#ff9fcb,#9fd8ff)",()=>hasEx("pascoa")),
 T("g_passgold","Ouro do Passe","Passe Premium (nível 80)","linear-gradient(90deg,#ffd700,#fff7b0,#ffb300,#fff7b0,#ffd700)",()=>0)]);
add("na",[T("wave","Ondinha","Chegue ao nível 5",()=>lv()>=5),T("sparkle","Faíscas","Descubra 100 pelagens",()=>seenN()>=100),T("shadow3d","Relevo 3D","Chegue ao nível 12",()=>lv()>=12),T("blinkgold","Pisca-ouro","Ganhe 🪙1 milhão",()=>st("earned")>=1e6)]);
add("ti",[T("Aprendiz de Fazendeiro","Aprendiz de Fazendeiro","Chegue ao nível 5",()=>lv()>=5),T("Peão Experiente","Peão Experiente","Chegue ao nível 10",()=>lv()>=10),T("Capataz","Capataz","Chegue ao nível 20",()=>lv()>=20),T("Veterano do Pasto","Veterano do Pasto","Chegue ao nível 25",()=>lv()>=25),
 T("Mestre Fazendeiro","Mestre Fazendeiro","Chegue ao nível 40",()=>lv()>=40),T("Lenda do Campo","Lenda do Campo","Chegue ao nível 50",()=>lv()>=50),T("Alquimista","Alquimista","Use 20 poções",()=>st("potions")>=20),T("Doutor Vaca","Doutor Vaca","Cure 50 vacas",()=>st("cures")>=50),
 T("Rei do Queijo","Rei do Queijo","Faça 200 laticínios",()=>st("dairyMade")>=200),T("Enciclopédia Viva","Enciclopédia Viva","Descubra 1.000 pelagens",()=>seenN()>=1000),T("Colecionador Lendário","Colecionador Lendário","Descubra 2.500 pelagens",()=>seenN()>=2500),
 T("Semideus","Semideus","Descubra uma vaca Eterna ou melhor",()=>hasR(10)),T("Bilionário do Leite","Bilionário do Leite","Ganhe 🪙1 bilhão",()=>st("earned")>=1e9),T("Popular","Popular","Tenha 5 amigos",()=>X().soc.friends.length>=5),T("Líder de Cooperativa","Líder de Cooperativa","Entre numa cooperativa",()=>!!X().soc.clan),
 T("Festeiro","Festeiro","Descubra vacas de 4 eventos",()=>["natal","halloween","pascoa","virada","junina","carnaval","maes","criancas","alien","vulcao","louca","geada","condensado","mar","terror","prehist"].filter(hasEx).length>=4),T("Caçador de Gigantes","Caçador de Gigantes","Ajude no chefe com 5.000 L",()=>X().boss.c>=5000),T("Lenda do Passe","Lenda do Passe","Passe Premium (nível 90)",()=>0)]);
COS.fx=[T("none","Sem efeito","",()=>1),T("confete","Confete","Grátis",()=>1),T("estrelas","Estrelas","Descubra 30 pelagens",()=>seenN()>=30),T("folhas","Folhas","Renasça 1 vez",()=>state.rb>=1),T("neve","Neve","Renasça 2 vezes",()=>state.rb>=2),
 T("coracoes","Corações","Descubra uma vaca do Dia das Mães",()=>hasEx("maes")),T("gotas","Gotas","Chegue ao nível 10",()=>lv()>=10),T("faiscas","Faíscas","Renasça 5 vezes",()=>state.rb>=5),T("leite","Chuva de leite","Produza 50 mil L",()=>st("milkL")>=5e4),
 T("fogo","Fogo","Renasça 10 vezes",()=>state.rb>=10),T("aurea","Áurea","Passe Premium (nível 40)",()=>0),T("cosmos","Cosmos","Descubra uma vaca Ultimate",()=>hasR(7))];
COS.st=[T("","Sem status","",()=>1),T("😄","😄","Grátis",()=>1),T("😎","😎","Grátis",()=>1),T("🥳","🥳","Grátis",()=>1),T("🐄","🐄","Grátis",()=>1),T("🌾","🌾","Chegue ao nível 4",()=>lv()>=4),T("🥛","🥛","Produza 1.000 L",()=>st("milkL")>=1000),T("🍀","🍀","Descubra 40 pelagens",()=>seenN()>=40),
 T("🔥","🔥","Chegue ao nível 15",()=>lv()>=15),T("💎","💎","Tenha 💎 50",()=>X().dia>=50),T("👑","👑","Renasça 5 vezes",()=>state.rb>=5),T("🌈","🌈","Tenha uma vaca Única",()=>hasR(6)),T("💪","💪","Chegue ao nível 30",()=>lv()>=30),T("⭐","⭐","Descubra 500 pelagens",()=>seenN()>=500)];
const FXE={confete:["🎊","🎉"],estrelas:["⭐","✨"],folhas:["🍃","🍂"],neve:["❄️","❄️"],coracoes:["💖","💕"],gotas:["💧","💦"],faiscas:["⚡","✨"],leite:["🥛","🥛"],fogo:["🔥","🔥"],aurea:["🌟","✨"],cosmos:["🪐","🌠"]};
const FRN={fr:"Moldura",ba:"Banner",nc:"Cor do nome",na:"Animação",ti:"Título",fx:"Efeito",st:"Status"};
const frames=[...COS.fr.map(x=>x[0])];

/* ===================== CARTÃO DE PERFIL ===================== */
function pname(name,p){const c=C.ncOf(p.nc),g=/gradient/.test(c),na=p.na&&p.na!=="none"?p.na:"x",sty=g?`background:${c};-webkit-background-clip:text;background-clip:text;color:transparent`:`color:${c}`;
  const inner=na==="wave"?[...name].map((ch,i)=>`<i style="animation-delay:${i*.07}s">${H(ch===" "?"\u00a0":ch)}</i>`).join(""):H(name);
  return `<span class="pnw"><span class="pname na-${na}" style="${sty}">${inner}</span>${p.st?` <span class="pst">${H(p.st)}</span>`:""}</span>`}
function fxLayer(fx){const e=FXE[fx];if(!e)return "";const n=VB.lite()?4:9;return `<div class="pfxl">${Array.from({length:n},(_,i)=>`<span style="--x:${(i*53+11)%92}%;--d:${3.2+(i%4)*.7}s;--l:${-i*.55}s;--s:${14+(i%3)*5}px">${e[i%2]}</span>`).join("")}</div>`}
function profCard(name,p,extra){const bd=(p.bd||[]).map(id=>(C.BADGES.find(b=>b[0]===id)||[0,""])[1]).join(" "),lvn=p.lv||1;
  return `<div class="pcardx"><div class="pban" style="background:${C.bgOf(p.ba)}">${fxLayer(p.fx)}</div><div class="pav">${VB.avatar(84,p)}<span class="plvb2">Nv ${lvn}</span></div><div class="pinfo"><div class="pnm">${pname(name,p)}</div>${p.ti?`<div class="ptit">« ${H(p.ti)} »</div>`:""}${bd?`<div class="pbd">${bd}</div>`:""}${p.bio?`<p class="pbio">${H(p.bio)}</p>`:""}
  <div class="pmini"><span>♻️ ${p.rb||0}</span><span>📚 ${p.seen||0}</span><span>🐄 ${p.cows||0}</span>${p.tro?`<span>🏆 ${p.tro}</span>`:""}${p.prem?`<span>👑 Premium</span>`:""}${p.clan?`<span>🤝 ${H(p.clan)}</span>`:""}</div>${extra||""}</div></div>`}
const pub=()=>C.pubProfile();
VB.pname=pname;VB.profCard2=profCard;

/* ===================== MODAL DO PERFIL ===================== */
const PT=[["vis","🎨 Visual"],["soc","🤝 Social"],["trd","🔁 Trocas"],["stat","📈 Estatísticas"],["acc","☁️ Conta"],["opt","⚙️ Config"]];
let ptab="vis",vcat="av",avR=-1,avN=48,view=null,psub="friends",msg="",inbox=[],inAt=0,invs=[],invAt=0,clanD=null,clanAt=0,clanTop=[],codeAt=0;
const modal=()=>$("#pf");
VB.act.pf=b=>{view=null;modal().classList.remove("hidden");if(b&&b.dataset&&b.dataset.t){ptab=b.dataset.t}renderPF()};
VB.act.pfx=()=>{modal().classList.add("hidden");render()};
VB.act.ptab=b=>{ptab=b.dataset.t;view=null;renderPF()};
VB.act.vcat=b=>{vcat=b.dataset.c;renderPF()};
VB.act.cset=b=>{const t=b.dataset.t,id=b.dataset.id;if(!C.owned(t,id))return toast("🔒 "+C.find(t,id)[2]);X().prof[t]=id;VB.sfx("pop");save();renderPF();render()};
VB.act.avset=b=>{X().prof.av=b.dataset.id;VB.sfx("pop");save();renderPF();render()};
VB.act.avr=b=>{avR=+b.dataset.r;avN=48;renderPF()};VB.act.avmore=()=>{avN+=48;renderPF()};
VB.act.bdt=b=>{const pf=X().prof,id=b.dataset.id,i=pf.bd.indexOf(id);if(i>=0)pf.bd.splice(i,1);else if(pf.bd.length<3)pf.bd.push(id);else toast("Máximo de 3 emblemas.");save();renderPF()};
VB.act.vrand=()=>{const pf=X().prof;for(const t of["fr","ba","nc","na","fx"]){const l=COS[t].filter(i=>C.owned(t,i[0])&&i[0]!=="none");if(l.length)pf[t]=l[Math.floor(Math.random()*l.length)][0]}
  const seen=state.seen.map(id=>CBY.get(id)).filter(Boolean);if(seen.length)pf.av=seen[Math.floor(Math.random()*seen.length)].id;VB.sfx("good");save();renderPF();render()};
VB.act.vreset=()=>{const pf=X().prof;Object.assign(pf,{fr:"wood",ba:"pasto",nc:"white",na:"none",ti:"",fx:"none",st:"",bd:[]});save();renderPF();render()};
VB.act.p2name=()=>{const v=($("#pfName").value||"").trim().slice(0,24);if(v.length<2)return toast("Digite pelo menos 2 letras.");state.farm=v;state.farmSet=true;save();pushScore();if(ACC)cloudPush();toast(`🏡 Nome alterado para ${v}`);renderPF();render()};
document.addEventListener("input",e=>{if(e.target.id==="pfBio"){X().prof.bio=e.target.value.replace(/[<>&"]/g,"").slice(0,70);save();const p=$("#pfPrev");if(p)p.innerHTML=profCard(state.farm,pub())}});
document.addEventListener("click",e=>{if(e.target.closest("#pf [data-a]"))setTimeout(()=>{if(!modal().classList.contains("hidden"))renderPF()},90)});
function optGrid(t,cur,fn){const l=COS[t],un=l.filter(i=>C.owned(t,i[0])).length;
  return `<p class="dsc sm">${un} de ${l.length} desbloqueados. Itens com 🔒 mostram como conseguir.</p><div class="cgrid">${l.map(i=>{const ok=C.owned(t,i[0]);return `<button class="copt ${cur===i[0]?"sel":""} ${ok?"":"lk"}" data-x="cset" data-t="${t}" data-id="${H(i[0])}">${fn(i)}<small>${H(i[1])}</small>${ok?"":`<em>🔒 ${H(i[2])}</em>`}</button>`}).join("")}</div>`}
const VC=[["av","📸","Foto"],["fr","🖼️","Moldura"],["ba","🏞️","Banner"],["nc","🎨","Cor do nome"],["na","✨","Animação"],["ti","🏷️","Título"],["st","😎","Status"],["fx","🎆","Efeito"],["bd","🏅","Emblemas"],["bio","💬","Bio"],["pet","🐾","Estimação"]];
function visBody(){const pf=X().prof;
  if(vcat==="av"){const seen=state.seen.map(id=>CBY.get(id)).filter(Boolean),all=seen.filter(c=>avR<0||c.r===avR),list=all.slice(0,avN),rars=[-1,...Array.from({length:14},(_,i)=>i)].filter(r=>r<0||seen.some(c=>c.r===r));
    return `<p class="dsc sm">Use qualquer vaca que você já descobriu no Compêndio como foto.</p><div class="tabs">${rars.map(r=>`<button class="secondary ${avR===r?"on":""}" data-x="avr" data-r="${r}">${r<0?"Todas":RN[r]}</button>`).join("")}</div>
    <div class="avgrid">${list.map(c=>`<button class="avopt ${pf.av===c.id?"sel":""}" data-x="avset" data-id="${c.id}" title="${H(c.name)}">${VB.avatar(56,{av:c.id,fr:"none"})}</button>`).join("")||`<div class="empty">Descubra vacas para usá-las como foto.</div>`}</div>${list.length<all.length?`<button class="secondary" data-x="avmore">Mostrar mais (${all.length-list.length})</button>`:""}`}
  if(vcat==="fr")return optGrid("fr",pf.fr,i=>`<div class="frprev">${VB.avatar(50,{av:pf.av,fr:i[0]})}</div>`);
  if(vcat==="ba")return optGrid("ba",pf.ba,i=>`<div class="baprev" style="background:${i[3]}"></div>`);
  if(vcat==="nc")return optGrid("nc",pf.nc,i=>`<div class="ncprev">${pname("Aa Bb",{nc:i[0],na:"none"})}</div>`);
  if(vcat==="na")return optGrid("na",pf.na,i=>`<div class="ncprev">${pname("Nome",{nc:pf.nc,na:i[0]})}</div>`);
  if(vcat==="ti")return optGrid("ti",pf.ti,i=>`<div class="tiprev">${i[0]?"« "+H(i[1])+" »":"—"}</div>`);
  if(vcat==="st")return optGrid("st",pf.st,i=>`<div class="stprev">${i[0]||"—"}</div>`);
  if(vcat==="fx")return optGrid("fx",pf.fx,i=>`<div class="fxprev">${(FXE[i[0]]||["—"])[0]}</div>`);
  if(vcat==="bd")return `<p class="dsc sm">Escolha até 3 emblemas para mostrar no seu perfil.</p><div class="cgrid">${C.BADGES.map(b=>{const ok=b[3]();return `<button class="copt ${pf.bd.includes(b[0])?"sel":""} ${ok?"":"lk"}" ${ok?`data-x="bdt" data-id="${b[0]}"`:"disabled"}><div class="bde">${b[1]}</div><small>${b[2]}</small></button>`}).join("")}</div>`;
  if(vcat==="bio")return `<p class="dsc sm">Escreva algo curto sobre a sua fazenda (até 70 letras).</p><input id="pfBio" class="codein" maxlength="70" placeholder="Ex.: Melhor leite da região! 🥛" value="${H(pf.bio)}">`;
  const pet=VB.petCow();return `<p class="dsc">A vaca de estimação dá <b>+5% de leite</b> e aparece na sua fazenda e no perfil.</p><p class="dsc">Atual: <b>${pet?H(cname(pet)):"nenhuma"}</b></p><div class="avgrid">${[...state.cows].sort((a,b)=>type(b).r-type(a).r).slice(0,60).map(c=>`<button class="avopt ${pf.pet===c.u?"sel":""}" data-x="pet" data-u="${c.u}" title="${H(cname(c))}">${VB.avatar(56,{av:c.t,fr:"none"})}</button>`).join("")||`<div class="empty">Você ainda não tem vacas.</div>`}</div>`}
function headHTML(){const l=VB.lvl();return `<div id="pfPrev">${profCard(state.farm,pub())}</div>
  <div class="lvbar"><b>Nível ${l.l}</b><div class="bar lv"><i style="width:${l.cur/l.need*100}%"></i></div><small>${fmt(l.cur)} / ${fmt(l.need)} XP${VB.buffOn&&VB.buffOn("xp")?" · 🧪 XP em dobro!":""}</small></div>
  <div class="row nm"><input id="pfName" class="codein" maxlength="24" value="${H(state.farm)}" placeholder="Nome da fazenda"><button class="primary" data-x="p2name">✏️ Trocar nome</button></div>`}
function meHTML(){return headHTML()+`<div class="vtools"><button class="secondary" data-x="vrand">🎲 Surpreenda-me</button><button class="secondary" data-x="vreset">↩️ Restaurar padrão</button></div>
  <div class="vcats">${VC.map(([k,e,n])=>`<button class="vcat ${vcat===k?"on":""}" data-x="vcat" data-c="${k}"><span>${e}</span><b>${n}</b></button>`).join("")}</div><div class="vbody">${visBody()}</div>`}

/* ---------- Social ---------- */
const bots=C.bots;
async function myCode(){if(!ONLINE)return;const s=X().soc;if(s.code&&now()-codeAt<600000)return;codeAt=now();const r=await apiRaw("/api/friend/code?pid="+state.pid);if(r.ok&&r.j.code){s.code=r.j.code;save()}}
async function getProfile(pid){if(pid.startsWith("bot"))return C.getProfile(pid);if(!ONLINE)return null;const r=await apiRaw("/api/profile/get?pid="+state.pid+"&target="+encodeURIComponent(pid));return r.ok&&r.j.p?{name:r.j.name,p:r.j.p}:null}
VB.act.psub=b=>{psub=b.dataset.t;msg="";renderPF()};
VB.act.fadd=async()=>{const v=($("#fCode").value||"").replace(/\D/g,"");if(v.length!==6){msg="Digite os 6 números do código do amigo.";return renderPF()}const s=X().soc;
  if(!ONLINE){msg="Amigos reais precisam do servidor online.";return renderPF()}if(v===s.code){msg="Esse é o seu próprio código 😄";return renderPF()}
  const r=await apiRaw("/api/friend/find?pid="+state.pid+"&code="+v);if(!r.ok){msg="Código não encontrado.";return renderPF()}
  if(s.friends.some(f=>f.pid===r.j.pid)){msg="Esse amigo já está na sua lista.";return renderPF()}s.friends.push({pid:r.j.pid,name:r.j.name});msg="✅ "+r.j.name+" foi adicionado!";VB.sfx("good");save();renderPF()};
VB.act.frem=b=>{const s=X().soc;s.friends=s.friends.filter(f=>f.pid!==b.dataset.pid);save();renderPF()};
VB.act.fvisit=async b=>{const r=await getProfile(b.dataset.pid);if(!r)return toast("Não foi possível abrir essa fazenda agora.");view={pid:b.dataset.pid,name:r.name,p:r.p};renderPF()};
VB.act.vback=()=>{view=null;renderPF()};
VB.act.fadd2=b=>{const s=X().soc;if(!s.friends.some(f=>f.pid===b.dataset.pid)){s.friends.push({pid:b.dataset.pid,name:b.dataset.n});toast("✅ Amigo adicionado!");save();renderPF()}};
VB.act.copycode=b=>{try{navigator.clipboard.writeText(b.dataset.v);toast("📋 Código copiado!")}catch(e){toast("Selecione e copie o código.")}};
VB.act.fgift=async b=>{const pid=b.dataset.pid,s=X().soc,day=VB.dayKey(),g=s.gifts;if(g.d!==day){g.d=day;g.n=0;g.to=[]}
  if(g.n>=3)return toast("Você já enviou 3 presentes hoje.");if(g.to.includes(pid))return toast("Já enviou presente a essa fazenda hoje.");
  if(pid.startsWith("bot")){g.n++;g.to.push(pid);toast("🎁 Presente enviado! O vizinho agradeceu.");save();return renderPF()}
  const r=await apiRaw("/api/gift/send",{pid:state.pid,name:state.farm,to:pid,k:"coin"});if(r.ok){g.n++;g.to.push(pid);toast("🎁 Presente enviado!")}else toast(r.status===429?"Limite de presentes atingido.":"Não foi possível enviar.");save();renderPF()};
async function loadInbox(){inAt=now();if(ONLINE){const r=await apiRaw("/api/gift/inbox?pid="+state.pid);inbox=r.ok?r.j.gifts||[]:[]}else{const g=X().soc.gifts;inbox=g.botd===VB.dayKey()?[]:[{id:"bot",fn:"Casa 🤖",k:"coin"}]}}
VB.act.gclaim=async b=>{const id=b.dataset.id,gi=inbox.find(x=>String(x.id)===id);if(!gi)return;if(id==="bot")X().soc.gifts.botd=VB.dayKey();else{const r=await apiRaw("/api/gift/claim",{pid:state.pid,id:gi.id});if(!r.ok)return toast("Presente indisponível.")}
  if(gi.k==="tix"){X().tix.verde=(X().tix.verde||0)+1;toast("🎟️ Caixa Verde recebida!")}else{const c=RR(Math.min(4,Math.max(1,Math.sqrt(st("earned")/50000)))*50);earn(c);toast(`🪙 +${fmt(c)} de ${gi.fn}!`)}VB.sfx("claim");save();await loadInbox();renderPF();render()};
/* cooperativas */
const CLANS0=[["Vale Verde","🌿"],["Leite & Mel","🍯"],["Os Ordenhadores","🥛"],["Pasto Real","👑"]];
async function loadClan(){clanAt=now();const s=X().soc;
  if(ONLINE){const r=await apiRaw("/api/clan/me?pid="+state.pid);clanD=r.ok?r.j.clan:null;const t=await apiRaw("/api/clan/top");clanTop=t.ok?t.j.top||[]:[];s.clan=clanD?{id:clanD.id,name:clanD.name,emoji:clanD.emoji,code:clanD.code}:null;
    const iv=await apiRaw("/api/clan/invites?pid="+state.pid);invs=iv.ok?iv.j.invites||[]:[]}
  else{const w=weekIdx();clanTop=CLANS0.map(([n,e],i)=>({id:"c"+i,name:n,emoji:e,members:6+i*3,total:RR((40000+rnd(w*3+i)*60000)*(i+1)*Math.sqrt(1+st("earned")/1e5))}));
    if(s.clan){const c=clanTop.find(x=>x.id===s.clan.id)||{id:s.clan.id,name:s.clan.name,emoji:s.clan.emoji,members:1,total:0};if(!clanTop.includes(c)){clanTop.push(c)}c.total+=weekly();c.members+=s.clan.local?0:1;clanD={...c,owner:s.clan.local?1:0,code:s.clan.code||"",list:[{n:state.farm,s:weekly()}]}}else clanD=null;clanTop.sort((a,b)=>b.total-a.total)}}
const afterClan=async()=>{await loadClan();renderPF();render()};
VB.act.cjoin=async b=>{const s=X().soc;if(ONLINE){const r=await apiRaw("/api/clan/join",{pid:state.pid,name:state.farm,id:b.dataset.id});if(!r.ok)return toast(r.j&&r.j.error==="cheia"?"Cooperativa cheia (30 membros).":"Não foi possível entrar.")}
  else{const c=clanTop.find(x=>x.id===b.dataset.id);s.clan={id:c.id,name:c.name,emoji:c.emoji}}toast("🤝 Você entrou na cooperativa! +3% de leite.");VB.sfx("good");save();afterClan()};
VB.act.cjoinc=async()=>{const v=($("#cCode").value||"").replace(/\D/g,"");if(v.length!==6){msg="Digite os 6 números do código da cooperativa.";return renderPF()}
  if(!ONLINE){msg="Entrar por código exige o servidor online.";return renderPF()}const f=await apiRaw("/api/clan/find?pid="+state.pid+"&code="+v);if(!f.ok){msg="Cooperativa não encontrada.";return renderPF()}
  const r=await apiRaw("/api/clan/join",{pid:state.pid,name:state.farm,id:f.j.clan.id});if(!r.ok){msg=r.j&&r.j.error==="cheia"?"Cooperativa cheia.":"Não foi possível entrar.";return renderPF()}msg="";toast("🤝 Você entrou em "+f.j.clan.name+"!");save();afterClan()};
VB.act.cleave=async()=>{if(!confirm("Sair da cooperativa?"))return;if(ONLINE)await apiRaw("/api/clan/leave",{pid:state.pid});X().soc.clan=null;save();afterClan()};
let cEmoji="🐄";VB.act.cemo=b=>{cEmoji=b.dataset.e;renderPF()};
VB.act.ccreate=async()=>{const n=($("#cName").value||"").replace(/[<>&"]/g,"").trim().slice(0,16);if(n.length<3)return toast("Nome com 3 a 16 letras.");
  if(!ONLINE){X().soc.clan={id:"L"+uid(),name:n,emoji:cEmoji,local:1,code:""};toast("🤝 Cooperativa criada (modo offline: só você).");save();return afterClan()}
  const r=await apiRaw("/api/clan/create",{pid:state.pid,name:state.farm,cn:n,emoji:cEmoji});if(!r.ok)return toast(r.j.error==="existe"?"Esse nome já existe.":r.j.error==="tem"?"Você já está em uma cooperativa.":"Não foi possível criar.");VB.sfx("good");confetti();afterClan()};
VB.act.cinv=async b=>{const r=await apiRaw("/api/clan/invite",{pid:state.pid,name:state.farm,to:b.dataset.pid});toast(r.ok?"📨 Convite enviado!":"Não foi possível convidar.")};
VB.act.cacc=async b=>{const r=await apiRaw("/api/clan/join",{pid:state.pid,name:state.farm,id:b.dataset.cid});if(!r.ok)return toast("Não foi possível entrar.");toast("🤝 Você entrou na cooperativa!");VB.sfx("good");save();afterClan()};
VB.act.cdec=async b=>{await apiRaw("/api/clan/decline",{pid:state.pid,id:b.dataset.id});await loadClan();renderPF()};
function clanHTML(){if(now()-clanAt>15000)loadClan().then(()=>{if(modal().classList.contains("hidden")===false&&ptab==="soc"&&psub==="clan"&&!view)renderPF()});const c=clanD,s=X().soc;
  const invH=invs.length?`<div class="panel"><h3>📨 Convites (${invs.length})</h3>${invs.map(i=>`<div class="fuse"><span>${H(i.ce)} <b>${H(i.cn)}</b><br><small>convite de ${H(i.fn)}</small></span><span class="row"><button class="primary" data-x="cacc" data-cid="${i.cid}">Aceitar</button><button class="secondary" data-x="cdec" data-id="${i.id}">Recusar</button></span></div>`).join("")}</div>`:"";
  if(c)return invH+`<div class="panel"><h3>${H(c.emoji)} ${H(c.name)}</h3><p class="dsc">👥 ${c.members} membros · 🪙 ${fmt(c.total)} ganhos na semana · benefício: <b>+3% de leite</b></p>
   ${c.code?`<p class="dsc">Código para entrar: <code class="mycode">${c.code}</code> <button class="secondary" data-x="copycode" data-v="${c.code}">📋 Copiar</button></p>`:""}
   ${(c.list||[]).map((m,i)=>`<div class="fuse"><span>${i+1}. ${H(m.n)}</span><b>🪙 ${fmt(m.s)}</b></div>`).join("")}<button class="secondary" data-x="cleave">Sair da cooperativa</button></div>
   ${ONLINE&&s.friends.length?`<div class="panel"><h3>📨 Convidar amigos</h3>${s.friends.map(f=>`<div class="fuse"><span>${H(f.name)}</span><button class="primary" data-x="cinv" data-pid="${H(f.pid)}">Convidar</button></div>`).join("")}</div>`:""}`+topClans(false);
  return invH+`<div class="panel"><h3>🤝 Criar a minha cooperativa</h3><p class="dsc">Crie um grupo, convide amigos e dividam o ranking da semana. Todos ganham <b>+3% de leite</b>.</p>
   <div class="emos">${["🐄","🌿","🍯","🥛","👑","🔥","⭐","🌈","🧀","🚜"].map(e=>`<button class="${cEmoji===e?"primary":"secondary"}" data-x="cemo" data-e="${e}">${e}</button>`).join("")}</div>
   <div class="row"><input id="cName" class="codein" maxlength="16" placeholder="Nome da cooperativa"><button class="primary" data-x="ccreate">Criar</button></div></div>
   <div class="panel"><h3>🔢 Entrar com código</h3><div class="row"><input id="cCode" class="codein" inputmode="numeric" maxlength="6" placeholder="6 números"><button class="primary" data-x="cjoinc">Entrar</button></div><p class="dsc sm" style="color:#ffd76a">${H(msg)}</p></div>`+topClans(true)}
const topClans=j=>`<div class="panel"><h3>🏆 Ranking de cooperativas</h3>${clanTop.map((c,i)=>`<div class="fuse"><span>${MEDAL[i]||i+1+"."} ${H(c.emoji)} <b>${H(c.name)}</b> · 👥 ${c.members}</span><span>🪙 ${fmt(c.total)} ${j?`<button class="primary" data-x="cjoin" data-id="${H(c.id)}">Entrar</button>`:""}</span></div>`).join("")||`<div class="empty">Carregando…</div>`}</div>`;
function socHTML(){const s=X().soc,tabs=[["friends","👥 Amigos"],["clan","🤝 Cooperativa"+(invs.length?` <span class="dot">${invs.length}</span>`:"")]];
  const head=`<div class="tabs">${tabs.map(([k,l])=>`<button class="secondary ${psub===k?"on":""}" data-x="psub" data-t="${k}">${l}</button>`).join("")}</div>`;
  if(view)return `<button class="secondary" data-x="vback">← Voltar</button>`+profCard(view.name,view.p)+`<div class="panel"><h3>🐄 Vitrine</h3><div class="vitr">${(view.p.top||[]).map(t=>{const c=CBY.get(t.t);return c?`<div class="vc ${t.sh?"shiny":""}"><div class="cow-art">${cowSVG(c)}</div><span class="badge ${RC[c.r]}">${RN[c.r]}</span><small>${H(c.name)}${t.sh?" ✨":""}</small></div>`:""}).join("")}</div>
   ${view.p.pet?`<p class="dsc">🐾 Estimação: ${H((CBY.get(view.p.pet.t)||{name:"?"}).name)}</p>`:""}<p class="dsc">🪙 ${fmt(view.p.earned||0)} ganhos no total</p>
   <button class="primary" data-x="fgift" data-pid="${H(view.pid)}">🎁 Enviar presente</button> ${s.friends.some(f=>f.pid===view.pid)||view.pid.startsWith("bot")?"":`<button class="secondary" data-x="fadd2" data-pid="${H(view.pid)}" data-n="${H(view.name)}">➕ Adicionar amigo</button>`}</div>`;
  if(psub==="friends"){myCode();if(now()-inAt>30000)loadInbox().then(()=>{if(ptab==="soc"&&psub==="friends"&&!view&&!modal().classList.contains("hidden"))renderPF()});
    const code=s.code||"";
    return head+`<div class="panel"><h3>🆔 Meu código de amigo</h3>${ONLINE?(code?`<div class="codebox">${code.slice(0,3)} ${code.slice(3)}</div><button class="secondary" data-x="copycode" data-v="${code}">📋 Copiar código</button>`:`<p class="dsc">Gerando código…</p>`):`<p class="dsc">Conecte ao servidor online para ter um código de amigo.</p>`}
    <h3 style="margin-top:14px">➕ Adicionar amigo</h3><div class="row"><input id="fCode" class="codein" inputmode="numeric" maxlength="7" placeholder="Código de 6 números"><button class="primary" data-x="fadd">Adicionar</button></div><p class="dsc sm" style="color:#ffd76a">${H(msg)}</p></div>
    ${inbox.length?`<div class="panel"><h3>🎁 Presentes recebidos</h3>${inbox.map(g=>`<div class="fuse"><span>${H(g.fn)} enviou ${g.k==="tix"?"🎟️ uma caixa":"🪙 moedas"}</span><button class="primary" data-x="gclaim" data-id="${g.id}">Receber</button></div>`).join("")}</div>`:""}
    <div class="panel"><h3>👥 ${ONLINE?"Meus amigos":"Vizinhos"}</h3>${[...s.friends,...(ONLINE?[]:bots().map(b=>({pid:b.pid,name:b.name})))].map(f=>`<div class="fuse"><span>${H(f.name)}</span><span class="row"><button class="secondary" data-x="fvisit" data-pid="${H(f.pid)}">👀 Visitar</button><button class="secondary" data-x="fgift" data-pid="${H(f.pid)}">🎁</button>${f.pid.startsWith("bot")?"":`<button class="secondary" data-x="frem" data-pid="${H(f.pid)}">✕</button>`}</span></div>`).join("")||`<div class="empty">Nenhum amigo ainda. Troque códigos para começar!</div>`}</div>`}
  return head+clanHTML()}

/* ---------- Trocas dentro do perfil ---------- */
function tradeHTML(){const sv=moreTab;moreTab="tro";try{VB.v11rm()}catch(e){console.error(e)}moreTab=sv;const root=$("#more"),tabs=root&&root.querySelector(".tabs");let html="";
  if(tabs)for(let n=tabs.nextSibling;n;n=n.nextSibling)html+=n.outerHTML||"";if(root)root.innerHTML="";return `<div class="tradep">${html}</div>`}

/* ---------- Config ---------- */
function optHTML(){const o=X().opts,lt=VB.lite(),np="Notification"in window?Notification.permission:"unsupported";
  return `<div class="panel"><h3>🔊 Som</h3><button class="${o.snd?"primary":"secondary"}" data-x="opt" data-k="snd">${o.snd?"Ligado":"Desligado"}</button></div>
  <div class="panel"><h3>🌗 Tema</h3><button class="${o.theme==="dark"?"primary":"secondary"}" data-x="opt" data-k="theme" data-v="dark">🌙 Escuro</button> <button class="${o.theme==="light"?"primary":"secondary"}" data-x="opt" data-k="theme" data-v="light">☀️ Claro</button></div>
  <div class="panel"><h3>🔠 Tamanho da interface</h3>${[[.9,"Pequeno"],[1,"Normal"],[1.12,"Grande"],[1.25,"Enorme"]].map(([v,l])=>`<button class="${o.fs===v?"primary":"secondary"}" data-x="opt" data-k="fs" data-v="${v}">${l}</button>`).join(" ")}</div>
  <div class="panel"><h3>⚡ Modo desempenho</h3><p class="dsc">Reduz animações e efeitos para o jogo rodar mais leve no celular. Agora: <b>${lt?"ligado":"desligado"}</b>.</p>${[[-1,"Automático"],[1,"Ligado"],[0,"Desligado"]].map(([v,l])=>`<button class="${o.lite===v?"primary":"secondary"}" data-x="lite" data-v="${v}">${l}</button>`).join(" ")}</div>
  <div class="panel"><h3>🔔 Avisos importantes</h3><p class="dsc">Avisamos só do que importa: bônus diário, eventos novos, prêmios prontos e ranking. ${np==="denied"?"<b>O navegador bloqueou as notificações. Libere nas configurações do site.</b>":""}</p><button class="${o.notif?"primary":"secondary"}" data-x="notif">${o.notif?"✅ Ligados":"Ligar avisos"}</button></div>`}
function renderPF(){const el=$("#pfBody");if(!el)return;
  const body=ptab==="vis"?meHTML():ptab==="soc"?socHTML():ptab==="trd"?tradeHTML():ptab==="stat"?C.statHTML():ptab==="acc"?perfHTML():optHTML();
  const card=el.closest(".modal-card"),sc=card?card.scrollTop:0,op=[...el.querySelectorAll("details")].map(d=>d.open),key=ptab+(view?"v":"");
  el.innerHTML=`<div class="pftabs tabs">${PT.map(([k,l])=>`<button class="secondary ${ptab===k?"on":""}" data-x="ptab" data-t="${k}">${l}</button>`).join("")}</div>${body}`;
  if(renderPF.k===key)el.querySelectorAll("details").forEach((d,i)=>{if(op[i]!=null)d.open=op[i]});renderPF.k=key;if(card)card.scrollTop=sc}
VB.renderPF2=renderPF;VB.renderPF=renderPF;

/* ===================== EXPOSIÇÃO ===================== */
const cowScore=C.cowScore,rivals=C.rivals;
async function showBoard(w,mine){if(ONLINE){const r=await apiRaw("/api/show/top?pid="+state.pid+"&w="+w);if(r.ok)return{top:r.j.top||[],rank:r.j.rank||0}}
  const all=[...rivals(w),...(mine!=null?[{n:state.farm,s:mine,me:1}]:[])].sort((a,b)=>b.s-a.s);return{top:all.slice(0,10).map((x,i)=>({...x,rank:i+1})),rank:mine!=null?all.findIndex(x=>x.me)+1:0}}
let sb={top:[],rank:0},shSel=0,shAt="";
async function loadShow(){const sh=X().show,w=weekIdx();sb=await showBoard(w,sh.w===w?sh.sc:null);if(page==="more")render()}
VB.act.shsel=b=>{shSel=+b.dataset.u;render()};
VB.act.shsub=async()=>{const x=X(),sh=x.show,w=weekIdx(),c=cowBy(shSel);if(!c||sh.w===w)return toast("Escolha uma vaca primeiro.");const sc=cowScore(c);
  x.show={...sh,w,sc,cow:{t:c.t,sh:c.sh?1:0},done:(sh.done||0)+1};if(ONLINE)await apiRaw("/api/show/submit",{pid:state.pid,name:state.farm,score:sc,cow:x.show.cow});VB.sfx("good");toast(`🏅 ${cname(c)} entrou na exposição com ${fmt(sc)} pontos!`);save();await loadShow();render()};
VB.act.shclaim=async()=>{const x=X(),sh=x.show,pw=weekIdx()-1;if(sh.w!==pw||sh.claimed===pw)return;const bd=await showBoard(pw,sh.sc),rk=bd.rank||99;
  const coin=RR(Math.max(1,Math.sqrt(st("earned")/5000))*(rk===1?4000:rk<=3?2500:rk<=10?1200:500)),dia=rk===1?3:rk===2?2:rk===3?1:0;earn(coin);if(dia)VB.addDia(dia,true);sh.claimed=pw;toast(`🏆 Exposição: ${rk}º lugar! +🪙${fmt(coin)}${dia?" · 💎 "+dia:""}`);if(rk<=3)confetti();VB.sfx("claim");save();render()};
VB.moreBody.x_show=()=>{const x=X(),sh=x.show,w=weekIdx(),pw=w-1,end=WEEK0+(w+1)*WEEK_MS,free=[...state.cows.filter(c=>!c.sick)].sort((a,b)=>cowScore(b)-cowScore(a)),can=sh.w!==w,claim=sh.w===pw&&sh.claimed!==pw;
  const key=w+"|"+Math.floor(now()/20000);if(shAt!==key){shAt=key;loadShow()}if(!shSel||!cowBy(shSel))shSel=free[0]?free[0].u:0;
  const mine=sh.w===w&&sh.cow?CBY.get(sh.cow.t):null;
  return `<div class="exh"><h2>🏅 Exposição de Gado</h2><div class="xtime">⏳ Termina em <b data-xt="${end}">${clockD(end-now())}</b></div></div>
  <div class="steps"><div><b>1</b><span>Escolha a sua melhor vaca</span></div><div><b>2</b><span>Inscreva ela na semana</span></div><div><b>3</b><span>Resgate o prêmio na virada</span></div></div>
  ${claim?`<div class="exwin"><b>🏆 Você tem um prêmio da semana passada!</b><button class="primary big" data-x="shclaim">Resgatar prêmio</button></div>`:""}
  ${can?(free.length?`<h3 class="exh3">Escolha sua vaca</h3><div class="pickgrid ex">${free.slice(0,24).map(c=>`<button class="pickcard ${shSel===c.u?"sel":""}" data-x="shsel" data-u="${c.u}"><div class="cow-art">${cowSVG(type(c))}</div><b>${H(cname(c))}</b><span class="badge ${RC[type(c).r]}">${RN[type(c).r]}</span><small>${fmt(cowScore(c))} pontos</small></button>`).join("")}</div><button class="primary big" data-x="shsub">🏅 Inscrever na exposição</button>`:`<div class="empty">Você não tem vacas saudáveis.</div>`):
   `<div class="exmine"><div class="cow-art">${mine?cowSVG(mine):""}</div><div><b>${mine?H(mine.name):"?"}</b><br>Inscrita com <b>${fmt(sh.sc)}</b> pontos${sb.rank?`<br>Posição agora: <b>${sb.rank}º</b>`:""}</div></div>`}
  <h3 class="exh3">📊 Classificação da semana</h3><div class="rklist">${sb.top.map(t=>`<div class="rkr ${t.me?"me":""}"><span>${MEDAL[t.rank-1]||t.rank+"º"}</span><b>${H(t.n)}</b><em>${fmt(t.s)}</em></div>`).join("")||`<div class="empty">Carregando…</div>`}</div>
  <h3 class="exh3">🎁 Prêmios</h3><div class="prz"><div>🥇 1º<br><b>💎 3</b></div><div>🥈 2º<br><b>💎 2</b></div><div>🥉 3º<br><b>💎 1</b></div><div>Top 10<br><b>🪙 moedas</b></div></div>
  <p class="dsc">A nota vale pela raridade, litros de leite, brilho ✨ e traço da vaca.</p>`};
VB.tickers.push(()=>{document.querySelectorAll("[data-xt]").forEach(e=>{e.textContent=clockD(+e.dataset.xt-now())})});

/* ===================== CHEFE GLOBAL ===================== */
const BT=[[25,"🪙","Moedas",s=>({coin:RR(s*2)})],[50,"🎟️","Caixa do Celeiro",s=>({tix:"celeiro"})],[75,"🧪","Poção do Leite + moedas",s=>({coin:RR(s*6),pot:"leite"})],[100,"💎","💎 3 + Caixa Prateada",s=>({dia:3,tix:"prata"})]];
let bossD=null,bossAt=0,bossSend=0;
function bossRoll(){const b=X().boss,w=weekIdx();if(b.w!==w){b.w=w;b.c=0;b.sent=0;b.cl={}}if(!b.cl)b.cl={};return b}
async function loadBoss(){bossAt=now();const b=bossRoll(),w=weekIdx();
  if(ONLINE){if(b.c>b.sent){const d=b.c-b.sent,r=await apiRaw("/api/boss/add",{pid:state.pid,w,l:d});if(r.ok)b.sent=b.c}const r=await apiRaw("/api/boss?pid="+state.pid);if(r.ok)bossD=r.j}
  else{const goal=2e6,fr=clamp((now()-(WEEK0+w*WEEK_MS))/WEEK_MS,0,1);bossD={total:RR(goal*(fr*.9+.04*rnd(w))+b.c),goal,players:37,mine:b.c,rank:0,top:[]}}
  if(page==="more"&&X()&&document.querySelector("[data-boss]"))render()}
VB.tickers.push(()=>{if(ONLINE&&now()-bossSend>30000){bossSend=now();const b=bossRoll();if(b.c>b.sent)loadBoss()}});
VB.act.bclaim=b=>{const x=bossRoll(),pct=+b.dataset.p,t=BT.find(a=>a[0]===pct),sc=Math.max(1,Math.sqrt(st("earned")/5000))*500;if(x.cl[pct])return;const r=t[3](sc);
  if(r.coin)earn(r.coin);if(r.dia)VB.addDia(r.dia,true);if(r.tix)X().tix[r.tix]=(X().tix[r.tix]||0)+1;if(r.pot)X().pot[r.pot]=(X().pot[r.pot]||0)+1;x.cl[pct]=1;VB.sfx("claim");toast("🌍 Recompensa do chefe resgatada!");save();render()};
VB.moreBody.x_boss=()=>{if(now()-bossAt>15000)loadBoss();const x=bossRoll(),d=bossD,end=WEEK0+(weekIdx()+1)*WEEK_MS;
  if(!d)return `<div class="empty" data-boss>Carregando o chefe…</div>`;const pct=clamp(d.total/d.goal*100,0,100),ok=x.c>=500;
  return `<div class="bossx" data-boss>
  <div class="exh"><h2>🌍 Chefe Global</h2><div class="xtime">⏳ Termina em <b data-xt="${end}">${clockD(end-now())}</b></div></div>
  <p class="dsc">Todos os jogadores produzem leite juntos para encher a barriga da vaca gigante. Quanto mais leite, mais prêmios!</p>
  <div class="bossbar big"><i style="width:${pct}%"></i><span>${fmt(d.total)} / ${fmt(d.goal)} L · ${pct.toFixed(1)}%</span>${BT.map(t=>`<u style="left:${t[0]}%"></u>`).join("")}</div>
  <div class="bstat"><div><b>${fmt(x.c)} L</b><span>Sua contribuição</span></div><div><b>${d.rank?d.rank+"º":"—"}</b><span>Sua posição</span></div><div><b>${d.players}</b><span>Jogadores</span></div></div>
  ${ok?"":`<p class="dsc warn">Produza pelo menos <b>500 L</b> para poder resgatar os prêmios (faltam ${fmt(500-x.c)} L).</p>`}
  <h3 class="exh3">🎁 Prêmios</h3>${BT.map(([p,e,n])=>{const can=pct>=p&&ok,got=x.cl[p];return `<div class="brw ${got?"got":can?"rdy":""}"><span class="bi">${e}</span><div><b>${p}% da meta</b><br><span>${n}</span></div>${got?"<b>✅</b>":`<button class="${can?"primary":"secondary"}" data-x="bclaim" data-p="${p}" ${can?"":"disabled"}>Resgatar</button>`}</div>`}).join("")}
  ${(d.top||[]).length?`<h3 class="exh3">🏅 Maiores contribuintes</h3><div class="rklist">${d.top.map(t=>`<div class="rkr ${t.me?"me":""}"><span>${MEDAL[t.rank-1]||t.rank+"º"}</span><b>${H(t.n)}</b><em>${fmt(t.l)} L</em></div>`).join("")}</div>`:""}</div>`};

/* ===================== RANKING + TROFÉUS ===================== */
const _pushScore=pushScore;
pushScore=async function(){if(!ONLINE)return;if(state.wk.w!==weekIdx()){state.wk={w:weekIdx(),base:st("earned")};save()}lastPush=now();
  try{await api("/api/score",{pid:state.pid,name:state.farm,score:Math.round(weekly()),week:state.wk.w})}catch(e){}};
const THEMES=[["Estrelas","#fff3a0","star"],["Neve","#bfeaff","snow"],["Flores","#ff9fcb","flower"],["Chamas","#ff8a3d","flame"],["Arco-íris","#c3a3ff","rainbow"],["Trevos","#7dffb8","clover"],["Lua","#e8e0ff","moon"],["Fogos","#ffd45f","fire"]];
function themeDeco(k,col,w){const o=(f,x,y,s)=>f(x,y,s);const sp=(x,y,s,c)=>`<path d="M${x} ${y-s}L${x+s*.3} ${y-s*.3}L${x+s} ${y}L${x+s*.3} ${y+s*.3}L${x} ${y+s}L${x-s*.3} ${y+s*.3}L${x-s} ${y}L${x-s*.3} ${y-s*.3}Z" fill="${c}"/>`;
  const P=[[34,44,10],[168,36,8],[24,150,7],[178,156,9],[100,14,7]];
  if(k==="star")return P.map(([x,y,s])=>sp(x,y,s,col)).join("");
  if(k==="snow")return P.map(([x,y,s])=>`<g stroke="${col}" stroke-width="2" stroke-linecap="round"><path d="M${x-s} ${y}H${x+s}M${x} ${y-s}V${y+s}M${x-s*.7} ${y-s*.7}L${x+s*.7} ${y+s*.7}M${x+s*.7} ${y-s*.7}L${x-s*.7} ${y+s*.7}"/></g>`).join("");
  if(k==="flower")return P.map(([x,y,s],i)=>[0,72,144,216,288].map(a=>`<ellipse cx="${x}" cy="${y-s*.55}" rx="${s*.35}" ry="${s*.55}" fill="${col}" transform="rotate(${a} ${x} ${y})"/>`).join("")+`<circle cx="${x}" cy="${y}" r="${s*.3}" fill="#ffd447"/>`).join("");
  if(k==="flame")return P.slice(0,4).map(([x,y,s])=>`<path d="M${x} ${y+s}C${x-s} ${y+s*.2} ${x-s*.4} ${y-s*.2} ${x} ${y-s*1.3}C${x+s*.2} ${y-s*.3} ${x+s} ${y} ${x} ${y+s}Z" fill="${col}"/><path d="M${x} ${y+s*.8}C${x-s*.4} ${y+s*.3} ${x} ${y} ${x} ${y-s*.5}C${x+s*.5} ${y+s*.2} ${x+s*.3} ${y+s*.5} ${x} ${y+s*.8}Z" fill="#ffe27a"/>`).join("");
  if(k==="rainbow")return [0,1,2,3].map(i=>`<path d="M14 ${52-i*0} A86 86 0 0 1 186 52" fill="none" stroke="${["#ff6b6b","#ffd45f","#7dffb8","#6fd8ff"][i]}" stroke-width="3" opacity=".75" transform="translate(0 ${-i*5+10})"/>`).join("");
  if(k==="clover")return P.slice(0,4).map(([x,y,s])=>[0,90,180,270].map(a=>`<circle cx="${x}" cy="${y-s*.55}" r="${s*.5}" fill="${col}" transform="rotate(${a} ${x} ${y})"/>`).join("")).join("");
  if(k==="moon")return `<path d="M40 30a18 18 0 1 0 22 26a14 14 0 1 1 -22 -26Z" fill="${col}"/>`+P.slice(1,4).map(([x,y,s])=>sp(x,y,s*.8,"#fff")).join("");
  return P.map(([x,y,s],i)=>`<g stroke="${["#ffd45f","#ff8fcf","#6fd8ff","#7dffb8","#ff7b7b"][i]}" stroke-width="2.4" stroke-linecap="round"><path d="M${x} ${y-s}V${y+s}M${x-s} ${y}H${x+s}M${x-s*.7} ${y-s*.7}L${x+s*.7} ${y+s*.7}M${x+s*.7} ${y-s*.7}L${x-s*.7} ${y+s*.7}"/></g>`).join("")}
const METAL=[["#fff6b8","#ffd23f","#b8860b","#7a5200"],["#ffffff","#d6dde6","#8a97a6","#56606c"],["#ffe0bd","#e0a06a","#a8672f","#6b3a14"]];
trophySVG=function(t){const m=METAL[t.place-1],id="t"+t.week+"p"+t.place,th=THEMES[t.week%THEMES.length],gem=`hsl(${(t.week*47)%360},85%,62%)`,lite=VB.lite();
  const an=(a)=>lite?"":a;
  return `<svg class="trophy" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg"><defs>
   <linearGradient id="${id}m" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${m[0]}"/><stop offset=".35" stop-color="${m[1]}"/><stop offset=".7" stop-color="${m[2]}"/><stop offset="1" stop-color="${m[3]}"/></linearGradient>
   <linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="${m[3]}"/><stop offset=".5" stop-color="${m[1]}"/><stop offset="1" stop-color="${m[3]}"/></linearGradient>
   <radialGradient id="${id}h"><stop offset="0" stop-color="${m[1]}" stop-opacity=".5"/><stop offset="1" stop-color="${m[1]}" stop-opacity="0"/></radialGradient>
   <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <circle cx="100" cy="100" r="96" fill="url(#${id}h)">${an(`<animate attributeName="r" values="88;98;88" dur="3.4s" repeatCount="indefinite"/>`)}</circle>
  ${themeDeco(th[2],th[1],t)}
  <path d="M100 236C60 232 30 200 28 150M100 236C140 232 170 200 172 150" fill="none" stroke="#4fa84a" stroke-width="5" stroke-linecap="round" opacity=".9"/>
  ${[0,1,2,3,4,5].map(i=>{const y=226-i*14,x=100-(60-Math.pow(i,1.5)*2.2),dx=(100-x);return `<ellipse cx="${x-3+i*2.2}" cy="${y-i*2}" rx="9" ry="4.2" fill="#6fcf6a" transform="rotate(${-55+i*8} ${x-3+i*2.2} ${y-i*2})"/><ellipse cx="${200-(x-3+i*2.2)}" cy="${y-i*2}" rx="9" ry="4.2" fill="#6fcf6a" transform="rotate(${55-i*8} ${200-(x-3+i*2.2)} ${y-i*2})"/>`}).join("")}
  <ellipse cx="100" cy="238" rx="64" ry="8" fill="#0006"/>
  <path d="M58 224h84l6 12H52Z" fill="url(#${id}s)"/><rect x="66" y="204" width="68" height="22" rx="5" fill="url(#${id}m)" stroke="${m[3]}" stroke-width="1.6"/><rect x="76" y="209" width="48" height="12" rx="3" fill="${m[3]}" opacity=".55"/>
  <text x="100" y="218.5" font-size="7.5" font-weight="900" text-anchor="middle" fill="${m[0]}" letter-spacing=".6">${esc(t.farm).slice(0,14).toUpperCase()}</text>
  <path d="M90 168h20l4 36H86Z" fill="url(#${id}s)"/><ellipse cx="100" cy="168" rx="22" ry="7" fill="url(#${id}m)" stroke="${m[3]}" stroke-width="1.4"/>
  <path d="M54 42H146L142 80Q138 128 100 150Q62 128 58 80Z" fill="url(#${id}m)" stroke="${m[3]}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M54 52C26 50 24 92 62 106M146 52C174 50 176 92 138 106" fill="none" stroke="${m[3]}" stroke-width="10" stroke-linecap="round"/><path d="M54 52C26 50 24 92 62 106M146 52C174 50 176 92 138 106" fill="none" stroke="url(#${id}m)" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="100" cy="42" rx="46" ry="9" fill="${m[0]}" stroke="${m[3]}" stroke-width="2.4"/><ellipse cx="100" cy="42" rx="40" ry="6" fill="${m[3]}" opacity=".35"/>
  <path d="M66 52Q62 84 74 112Q82 82 80 52Z" fill="url(#${id}g)" opacity=".55"/>
  <circle cx="100" cy="82" r="22" fill="#fff" opacity=".12"/><path d="M100 64l5.4 11 12 1.8-8.7 8.4 2.1 12-10.8-5.7-10.8 5.7 2.1-12-8.7-8.4 12-1.8Z" fill="${gem}" stroke="${m[3]}" stroke-width="1.6" stroke-linejoin="round"/>
  <text x="100" y="124" font-size="14" font-weight="900" text-anchor="middle" fill="${m[3]}">TOP ${t.place}</text>
  <g transform="translate(100 24)"><ellipse cx="0" cy="2" rx="13" ry="10" fill="#fff" stroke="${m[3]}" stroke-width="1.5"/><path d="M-12 -2l-9-8 3 11ZM12 -2l9-8-3 11Z" fill="#fff" stroke="${m[3]}" stroke-width="1.5"/><circle cx="-5" cy="1" r="2" fill="#222"/><circle cx="5" cy="1" r="2" fill="#222"/><ellipse cx="0" cy="7" rx="6" ry="3.4" fill="#f2b9af"/><path d="M-10 -9l-4-8 7 4ZM10 -9l4-8-7 4Z" fill="#f6ebcc" stroke="${m[3]}" stroke-width="1"/></g>
  <path d="M70 156l-8 30 14-7 8 12 4-26Z M130 156l8 30-14-7-8 12-4-26Z" fill="${["#d63a3a","#3a7bd5","#2f8f4e"][t.place-1]}" stroke="${m[3]}" stroke-width="1.2"/>
  ${[[36,60],[164,70],[100,10]].map(([x,y],i)=>`<path d="M${x} ${y-7}L${x+2} ${y-2}L${x+7} ${y}L${x+2} ${y+2}L${x} ${y+7}L${x-2} ${y+2}L${x-7} ${y}L${x-2} ${y-2}Z" fill="#fff">${an(`<animate attributeName="opacity" values="0;1;0" dur="${1.6+i*.4}s" begin="${i*.5}s" repeatCount="indefinite"/>`)}</path>`).join("")}</svg>`}
const tCard=t=>`<div class="trophycard tp${t.place}" data-x="tview" data-id="${t.id}"><div class="tshine">${trophySVG(t)}</div><b>${MEDAL[t.place-1]} ${PL[t.place-1]}</b><span class="ttheme">${THEMES[t.week%THEMES.length][0]}</span><small>Semana ${t.week+1} · ${wkRange(t.week)}</small><small>${fmt(t.score)} pontos</small></div>`;
VB.act.tview=b=>{const t=state.trophies.find(x=>x.id===b.dataset.id);if(!t)return;let m=$("#tmodal");if(!m){document.body.insertAdjacentHTML("beforeend",`<div id="tmodal" class="modal hidden"><div class="modal-card tbig"><button class="xbtn" data-x="tclose">✕</button><div id="tbody"></div></div></div>`);m=$("#tmodal")}
  $("#tbody").innerHTML=`<div class="tbg tp${t.place}">${trophySVG(t)}</div><h2>${MEDAL[t.place-1]} Troféu de ${PL[t.place-1]}</h2><p class="dsc">Semana ${t.week+1} · ${wkRange(t.week)}</p><p class="dsc">${H(t.farm)} · ${fmt(t.score)} pontos</p><p class="dsc">Tema da semana: <b>${THEMES[t.week%THEMES.length][0]}</b></p>`;m.classList.remove("hidden");VB.sfx("good")};
VB.act.tclose=()=>$("#tmodal").classList.add("hidden");
const podium=(top)=>{const o=[1,0,2].map(i=>top[i]).filter(Boolean);return `<div class="podium">${o.map(x=>{const p=x.place||x.rank;return `<div class="pod p${p}"><div class="podt">${trophySVG({place:p,week:(RK&&RK.last&&RK.last.week)||0,farm:x.n})}</div><b>${MEDAL[p-1]} ${H(x.n)}</b><span>🪙 ${fmt(x.s)}</span></div>`}).join("")}</div>`};
renderRank=function(){const w=weekIdx();let list=null,rank=0,total=0,note="",last=null,lastMe=null,lastTop=null;
  if(ONLINE){if(RK&&RK.week===w){list=RK.top;rank=RK.rank;total=RK.total;last=RK.last;lastMe=RK.lastMe;lastTop=RK.lastTop}else if(now()-rkAt>3000)fetchRank()}
  else{const d=(now()-(WEEK0+w*WEEK_MS))/864e5,me={n:state.farm+" (você)",s:weekly(),me:1},all=[me,...RIV.map((n,i)=>({n,s:Math.round((200+i*i*70+rnd(i+3)*500)*(d+.2))}))].sort((a,b)=>b.s-a.s);
    list=all.map((x,i)=>({...x,rank:i+1}));rank=list.find(x=>x.me).rank;total=list.length;note=`<div class="evban">Modo offline: rivais simulados e sem troféus. Conecte ao servidor online para disputar com pessoas reais.</div>`}
  const wk=weekly(),end=WEEK0+(w+1)*WEEK_MS;
  $("#rankv").innerHTML=`<div class="weekbar"><div class="wkt">🥇 Ranking da semana ${w+1} <small>${wkRange(w)}</small></div><div class="bar big"><i id="wkBar"></i></div><div class="time" id="wkTime"></div><small class="dsc sm">até o ranking reiniciar</small></div>${note}
   <div class="rkme"><div><span>Sua posição</span><b>${list?rank+"º":"—"}</b></div><div><span>Seus pontos</span><b>🪙 ${fmt(wk)}</b></div><div><span>Jogadores</span><b>${total||"—"}</b></div></div>
   <p class="dsc">Vale quem ganhar mais moedas na semana. 🥇 Top 1 ganha o troféu de <b>ouro</b>, 🥈 Top 2 de <b>prata</b> e 🥉 Top 3 de <b>bronze</b>, com um tema diferente a cada semana.</p>
   ${list?`<div class="rklist">${list.map((x,i)=>{const p=x.rank||i+1,s=x.me&&wk>x.s?wk:x.s;return `<div class="rkr ${p<=3?"top"+p:""} ${x.me?"me":""}"><span>${p<=3?MEDAL[p-1]:p+"º"}</span><b>${H(x.n)}</b><em>🪙 ${fmt(s)}</em></div>`}).join("")}</div>`:`<div class="empty">Carregando ranking…</div>`}
   ${ONLINE&&last&&last.top&&last.top.length?`<div class="lastwk"><h2>🏆 Resultado da semana passada <small>(semana ${last.week+1} · ${wkRange(last.week)})</small></h2>${podium(last.top)}
    ${lastMe?`<div class="rkme lm"><div><span>Sua posição</span><b>${lastMe.rank?lastMe.rank+"º":"—"}</b></div><div><span>Seus pontos</span><b>🪙 ${fmt(lastMe.score)}</b></div><div><span>Jogadores</span><b>${lastMe.total}</b></div></div>`:""}
    ${(lastTop||[]).length>3?`<details class="det"><summary>Ver top 10 da semana passada</summary><div class="rklist">${lastTop.map(x=>`<div class="rkr ${x.me?"me":""}"><span>${MEDAL[x.rank-1]||x.rank+"º"}</span><b>${H(x.n)}</b><em>🪙 ${fmt(x.s)}</em></div>`).join("")}</div></details>`:""}</div>`:""}
   <h2 class="mh">🏆 Meus troféus (${state.trophies.length})</h2>${state.trophies.length?`<div class="trophies">${state.trophies.slice().reverse().map(tCard).join("")}</div>`:`<p class="dsc">Termine uma semana no top 3 para ganhar um troféu exclusivo. Toque num troféu para ver em tamanho grande.</p>`}`;
  tickRank()};

/* ===================== AVISOS IMPORTANTES (celular) ===================== */
const _vn=VB.notify;
VB.notify=(t,b,tag)=>{try{const o=X().opts;if(!o.notif||!("Notification"in window)||Notification.permission!=="granted")return;VB.sfx("notify");
  const opt={body:b,icon:"icon-192.png",badge:"icon-192.png",tag:tag||"vb",renotify:false,silent:false};
  if(navigator.serviceWorker&&navigator.serviceWorker.ready)navigator.serviceWorker.ready.then(r=>r.showNotification(t,opt)).catch(()=>new Notification(t,opt));else new Notification(t,opt)}catch(e){}};
let evSeen=null;
VB.tickers.push(()=>{if(!X().opts.notif)return;const ids=activeEvents().map(e=>e.id).join(",");if(evSeen===null){evSeen=ids;return}
  if(ids!==evSeen){const nw=activeEvents().filter(e=>!evSeen.split(",").includes(e.id));evSeen=ids;if(nw.length)VB.notify("🎉 Evento novo!",`${nw[0].e} ${nw[0].n} começou! Vacas exclusivas disponíveis.`,"ev")}});
VB.tickers.push(()=>{if(!X().opts.notif||!document.hidden)return;const p=X().pass,end=WEEK0+(p.s+1)*VB.PASS.DAYS*864e5,k="pe"+p.s;if(end-now()<864e5&&end>now()&&!X()._pn){X()._pn=k;VB.notify("🎟️ Passe acabando","Falta menos de 1 dia para o fim da temporada!","pass")}});
VB.tickers.push(()=>{const sh=X().show,pw=weekIdx()-1;if(X().opts.notif&&sh.w===pw&&sh.claimed!==pw&&!X()._sn){X()._sn=1;VB.notify("🏅 Exposição","O prêmio da semana passada está pronto!","show")}});
VB.act.notif=async()=>{const o=X().opts;if(!("Notification"in window))return toast("Seu navegador não suporta notificações.");
  if(o.notif){o.notif=0;save();VB.renderPF&&VB.renderPF();return}const p=await Notification.requestPermission();o.notif=p==="granted"?1:0;if(o.notif){toast("🔔 Avisos ligados!");VB.notify("🐄 VacaBox","Avisos ativados. Só vamos avisar o que for importante!","hi")}else toast("Permissão negada pelo navegador.");save();VB.renderPF&&VB.renderPF()};
document.body.insertAdjacentHTML("beforeend",`<div id="npm" class="modal hidden"><div class="modal-card"><div class="modal-title">🔔 Ativar avisos?</div><p class="dsc">Receba um aviso só quando for importante: <b>bônus diário</b>, <b>evento novo</b>, <b>prêmios prontos</b> e <b>fim do passe</b>. O som é o mesmo do jogo.</p><div class="row"><button class="primary big" data-x="npyes">Ativar avisos</button><button class="secondary" data-x="npno">Agora não</button></div></div></div>`);
VB.act.npyes=async()=>{$("#npm").classList.add("hidden");try{localStorage.setItem("vb_np","1")}catch(e){}await VB.act.notif()};
VB.act.npno=()=>{$("#npm").classList.add("hidden");try{localStorage.setItem("vb_np","1")}catch(e){}};
let npAsked=false;VB.tickers.push(()=>{if(npAsked||$("#boot")||!("Notification"in window))return;npAsked=true;let seen="";try{seen=localStorage.getItem("vb_np")}catch(e){}
  const touch=matchMedia("(pointer:coarse)").matches||innerWidth<820;if(touch&&!seen&&Notification.permission==="default"&&st("earned")>0)setTimeout(()=>$("#npm").classList.remove("hidden"),6000)});

/* ===================== NOVIDADES v11 ===================== */
const N11=["🎨 <b>Perfil renovado:</b> categorias fáceis de achar (foto, moldura, banner, cor, animação, título, status, efeitos…), botão 🎲 surpresa, nível do Fazendeiro e troca do nome da fazenda ali mesmo.",
"🤝 <b>Social:</b> código de amigo com 6 números, <b>Trocas</b> agora dentro do perfil e cooperativas com código e convites para amigos.",
"🎟️ <b>Passe:</b> 90 níveis, 14 dias, trilha na horizontal, nome Passe Básico e XP só das missões diárias e semanais do próprio passe.",
"🧪 <b>Loja:</b> poções de XP, leite, sorte, ouro, tempo, vacina e mais.",
"📦 <b>Caixas:</b> garantia visível, escolha o que vender/manter ao abrir e abertura automática. Chances das Caixas Ultimate corrigidas.",
"🏡 <b>Fazenda:</b> clima com previsão, objetos arrastáveis, mais de 60 decorações (inclusive de eventos), veterinário com doenças e vacinas, vacas de eventos com acessórios temáticos e modo desempenho para celular.",
"🎯 <b>Missões</b> ganhou página própria, o <b>Bônus</b> aparece ao abrir o jogo no dia, e Exposição, Chefe, Ranking e Troféus foram refeitos.",
"🔔 Avisos à direita com botão ✕ e notificações só do que importa."];
window.showNews=function(){$("#newsTitle").textContent="🎉 Novidades da versão 11";$("#newsList").innerHTML=N11.map(x=>`<li>${x}</li>`).join("");$("#news").classList.remove("hidden")};
window.closeNews=function(){$("#news").classList.add("hidden");try{localStorage.setItem("vb_news",NEWS_V);localStorage.setItem("vb_news10","1");localStorage.setItem("vb_news11","1")}catch(e){}};
try{if(localStorage.getItem("vb_news11")!=="1"&&state.seen.length>0)setTimeout(showNews,1500)}catch(e){}
})();
