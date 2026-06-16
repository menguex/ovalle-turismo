import NextImage, { type ImageProps } from "next/image";
import { IMAGE_QUALITY, hdImageSrc } from "@/lib/images";

export type SiteImageProps = ImageProps;

export default function SiteImage({ src, quality, alt, ...props }: SiteImageProps) {
  const resolved = typeof src === "string" ? hdImageSrc(src) : src;

  return (
    <NextImage
      src={resolved}
      alt={alt}
      quality={quality ?? IMAGE_QUALITY}
      {...props}
    />
  );
}
