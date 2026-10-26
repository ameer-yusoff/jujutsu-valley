// Three independent technique branches per hero. Existing levels grant points retroactively.
export const SKILL_LEVELS=[1,3,6,10];
export const DIRECTIONS=[4,6,8,10];
export function ranks(h){return [0,1,2].map(i=>Math.max(0,Math.min(3,Math.floor(Number(h.skillRanks?.[i])||0))));}
export function skillPoints(h){return Math.max(0,(h.level||1)-1-ranks(h).reduce((a,b)=>a+b,0));}
export function technique(h,slot){const rank=ranks(h)[slot]||0;return {rank,directions:DIRECTIONS[rank],damage:1+rank*.15,range:5+rank*.6,cost:1+rank*.08};}
export function upgradeSkill(h,slot){if(!Number.isInteger(slot)||slot<0||slot>2)return false;const r=ranks(h),next=r[slot]+1;if(next>3||h.level<SKILL_LEVELS[next]||skillPoints(h)<1)return false;r[slot]=next;h.skillRanks=r;return true;}
export function radialVectors(count,facing={x:0,z:1}){const start=Math.atan2(facing.x,facing.z);return Array.from({length:count},(_,i)=>({x:Math.sin(start+i*Math.PI*2/count),z:Math.cos(start+i*Math.PI*2/count)}));}
