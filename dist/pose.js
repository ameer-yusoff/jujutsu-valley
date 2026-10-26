import {BODY_GEOMETRY} from './body-geometry.js?v=solo-mastery-5';
import {frameDurations} from './animation-timing.js?v=solo-mastery-5';
import {CLIPS,clamp} from './data.js?v=solo-mastery-5';
export function evaluatePose(clip,frame=0,direction='south',gear='blindfold'){
 const c=typeof clip==='number'?CLIPS[clip]:CLIPS.find(x=>x.id===clip)||CLIPS[0];
 const p=(frame%c.frames)/c.frames, a=p*Math.PI*2, k=c.kind;
 const pose={root:{x:0,y:0},head:0,body:0,armL:0,armR:0,legL:0,legR:0,sx:1,sy:1,hair:Math.sin(a-Math.PI/4)*2,handL:{x:43,y:96},handR:{x:85,y:96},tool:null,eye:gear,direction,kind:k,phase:p,frame:frame%c.frames,active:c.active.includes(frame%c.frames)};
 if(k==='idle'||k==='guard')pose.root.y=Math.sin(a)*1.5;
 if(k==='walk'||k==='dash'){pose.root.y=-3*Math.abs(Math.sin(Math.PI*(frame%c.frames)/4));pose.armL=Math.sin(a)*28;pose.armR=-pose.armL;pose.legL=Math.sin(a)*22;pose.legR=-pose.legL;pose.head=Math.sin(a)*2;pose.body=k==='dash'?14:4;if(k==='dash')pose.armL=pose.armR=-55;}
 if(k==='sit'){pose.root.y=10;pose.legL=-50;pose.legR=50;pose.armR=-65;pose.handR={x:70,y:61};}
 if(k==='wave'){pose.head=8;pose.armR=-125+Math.sin(a*2)*20;pose.handR={x:88,y:62};pose.root.x=6*Math.sin(p*Math.PI);}
 if(k==='chop'||k==='mine'){const swing=p<.34?-65: p<.67?-65+(p-.34)/.33*160:95*(1-(p-.67)/.33);pose.armL=pose.armR=swing;pose.tool=k;pose.handL={x:58,y:54};pose.handR={x:64,y:58};if(frame===3){pose.sy=k==='mine'?.86:.88;pose.sx=1.12;pose.root.x=4;}if(k==='mine')pose.root.y=-6*Math.sin(p*Math.PI);}
 if(k==='water'){pose.tool='water';pose.armR=35;pose.root.y=p>.5?8:0;pose.handR={x:84,y:78};}
 if(k==='unseal'){pose.armR=-130*Math.sin(p*Math.PI);pose.handR={x:66,y:45};if(frame>=3)pose.eye='eyes';}
 if(k==='melee'){pose.body=Math.sin(a)*12;pose.armR=-90*Math.max(0,Math.sin(a));pose.armL=-90*Math.max(0,-Math.sin(a));pose.root.x=Math.sin(a)*6;if(frame===4)pose.legR=-80;}
 if(['blue','red','purple','checkpoint','teleport'].includes(k)){pose.armL=k==='purple'?-70:-30;pose.armR=-85;pose.handL={x:k==='purple'?34:92,y:72};pose.handR={x:94,y:k==='red'?66:72};if(k==='purple')pose.eye='eyes';pose.root.y=-Math.sin(p*Math.PI)*3;}
 if(k==='hurt'){pose.body=-12;pose.root.x=-5*Math.sin(p*Math.PI);}
 if(k==='defeat'){pose.body=clamp(p*100,0,80);pose.root.y=p*10;}
 if(k==='recovery')pose.root.y=(1-p)*8;
 if(!['sit','wave','chop','mine','water','unseal','blue','red','purple','checkpoint','teleport'].includes(k)){pose.handL={x:43-20*Math.sin(pose.armL*Math.PI/180),y:76+20*Math.cos(pose.armL*Math.PI/180)};pose.handR={x:85-20*Math.sin(pose.armR*Math.PI/180),y:76+20*Math.cos(pose.armR*Math.PI/180)};}
 if(gear==='eyes')pose.hair+=Math.sin(a*3)*2-2;
 return pose;
}
export function frameMetadata(clip,frame,direction,gear){const c=CLIPS[clip],p=evaluatePose(clip,frame,direction,gear);return {clip:c.id,frame,rect:{x:frame*128,y:(clip%18)*128,w:128,h:128},duration:frameDurations(c)[frame],groundAnchor:{x:64,y:116},poseIsLegacy:true,pose:p,attachments:{groundRoot:{...BODY_GEOMETRY.anchor},leftHand:null,rightHand:null,projectile:null,annotation:'Hand positions are not annotated on the drawn poses'},hurtbox:{...BODY_GEOMETRY.debugRect,shape:'ground-circle',worldRadius:BODY_GEOMETRY.radius},hitbox:p.active?{range:c.kind==='melee'?1.2:c.kind==='purple'?16:1.2,arc:75}:null,event:p.active?(['chop','mine','water'].includes(c.kind)?'harvest':'impact'):null};}
