"""Body-only calibration for neutral key poses; weapons do not set actor scale."""
from PIL import Image
import numpy as np
from scipy import ndimage

def hair_mask(image,hero):
 a=np.array(image.convert('RGBA'),dtype=float);r,g,b=a[:,:,0],a[:,:,1],a[:,:,2]
 if hero=='gojo':mask=(r>120)&(g>115)&(b>135)&(b>r*.93)
 elif hero=='yuji':mask=(r>g*1.15)&(b>g*.8)&(g>r*.35)&(b>r*.45)&(r>80)
 elif hero=='nobara':mask=(r>g*1.2)&(g>b*1.2)&(r>65)
 elif hero=='maki':mask=(g>r*1.2)&(b>r*.9)&(b<g*1.35)&(g>20)
 else:mask=(r<85)&(g<95)&(b<115)&(b>r*.8)&(g>r*.7)
 mask&=a[:,:,3]>128;mask[int(image.height*.7):]=False
 labels,n=ndimage.label(mask);sizes=np.bincount(labels.ravel());sizes[0]=0
 if not n:return mask
 keep=np.flatnonzero(sizes>=max(8,sizes.max()*.3));return np.isin(labels,keep)

def body_height(image,hero):
 a=np.array(image);mask=hair_mask(image,hero);ys=np.where(mask)[0]
 if not len(ys):raise ValueError(f'Cannot locate head for {hero}')
 counts=(a[:,:,3]>128).sum(axis=1);solid=np.flatnonzero(counts>=max(4,counts.max()*.08))
 if not len(solid):raise ValueError(f'Cannot locate feet for {hero}')
 return int(solid[-1]-ys.min()+1),int(ys.min()),int(solid[-1]+1)

def imported_pose(image,reference,hero):
 # Replacement drawings may have entirely different source resolutions.
 # Match hair area before applying the sequence's one fixed body scale.
 area=hair_mask(image,hero).sum();ref=hair_mask(reference,hero).sum()
 if not area or not ref:raise ValueError(f'Cannot calibrate imported pose {hero}')
 scale=float(np.sqrt(ref/area));return image.resize((max(1,round(image.width*scale)),max(1,round(image.height*scale))),Image.Resampling.NEAREST)
