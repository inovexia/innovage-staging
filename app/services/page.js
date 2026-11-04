import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import SolutionsList from '@/components/SolutionsList';
import FAQ from '@/components/FAQ';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import { services } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/services.json';

export const metadata = pageMeta({ path: '/services' });

export default function ServicesPage() {
  const { hero } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'Services' }]} />

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card spot" data-reveal data-delay={(i % 3) * 90} data-tilt>
                <span className="svc-icon"><Icon name={s.icon} size={26} /></span>
                <h3>{s.title}</h3>
                <p className="svc-tag">{s.tagline}</p>
                <p>{s.cardText || s.summary}</p>
                <span className="link-arrow">{content.cardLinkLabel} <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head left">
            <h2 className="h2" data-reveal data-delay="60">
              <Rich text={content.solutions.title} />
            </h2>
          </div>
          <SolutionsList />
        </div>
      </section>

      <FAQ title={<Rich text={content.faq.title} />} items={content.faq.items} />

      <CTASection {...content.cta} />
    </>
  );
}
