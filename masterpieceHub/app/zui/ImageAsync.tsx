"use client";
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

import { useState } from "react";

export const ImageAsync = ({ src, alt, width = 500, height = 300, className}: IKImageProps ) => {
  const [reveal, setReveal] = useState(false);
  const visibility = reveal ? "visible" : "visible";
  const loader = reveal ? "none" : "inline-block";

  console.log(visibility)

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
      }}
    >
      <IKImage
        urlEndpoint={urlEndpoint}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${visibility}`}
        onError={() => setReveal(true)}
        onLoad={() => setReveal(true)}
      />
      <span
        style={{
          display: loader,
          position: "absolute",
          top: 0,
        }}
      >
        Loading...
      </span>
    </div>
  );
};