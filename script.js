const rnd=n=>{const x=Math.sin(n*12.9898)*43758.5453;return x-Math.floor(x)};
const COWS=[
 {id:"pastagem",name:"Pastagem",r:0,weight:20,body:"#b9b0a0",spots:"#2c2926"},
 {id:"barro",name:"Barro",r:0,weight:16,body:"#9c8266",spots:"#4a3a2b"},
 {id:"cinza",name:"Cinzenta",r:0,weight:12,body:"#a7acaa",spots:"#4b4f50"},
 {id:"malhada",name:"Malhada",r:1,weight:10,body:"#f0e8d5",spots:"#34312e"},
 {id:"mosqueada",name:"Mosqueada",r:1,weight:8,body:"#e7dccb",spots:"#7a5a3c"},
 {id:"baia",name:"Baia",r:1,weight:7,body:"#d9b77e",spots:"#8a5a2b"},
 {id:"caramelo",name:"Caramelo",r:2,weight:5,body:"#c68b4e",spots:"#6c3f20"},
 {id:"ruiva",name:"Ruiva",r:2,weight:4,body:"#b5532f",spots:"#f0d9b5"},
 {id:"azulada",name:"Azulada",r:2,weight:4,body:"#8fa9c4",spots:"#2f3e55"},
 {id:"panda",name:"Panda",r:3,weight:4,body:"#f1eee8",spots:"#181818"},
 {id:"chocolate",name:"Chocolate",r:3,weight:3,body:"#8b5534",spots:"#351b13"},
 {id:"esmeralda",name:"Esmeralda",r:3,weight:2.5,body:"#7fc79a",spots:"#1f4d36"},
 {id:"zebra",name:"Zebrada",r:3,weight:1.5,body:"#f4f4f4",spots:"#111"},
 {id:"neve",name:"Neve",r:4,weight:1.2,body:"#fafafa",spots:"#d4d8df"},
 {id:"aurora",name:"Aurora",r:4,weight:.5,body:"#f3b65d",spots:"#5e3d85"},
 {id:"dourada",name:"Dourada",r:4,weight:.8,body:"#f2c94c",spots:"#a8741a"},
 {id:"rubi",name:"Rubi",r:4,weight:.5,body:"#d9455a",spots:"#5c0f1d"},
 {id:"galaxia",name:"Galáxia",r:5,weight:.04,body:"#7d7fe0",spots:"#25264f"},
 {id:"nebulosa",name:"Nebulosa",r:5,weight:.035,body:"#c06ae0",spots:"#3a1458"},
 {id:"eclipse",name:"Eclipse",r:5,weight:.025,body:"#2b2b3d",spots:"#f5c542"}];
const NEWN=["Areia,Palha,Trigo,Milho,Aveia,Feno,Cevada,Argila,Poeira,Lama,Terra,Casca,Tronco,Pedra,Seixo,Neblina,Orvalho,Nuvem,Brisa,Sombra,Barranco,Sertão,Cerrado,Várzea,Pampa",
"Biscoito,Bolacha,Pão,Manteiga,Creme,Nata,Pêssego,Damasco,Mel,Canela,Baunilha,Café,Capuccino,Amêndoa,Noz,Castanha,Pipoca,Torrada,Bolo,Rapadura,Paçoca,Doce de Leite,Coco,Mandioca,Pudim",
"Jabuticaba,Morango,Cereja,Framboesa,Amora,Uva,Laranja,Limão,Tangerina,Maracujá,Goiaba,Manga,Abacaxi,Melancia,Kiwi,Lichia,Pitaya,Acerola,Caju,Pêra,Maçã,Ameixa,Figo,Romã,Banana",
"Safira,Ametista,Topázio,Turquesa,Opala,Jade,Citrino,Granada,Quartzo,Ônix,Obsidiana,Coral,Pérola,Âmbar,Jaspe,Malaquita,Lápis,Berilo,Peridoto,Alexandrita,Esmeril,Cristal,Zircônia,Hematita,Azurita",
"Fênix,Dragão,Grifo,Unicórnio,Pégaso,Quimera,Hidra,Kraken,Sereia,Titã,Valquíria,Minotauro,Basilisco,Leviatã,Behemoth,Esfinge,Centauro,Mantícora,Naga,Roc",
"Solar,Lunar,Cometa,Pulsar,Quasar,Supernova,Nébula,Órion,Andrômeda,Vênus,Saturno,Netuno,Plutão,Sírius,Polaris",
"Prisma,Arco-Íris,Caleidoscópio,Aurora Boreal,Iridescente,Holograma,Espectro,Mosaico,Vitral,Opalescente,Cintilante,Estelar,Cósmica,Divina,Infinita"];
const NW=[.8,.5,.3,.2,.06,.003,.0005],NS=[[22,55],[35,78],[65,52],[55,58],[78,52],[85,58],[85,66]];
NEWN.forEach((str,r)=>str.split(",").forEach((n,i)=>{const h=(i*137+r*53)%360,[sa,li]=NS[r],bh=r<2?25+(i*7)%30:h;
 COWS.push({id:`n${r}_${i}`,name:n,r,weight:NW[r],body:`hsl(${bh},${sa}%,${li}%)`,spots:`hsl(${r<2?bh+(i%2?-8:6):(h+150)%360},${sa}%,${Math.max(16,li-34)}%)`,pat:(i*3+r)%5})}));
const EXN=[["Florida","Pétala","Jardim"],["Solzinho","Praiana","Tropical"],["Folhagem","Ferrugem","Colheita"],["Floquinho","Gelada","Cristal de Gelo"]];
const EVENTS=[
{id:"alien",n:"Invasão Alienígena",e:"👽",h:130,k:"r",cows:["Alienígena Verde","Ovni","Abdução"],d:"Naves cobrem o céu e as vacas brilham no escuro!"},
{id:"vulcao",n:"Erupção Vulcânica",e:"🌋",h:12,k:"r",cows:["Magma","Cinzas","Vulcânica"],d:"O vulcão acordou! O pasto fumega e o leite está fervendo."},
{id:"louca",n:"Vaca Louca",e:"🤪",h:300,k:"r",cows:["Maluquinha","Biruta","Doidinha"],d:"As vacas enlouqueceram e pulam por toda a fazenda!"},
{id:"geada",n:"Geada",e:"🧊",h:195,k:"r",cows:["Congelada","Cristalizada","Nevasca"],d:"Uma geada cobre o pasto de cristais de gelo."},
{id:"condensado",n:"Leite Condensado",e:"🍯",h:40,k:"r",cows:["Condensada","Caramelada","Doceira"],d:"Chuva doce! Tudo vira leite condensado."},
{id:"mar",n:"Frente Marítima",e:"🌊",h:205,k:"r",cows:["Marujo","Concha","Maré"],d:"A maré subiu e trouxe vacas do mar."},
{id:"terror",n:"Terror",e:"👻",h:270,k:"r",cows:["Fantasma","Sombria","Pesadelo"],d:"A noite caiu e algo se mexe no celeiro..."},
{id:"prehist",n:"Pré-História",e:"🦖",h:35,k:"r",cows:["Mamute","Dinossaura","Pedra Lascada"],d:"Uma fenda no tempo trouxe a fazenda para a era dos dinossauros!"},
{id:"natal",n:"Natal",e:"🎄",h:140,k:"d",f:1220,t:1230,cows:["Noel","Rena","Pinheiro"],d:"Ho ho ho! A fazenda está enfeitada para o Natal."},
{id:"halloween",n:"Halloween",e:"🎃",h:28,k:"d",f:1020,t:1106,cows:["Abóbora","Bruxa","Morcego"],d:"Doce ou leite? Abóboras por todo o pasto!"},
{id:"pascoa",n:"Páscoa",e:"🐰",h:330,k:"d",f:325,t:410,cows:["Coelhinha","Chocolatuda","Ovo de Páscoa"],d:"Ovos de chocolate escondidos pela fazenda!"},
{id:"virada",n:"Virada de Ano",e:"🎆",h:48,k:"d",f:1230,t:110,cows:["Confete","Champanhe","Fogos"],d:"Fogos no céu e um ano novo de leite pela frente!"}];
const EXP=[0,0,50,35,8,6,1];
const SEH=[110,50,25,200],EXW=[70,25,5];
const PAL={s0:[["#b9f0a0","#e86fb0"],["#ffd0e8","#7ac96b"],["#cfe8ff","#f5c542"]],s1:[["#ffd44e","#ff7a2a"],["#7ad7f0","#fff3a0"],["#ff9f5a","#2a8ca0"]],s2:[["#d9822b","#6b3a14"],["#b5532f","#f2c94c"],["#8a5a2b","#e8b04a"]],s3:[["#e8f4ff","#7aa6e8"],["#cfe0ef","#3a5a8a"],["#ffffff","#9fc5e8"]],
alien:[["#9be86b","#2f6b2a"],["#b8f0ff","#5b3fa8"],["#2b2d5c","#7dffb0"]],vulcao:[["#d9482b","#2b1a17"],["#ffb347","#8a1c0e"],["#3a3331","#ff6a1a"]],louca:[["#ff6fd8","#5d1b8f"],["#fff35c","#e0328a"],["#6ee7ff","#ff7a2f"]],
geada:[["#d8f3ff","#6fb7e8"],["#9fd8ff","#ffffff"],["#7aa6e8","#e8f6ff"]],condensado:[["#f6e7b4","#c98a2b"],["#ffd34e","#8a5a14"],["#fff6dc","#e9a23b"]],mar:[["#5fb7d9","#1d4f7a"],["#f4efe0","#2a6fa3"],["#2f7fa0","#e8f6f2"]],
terror:[["#4a3a63","#d8ccff"],["#d8d8e8","#2a2438"],["#2a2a35","#ff4d4d"]],prehist:[["#8a6a3b","#3b2a14"],["#7fa04a","#33471c"],["#c9a36b","#6b4a22"]],natal:[["#d63a3a","#ffffff"],["#2f8f4e","#f2d24b"],["#ffffff","#d63a3a"]],halloween:[["#ff8a1f","#2a1a12"],["#6b3fa0","#ff8a1f"],["#222222","#ff9f2f"]],
pascoa:[["#ffc4e1","#8a5a3a"],["#cfa26b","#fff0f6"],["#bfe8c6","#ff9ec7"]],virada:[["#ffd447","#1c1c3a"],["#f4f4ff","#7a4ff0"],["#1c1c3a","#ffd447"]]};
function mkEx(ex,name,r,h,i,w){const p=PAL[ex]&&PAL[ex][i];return{id:`x_${ex}_${i}`,name,r,ex,weight:w,body:p?p[0]:`hsl(${(h+i*29+(i%2?15:-15)+360)%360},${45+(i*7)%40}%,${48+(i*11)%28}%)`,spots:p?p[1]:`hsl(${(h+150+i*13)%360},50%,${24+(i*5)%22}%)`,pat:(i*2+h)%10}}
const EXTRA={s0:["Margarida","Orvalho","Broto","Botão de Rosa","Colibri","Jardim Encantado","Primavera Suprema"],s1:["Sorvete","Maresia","Coqueiro","Pôr do Sol","Sombrinha","Tropical Dourado","Verão Supremo"],s2:["Cogumelo","Castanha","Lenha","Neblina","Fogueira","Colheita Dourada","Outono Supremo"],s3:["Lareira","Chocolate Quente","Floco de Neve","Aurora Boreal","Cachecol","Gelo Eterno","Inverno Supremo"],
alien:["Marciana","Ufóloga","Cometa Verde","Sonda","Radar","Nave-Mãe","Abduzida","Galáctica","Teletransporte","Laser","Satélite","Cósmica Verde"],
vulcao:["Lava","Cinza Quente","Cratera","Brasa","Fumaça","Rocha Derretida","Magmática","Faísca","Enxofre","Basalto","Tremor","Vulcânica Rubra"],
louca:["Pirada","Zonza","Maluca Roxa","Tontinha","Rodopio","Cambalhota","Surtada","Bagunça","Doida Varrida","Piruá","Tresloucada","Louca Suprema"],
geada:["Gelinho","Cristal de Gelo","Nevoeiro","Calafrio","Geleira","Pingente","Iceberg","Friorenta","Sincelo","Brisa Gelada","Polar","Glacial Suprema"],
condensado:["Doce de Leite","Brigadeira","Caramelo Líquido","Pudim de Leite","Calda","Cremosa","Melada","Açucarada","Beijinho","Cocada","Mousse","Doçura Suprema"],
mar:["Sereia","Almirante","Pirata","Âncora","Onda","Coral Azul","Baleia","Caravela","Farol","Tubarão Gentil","Ostra","Tempestade"],
terror:["Zumbi","Vampira","Múmia","Lobisomem","Assombrada","Caveira","Espectro","Corvo","Cripta","Bruxa Negra","Maldição","Pesadelo Supremo"],
prehist:["Trilobita","Ptero","Fóssil","Caverna","Ossada","Raptor","Tigre-dente","Âmbar Antigo","Pedra Polida","Cro-Magnon","Tricerátops","Rex Supremo"],
natal:["Papai Noel","Duende","Guirlanda","Presente","Bengala Doce","Estrela de Natal","Trenó","Boneco de Neve","Sino","Panetone","Luzinha","Natal Supremo"],
halloween:["Fantasminha","Gato Preto","Caldeirão","Teia","Doce ou Travessura","Vampirinha","Esqueleto","Luar","Poção","Aranha","Vassoura","Halloween Supremo"],
pascoa:["Ovo Rosa","Cenoura","Cesta","Pintinho","Chocolate Branco","Coelho Azul","Ovo Dourado","Primavera","Laço","Colomba","Trufa","Páscoa Suprema"],
virada:["Champanhe Rosé","Réveillon","Contagem","Serpentina","Estrela Cadente","Taça","Meia-Noite","Brinde","Ano Novo","Faísca Dourada","Lantejoula","Virada Suprema"]};
const EVR=[3,4,5,2,2,3,3,3,3,4,4,4,5,5,6],EVW={2:60,3:32,4:12,5:3.5,6:.35},SER=[2,3,4,2,2,3,3,4,5,6],SEW={1:80,2:60,3:32,4:12,5:4,6:.4};
EXN.forEach((a,s)=>[...a,...EXTRA["s"+s]].forEach((n,i)=>COWS.push(mkEx("s"+s,n,SER[i],SEH[s],i,SEW[SER[i]]))));
EVENTS.forEach(e=>[...e.cows,...EXTRA[e.id]].forEach((n,i)=>COWS.push(mkEx(e.id,n,EVR[i],e.h,i,EVW[EVR[i]]))));
const ACCS=["laco","oculos","flor","sino","coroa","cowboy","cachecol","fone","estrela","gravata","bone","cartola","tiara","asas","oculosol","bandana","palha","fita","capacete","gorro","aureola","bigode","tapaolho","borboleta"];
const NOUNS=["Estrela","Lua","Sol","Nuvem","Chuva","Trovão","Vento","Rio","Lago","Mar","Ilha","Monte","Vale","Floresta","Campo","Jardim","Pomar","Horta","Trigo","Amora","Cereja","Limão","Pêssego","Melão","Coco","Café","Cacau","Canela","Mel","Leite","Creme","Manteiga","Queijo","Pudim","Doce","Bolo","Pipoca","Algodão","Veludo","Seda","Cetim","Renda","Pluma","Concha","Coral","Pérola","Âmbar","Opala","Safira","Topázio"],ADJS=["Real","Mágica","Serena","Brava","Feliz","Sonhadora","Valente","Gentil","Faceira","Misteriosa"];
(function(){const cnt=[130,110,90,70,55,30,15],TOT=[68,37.5,20.5,16,4.2,.145,.0075],rs=[];cnt.forEach((n,r)=>{for(let i=0;i<n;i++)rs.push(r)});
 rs.map((r,i)=>[r,rnd(i*5.9+2)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]).forEach((r,i)=>{const h=(i*137.5+r*47)%360,[sa,li]=NS[r];
  COWS.push({id:`m${i}`,name:`${NOUNS[i%50]} ${ADJS[Math.floor(i/50)]}`,r,weight:TOT[r]/cnt[r],body:`hsl(${h},${Math.max(18,sa-6+(i%5)*3)}%,${li-4+(i%4)*3}%)`,spots:`hsl(${(h+120+(i%7)*20)%360},${sa}%,${Math.max(16,li-30)}%)`,pat:(i*7+r)%10})});
 COWS.forEach((c,k)=>{if(!c.ex&&/^[nm]\d/.test(c.id)&&rnd(k*7.7+3)<.35)c.ac=ACCS[Math.floor(rnd(k*3.1)*ACCS.length)]})})();
const NOUNS2=["Abacate","Acerola","Amendoim","Araçá","Baunilha","Bambu","Begônia","Camélia","Cacto","Carambola","Cedro","Cipó","Dália","Embaúba","Erva-Doce","Figueira","Framboesa","Girassol","Hortelã","Ipê","Jasmim","Jacarandá","Lavanda","Lírio","Magnólia","Manacá","Orquídea","Papoula","Peônia","Pitanga","Palmeira","Rosa","Sabiá","Samambaia","Tulipa","Violeta","Zínia","Arara","Beija-flor","Borboleta","Cigarra","Coruja","Gaivota","Joaninha","Libélula","Pirilampo","Tucano","Vagalume","Jabuticaba","Mangaba"],ADJS2=["Alegre","Amável","Brilhante","Calma","Charmosa","Corajosa","Curiosa","Delicada","Doce","Elegante","Esperta","Gloriosa","Graciosa","Habilidosa","Ilustre","Jovial","Leal","Luminosa","Majestosa","Nobre","Radiante","Sábia","Sedosa","Sereníssima","Sorridente","Tranquila","Veloz","Vibrante","Zelosa","Encantada"];
(function(){const cnt=[380,330,270,210,170,95,45],rs=[];cnt.forEach((n,r)=>{for(let i=0;i<n;i++)rs.push(r)});
 rs.map((r,i)=>[r,rnd(i*3.7+11)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]).forEach((r,i)=>{const h=(i*137.508+r*61+13)%360,[sa,li]=NS[r];
  COWS.push({id:`q${i}`,name:`${NOUNS2[i%50]} ${ADJS2[Math.floor(i/50)]}`,r,weight:1,body:`hsl(${h},${Math.max(16,sa-10+(i%6)*3)}%,${Math.min(88,li-6+(i%5)*3)}%)`,spots:`hsl(${(h+90+(i%9)*24)%360},${Math.max(20,sa-4+(i%4)*4)}%,${Math.max(14,li-28-(i%4)*2)}%)`,pat:(i*5+r*3)%24})});
 COWS.forEach((c,k)=>{if(!c.ex&&/^q\d/.test(c.id)&&rnd(k*5.3+7)<.35)c.ac=ACCS[Math.floor(rnd(k*2.9+1)*ACCS.length)]})})();
const REG=COWS.filter(c=>!c.ex);
const CBY=new Map(COWS.map(c=>[c.id,c]));
const RC=["common","uncommon","rare","epic","legendary","mythic","unique"],RN=["Comum","Incomum","Rara","Épica","Lendária","Mítica","Única"];
const MILK=[[3,7],[8,15],[15,25],[25,35],[35,50],[50,100],[100,150]],SELL=[25,60,150,350,900,2500,8000];
const SEASONS=[{n:"Primavera",i:"🌸",f:1,p:[1.5,2.6]},{n:"Verão",i:"☀️",f:1,p:[1.5,2.4]},{n:"Outono",i:"🍂",f:1,p:[1.8,3.0]},{n:"Inverno",i:"❄️",f:.6,p:[2.6,3.6]}];
const FOODS=[{n:"Capim",p:1,e:"🌾"},{n:"Ração",p:3,e:"🥣"},{n:"Silagem",p:6,e:"🌽"},{n:"Mix Premium",p:12,e:"⭐"}];
const UPS={
 pasto:{n:"🌿 Pasto melhorado",b:300,d:l=>`+${2*l}% de chance ao evoluir/fundir`},
 cocho:{n:"🪣 Cochos maiores",b:150,d:l=>`Capacidade de ${10+10*l} unidades`},
 ordenha:{n:"🥛 Sala de ordenha",b:250,d:l=>`+${10*l}% de leite · ordenha ${(1.8*.93**l).toFixed(2)}s · descanso ${clock(Math.max(20000,Math.round(120000*.96**l)))}`},
 curral:{n:"🏡 Curral maior",b:400,d:l=>`Até ${8+3*l} vacas na fazenda`},
 tanque:{n:"🛢️ Tanque de leite",b:200,d:l=>`Capacidade de ${100+50*l} L`},
 salas:{n:"🚪 Salas de ordenha",b:600,d:l=>`${1+l} sala(s) ao mesmo tempo`}};
const upMax=k=>Math.min(100,15+10*state.rb);
const upCost=k=>{const l=state.up[k],b=UPS[k].b;return Math.round((l<15?b*1.5**l:b*1.5**15*1.1**(l-14))/5)*5};
const WK0C=[0,1500,3000,6000,12000,24000,48000,96000],WK0W=[0,8,16,28,45,70,105,150],WK0I=[0,14000,10000,7000,5000,3500,2500,1500];
const wmax=()=>Math.min(100,7+10*state.rb),wkc=l=>l<=7?WK0C[l]:Math.round(96000*1.4**(l-7)),wkw=l=>l<=7?WK0W[l]:Math.round(150*1.12**(l-7)),wki=l=>l<=7?WK0I[l]:Math.max(400,Math.round(1500*.9**(l-7)));
const BOXES=[
 {id:"verde",name:"Caixa Verde",price:25,emoji:"🌱",m:[3,1,.2,.05,0,0,0],desc:"Barata: quase só pelagens comuns e incomuns."},
 {id:"campo",name:"Caixa do Campo",price:50,emoji:"📦",m:[1,1,1,1,1,1,0],desc:"Uma caixa simples com boas chances de pelagens comuns e raras."},
 {id:"celeiro",name:"Caixa do Celeiro",price:150,emoji:"🧰",m:[.6,1.2,1.2,.3,0,0,0],desc:"Mais chances de pelagens incomuns e raras."},
 {id:"prata",name:"Caixa Prateada",price:500,emoji:"🥈",m:[.9,1.2,.5,.4,.05,0,0],desc:"Raras são difíceis, lendárias muito mais. Sem míticas."},
 {id:"dourada",name:"Caixa Dourada",price:5000,emoji:"✨",m:[0,0,1,2,6,10,0],desc:"Nada abaixo de rara. Mais épicas, lendárias e uma pequena chance de mítica."},
 {id:"cosmica",name:"Caixa Cósmica",price:50000,emoji:"🌌",m:[0,0,0,2,12,60,8],desc:"Épicas, lendárias e míticas, com chance minúscula de Única."},
 {id:"arco",name:"Caixa Arco-íris",price:500000,emoji:"🌈",m:[0,0,0,0,30,580,180],desc:"A melhor caixa: 0,2% de chance de Única."}];
const DIFF=[1,.85,.6,.4,.2,.1,.05];
const BULLS=["Pé-duro","Nelore","Gir","Hereford","Angus","Charolês","Wagyu"],BULLP=[300,800,2000,5000,12000,30000,80000];
const CD=120000,EVO=86400000,SEASON_MS=3600000,SLOT_MS=150000,DUNG=5,BREST=600000,CALF=900000;

const def=()=>({rb:0,seen:[],farm:"Minha Fazenda",pid:"",guess:null,gs:0,mt:{},offers:[],coins:1000,cows:[],milk:0,dung:0,food:{capim:10},recipes:[],mb:{},farmSet:false,trough:{u:0,id:"capim"},water:0,manure:0,
 up:{pasto:0,cocho:0,ordenha:0,curral:0,tanque:0,salas:0,esterco:0},worker:{lvl:0,food:"capim",last:0,paid:0,on:true,strike:false},
 bulls:[],calves:[],steers:[],stats:{},missions:{day:"",list:[]},ach:{},contracts:{tryAt:{},qual:{},act:[],pend:[]},name:"Fazendeiro",used:[],dev:{inf:false,free:false,force:[],season:null}});
let state=Object.assign(def(),JSON.parse(localStorage.getItem("vacabox_save")||"null")||{});
for(const k of ["up","worker","stats","missions","contracts","dev"])state[k]=Object.assign(def()[k],state[k]);
if(state.inventory){for(const [id,q] of Object.entries(state.inventory))for(let i=0;i<q;i++)state.cows.push({u:uid(),t:id,at:Date.now(),m:0});delete state.inventory}
state.cows=state.cows.filter(c=>COWS.some(x=>x.id===c.t));
state.seen=[...new Set([...state.seen,...state.cows.map(c=>c.t)])];
let bookF=0,openingBusy=false,drag=null,page="home",lastSig="",farmTab="pasto",selCow=0,selBull=0;const RM=[];
const $=s=>document.querySelector(s);
const fmt=n=>(+n).toLocaleString("pt-BR",{maximumFractionDigits:2});

const rint=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
function uid(){return Math.floor(Math.random()*1e9)}
function rollL(t){return rint(MILK[t.r][0],MILK[t.r][1])}
state.cows.forEach(c=>{if(c.L==null)c.L=rollL(COWS.find(x=>x.id===c.t))});
if(!state.pid)state.pid=Math.random().toString(36).slice(2,10)+Date.now().toString(36);
const cname=c=>c.nick||type(c).name;
function save(){if(window.WIPED)return;localStorage.setItem("vacabox_save",JSON.stringify(state))}
const S=(k,n=1)=>{state.stats[k]=(state.stats[k]||0)+n},st=k=>k==="seen"?state.seen.length:k==="cowsNow"?state.cows.length:k==="upSum"?Object.values(state.up).reduce((a,b)=>a+b,0):k==="coinsNow"?Math.floor(state.coins):(state.stats[k]||0),earn=n=>{state.coins+=n;S("earned",n)};
const stage=()=>[2000,20000,100000,500000].filter(x=>st("earned")>=x).length;
const type=c=>CBY.get(c.t),cowBy=u=>state.cows.find(c=>c.u===u);
const cap=()=>10+10*state.up.cocho,tankCap=()=>100+50*state.up.tanque,farmCap=()=>8+3*state.up.curral,full=()=>state.cows.length>=farmCap(),rooms=()=>1+state.up.salas;
const cdMs=()=>Math.max(20000,Math.round(CD*.96**state.up.ordenha*(1-curFx().cd/100))),milkDur=()=>Math.max(200,Math.round(1800*.93**state.up.ordenha));
const tq=()=>0;
const SEI=t=>state.dev.season!=null?state.dev.season:Math.floor(t/SEASON_MS)%4,season=(t=Date.now())=>SEASONS[SEI(t)];
const slot=()=>Math.floor(Date.now()/SLOT_MS);
const TR=[[3.00,2.60],[2.60,1.30],[1.30,3.00],[3.00,3.75]];
const trendAt=s=>{const t=s*SLOT_MS+1,[a,b]=TR[SEI(t)];return a+(b-a)*((t%SEASON_MS)/SEASON_MS)};
function price(s){const n=.08*Math.sin(s*.9+1)+.05*Math.sin(s*2.3)+(rnd(s*1.7)-.5)*.12;return Math.max(1.1,Math.min(4.2,Math.round((trendAt(s)+n)*100)/100))}
const ready=c=>Date.now()-c.m>=cdMs()&&Date.now()>=(c.rest||0),evoReady=c=>type(c).r<6&&Date.now()-c.at>=EVO;
const pen=r=>r>=5?.5:1,evoChance=c=>Math.min(95,Math.round((30+2*state.up.pasto+2*state.rb)*pen(type(c).r))),fuseChance=r=>Math.min(90,Math.round((35+2*state.up.pasto+2*state.rb)*pen(r))),dungTotal=()=>Math.round(state.dung*DUNG*(1+.05*state.rb));
const sellValue=c=>Math.round(SELL[type(c).r]*(.85+rnd(c.u%100000)*.3)*(1+.05*state.rb));
const clock=ms=>{ms=Math.max(0,Math.ceil(ms/1000));const h=Math.floor(ms/3600),m=Math.floor(ms%3600/60),s=ms%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(s).padStart(2,"0")};
function toast(t){const e=$("#toast");e.textContent=t;e.classList.remove("hidden");clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.add("hidden"),2800)}
const saleMult=()=>(activeEvents().length*2||1)*contractMult()*(1+curFx().pr/100);
function sellMilk(){const L=state.milk,pr=price(slot()),g=L*pr*saleMult();earn(g);S("milkSold",L);S("sales");if(pr>=3)S("sellsHigh");if(activeEvents().length)S("evtMilk",L);state.milk=0;return g}

function pat(c){const p=c.pat|0,f=c.spots;
 if(p===1)return [0,1,2,3].map(i=>`<path d="M${108+i*28} 96v62" stroke="${f}" stroke-width="7" opacity=".55"/>`).join("");
 if(p===2)return `<text x="100" y="125" font-size="34" fill="${f}" opacity=".75">★</text><text x="165" y="150" font-size="26" fill="${f}" opacity=".75">★</text>`;
 if(p===3)return [[110,110],[135,140],[170,115],[200,135],[150,100]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${f}" opacity=".7"/>`).join("");
 if(p===4)return `<text x="108" y="135" font-size="36" fill="${f}" opacity=".75">♥</text><text x="168" y="118" font-size="24" fill="${f}" opacity=".75">♥</text>`;
 if(p===5)return [100,116,132,148].map(y=>`<path d="M88 ${y}h122" stroke="${f}" stroke-width="6" opacity=".5"/>`).join("");
 if(p===6)return `<path d="M96 150Q150 170 206 150L206 162Q150 178 96 162Z" fill="${f}" opacity=".6"/>`;
 if(p===7)return [[112,118],[146,134],[180,112],[196,146]].map(([x,y])=>`<path d="M${x} ${y-12}l10 12-10 12-10-12Z" fill="${f}" opacity=".65"/>`).join("");
 if(p===8)return Array.from({length:14},(_,i)=>`<circle cx="${96+(i*37)%118}" cy="${100+(i*23)%56}" r="${2+i%3}" fill="${f}" opacity=".7"/>`).join("");
 if(p===9)return `<path d="M96 108Q130 90 160 112T214 104" stroke="${f}" stroke-width="8" fill="none" opacity=".55"/><path d="M92 140Q130 124 168 146T214 140" stroke="${f}" stroke-width="8" fill="none" opacity=".55"/>`;
 return ""}
function cowSVG(c,extraClass=""){
  const K="#2a2420";
  return `<svg class="${extraClass}${c.r===6?" rbw":""}${c.r===5?" mglow":""}" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-label="${c.name}">
    <ellipse cx="150" cy="198" rx="105" ry="13" fill="#000" opacity=".18"/>
    <g>${glow(c)}
      <path d="M82 100 Q54 116 62 154" stroke="${K}" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M82 100 Q54 116 62 154" stroke="${c.body}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M62 148 Q50 162 55 183 Q62 192 69 183 Q75 162 62 148Z" fill="${c.spots}" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="78" y="92" width="142" height="73" rx="30" fill="${c.body}"/>
      <ellipse cx="99" cy="128" rx="28" ry="25" fill="${c.spots}"/>
      <ellipse cx="157" cy="104" rx="27" ry="17" fill="${c.spots}" opacity=".92"/>
      <ellipse cx="194" cy="145" rx="31" ry="20" fill="${c.spots}" opacity=".92"/>
      ${pat(c)}
      <rect x="95" y="155" width="16" height="39" rx="7" fill="${c.body}"/><rect x="128" y="158" width="16" height="36" rx="7" fill="${c.body}"/>
      <rect x="181" y="155" width="16" height="39" rx="7" fill="${c.body}"/><rect x="207" y="153" width="16" height="41" rx="7" fill="${c.body}"/>
      <path d="M91 195h24M125 195h21M177 195h23M203 195h25" stroke="${K}" stroke-width="6" stroke-linecap="round"/>
      <path d="M212 88 Q186 72 183 92 Q197 104 215 98Z" fill="${c.body}" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M208 90 Q192 83 190 92 Q199 98 211 95Z" fill="#e8a8a0"/>
      <path d="M257 88 Q283 70 288 90 Q274 103 255 97Z" fill="${c.body}" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M259 90 Q275 83 281 92 Q272 98 258 95Z" fill="#e8a8a0"/>
      <path d="M221 76 Q211 58 222 50 Q221 62 230 72Z" fill="#f4e8c6" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M249 74 Q259 56 248 48 Q249 60 240 70Z" fill="#f4e8c6" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M216 86 Q215 68 235 66 Q254 66 255 86 L263 112 Q268 138 246 140 L228 140 Q211 138 216 112Z" fill="${c.body}" stroke="${K}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M229 68 Q235 64 242 68 L240 92 Q235 96 230 92Z" fill="#fff" opacity=".55"/>
      <path d="M225 69 Q235 56 246 69 Q235 63 225 69Z" fill="${c.spots}" stroke="${K}" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="223" cy="114" r="6" fill="#ff8fa0" opacity=".3"/><circle cx="259" cy="114" r="6" fill="#ff8fa0" opacity=".3"/>
      <ellipse cx="228" cy="98" rx="6.5" ry="7.5" fill="#fff" stroke="${K}" stroke-width="1.5"/><circle cx="229.5" cy="99" r="4.2" fill="#1a1412"/><circle cx="231" cy="97" r="1.6" fill="#fff"/>
      <ellipse cx="250" cy="98" rx="6.5" ry="7.5" fill="#fff" stroke="${K}" stroke-width="1.5"/><circle cx="251.5" cy="99" r="4.2" fill="#1a1412"/><circle cx="253" cy="97" r="1.6" fill="#fff"/>
      <path d="M221 90 q4 -5 9 -3 M257 90 q-4 -5 -9 -3" stroke="${K}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="240" cy="127" rx="20" ry="12.5" fill="#f0b4aa" stroke="${K}" stroke-width="2"/>
      <ellipse cx="233" cy="125" rx="2.8" ry="3.8" fill="#7a3d3d"/><ellipse cx="247" cy="125" rx="2.8" ry="3.8" fill="#7a3d3d"/>
      <path d="M229 133 Q240 139 251 133" stroke="#7a3d3d" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${acc(c)}</g></svg>`;
}

const PG={home:"Home",farm:"Farm",shop:"Shop",auction:"Auction",more:"More",comp:"Comp"};
function showPage(p){
  page=p;document.querySelectorAll(".page").forEach(e=>e.classList.add("hidden"));
  $("#page"+(p.startsWith("ev:")?"Event":PG[p])).classList.remove("hidden");render();scrollTo(0,0);
}
function allBoxes(){return [...BOXES,seasonBox(),...activeEvents().map(eventBox)]}
const seasonBox=()=>{const s=SEI(Date.now());return{id:"s"+s,name:"Caixa de "+SEASONS[s].n,price:800,emoji:SEASONS[s].i,ex:"s"+s,p:EXP,desc:"Vacas exclusivas da estação! Só saem aqui."}};
const eventBox=e=>({id:"ev_"+e.id,name:"Caixa "+e.n,price:1500,emoji:e.e,ex:e.id,p:EXP,desc:"Vacas exclusivas do evento! Só saem aqui."});
function boxCard(b){return `<article class="box ${b.id==="arco"?"rb":""} ${b.ex?"exb":""}"><div class="box-emoji">${b.emoji}</div><h3>${b.name}</h3><p>${b.desc}</p>
  ${b.ex?`<small>⭐ ${COWS.filter(c=>c.ex===b.ex&&state.seen.includes(c.id)).length}/${COWS.filter(c=>c.ex===b.ex).length} vacas exclusivas descobertas</small>`:""}<div class="price">🪙 ${fmt(b.price)}</div>
  <button class="primary" onclick="openCase('${b.id}')" ${openingBusy||(state.coins<b.price&&!state.dev.free)||full()?"disabled":""}>${full()?"Fazenda cheia":"Abrir caixa"}</button></article>`}

function render(){
  $("#coins").textContent=fmt(state.coins);renderNav();
  if(page==="home"){
    const owned=new Set(state.seen);
    $("#uniqueCount").textContent=state.seen.length+"/"+COWS.length;$("#farmNm").textContent=state.farm;$("#totalCount").textContent=state.cows.length+"/"+farmCap();
    $("#boxes").innerHTML=[...BOXES,seasonBox()].map(boxCard).join("");
    $("#collection").innerHTML=COWS.filter(c=>bookF===-1||(bookF===-2?c.ex:(!c.ex&&c.r===bookF))).map(c=>{const o=owned.has(c.id);
      return `<div class="collection-card ${o?"":"locked"}">${o?`<div class="cow-art">${cowSVG(c)}</div>`:`<div class="silhouette">?</div>`}
      <h3>${o?c.name:"???"}</h3><span class="badge ${RC[c.r]}">${RN[c.r]}</span>${c.ex?" ⭐":""}</div>`}).join("");
    $("#bookTabs").innerHTML=[-1,0,1,2,3,4,5,6,-2].map(r=>{const l=COWS.filter(c=>r===-1||(r===-2?c.ex:(!c.ex&&c.r===r))),n=l.filter(c=>owned.has(c.id)).length;return `<button class="secondary ${bookF===r?"on":""}" onclick="bookF=${r};render()">${r===-1?"Todas":r===-2?"⭐ Exclusivas":RN[r]} ${n}/${l.length}</button>`}).join("");
  }
  if(page==="farm")renderFarm();if(page==="shop")renderShop();if(page==="auction")renderAuction();if(page==="more")renderMore();if(page.startsWith("ev:"))renderEvent(page.slice(3));
}

function freeRoom(){for(let i=0;i<rooms();i++)if(!RM[i])return i;return -1}
function parlorHTML(){return `<div id="parlor" class="parlor">${state.up.salas>=1?`<button class="primary milkall" data-a="milkall">🥛 Ordenhar todas</button>`:""}<div class="rooms" id="rooms"></div><small class="ph">Arraste uma vaca até uma sala livre</small></div>`}
function roomHTML(i){const r=RM[i],cc=r&&cowBy(r.c);return `<div class="room ${r?"busy":""}" data-room="${i}">${r?cowSVG(cc?type(cc):{name:"",body:"#999",spots:"#444",r:0})+`<div class="pb"><i data-pb="${i}"></i></div>`:`<span>🥛<br><small>Sala ${i+1}</small></span>`}</div>`}
function paintRooms(){const el=$("#rooms");if(!el)return;el.innerHTML=Array.from({length:rooms()},(_,i)=>roomHTML(i)).join("");
  RM.forEach((r,i)=>{if(!r)return;const b=document.querySelector(`[data-pb="${i}"]`);if(!b)return;const e=Date.now()-r.s;b.style.transition="none";b.style.width=Math.min(100,e/r.d*100)+"%";b.offsetWidth;b.style.transition=`width ${Math.max(0,r.d-e)}ms linear`;b.style.width="100%"})}

function renderFarm(){
  const s=season(),si=SEI(Date.now()),pr=price(slot()),pp=price(slot()-1),cp=cap(),tc=tankCap(),ev=activeEvents(),w=state.worker,mu=saleMult();
  const sorted=[...state.cows].sort((a,b)=>type(b).r-type(a).r);
  const groups={};state.cows.forEach(c=>(groups[c.t]=groups[c.t]||[]).push(c));
  const fuse=Object.entries(groups).filter(([id,l])=>l.length>=3&&COWS.find(x=>x.id===id).r<6);
  const hist=[7,6,5,4,3,2,1,0].map(i=>price(slot()-i)),mx=3.6;
  const pasto=`<section><h2>🐄 Pasto — ${state.farm} (${state.cows.length}/${farmCap()})</h2>
    <div class="pasture">${sorted.length?sorted.map(c=>{const t=type(c),r=t.r;return `<div class="fcow ${ready(c)?"rdy":""}">
      <div class="cow-art" data-drag="${c.u}" title="Arraste até a sala de ordenha" style="--d:${-(c.u%7)}s">${cowSVG(t)}</div>
      <h3>${cname(c)}</h3>${c.nick?`<small>${t.name}</small><br>`:""}<span class="badge ${RC[r]}">${RN[r]}</span>${t.ex?" ⭐":""}<br><small>🥛 ${r===6?`enche o tanque`:c.L+" L"}</small>
      <div class="st" data-cd="${c.u}"></div><div class="bar cd"><i data-cdbar="${c.u}"></i></div>
      <small data-ev="${c.u}"></small><div class="bar ev"><i data-evbar="${c.u}"></i></div>
      <div class="row"><button class="secondary" data-a="cnick" data-u="${c.u}" title="Dar nome">✏️</button>${ready(c)?`<button class="secondary" data-a="milk" data-u="${c.u}">🥛 Ordenhar</button>`:""}${evoReady(c)?`<button class="primary" data-a="evo" data-u="${c.u}">🧬 Evoluir (${evoChance(c)}%)</button>`:""}
      <button class="secondary" data-a="sell" data-u="${c.u}">Vender 🪙${fmt(sellValue(c))}</button></div></div>`}).join(""):`<div class="empty">Sua fazenda está vazia. Abra caixas para ganhar vacas!</div>`}</div></section>`;
  $("#farm").innerHTML=`${ev.length?`<div class="evban">🎉 ${ev.map(e=>e.e+" "+e.n).join(" · ")} — dinheiro do leite em dobro!</div>`:""}
  <div class="hud">
    <div class="hc s${si}"><div class="big">${s.i}</div><div class="hb"><small>ESTAÇÃO</small><b>${s.n}</b><div class="time" id="tSeason"></div><small>até a próxima estação</small><div class="bar"><i id="bSeason"></i></div>${s.f<1?'<div class="warn">❄️ Vacas produzem 40% menos · leite mais caro</div>':""}</div></div>
    <div class="hc"><div class="hb"><small>PREÇO DO LEITE (por litro)</small><div class="bigp">🪙 ${(pr*mu).toFixed(2)} <span class="${pr>pp?"up":pr<pp?"down":""}">${pr>pp?"▲":pr<pp?"▼":"■"} ${Math.abs(pr-pp).toFixed(2)}</span></div>${mu>1?`<small>base ${pr.toFixed(2)} × ${mu.toFixed(2)} (eventos/contratos)</small>`:""}
      ${miniChart()}
      <div class="time sm" id="tPrice"></div><small>até o próximo preço</small><div class="bar"><i id="bPrice"></i></div>${guessBtns()}</div></div>
    <div class="hc"><div class="big">🥛</div><div class="hb"><small>TANQUE DE LEITE</small><b>${fmt(state.milk)} / ${tc} L</b>${state.milk>=tc?'<span class="warn" style="color:#f88"> CHEIO!</span>':""}<div class="bar t"><i style="width:${state.milk/tc*100}%"></i></div>
      <button class="primary" data-a="sellmilk" ${state.milk?"":"disabled"}>Vender (🪙 ${fmt(state.milk*pr*mu)})</button></div></div>
  </div>
  <div class="tabs"><button class="secondary ${farmTab==="pasto"?"on":""}" data-a="ftab" data-t="pasto">🐄 Pasto</button><button class="secondary ${farmTab==="bez"?"on":""}" data-a="ftab" data-t="bez">🍼 Bezerros e procriação (${state.calves.length})</button><button class="secondary ${farmTab==="coz"?"on":""}" data-a="ftab" data-t="coz">🍳 Cozinha</button></div>
  <div class="fgrid">
   ${farmTab==="pasto"?pasto:farmTab==="coz"?kitchenHTML():nurseryHTML()}
   <aside>
    ${parlorHTML()}
    ${w.lvl?`<div class="panel">👷 <b>Trabalhador nv ${w.lvl}</b>: ${!w.on?"parado":w.strike?"em greve (sem moedas)":"trabalhando"}<div class="time sm" id="wtime"></div><small>próxima ação</small><div class="bar"><i id="wbar"></i></div></div>`:""}
    ${troughHTML()}
   </aside></div>
  ${farmTab==="pasto"?`<section class="section"><h2>🔀 Fusão</h2><p style="color:#aeb6a9">Junte 3 vacas repetidas: chance base de ${fuseChance(0)}% de ganhar uma vaca de raridade melhor (metade para Mítica/Única). Se falhar, você recebe 1 vaca da mesma raridade.</p>
   ${fuse.length?fuse.map(([id,l])=>{const t=COWS.find(x=>x.id===id);return `<div class="fuse"><span><b>${t.name}</b> <span class="badge ${RC[t.r]}">${RN[t.r]}</span> × ${l.length}</span><button class="primary" data-a="fuse" data-id="${id}">Fundir 3</button></div>`}).join(""):`<div class="empty">Você precisa de 3 vacas iguais para fundir.</div>`}</section>`:""}`;
  paintRooms();tick(true);
}

function renderShop(){renderShop0();$("#shop").insertAdjacentHTML("beforeend",bullsHTML()+rebirthHTML())}
function renderShop0(){
  const w=state.worker,wl=w.lvl;
  $("#shop").innerHTML=`
  <h1 style="margin:0 0 14px">🛒 Loja</h1>
  <section class="shop-sec"><h2>🌾 Comidas</h2><div class="sgrid">${FOODS.map((f,i)=>`<div class="item"><div class="ie">${f.e}</div><h3>${f.n}</h3><small>Qualidade ${"★".repeat(i+1)}${"☆".repeat(3-i)}</small><small>🪙 ${f.p} por unidade · estoque: <b>${state.stock[i]}</b></small>
    <div><button class="primary" data-a="buy" data-i="${i}" data-n="10" ${state.coins<f.p*10?"disabled":""}>10× 🪙${f.p*10}</button> <button class="secondary" data-a="buy" data-i="${i}" data-n="50" ${state.coins<f.p*50?"disabled":""}>50× 🪙${f.p*50}</button></div></div>`).join("")}</div>
    <small>Comida melhor aumenta o leite produzido.</small></section>
  <section class="shop-sec"><h2>💩 Esterco</h2><div class="item wide"><div class="ie">🧺</div><div><b>${state.dung}</b> unidades guardadas · 🪙 ${fmt(DUNG*(1+.05*state.rb))} cada<br><button class="primary" data-a="selldung" ${state.dung?"":"disabled"}>Vender tudo (🪙 ${dungTotal()})</button></div></div></section>
  <section class="shop-sec"><h2>🏗️ Melhorias da fazenda</h2><div class="sgrid">${Object.entries(UPS).map(([k,u])=>{const l=state.up[k],M=upMax(k);
    return `<div class="item"><h3>${u.n}</h3><div class="bar lv"><i style="width:${l/M*100}%"></i></div><small>Nível ${l}/${M}</small><small>Agora: ${u.d(l)}</small>
    ${l>=M?(M<100?`<b>Nível máximo atual</b><small>🔒 Renasça para liberar +10 níveis (até o nível 100)</small>`:"<b>Nível máximo!</b>"):`<small>Próximo: ${u.d(l+1)}</small><button class="primary" data-a="up" data-k="${k}" ${state.coins<upCost(k)?"disabled":""}>Melhorar 🪙${fmt(upCost(k))}</button>`}</div>`}).join("")}</div></section>
  <section class="shop-sec"><h2>👷 Trabalhador</h2><div class="item wide"><div class="ie">👷</div><div>
   ${!wl?`Ele compra comida (cobrada de você), enche água e cocho, limpa o esterco, ordenha as vacas e vende o leite. Não abre caixas nem vende vacas. Só trabalha com o jogo aberto.<br><small>Nível 1: 1 ação a cada ${wki(1)/1000}s · salário 🪙${wkw(1)} / 10 min</small><br><button class="primary" data-a="hire" ${state.coins<wkc(1)?"disabled":""}>Contratar 🪙${fmt(wkc(1))}</button>`
   :`<b>Nível ${wl}/${wmax()}</b> · 1 ação a cada ${wki(wl)/1000}s · salário 🪙${wkw(wl)} / 10 min ${w.strike?'<b style="color:#f88">(EM GREVE: sem moedas)</b>':""}<div class="bar lv"><i style="width:${wl/wmax()*100}%"></i></div>
    ${wl<wmax()?`<small>Próximo: 1 ação a cada ${wki(wl+1)/1000}s · salário 🪙${wkw(wl+1)}</small><br><button class="primary" data-a="wup" ${state.coins<wkc(wl+1)?"disabled":""}>Melhorar 🪙${fmt(wkc(wl+1))}</button> `:"<b>Nível máximo!</b> "}
    <button class="secondary" data-a="wtoggle">${w.on?"⏸ Pausar":"▶ Retomar"}</button><br><small>Comida que ele compra:</small><br>${FOODS.map((f,i)=>`<button class="${w.food===i?"primary":"secondary"}" data-a="wfood" data-i="${i}">${f.e} ${f.n}</button>`).join("")}`}
  </div></div></section>`;
}
function rebirthHTML(){const n=state.rb,need=25000*(n+1);return `<section class="shop-sec"><h2>♻️ Renascimento</h2><div class="item wide"><div class="ie">♻️</div><div><b>Renascimentos: ${n}</b><br><small>Bônus atuais: 🥛 +${10*n}% leite · 🧬 +${2*n}% evolução/fusão · 💰 +${5*n}% venda de vacas e esterco · início com 🪙${fmt(1000+500*n)}</small><br><small>Próximo (nível ${n+1}): 🥛 +${10*n+10}% · 🧬 +${2*n+2}% · 💰 +${5*n+5}% · início com 🪙${fmt(1500+500*n)}</small><br><small>Requisito: ter 🪙 ${fmt(need)}. Você perde moedas, vacas, melhorias, comida e trabalhador, mas mantém o livro de pelagens, conquistas e estatísticas.</small><br><button class="primary" data-a="rebirth" ${state.coins<need?"disabled":""}>Renascer</button></div></div></section>`}
function rebirth(){const need=25000*(state.rb+1);if(state.coins<need)return toast(`Você precisa de 🪙 ${fmt(need)} para renascer.`);
 if(!confirm(`Renascer? Você perde moedas, vacas, melhorias, comida e trabalhador, mas mantém o livro de pelagens e ganha bônus permanentes (nível ${state.rb+1}).`))return;
 const k={seen:state.seen,rb:state.rb+1,stats:state.stats,ach:state.ach,name:state.name,used:state.used,dev:state.dev,missions:state.missions,farm:state.farm,pid:state.pid,mt:state.mt,gs:state.gs};
 state=Object.assign(def(),k,{coins:1000+500*k.rb});save();toast(`♻️ Renascimento ${k.rb} concluído!`);render()}

function pickFrom(list,box){const W=c=>c.weight*(box?box.m[c.r]*DIFF[c.r]:1),t=list.reduce((s,c)=>s+W(c),0);let r=Math.random()*t;for(const c of list){r-=W(c);if(r<=0)return c}return list[0]}
const pickCow=box=>pickByP(box);
const newCow=(t,L,nick)=>state.cows.push({u:uid(),t:t.id,at:Date.now(),m:0,L:L||rollL(t),nick:nick||""});
function discover(t){if(state.seen.includes(t.id))return;state.seen.push(t.id);confetti()}
function confetti(){const c=document.createElement("canvas");c.className="confetti";c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext("2d"),P=Array.from({length:200},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.6,vx:Math.random()*4-2,vy:2+Math.random()*4,s:6+Math.random()*8,a:Math.random()*6,va:Math.random()*.3-.15,c:`hsl(${Math.random()*360},90%,60%)`}));let t=0;(function f(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);x.restore()});if(++t<280)requestAnimationFrame(f);else c.remove()})()}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,i=+b.dataset.i,c=cowBy(+b.dataset.u),w=state.worker;
  if(extraAction(a,b,c))return;
  if(a==="ftab")farmTab=b.dataset.t;
  else if(a==="milk"){if(RM.filter(Boolean).length>=rooms())return toast("Todas as salas estão ocupadas.");if(state.milk>=tankCap())return toast("Tanque cheio!");if(c&&ready(c)&&!RM.some(r=>r&&r.c===c.u))milkCow(c,freeRoom());return}
  else if(a==="sellmilk"){const L=state.milk,g=sellMilk();toast(`Vendeu ${fmt(L)} L de leite: +🪙${fmt(g)}`)}
  else if(a==="feed"){const f=Math.min(state.stock[i],cap()-state.trough.u);if(f<=0)return toast("Cocho cheio!");state.trough.u+=f;state.trough.q=i;state.stock[i]-=f;S("care");S("feeds")}
  else if(a==="water"){state.water=cap();S("care");S("waters")}
  else if(a==="clean"){state.dung+=state.manure;state.manure=0;S("cleans")}
  else if(a==="selldung"){toast(`Esterco vendido: +🪙${dungTotal()}`);S("dungSold",state.dung);earn(dungTotal());state.dung=0}
  else if(a==="buy"){const n=+b.dataset.n,cost=FOODS[i].p*n;if(state.coins>=cost){state.coins-=cost;state.stock[i]+=n;S("foodBought",n)}}
  else if(a==="up"){const k=b.dataset.k;if(state.coins>=upCost(k)&&state.up[k]<upMax(k)){state.coins-=upCost(k);state.up[k]++;S("upgrades")}}
  else if(a==="hire"&&state.coins>=wkc(1)){state.coins-=wkc(1);Object.assign(w,{lvl:1,paid:slot(),last:Date.now(),on:true,strike:false})}
  else if(a==="wup"&&w.lvl<wmax()&&state.coins>=wkc(w.lvl+1)){state.coins-=wkc(w.lvl+1);w.lvl++}
  else if(a==="rebirth")return rebirth();
  else if(a==="wtoggle")w.on=!w.on;
  else if(a==="wfood")w.food=i;
  else if(a==="sell"&&c){if(!confirm(`Vender ${type(c).name} por ${sellValue(c)} moedas?`))return;earn(sellValue(c));S("cowsSold");state.cows=state.cows.filter(x=>x!==c)}
  else if(a==="evo"&&c&&evoReady(c)){
    if(Math.random()*100<evoChance(c)){const n=pickFrom(REG.filter(x=>x.r===type(c).r+1));toast(`🎉 Evoluiu! Agora é ${n.name} (${RN[n.r]})`);c.t=n.id;c.L=rollL(n);discover(n);S("evos")}
    else toast("Não deu certo desta vez. Tente de novo em 24 h.");
    c.at=Date.now()}
  else if(a==="fuse"){const id=b.dataset.id,t=COWS.find(x=>x.id===id),l=state.cows.filter(x=>x.t===id).slice(0,3);
    state.cows=state.cows.filter(x=>!l.includes(x));S("fuses");
    if(Math.random()*100<fuseChance(t.r)){const n=pickFrom(REG.filter(x=>x.r===t.r+1));newCow(n);discover(n);toast(`✨ Fusão perfeita! Você ganhou ${n.name} (${RN[n.r]})!`)}
    else{const n=pickFrom(REG.filter(x=>x.r===t.r));newCow(n);discover(n);toast(`A fusão não subiu de raridade: você recebeu ${n.name}.`)}}
  save();render();
});
document.addEventListener("change",e=>{if(e.target.id==="bCow")selCow=+e.target.value;if(e.target.id==="bBull")selBull=+e.target.value});

/* ===== Ordenha ===== */
function milkAmount(c){const t=type(c),space=tankCap()-state.milk;if(t.r===6)return Math.max(0,space);
  const care=(state.trough.u>0?1:.7)*(state.water>0?1:.7)*(state.manure>=10?.7:1)*(1+.05*tq());
  return Math.max(0,Math.min(space,Math.max(1,Math.round(c.L*season().f*care*(1+.1*state.up.ordenha)*(1+.1*state.rb)))))}
function doMilk(c){
    const L=milkAmount(c);
  state.milk+=L;state.trough.u=Math.max(0,state.trough.u-1);state.water=Math.max(0,state.water-1);state.manure++;c.m=Date.now();S("milkings");S("milkL",L);return L;
}
document.addEventListener("pointerdown",e=>{
  const a=e.target.closest("[data-drag]");if(!a)return;
  const c=cowBy(+a.dataset.drag);if(!c)return;
  if(RM.some(r=>r&&r.c===c.u))return toast("Essa vaca já está sendo ordenhada.");
  if(RM.filter(Boolean).length>=rooms())return toast("Todas as salas de ordenha estão ocupadas.");
  if(state.milk>=tankCap())return toast("Tanque cheio! Venda o leite ou melhore o tanque na Loja.");
  if(!ready(c))return toast("Essa vaca ainda está descansando.");
  const g=a.cloneNode(true);g.className="ghost";g.removeAttribute("data-drag");g.style.removeProperty("--d");document.body.appendChild(g);
  drag={c,g,y:e.clientY,t:setInterval(()=>{if(drag.y<110)scrollBy(0,-18);else if(drag.y>innerHeight-110)scrollBy(0,18)},25)};mv(e);e.preventDefault();
});
function roomAt(e){const P=$("#parlor");if(!P)return -1;const hit=r=>e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
  const rs=[...document.querySelectorAll(".room")];for(let i=0;i<rs.length;i++)if(hit(rs[i].getBoundingClientRect()))return i;
  if(hit(P.getBoundingClientRect())){for(let i=0;i<rooms();i++)if(!RM[i])return i}return -1}
function mv(e){if(!drag)return;drag.y=e.clientY;drag.g.style.left=e.clientX+"px";drag.g.style.top=e.clientY+"px";$("#parlor")?.classList.toggle("over",roomAt(e)>=0)}
document.addEventListener("pointermove",mv);
document.addEventListener("pointerup",e=>{if(!drag)return;const d=drag;drag=null;clearInterval(d.t);d.g.remove();$("#parlor")?.classList.remove("over");
  const ri=roomAt(e);if(ri>=0){if(RM[ri])toast("Essa sala está ocupada.");else milkCow(d.c,ri)}});
async function milkCow(c,ri){
  const dur=milkDur();RM[ri]={c:c.u,s:Date.now(),d:dur};paintRooms();
  await new Promise(r=>setTimeout(r,dur));RM[ri]=null;
  const cc=cowBy(c.u);if(!cc||!ready(cc)||state.milk>=tankCap()){render();return}
  const L=doMilk(cc);save();toast(`🥛 ${cname(cc)}: +${L} L de leite`);render();
}

/* ===== Trabalhador ===== */
function workerStep(){
  const cp=cap(),fi=state.worker.food;
  if(state.manure>=3){state.dung+=state.manure;state.manure=0;return true}
  if(state.water<cp*.5){state.water=cp;return true}
  if(state.trough.u<cp*.5){
    const need=cp-state.trough.u;
    if(state.stock[fi]<need){const buy=need-state.stock[fi],cost=buy*FOODS[fi].p;if(state.coins>=cost){state.coins-=cost;state.stock[fi]+=buy}}
    const put=Math.min(state.stock[fi],need);
    if(put>0){state.trough.u+=put;state.trough.q=fi;state.stock[fi]-=put;return true}
  }
  if(state.milk<tankCap()){let n=0;for(const c of state.cows){if(n>=rooms()||state.milk>=tankCap())break;if(ready(c)&&!RM.some(r=>r&&r.c===c.u)){doMilk(c);n++}}if(n)return true}
  if(state.milk>=tankCap()*.5){sellMilk();return true}
  if(state.manure>0){state.dung+=state.manure;state.manure=0;return true}
  return false;
}
function work(){
  const w=state.worker;if(!w.lvl||!w.on||drag)return;const now=Date.now();
  if(w.paid!==slot()&&Math.floor(now/600000)!==w.paidT){const wage=wkw(w.lvl);if(state.coins>=wage){state.coins-=wage;w.paid=slot();w.paidT=Math.floor(now/600000);w.strike=false;save()}else{if(!w.strike){w.strike=true;render()}return}}
  if(now-w.last<wki(w.lvl))return;w.last=now;
  if(workerStep()){S("workerActs");save();render()}
}

/* ===== Relógio ===== */
const setBar=(el,p)=>{if(el)el.style.width=Math.max(0,Math.min(100,p*100)).toFixed(1)+"%"};
function tick(force){
  if(page!=="farm"||!$("#tSeason"))return;
  const now=Date.now(),sr=SEASON_MS-now%SEASON_MS,pr=SLOT_MS-now%SLOT_MS,w=state.worker;
  $("#tSeason").textContent=clock(sr);$("#tSeason").classList.toggle("soon",sr<60000);setBar($("#bSeason"),1-sr/SEASON_MS);
  $("#tPrice").textContent=clock(pr);$("#tPrice").classList.toggle("soon",pr<60000);setBar($("#bPrice"),1-pr/SLOT_MS);
  if(w.lvl&&$("#wtime")){const rem=w.on&&!w.strike?wki(w.lvl)-(now-w.last):0;$("#wtime").textContent=w.on&&!w.strike?clock(rem):"—";setBar($("#wbar"),w.on&&!w.strike?1-rem/wki(w.lvl):0)}
  for(const c of state.cows){
    const a=document.querySelector(`[data-cd="${c.u}"]`);if(!a)continue;
    const e=document.querySelector(`[data-ev="${c.u}"]`),rd=ready(c),rs=now<(c.rest||0);
    a.textContent=rs?"💕 Descansando "+clock((c.rest||0)-now):rd?"✅ Pronta para ordenhar":"⏳ Descansa "+clock(cdMs()-(now-c.m));a.className="st"+(rd?" ok":"");
    setBar(document.querySelector(`[data-cdbar="${c.u}"]`),rs?1-((c.rest||0)-now)/BREST:rd?1:(now-c.m)/cdMs());
    e.textContent=type(c).r>=6?"⭐ Raridade máxima":evoReady(c)?"🧬 Pode evoluir!":"🧬 Evolui em "+clock(EVO-(now-c.at));
    setBar(document.querySelector(`[data-evbar="${c.u}"]`),type(c).r>=6?1:(now-c.at)/EVO);
  }
  for(const k of state.calves){const t=document.querySelector(`[data-ct="${k.u}"]`);if(t){t.textContent=k.g<=now?"✅ Pronto!":"Crescendo: "+clock(k.g-now);setBar(document.querySelector(`[data-cbar="${k.u}"]`),1-(k.g-now)/CALF)}}
  const sig=slot()+"|"+SEI(now)+"|"+state.cows.map(c=>(ready(c)?1:0)+""+(evoReady(c)?1:0)).join("")+state.calves.map(k=>k.g<=now?1:0).join("");
  if(force===true)lastSig=sig;else if(sig!==lastSig&&!drag&&!RM.some(Boolean)){lastSig=sig;renderFarm()}
}
setInterval(()=>{work();tick();extraTick()},1000);

/* ===== Abertura de caixas ===== */
const delay=ms=>new Promise(r=>setTimeout(r,ms));
function animateProgress(d){return new Promise(res=>{const bar=$("#progressBar"),tx=$("#progressText"),s=performance.now();
  (function f(n){const p=Math.min(1,(n-s)/d);bar.style.width=(p*100).toFixed(1)+"%";tx.textContent=Math.round(p*100)+"%";p<1?requestAnimationFrame(f):res()})(s)})}
function showModal(){$("#closeX").classList.add("hidden");$("#modal").classList.remove("hidden");$("#openingStage").classList.remove("hidden");$("#resultStage").classList.add("hidden");$("#continueBtn").disabled=true;
  $("#progressBar").style.width="0%";$("#progressText").textContent="0%";$("#caseWrap").innerHTML=`<div class="case-icon">📦</div><div class="case-shadow"></div>`}
function showResult(c,isNew){$("#closeX").classList.remove("hidden");$("#newTag").classList.toggle("hidden",!isNew);if(isNew)confetti();$("#openingStage").classList.add("hidden");$("#resultStage").classList.remove("hidden");$("#cowResult").innerHTML=cowSVG(c,"result-cow");
  $("#resultName").textContent=c.name;$("#resultRarity").textContent=RN[c.r]+(c.ex?" · Exclusiva ⭐":"");$("#resultRarity").className="result-rarity "+RC[c.r];$("#continueBtn").disabled=false}
async function openCase(id){
  if(openingBusy)return;const box=allBoxes().find(b=>b.id===id);if(!box||(state.coins<box.price&&!state.dev.free))return;
  if(full())return toast("Sua fazenda está cheia! Venda vacas ou melhore o Curral na Loja.");
  openingBusy=true;if(!state.dev.free)state.coins-=box.price;S("boxes");if(box.ex)S("eventBoxes");save();render();showModal();
  try{const icon=$("#caseWrap .case-icon");icon.classList.add("shake");await animateProgress(1450);icon.classList.remove("shake");icon.classList.add("openCaseAnim");await delay(480);
    const cow=pickCow(box),isNew=!state.seen.includes(cow.id);S("got"+cow.r);newCow(cow);if(isNew)state.seen.push(cow.id);save();await delay(120);showResult(cow,isNew)}
  catch(err){console.error(err);openingBusy=false;$("#modal").classList.add("hidden");render()}
}
$("#closeX").addEventListener("click",()=>{openingBusy=false;$("#modal").classList.add("hidden");render()});
$("#continueBtn").addEventListener("click",()=>{if(!openingBusy)return;openingBusy=false;$("#modal").classList.add("hidden");showPage("farm")});

function glow(c){return c.r!==5?"":[[84,88,0],[232,62,.6],[112,178,1.2],[212,170,1.8],[160,84,.9],[70,130,.3]].map(([x,y,b])=>`<text x="${x}" y="${y}" font-size="15" fill="#fff3b0" text-anchor="middle">✦<animate attributeName="opacity" values="0;1;0" dur="1.9s" begin="${b}s" repeatCount="indefinite"/></text>`).join("")}
function acc(c){const K="#2a2420",i=(+String(c.id).split("_").pop()||0)%3,st=`stroke="${K}" stroke-width="2"`;switch(c.ex){
 case"natal":return `<path d="M214 70 Q222 34 262 28 Q250 46 256 68Z" fill="#d63a3a" ${st}/><rect x="211" y="63" width="48" height="10" rx="5" fill="#fff" ${st}/><circle cx="262" cy="28" r="6.5" fill="#fff" ${st}/>`+(i?`<path d="M206 132 Q226 150 252 144 L254 154 Q226 160 204 142Z" fill="#2f8f4e" ${st}/><circle cx="216" cy="150" r="3" fill="#f2d24b"/>`:"");
 case"halloween":return `<path d="M212 70 L240 14 L260 70Z" fill="#2a1a3a" ${st}/><rect x="208" y="64" width="56" height="9" rx="4" fill="#ff8a1f" ${st}/>`+(i?`<text x="206" y="152" font-size="22">🎃</text>`:"");
 case"pascoa":return `<ellipse cx="226" cy="42" rx="7" ry="22" fill="#fff" ${st}/><ellipse cx="226" cy="44" rx="3.5" ry="14" fill="#ffb3d1"/><ellipse cx="250" cy="40" rx="7" ry="22" fill="#fff" ${st} transform="rotate(12 250 40)"/><ellipse cx="250" cy="42" rx="3.5" ry="14" fill="#ffb3d1" transform="rotate(12 250 40)"/>`+(i?`<path d="M222 142 l-14 -9 v18Z M234 142 l14 -9 v18Z" fill="#ff7ab8"/><circle cx="228" cy="142" r="4.5" fill="#ff4f9a"/>`:"");
 case"virada":return `<path d="M222 68 L240 22 L254 68Z" fill="#7a4ff0" ${st}/><path d="M227 56h25M232 42h15" stroke="#ffd447" stroke-width="4"/><circle cx="240" cy="20" r="5" fill="#ffd447"/><circle cx="205" cy="60" r="3" fill="#ff4f9a"/><circle cx="276" cy="64" r="3" fill="#4fd6ff"/><circle cx="268" cy="40" r="3" fill="#7dff8a"/>`;
 case"alien":return `<path d="M224 68 Q214 46 208 34M250 66 Q262 44 270 32" stroke="#4a5a4a" stroke-width="3" fill="none"/><circle cx="207" cy="32" r="6" fill="#9dff6b" ${st}><animate attributeName="opacity" values=".4;1;.4" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="271" cy="30" r="6" fill="#9dff6b" ${st}><animate attributeName="opacity" values="1;.4;1" dur="1.2s" repeatCount="indefinite"/></circle>`;
 case"vulcao":return `<path d="M222 70 Q216 52 228 40 Q226 56 236 48 Q238 34 246 28 Q246 46 256 52 Q260 62 252 70Z" fill="#ff7a1a" stroke="${K}" stroke-width="1.5"/><path d="M232 70 Q232 56 240 50 Q246 60 244 70Z" fill="#ffd447"/>`;
 case"louca":return [228,250].map(x=>`<circle cx="${x}" cy="98" r="6.5" fill="#fff" ${st}/><circle cx="${x}" cy="98" r="4.5" fill="none" stroke="#7a1fd0" stroke-width="1.6"/><circle cx="${x}" cy="98" r="2" fill="none" stroke="#7a1fd0" stroke-width="1.6"/>`).join("")+`<path d="M236 134 q3 15 13 3z" fill="#ff5a7a" ${st}/>`;
 case"geada":return `<path d="M220 70 L224 46 L231 62 L240 40 L249 62 L256 46 L258 70Z" fill="#bfeaff" stroke="#3a7aa8" stroke-width="2" stroke-linejoin="round"/>`+(i?`<path d="M226 141l3 12 3-12M240 141l3 14 3-14" stroke="#9fd8ff" stroke-width="3" stroke-linejoin="round"/>`:"");
 case"condensado":return `<path d="M218 74 Q235 58 252 74 L252 84 Q248 98 244 84 Q240 102 236 84 Q232 94 228 84 Q222 98 220 84Z" fill="#ffc43a" stroke="#a8741a" stroke-width="1.5"/>`;
 case"mar":return `<path d="M214 70 Q214 46 238 44 Q262 46 258 70Z" fill="#fff" ${st}/><rect x="212" y="65" width="48" height="8" rx="4" fill="#1d4f7a" ${st}/><text x="231" y="60" font-size="11" fill="#1d4f7a">⚓</text>`+(i?`<path d="M206 134 Q226 150 252 144" stroke="#1d4f7a" stroke-width="7" fill="none"/><path d="M212 138l4-6M224 144l4-6M236 146l4-6" stroke="#fff" stroke-width="3"/>`:"");
 case"terror":return `<path d="M214 66 Q224 50 232 66 Q238 58 244 66 Q252 50 262 66 Q248 62 238 76 Q226 62 214 66Z" fill="#1c1c28" ${st}/><circle cx="229.5" cy="99" r="4.2" fill="#ff2a2a"><animate attributeName="opacity" values=".6;1;.6" dur="1.4s" repeatCount="indefinite"/></circle><circle cx="251.5" cy="99" r="4.2" fill="#ff2a2a"><animate attributeName="opacity" values=".6;1;.6" dur="1.4s" repeatCount="indefinite"/></circle>`;
 case"s0":return `<circle cx="222" cy="66" r="5.5" fill="#ff6fb0"/><circle cx="236" cy="61" r="5.5" fill="#ffd447"/><circle cx="250" cy="66" r="5.5" fill="#ff6fb0"/><path d="M216 70 Q236 56 256 70" stroke="#4fa84a" stroke-width="3" fill="none"/>`;
 case"s1":return `<rect x="219" y="91" width="19" height="13" rx="5" fill="#111"/><rect x="241" y="91" width="19" height="13" rx="5" fill="#111"/><path d="M238 96h3" stroke="#111" stroke-width="3"/>`;
 case"s2":return `<path d="M226 66 Q236 44 254 58 Q244 72 226 66Z" fill="#d9822b" ${st}/><path d="M230 64 L248 58" stroke="#6b3a14" stroke-width="1.5"/>`;
 case"s3":return `<path d="M216 72 Q216 44 238 42 Q260 44 258 72Z" fill="#4a78c8" ${st}/><rect x="214" y="66" width="46" height="9" rx="4" fill="#e8f4ff" ${st}/><circle cx="238" cy="40" r="5" fill="#e8f4ff" ${st}/>`;
 case"prehist":return `<rect x="214" y="62" width="48" height="9" rx="4" fill="#f1e6c8" ${st} transform="rotate(-12 238 66)"/><circle cx="214" cy="56" r="6" fill="#f1e6c8" ${st}/><circle cx="262" cy="74" r="6" fill="#f1e6c8" ${st}/>`+(i?`<path d="M208 136 Q226 156 252 148" stroke="#6b4a22" stroke-width="5" fill="none"/><path d="M214 146l3 8 3-8M228 150l3 8 3-8M242 150l3 8 3-8" fill="#fff8e0"/>`:"");
 default:return c.ac?gacc(c.ac):""}}
function gacc(a){const K="#2a2420",st=`stroke="${K}" stroke-width="2"`;switch(a){
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
 default:return ""}}
