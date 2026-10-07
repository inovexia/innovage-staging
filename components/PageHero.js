import Link from 'next/link';
import WaveScene from './three/WaveScene';

export default function PageHero({ eyebrow, title, accent, text, crumbs = [], visual, children }) {
  return (
    <section className={`page-hero ${visual ? 'has-visual' : ''}`}>
      <WaveScene />
      <div className="page-hero-fade" aria-hidden="true" />
      <div className="container page-hero-inner">
        <div className="page-hero-text">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label}>
                <span className="sep">/</span>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
          {eyebrow && <span className="eyebrow" data-reveal>{eyebrow}</span>}
          <h1 className="display" data-reveal data-delay="80">
            {title} {accent && <span className="grad-text">{accent}</span>}
          </h1>
          {text && <p className="lead" data-reveal data-delay="160">{text}</p>}
          {children}
        </div>
        {visual && (
          <div className="page-hero-visual" data-reveal data-delay="200">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
