export const HEROES = [
{id:'gojo',name:'Satoru Gojo',short:'Gojo',title:'The strongest',color:'#75d9ec',hair:'#f2eff8',skin:'#ffe6d0',outfit:'#51435e',abilities:['Lapse · Blue','Reversal · Red','Hollow Purple'],special:'Six Eyes',weapon:'fist'},
{id:'yuji',name:'Yuji Itadori',short:'Yuji',title:'Unbreakable spirit',color:'#f29786',hair:'#e9a49c',skin:'#ffe1c4',outfit:'#29374a',abilities:['Divergent Fist','Lunging Strike','Black Flash Barrage'],special:'Fighting spirit',weapon:'fist'},
{id:'megumi',name:'Megumi Fushiguro',short:'Megumi',title:'Ten Shadows',color:'#92b7aa',hair:'#202b39',skin:'#f5d9c1',outfit:'#29394b',abilities:['Divine Dog','Nue','Chimera Shadow Garden'],special:'Shadow step',weapon:'fist'},
{id:'nobara',name:'Nobara Kugisaki',short:'Nobara',title:'Straw Doll Technique',color:'#e9ac75',hair:'#a96b42',skin:'#ffe3ca',outfit:'#303c50',abilities:['Nail Volley','Hairpin','Resonance'],special:'Straw doll',weapon:'hammer'},
{id:'yuta',name:'Yuta Okkotsu',short:'Yuta',title:'A promise to Rika',color:'#c1abe9',hair:'#253039',skin:'#f7ddc8',outfit:'#e6e5e1',abilities:['Rika Strike','Cursed Speech','Rika Manifestation'],special:'Reverse technique',weapon:'katana'},
{id:'maki',name:'Maki Zenin',short:'Maki',title:'Heavenly resolve',color:'#92bca0',hair:'#274a40',skin:'#f7dcc0',outfit:'#344550',abilities:['Sweeping Strike','Vaulting Slam','Weapon Barrage'],special:'Weapon focus',weapon:'polearm'}
];
export const CLIPS = [
['IDLE_SOUTH',6,8,'idle'],['IDLE_NORTH',4,6,'idle'],['IDLE_SIDE',6,8,'idle'],['WALK_SOUTH',8,12,'walk'],['WALK_NORTH',8,12,'walk'],['WALK_SIDE',8,12,'walk'],['RUN_DASH',6,16,'dash'],['SIT_COZY_SNACK',6,6,'sit'],['EMOTE_BOOP_WAVE',6,10,'wave'],['CHOP_AXE_SWING',6,12,'chop'],['MINE_PICKAXE',6,12,'mine'],['WATER_FORAGE',6,10,'water'],['UNSEAL_SIX_EYES',8,14,'unseal'],['COMBAT_MELEE_BF',8,16,'melee'],['CAST_LAPSE_BLUE',6,12,'blue'],['CAST_REVERSAL_RED',6,12,'red'],['CAST_HOLLOW_PURPLE',8,12,'purple'],['HIT_INFINITY_GUARD',4,10,'guard'],['HURT',4,12,'hurt'],['DEFEAT',6,8,'defeat'],['RECOVERY',6,10,'recovery'],['CHECKPOINT',6,10,'checkpoint'],['TELEPORT',8,12,'teleport'],['HEADGEAR_TRANSITION',6,12,'unseal']
].map(([id,frames,fps,kind],i)=>({id,frames:8,fps:fps*8/frames,kind,row:i,loop:['idle','walk','sit','guard'].includes(kind),active:({chop:[3],mine:[3],water:[3],melee:[1,4,6],blue:[3],red:[3],purple:[5],checkpoint:[3]})[kind]||[]}));
export const REGIONS = [
{id:'school',name:'Tokyo Jujutsu High',subtitle:'A little peace, before the curtain.',color:'#d6dfb4',sky:'#e9e5cf',checkpoints:[['School Gate',-11,8],['Training Courtyard',5,-5]],exits:[['forest',15,8],['tokyo',-15,-9]],objective:'Meet your classmates in the courtyard'},
{id:'forest',name:'Whispering Shrine',subtitle:'Where the forest keeps its secrets.',color:'#b5cf9d',sky:'#dce8cd',checkpoints:[['Meadow Shrine',-8,6],['Forest Torii',9,-9]],exits:[['school',-15,8],['tokyo',15,-9]],objective:'Gather wood and crystals for a lantern'},
{id:'tokyo',name:'Tokyo Backstreets',subtitle:'Something stirs behind the everyday.',color:'#c6c9bc',sky:'#e7ded2',checkpoints:[['Shopping Street',-6,6],['Station Entrance',6,-7]],exits:[['school',-15,8],['shibuya',15,-8]],objective:'Clear the streets and reach the station'},
{id:'shibuya',name:'Shibuya · The Curtain',subtitle:'Stay together. The city feels different.',color:'#727c88',sky:'#b8b6c5',checkpoints:[['Crossing',-6,6],['Underground Platform',6,-8]],exits:[['tokyo',-15,9],['domain',15,-9]],objective:'Find the talisman beneath the crossing'},
{id:'domain',name:'Beyond the Veil',subtitle:'An impossible place. An inevitable fight.',color:'#6c527f',sky:'#3c304f',checkpoints:[['Domain Threshold',0,9]],exits:[['shibuya',-15,9]],objective:'Exorcise the curse within the domain'}
];
export const ENEMIES = [
{id:'fly',name:'Fly Head',hp:60,speed:3.8,damage:8,color:'#a68cb4',type:'swarm'},
{id:'lurker',name:'Shadow Lurker',hp:150,speed:3,damage:18,color:'#514766',type:'lunge'},
{id:'finger',name:'Finger Bearer',hp:650,speed:2.4,damage:35,color:'#d9b67d',type:'slam'},
{id:'jogo',name:'Jogo',hp:800,speed:2.4,damage:35,color:'#cb8b68',type:'fire'},
{id:'hanami',name:'Hanami',hp:900,speed:2,damage:32,color:'#c2c49c',type:'roots'},
{id:'mahito',name:'Mahito',hp:850,speed:2.8,damage:30,color:'#8fbdc8',type:'lunge'},
{id:'sukuna',name:'Ryomen Sukuna',hp:1100,speed:3,damage:40,color:'#dd948b',type:'slash'}
];
export const COSTS=[45,65,140], COOLDOWNS=[4,6,12];
export const DEFAULT_PARTY=['gojo'];
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function stats(level=1){return {maxHp:500+25*level,maxCe:300+20*level};}
export function abilityStats(slot,awakened=false){return {cost:COSTS[slot]*(awakened?.2:1),cooldown:COOLDOWNS[slot]*(awakened?.5:1),damage:[96,140,450][slot]*(awakened?1.5:1)};}
export function infinityFactor(d){return clamp(((d-.65)/(.95))**3,0,1);}
export function travelAllowed(s){return !s.bossActive&&s.combatTimer<=0;}
export const CHECKPOINTS=REGIONS.flatMap(r=>r.checkpoints.map(([name,x,z],i)=>({id:`${r.id}-${i}`,region:r.id,name,x,z})));
