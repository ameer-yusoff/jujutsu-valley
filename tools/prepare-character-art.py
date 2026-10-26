# Rebuild the normalized poster-style model views. Requires Pillow, NumPy and SciPy.
from PIL import Image
import numpy as np
from scipy import ndimage
from scipy.optimize import linear_sum_assignment
from pathlib import Path
import json
root=Path('dist/art/characters');root.mkdir(parents=True,exist_ok=True)
def split(path,cols,rows,keys):
 im=Image.open(path).convert('RGBA');a=np.asarray(im.getchannel('A'));mask=a>100
 if cols==6:mask[806,1250:]=False
 labels,count=ndimage.label(mask);slices=ndimage.find_objects(labels);areas=np.bincount(labels.ravel());components=[]
 for label,sl in enumerate(slices,1):
  if sl is None or areas[label]<1500:continue
  yy,xx=sl;components.append({'label':label,'area':areas[label],'box':(xx.start,yy.start,xx.stop,yy.stop),'center':((xx.start+xx.stop)/2,(yy.start+yy.stop)/2)})
 # Assign the major silhouette nearest each expected grid position, with full bounds
 # rather than clipping a spear or a monster's claws at a nominal cell boundary.
 expected=[((c+.5)*im.width/cols,(r+.5)*im.height/rows)for r in range(rows)for c in range(cols)]
 cost=np.array([[(cx-x)**2+(cy-y)**2 for x,y in expected]for cx,cy in [o['center']for o in components]])
 ci,ti=linear_sum_assignment(cost);found={int(t):components[int(c)]for c,t in zip(ci,ti)}
 if len(found)!=len(keys):raise RuntimeError(('Unexpected component count',len(components),len(found)))
 result={}
 for i,key in enumerate(keys):
  comp=found[i];l,t,r,b=comp['box'];pad=4;l=max(0,l-pad);t=max(0,t-pad);r=min(im.width,r+pad);b=min(im.height,b+pad)
  crop=im.crop((l,t,r,b));arr=np.array(crop);arr[:,:,3]=np.where(labels[t:b,l:r]==comp['label'],255,0).astype('uint8');crop=Image.fromarray(arr)
  # Preserve the poster artwork, normalize only scale and its shared foot anchor.
  scale=min(114/crop.width,108/crop.height);size=(max(1,round(crop.width*scale)),max(1,round(crop.height*scale)))
  sprite=crop.resize(size,Image.Resampling.NEAREST);out=Image.new('RGBA',(128,128));x=(128-size[0])//2;y=116-size[1];out.alpha_composite(sprite,(x,y));out.save(root/(key+'.png'),optimize=True)
  result[key]={'file':key+'.png','sourceRect':[l,t,r-l,b-t],'contentRect':[x,y,*size],'anchor':{'x':64,'y':116}}
 return result
heroes=['gojo','yuji','megumi','nobara','yuta','maki'];heroKeys=[f'{h}-{v}'for v in ['south','north','side','combat']for h in heroes]
enemyKeys=['finger-south','jogo-south','hanami-south','mahito-south','finger-combat','jogo-combat','hanami-combat','mahito-combat','sukuna-south','fly-south','lurker-south','rika-south','sukuna-combat','panda-south','dog-south','nue-south']
assets={**split('dist/art/model-sheets/heroes.webp',6,4,heroKeys),**split('dist/art/model-sheets/curses-companions.webp',4,4,enemyKeys)}
assets.update(split('dist/art/model-sheets/gojo-headgear.webp',3,2,[f'gojo-{view}-{gear}'for view in ['south','side']for gear in ['blindfold','sunglasses','eyes']]))
manifest={'version':3,'style':'poster-chibi-pixel','cell':128,'reference':'../battle-poster.webp','assets':assets};(root/'manifest.json').write_text(json.dumps(manifest,indent=2))
print('Prepared',len(assets),'poster-derived character views with consistent anchors.')
