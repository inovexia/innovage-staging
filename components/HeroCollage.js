import Image from 'next/image';

/** Overlapping screenshots for a page banner. `images` comes from the page's content file (an optional `device` adds a laptop, tablet or phone frame); `variant` sets the layout in globals.css. */
export default function HeroCollage({ images, variant, note }) {
  return (
    <div className={`hero-collage hero-collage-${variant}`}>
      {images.map((image, i) => (
        <div key={image.src} className={`hero-collage-shot ${image.device ? `hero-device hero-device-${image.device}` : ''}`}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 960px) 80vw, (max-width: 1600px) 560px, 700px"
            priority={i === 0}
          />
        </div>
      ))}
      {note && <span className="hero-collage-note">{note}</span>}
    </div>
  );
}
