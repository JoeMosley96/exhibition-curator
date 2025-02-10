"use client"; // Mark as a Client Component

import { IKImage } from "imagekitio-next";

interface IKImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?:string
  // setIsLoading?: (isLoading: boolean) => void;
}

const urlEndpoint=process.env.NEXT_PUBLIC_URL_ENDPOINT

export default function IKImageClient({ src, alt, width = 500, height = 300, className}: IKImageProps) {
  
  return (
      <IKImage
        urlEndpoint={urlEndpoint}
        src={src} // Path of the image in ImageKit
        width={width}
        height={height}
        loading="lazy"
        onLoad={()=>console.log("loaded")}
        alt={alt}
        className={`${className}`}// Add custom Tailwind styles if needed
        
      />

  );
}
