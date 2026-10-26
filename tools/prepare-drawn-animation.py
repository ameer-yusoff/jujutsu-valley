"""Normalize newly drawn pose sheets; no limb deformation or frame interpolation."""
from PIL import Image
from pathlib import Path
import numpy as np,json,sys
from scipy import ndimage
root=Path('dist/art/characters');sources=Path('dist/art/drawn-sources');sources.mkdir(exist_ok=True)
data=json.load(open(sys.argv[1]));assets={};report=[]
def rows(path,count,boundaries=None):
 im=Image.open(path).convert('RGBA');out=[]
 mask=np.array(im)[:,:,3]>205;mask[:,round(im.width/8):]=False
 labels,num=ndimage.label(mask);areas=np.bincount(labels.ravel());parts=ndimage.find_objects(labels)
 bodies=sorted([sl[0] for i,sl in enumerate(parts,1) if sl and areas[i]>1000],key=lambda sl:sl.start)
 if len(bodies)==count:boundaries=[0]+[round((bodies[i-1].stop+bodies[i].start)/2) for i in range(1,count)]+[im.height]
 for r in range(count):
  row=[]
  for col in range(8):
   cell=im.crop((round(col*im.width/8),(boundaries[r] if boundaries else round(r*im.height/count)),round((col+1)*im.width/8),(boundaries[r+1] if boundaries else round((r+1)*im.height/count))))
   a=np.array(cell);a[:,:,3]=np.where(a[:,:,3]>=205,255,0).astype('uint8');labels,num=ndimage.label(a[:,:,3]>0)
   if num:
    areas=np.bincount(labels.ravel());areas[0]=0;main=areas.argmax();a[:,:,3]=np.where(labels==main,255,0).astype('uint8')
   cell=Image.fromarray(a);box=cell.getbbox()
   if not box:
    if row:row.append(row[-1].copy());continue
    raise ValueError(f'Empty leading frame {path} {r} {col}')
   row.append(cell.crop(box))
  out.append(row)
 return out

def save(id,kind,sequence):
 for cell in [128,192]:
  ratio=cell/128;heights=[im.height for row in sequence for im in row];scale=104*ratio/np.percentile(heights,90)
  atlas=Image.new('RGBA',(8*cell,len(sequence)*cell));bounds=[]
  for r,row in enumerate(sequence):
   for f,original in enumerate(row):
    factor=min(scale,120*ratio/original.width,112*ratio/original.height);sz=(max(1,round(original.width*factor)),max(1,round(original.height*factor)));im=original.resize(sz,Image.Resampling.NEAREST)
    x=(cell-im.width)//2;y=round(116*ratio)-im.height;atlas.alpha_composite(im,(f*cell+x,r*cell+y));bounds.append([r,f,x,y,*sz])
  suffix='-hd' if cell==192 else '';name=f'{id}-{kind}{suffix}-drawn.png';atlas.save(root/name,optimize=True);assets[f'{id}-{kind}{suffix}-south']={'file':name,'cell':cell,'columns':8,'rows':len(sequence),'anchor':{'x':cell//2,'y':round(116*ratio)},'frames':bounds}
 report.append({'id':id,'kind':kind,'frames':len(sequence)*8})

for item in data['motion']:
 id=item['id'];path=item['path'];raw=rows(path,5,[0,181,362,543,724,1086]) if id in ['gojo','maki'] else rows(path,6);Image.open(path).save(sources/f'{id}-motion.webp',lossless=True)
 if id=='gojo':raw=[raw[0],raw[1],raw[0],raw[2],raw[3],raw[4]]
 if id=='maki':raw=[raw[0],raw[1],raw[2],raw[3],raw[3],raw[4]]
 save(id,'motion',raw)
for item in data['actions']:
 id=item['id'];Image.open(item['path']).save(sources/f'{id}-actions.webp',lossless=True)
 raw=rows(item['path'],7 if id in ['yuji','nobara'] else 8)
 if id in ['yuji','nobara']:
  motionPath=next(x['path'] for x in data['motion'] if x['id']==id);mixed=rows(motionPath,6)[5]
  seated=mixed[6];kneel=mixed[1];reach=mixed[0]
  sit=[raw[0][0],reach,kneel,seated,seated,kneel,reach,raw[0][-1]]
  raw=raw[:5]+[sit]+raw[5:]
 save(id,'actions',raw)
for item in data['enemies']:
 ids={'enemies-a':['finger','jogo','hanami','mahito'],'enemies-b':['sukuna','fly','lurker','rika'],'companions':['panda','dog','nue','rika']}[item['id']];raw=rows(item['path'],8);Image.open(item['path']).save(sources/f"{item['id']}.webp",lossless=True)
 for i,id in enumerate(ids):save(id,'motion',raw[i*2:i*2+2])
if data.get('side'):
 raw=rows(data['side'],6);Image.open(data['side']).save(sources/'side-walks.webp',lossless=True)
 for i,id in enumerate(['gojo','yuji','megumi','nobara','yuta','maki']):save(id,'sidewalk',[raw[i]])
manifest={'version':1,'style':'newly-drawn-poster-chibi','assets':assets,'coverage':report};(root/'drawn-manifest.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(report))
