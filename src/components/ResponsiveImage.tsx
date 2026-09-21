import { forwardRef, type ImgHTMLAttributes } from "react";
import manifest from "../content/imageManifest.json";
export const ResponsiveImage=forwardRef<HTMLImageElement,ImgHTMLAttributes<HTMLImageElement>>(function ResponsiveImage({src,...props},ref){
  const key=src?.match(/\/([^/]+)\.jpg$/)?.[1];
  const variants=key?(manifest as Record<string,{src:string;width:number;height:number}[]>)[key]:undefined;
  const largest=variants?.[variants.length-1];
  return <img ref={ref} {...props} src={largest?.src??src} srcSet={variants?.map(v=>`${v.src} ${v.width}w`).join(', ')} sizes={props.sizes??'(max-width: 767px) 100vw, 1120px'} width={props.width??largest?.width} height={props.height??largest?.height} decoding="async"/>;
});
