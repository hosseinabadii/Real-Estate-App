"use client";

import { useState } from "react";
import Image from "next/image";
import { blurDataURL } from "../utils/blurData";
import defaultImage from "../public/images/house.jpg";

export default function CustomImage({ src, alt, ...props }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ objectFit: "cover" }}
      priority="false"
      placeholder="blur"
      blurDataURL={blurDataURL}
      onError={() => setImageSrc(defaultImage)}
    />
  );
}
