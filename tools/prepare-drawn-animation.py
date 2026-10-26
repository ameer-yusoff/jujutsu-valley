"""Normalize newly drawn pose sheets; no limb deformation or frame interpolation."""
from PIL import Image
from pathlib import Path
import numpy as np,json,sys
from scipy import ndimage
from body_metrics import body_height,imported_pose
root=Path('dist/art/characters');sources=Path('dist/art/drawn-sources');sources.mkdir(exist_ok=True)
data=json.load(open(sys.argv[1]));assets={};report=[]
audit=[];replacements={};extracted=[];scale_audit=[]
if data.get('repairs'):
 repair=Image.open(data['repairs']['path']).convert('RGBA')
 for slot,target in enumerate(data['repairs']['targets']):
  cell=repair.crop((round(slot*repair.width/4),0,round((slot+1)*repair.width/4),repair.height));a=np.array(cell);labels,n=ndimage.label(a[:,:,3]>=205);sizes=np.bincount(labels.ravel());sizes[0]=0;main=sizes.argmax();a[:,:,3]=np.where(labels==main,255,0).astype('uint8');cell=Image.fromarray(a);replacements[tuple(target)]=cell.crop(cell.getbbox())
if data.get('defeatRepair'):
 cell=Image.open(data['defeatRepair']).convert('RGBA');a=np.array(cell);labs,n=ndimage.label(a[:,:,3]>=205);sizes=np.bincount(labs.ravel());sizes[0]=0;a[:,:,3]=np.where(labs==sizes.argmax(),255,0).astype('uint8');cell=Image.fromarray(a);replacements[('yuji-actions.webp',5,5)]=cell.crop(cell.getbbox())
def rows(path,count,boundaries=None):
 im=Image.open(path).convert('RGBA');pixels=np.array(im);out=[[] for _ in range(count)];columns=[];candidates=[]
 # Detect complete silhouettes independently in each column. Never infer all
 # row cuts from column zero: touching boots/hair can merge that column.
 for col in range(8):
  left=round(col*im.width/8);right=round((col+1)*im.width/8)
  a=pixels[:,left:right].copy();mask=a[:,:,3]>=205
  labels,num=ndimage.label(mask);areas=np.bincount(labels.ravel());parts=ndimage.find_objects(labels)
  major=sorted([(i,sl) for i,sl in enumerate(parts,1) if sl and areas[i]>1000],key=lambda v:v[1][0].start)
  if len(major)==count:
   cuts=[0]+[round((major[r-1][1][0].stop+major[r][1][0].start)/2) for r in range(1,count)]+[im.height]
   candidates.append(cuts)
  columns.append((a,labels,major))
 if candidates:cuts=np.median(np.array(candidates),axis=0).round().astype(int).tolist()
 elif boundaries:cuts=boundaries
 else:raise ValueError(f'Cannot identify {count} full rows in {path}; explicit review required')
 # Recover complete silhouettes even when weapons cross a nominal column.
 full=pixels[:,:,3]>=205;components,n=ndimage.label(full);distance=ndimage.distance_transform_edt(full)
 markers=np.zeros(full.shape,dtype=np.int32);seeds=[]
 for r in range(count):
  for col in range(8):
   cx=(col+.5)*im.width/8;cy=(cuts[r]+cuts[r+1])/2
   x0=max(0,int(cx-im.width/8*.3));x1=min(im.width,int(cx+im.width/8*.3));y0=max(cuts[r],int(cy-(cuts[r+1]-cuts[r])*.3));y1=min(cuts[r+1],int(cy+(cuts[r+1]-cuts[r])*.3))
   yy,xx=np.mgrid[y0:y1,x0:x1];score=distance[y0:y1,x0:x1]-.025*np.hypot(xx-cx,yy-cy);score[~full[y0:y1,x0:x1]]=-1e9
   dy,dx=np.unravel_index(score.argmax(),score.shape);y=y0+dy;x=x0+dx
   if not full[y,x]:continue
   label=r*8+col+1;markers[y,x]=label;seeds.append((label,int(components[y,x])))
 segmented=np.zeros(full.shape,dtype=np.int32)
 for comp in sorted(set(c for _,c in seeds)):
  group=[label for label,c in seeds if c==comp];mask=components==comp
  if len(group)==1:segmented[mask]=group[0]
  else:
   # Marker watershed cuts touching bodies at the silhouette bottleneck,
   # rather than slicing an entire rectangular row through their limbs.
   surface=np.clip(254-distance*5,0,254).astype('uint8');surface[~mask]=255
   local=np.zeros(full.shape,dtype=np.int32);local[~mask]=-1
   for label in group:local[markers==label]=label
   split=ndimage.watershed_ift(surface,local);segmented[mask]=split[mask]
 # Keep only assigned body silhouettes, not unrelated islands or source noise.
 for r in range(count):
  for col in range(8):
   replacement=replacements.get((Path(path).name,r,col))
   if replacement is not None:out[r].append(replacement.copy());extracted.append({'source':path,'row':r,'column':col,'method':'replacement-drawing'});continue
   label=r*8+col+1;mask=segmented==label;ys,xs=np.where(mask)
   if len(xs)<1000:
    out[r].append(None);audit.append({'source':path,'row':r,'column':col,'status':'clean-neighbor-hold'});continue
   box=(xs.min(),ys.min(),xs.max()+1,ys.max()+1);part=pixels[box[1]:box[3],box[0]:box[2]].copy();part[:,:,3]=np.where(mask[box[1]:box[3],box[0]:box[2]],255,0).astype('uint8')
   out[r].append(Image.fromarray(part));extracted.append({'source':path,'row':r,'column':col,'method':'whole-source-segmentation','bounds':[int(v) for v in box]})

 for r,row in enumerate(out):
  for col,frame in enumerate(row):
   if frame is None:
    valid=[i for i,v in enumerate(row) if v is not None]
    if not valid:raise ValueError(f'No safe poses in {path} row {r}')
    row[col]=row[min(valid,key=lambda i:abs(i-col))].copy()
 for r,row in enumerate(out):
  hero=Path(path).name.split('-')[0]
  if hero in ['gojo','yuji','megumi','nobara','yuta','maki']:
   for col,frame in enumerate(row):
    if (Path(path).name,r,col) in replacements:row[col]=imported_pose(frame,row[0],hero)
  else:
   for col,frame in enumerate(row):
    if (Path(path).name,r,col) in replacements:
     factor=row[0].height/frame.height;row[col]=frame.resize((max(1,round(frame.width*factor)),row[0].height),Image.Resampling.NEAREST)
 return out

def save(id,kind,sequence):
 hero=id in ['gojo','yuji','megumi','nobara','yuta','maki'];prepared=[]
 for r,row in enumerate(sequence):
  reference=body_height(row[0],id)[0] if hero else row[0].height
  factor=156/reference
  for f,original in enumerate(row):
   # One scale per sequence. No per-frame fit based on tools/effects.
   w=max(1,round(original.width*factor));h=max(1,round(original.height*factor));im=original.resize((w,h),Image.Resampling.NEAREST)
   mask=np.array(original)[:,:,3]>128;counts=mask.sum(axis=1);solid=np.flatnonzero(counts>=max(4,counts.max()*.08));bottom=int(solid[-1]+1) if hero else original.height
   yy,xx=np.where(mask[max(0,bottom-int(reference*.16)):bottom]);anchor_x=float(np.mean(xx)) if len(xx) else original.width/2
   anchor=[round(anchor_x*factor),round(bottom*factor)];left=256-anchor[0];top=464-anchor[1]
   if left<0 or top<0 or left+w>512 or top+h>512:raise ValueError(f'Pose exceeds padded viewport: {id} {kind} {r} {f} {w}x{h}')
   metric={'row':r,'frame':f,'scale':float(factor),'referenceBodyPixels':reference,'normalizedReferenceBodyPixels':round(reference*factor),'bounds':[left,top,w,h],'anchor':anchor}
   prepared.append((im,metric));scale_audit.append({'id':id,'kind':kind,**metric})
 # Pack the trimmed sprites so transparent safety space is not decoded in RAM.
 width=1536;x=y=shelf=0;placements=[]
 for im,m in prepared:
  if x+im.width+4>width:y+=shelf+4;x=0;shelf=0
  placements.append((x,y));x+=im.width+4;shelf=max(shelf,im.height)
 height=y+shelf+4;atlas=Image.new('RGBA',(width,height));rects=[]
 for (im,m),(x,y) in zip(prepared,placements):
  atlas.alpha_composite(im,(x,y));rects.append({'x':x,'y':y,'w':im.width,'h':im.height,**m})
 name=f'{id}-{kind}-hd-drawn.png';atlas.save(root/name,optimize=True);assets[f'{id}-{kind}-hd-south']={'file':name,'packed':True,'viewport':512,'cell':192,'width':width,'height':height,'columns':8,'rows':len(sequence),'anchor':{'x':256,'y':464},'frameRects':rects}
 # Uniformly scaled compatibility sheets: every frame uses the same viewport.
 standard=Image.new('RGBA',(1024,len(sequence)*128));bounds=[]
 for im,m in prepared:
  tile=Image.new('RGBA',(512,512));tile.alpha_composite(im,(m['bounds'][0],m['bounds'][1]));tile=tile.resize((128,128),Image.Resampling.NEAREST);standard.alpha_composite(tile,(m['frame']*128,m['row']*128));box=tile.getbbox();bounds.append([m['row'],m['frame'],box[0],box[1],box[2]-box[0],box[3]-box[1]])
 name=f'{id}-{kind}-drawn.png';standard.save(root/name,optimize=True);assets[f'{id}-{kind}-south']={'file':name,'cell':128,'columns':8,'rows':len(sequence),'anchor':{'x':64,'y':116},'frames':bounds}
 report.append({'id':id,'kind':kind,'frames':len(sequence)*8})

for item in data['motion']:
 id=item['id'];path=item['path'];raw=rows(path,5,[0,181,362,543,724,1086]) if id in ['gojo','maki'] else rows(path,6);Image.open(path).save(sources/f'{id}-motion.webp',lossless=True)
 if id=='gojo':raw=[raw[0],raw[1],raw[0],raw[2],raw[3],raw[4]]
 if id=='maki':
  actionPath=next(x['path'] for x in data['actions'] if x['id']==id);clean=rows(actionPath,8);raw=[raw[0],raw[1],raw[2],clean[2],clean[7],raw[4]]
 save(id,'motion',raw)
for item in data['actions']:
 id=item['id'];Image.open(item['path']).save(sources/f'{id}-actions.webp',lossless=True)
 raw=rows(item['path'],7 if id in ['yuji','nobara'] else 8)
 if id=='nobara':raw[4][4]=raw[4][3].copy();raw[4][5]=raw[4][2].copy()
 if id in ['yuji','nobara']:
  motionPath=next(x['path'] for x in data['motion'] if x['id']==id);mixed=rows(motionPath,6)[5]
  seated=mixed[6];kneel=mixed[1];reach=mixed[0]
  sit=[raw[0][0],reach,kneel,seated,seated,kneel,reach,raw[0][-1]]
  raw=raw[:5]+[[imported_pose(frame,raw[0][0],id) for frame in sit]]+raw[5:]
 if id=='maki' and data.get('armedIdle'):raw[0]=rows(data['armedIdle'],1)[0]
 save(id,'actions',raw)
for item in data['enemies']:
 ids={'enemies-a':['finger','jogo','hanami','mahito'],'enemies-b':['sukuna','fly','lurker','rika'],'companions':['panda','dog','nue','rika']}[item['id']];raw=rows(item['path'],8);Image.open(item['path']).save(sources/f"{item['id']}.webp",lossless=True)
 for i,id in enumerate(ids):save(id,'motion',raw[i*2:i*2+2])
if data.get('side'):
 raw=rows(data['side'],6);Image.open(data['side']).save(sources/'side-walks.webp',lossless=True)
 for i,id in enumerate(['gojo','yuji','megumi','nobara','yuta','maki']):
  if data.get('sidePatches') and id in data['sidePatches']['ids']:continue
  save(id,'sidewalk',[raw[i]])
if data.get('sidePatches'):
 patch=data['sidePatches'];raw=rows(patch['path'],len(patch['ids']))
 for i,id in enumerate(patch['ids']):save(id,'sidewalk',[raw[i]])
# Discard hold warnings for sequences superseded by reviewed clean artwork.
audit=[a for a in audit if not (a['source'].endswith('/side-walks.webp') and a['row']>=3) and not (a['source'].endswith('/maki-motion.webp') and a['row']==3)]
manifest={'version':1,'style':'newly-drawn-poster-chibi','assets':assets,'coverage':report};(root/'drawn-manifest.json').write_text(json.dumps(manifest,indent=2));print(json.dumps({'coverage':report,'clippingAlerts':audit}));Path('/tmp/drawn-clipping-audit.json').write_text(json.dumps(audit,indent=2));(root/'extraction-audit.json').write_text(json.dumps({'method':'whole silhouettes with marker watershed for touching figures','extractedFrames':extracted,'defeatRepair':data.get('defeatRepair'), 'reviewedReplacements':['Maki combat uses isolated polearm and cast drawings','Nobara water row omits seated source poses'],'safePoseHolds':audit,'repairedFrames':data.get('repairs',{}),'isolatedSideWalks':data.get('sidePatches',{})},indent=2))

scale_audit=list({(f['id'],f['kind'],f['row'],f['frame']):f for f in scale_audit}.values())
(root/'body-scale-audit.json').write_text(json.dumps({'viewport':512,'targetReferenceBodyPixels':156,'frames':scale_audit,'weaponScaleClamping':False},indent=2))
