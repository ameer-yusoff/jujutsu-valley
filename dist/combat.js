export const ENERGY_PROFILES={
 fly:{max:40,regen:4,cost:14},lurker:{max:90,regen:6,cost:24},finger:{max:180,regen:9,cost:36},jogo:{max:220,regen:10,cost:48},hanami:{max:240,regen:10,cost:52},mahito:{max:200,regen:12,cost:42},sukuna:{max:300,regen:14,cost:70}
};
export function heroDamage(base,hero){return base*(1+.08*Math.max(0,hero.level-1));}
export function squadLevel(state){return Math.max(1,...(state.recruited||state.party).map(id=>state.heroes[id].level||1));}
export function enemyCombatStats(def,state){const boss=def.hp>500,level=state.mode==='survival'?squadLevel(state)+(boss?1:0):1,delta=level-1,energy=ENERGY_PROFILES[def.id]||ENERGY_PROFILES.lurker;return {isBoss:boss,level,maxHp:Math.round(def.hp*(1+(boss?.16:.12)*delta)),damage:Math.round(def.damage*(1+(boss?.09:.07)*delta)),speed:def.speed*(1+Math.min(.25,.015*delta)),maxCe:energy.max+delta*8,ceRegen:energy.regen+delta*.25,techniqueCost:energy.cost+delta*2,xpReward:(boss?120:20)+level*(boss?20:5)};}
export function xpToNext(level){return 80+level*40;}
export function energyRegen(enemy,dt){enemy.ce=Math.min(enemy.maxCe,Math.max(0,enemy.ce)+enemy.ceRegen*dt);}
export function reserveEnemyAttack(enemy,silenced=false){const empowered=!silenced&&enemy.ce>=enemy.techniqueCost;if(empowered)enemy.ce-=enemy.techniqueCost;enemy.nextAction=empowered?'technique':'basic';return empowered;}
