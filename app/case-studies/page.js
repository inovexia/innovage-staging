import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Icon from '@/components/Icon';
import { caseStudies } from '@/lib/data';

export const metadata = {
  title: 'Case Studies',
  description: 'Businesses we have helped build — websites, platforms and custom software delivered by Innovage.',
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Businesses We've"
        accent="Helped Build"
        text="Secure, scalable solutions designed for long-term growth. A look at some of the work we've delivered."
        crumbs={[{ label: 'Case Studies' }]}
      />

      <section className="section">
        <div className="container case-grid">
          {caseStudies.map((c) => (
            <article key={c.slug} id={c.slug} className="case spot" data-reveal style={{ scrollMarginTop: 120 }}>
              <Link href={`/case-studies/${c.slug}`} className="case-link" aria-label={`${c.client} case study`} />
              <div className={`case-visual ${c.images ? 'has-shot' : ''}`}>
                {c.images && (
                  <Image src={c.images.desktop} alt="" fill sizes="(max-width: 960px) 100vw, 560px" className="case-shot" />
                )}
                <div className="logo-tile">
                  <Image src={c.logo} alt={c.client} width={160} height={60} />
                </div>
              </div>
              <div className="case-body">
                <span className="cat">{c.category}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <div className="tags">
                  {c.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <span className="link-arrow">
                  View case study <Icon name="arrow" size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
