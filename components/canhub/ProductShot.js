import Image from 'next/image';

/** CanHub 365 product image. `image` comes from content/pages/canhub365.json. */
export default function ProductShot({ image, className = '', sizes = '(max-width: 960px) 100vw, 640px' }) {
  return (
    <Image
      className={`tp-shot ${className}`}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
    />
  );
}
