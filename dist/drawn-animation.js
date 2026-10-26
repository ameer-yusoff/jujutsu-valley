import {characterImage,characterManifest} from './character-art.js?v=solo-mastery-5';
export function drawnFrame(id,kind,phase,direction='south'){
 const motion=characterImage(id+'-motion'),actions=characterImage(id+'-actions');
 if(!motion)return null;const side=characterImage(id+'-sidewalk');
 const f=Math.min(7,Math.floor(Math.max(0,phase)*8));let sheet=motion,row=0,column=f;
 if(actions){if(['idle','guard'].includes(kind)&&direction!=='south'){sheet=side&&['side','west'].includes(direction)?side:motion;row=direction==='north'?1:side?0:2;column=0;}
  else if(kind==='walk'||kind==='dash'){if(side&&['side','west'].includes(direction)){sheet=side;row=0;}else row=direction==='north'?1:['side','west'].includes(direction)?2:0;}
  else if(kind==='melee'){row=3;}
  else if(['blue','red','purple'].includes(kind)){row=id==='maki'?3:4;}
  else {sheet=actions;row=({idle:0,guard:0,wave:1,chop:2,mine:3,water:4,sit:5,hurt:6,defeat:6,checkpoint:7,teleport:7,unseal:7,recovery:5})[kind]??0;if(kind==='hurt')column=Math.min(2,Math.floor(phase*3));if(kind==='defeat')column=3+Math.min(['yuji','maki'].includes(id)?2:4,Math.floor(phase*5));if(kind==='sit')column=3+Math.min(2,Math.floor(phase*3));if(kind==='recovery')column=6+Math.min(1,Math.floor(phase*2));}
 }else{row=['attack','telegraph','hurt','defeat','recovery'].includes(kind)?1:0;if(kind==='telegraph')column=Math.min(1,Math.floor(phase*2));if(kind==='attack')column=2+Math.min(3,Math.floor(phase*4));if(kind==='hurt')column=6;if(kind==='defeat')column=7;}
 const meta=Object.values(characterManifest()?.drawn?.assets||{}).find(e=>sheet.src.includes('/'+e.file));return {sheet,row,column,mirror:direction==='west',rect:meta?.frameRects?.[row*8+column],viewport:meta?.viewport||128};
}
export function paintDrawn(ctx,frame){const cell=frame.sheet.width/8;ctx.save();ctx.imageSmoothingEnabled=false;if(frame.mirror){ctx.translate(128,0);ctx.scale(-1,1);}if(frame.rect){const r=frame.rect,s=128/frame.viewport;ctx.drawImage(frame.sheet,r.x,r.y,r.w,r.h,64-r.anchor[0]*s,116-r.anchor[1]*s,r.w*s,r.h*s);}else ctx.drawImage(frame.sheet,frame.column*cell,frame.row*cell,cell,cell,0,0,128,128);ctx.restore();}
