import Link from 'next/link';
import WaveScene from './three/WaveScene';
import Rich from './Rich';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export default function PageHero({ title, text, crumbs = [], path, visual, children }) {
  return (
    <section className={`page-hero ${visual ? 'has-visual' : ''}`}>
      {path && <JsonLd data={breadcrumbSchema(crumbs, path)} />}
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
          <h1 className="display" data-reveal data-delay="80">
            <Rich text={title} />
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
