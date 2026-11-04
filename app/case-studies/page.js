import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import { caseStudies } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/case-studies.json';

export const metadata = pageMeta({ path: '/case-studies' });

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero title={content.hero.title} text={content.hero.text} crumbs={[{ label: 'Case Studies' }]} />

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
                  {content.cardLinkLabel} <Icon name="arrow" size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FAQ title={<Rich text={content.faq.title} />} items={content.faq.items} />

      <CTASection {...content.cta} />
    </>
  );
}
