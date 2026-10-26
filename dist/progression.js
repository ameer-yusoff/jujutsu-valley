// Three technique branches. Ranks change handling as well as damage and coverage.
export const SKILL_LEVELS=[1,3,6,10];
export const DIRECTIONS=[4,6,8,10];
export const MASTERY={
 gojo:[['Stronger gravitational pull','Slows targets by 35%','Pins targets inside Blue'],['Wider repulsion blast','Longer knockback','Maximum blast reach'],['Wider piercing corridor','Greater break pressure','Maximum Purple coverage']],
 yuji:[['Delayed Divergent impact','Stronger delayed impact','Maximum double impact'],['Longer forward lunge','Staggers the target','Maximum chase distance'],['Greater break pressure','Heals on ultimate hits','Maximum recovery on hit']],
 megumi:[['Dog exposes targets +8%','Exposes targets +16%','Exposes targets +24%'],['Nue briefly stuns','Longer electric stun','Maximum electric stun'],['Lingering shadow field','Longer slowing field','Maximum shadow duration']],
 nobara:[['Five-nail fan','Seven-nail fan','Nine-nail fan'],['Hairpin exposes targets','Longer exposure window','Maximum exposure window'],['Bonus vs targets below 35% HP','Stronger finishing damage','Maximum execution damage']],
 yuta:[['Strike returns health','Greater healing on strike','Maximum healing on strike'],['Interrupts curse techniques','Longer technique silence','Maximum silence duration'],['Grants a 30-point barrier','Grants a 60-point barrier','Grants a 90-point barrier']],
 maki:[['Sweep builds more stagger','Heavy stagger pressure','Maximum stagger pressure'],['Longer vault approach','Slam briefly stuns','Maximum slam stun'],['Barrage exposes targets','Longer armor-break window','Maximum armor-break window']]
};
export function ranks(h){return [0,1,2].map(i=>Math.max(0,Math.min(3,Math.floor(Number(h.skillRanks?.[i])||0))));}
export function skillPoints(h){return Math.max(0,(h.level||1)-1-ranks(h).reduce((a,b)=>a+b,0));}
export function technique(h,slot){const rank=ranks(h)[slot]||0;return {rank,directions:DIRECTIONS[rank],damage:1+rank*.25,range:5+rank,cost:1-rank*.06,cooldown:1-rank*.08,stagger:1+rank*.4,effect:MASTERY[h.id]?.[slot]?.[Math.max(0,rank-1)]||'Base technique'};}
export function upgradeSkill(h,slot){if(!Number.isInteger(slot)||slot<0||slot>2)return false;const r=ranks(h),next=r[slot]+1;if(next>3||h.level<SKILL_LEVELS[next]||skillPoints(h)<1)return false;r[slot]=next;h.skillRanks=r;return true;}
export function radialVectors(count,facing={x:0,z:1}){const start=Math.atan2(facing.x,facing.z);return Array.from({length:count},(_,i)=>({x:Math.sin(start+i*Math.PI*2/count),z:Math.cos(start+i*Math.PI*2/count)}));}
