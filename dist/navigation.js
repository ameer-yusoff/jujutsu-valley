// Shared region footprints keep teleport arrivals and rendered collision in agreement.
export const WORLD_BOUNDS={x:16.3,z:13.2};
export function regionBuildings(region){
 if(region==='school')return [{x:-5,z:-8,w:9,d:4},{x:8,z:-9,w:5,d:3}];
 if(region==='forest')return [{x:7,z:-11,w:5,d:3}];
 if(region==='tokyo'||region==='shibuya')return Array.from({length:6},(_,i)=>({x:i<3?-11:11,z:-10+i%3*8,w:5,d:5}));
 return [];
}
export function regionPonds(region){return region==='school'?[{x:8,z:7,rx:3.3,rz:2.3}]:region==='forest'?[{x:-6,z:-7,rx:4.4,rz:3}]:[];}
export function regionColliders(region){return [...regionBuildings(region).map(b=>({...b,w:b.w+.3,d:b.d+.4})),...regionPonds(region).map(p=>({x:p.x,z:p.z,w:p.rx*1.7,d:p.rz*1.6}))];}
export function canTraverse(region,x,z){return Number.isFinite(x)&&Number.isFinite(z)&&Math.abs(x)<WORLD_BOUNDS.x&&Math.abs(z)<WORLD_BOUNDS.z&&!regionColliders(region).some(c=>Math.abs(x-c.x)<c.w/2+.2&&Math.abs(z-c.z)<c.d/2+.2);}
export function findSafePosition(region,preferred,occupied=[]){
 const available=(x,z)=>canTraverse(region,x,z)&&occupied.every(p=>Math.hypot(x-p.x,z-p.z)>=.8);
 if(available(preferred.x,preferred.z))return {...preferred};
 // Search the nearest walkable ring, favoring arrivals in front of the marker.
 for(let r=.25;r<=8;r+=.25){const points=[];for(let dx=-r;dx<=r+.001;dx+=.25){points.push({x:preferred.x+dx,z:preferred.z+r},{x:preferred.x+dx,z:preferred.z-r});}for(let dz=-r+.25;dz<r;dz+=.25)points.push({x:preferred.x-r,z:preferred.z+dz},{x:preferred.x+r,z:preferred.z+dz});points.sort((a,b)=>Math.hypot(a.x-preferred.x,a.z-preferred.z)-Math.hypot(b.x-preferred.x,b.z-preferred.z));const point=points.find(p=>available(p.x,p.z));if(point)return point;}
 throw new Error(`No safe arrival position in ${region}`);
}
export function partyArrival(region,checkpoint,ids,controlled){const order=[controlled,...ids.filter(id=>id!==controlled)],occupied=[],positions={};for(let i=0;i<order.length;i++){const p=findSafePosition(region,{x:checkpoint.x+(i===1?-1:i===2?1:0),z:checkpoint.z+1},occupied);positions[order[i]]=p;occupied.push(p);}return positions;}
export function repairPartyPositions(state){const occupied=[];for(const id of [state.controlled,...state.party.filter(id=>id!==state.controlled)]){const h=state.heroes[id],p=findSafePosition(state.region,{x:h.x,z:h.z},occupied);Object.assign(h,p);occupied.push(p);}return state;}
