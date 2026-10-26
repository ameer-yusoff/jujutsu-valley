import {REGIONS} from './data.js';
import {findSafePosition} from './navigation.js';
const names=['Sealed talisman','Cursed relic','Domain fragment'];
export const ARTIFACTS=REGIONS.flatMap(r=>names.map((name,i)=>({id:`${r.id}-artifact-${i}`,region:r.id,name,...findSafePosition(r.id,[{x:-7,z:10},{x:6,z:-4},{x:1,z:10}][i]),gems:2+i,xp:40+i*20})));
export function collected(s,id){return (s.artifacts||[]).includes(id);}
export function mapArtifacts(ctx,s,pos,region=s.region){for(const a of ARTIFACTS.filter(a=>a.region===region)){const [x,y]=pos(a.x,a.z);ctx.fillStyle=collected(s,a.id)?'#667586':'#ffd477';ctx.fillRect(Math.round(x)-3,Math.round(y)-3,6,6);ctx.fillStyle='#172239';ctx.fillRect(Math.round(x)-1,Math.round(y)-1,2,2);}}
