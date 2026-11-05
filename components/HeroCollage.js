import Image from 'next/image';

/** Overlapping screenshots for a page banner. `images` comes from the page's content file; `variant` sets the layout in globals.css. */
export default function HeroCollage({ images, variant }) {
  return (
    <div className={`hero-collage hero-collage-${variant}`}>
      {images.map((image, i) => (
        <div key={image.src} className="hero-collage-shot">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 960px) 80vw, 560px"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
