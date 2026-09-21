"""Build responsive derivatives from existing owned website photographs."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json
root=Path(__file__).resolve().parent.parent
folder=root/'public/images'
manifest={}
for name in ['the-drain','the-outcome','phila-event','phila-team','phila-karen','webinar-poster']:
    source=ImageOps.exif_transpose(Image.open(folder/f'{name}.jpg')).convert('RGB')
    versions=[]
    for width in [640,1280]:
        width=min(width,source.width)
        target=source.resize((width,round(source.height*width/source.width)),Image.Resampling.LANCZOS)
        out=folder/f'{name}-{width}.webp'
        target.save(out,'WEBP',quality=80,method=6)
        versions.append({'src':f'/images/{out.name}','width':target.width,'height':target.height,'bytes':out.stat().st_size})
    manifest[name]=versions
(root/'src/content/imageManifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
# An original, code-drawn sharing card: real wordmark, no invented photo or results.
card=Image.new('RGB',(1200,630),'#191923');draw=ImageDraw.Draw(card)
font_paths=[Path('/System/Library/Fonts/Supplemental/Arial Bold.ttf'),Path('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')]
font_path=next((p for p in font_paths if p.exists()),None)
def font(size):return ImageFont.truetype(str(font_path),size) if font_path else ImageFont.load_default(size=size)
draw.rounded_rectangle((55,55,1145,575),radius=25,outline='#c8a04a',width=2)
draw.text((90,94),'GrowthCred.',fill='#c8a04a',font=font(57))
draw.text((90,225),'Practical AI for',fill='#f5f0e6',font=font(65))
draw.text((90,310),'business owners.',fill='#f5f0e6',font=font(65))
draw.text((92,474),'Online workshops · South Africa',fill='#c8a04a',font=font(32))
card.save(folder/'search-share.png',optimize=True)
print('Responsive images and sharing card generated.')
