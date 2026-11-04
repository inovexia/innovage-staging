import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/industries.json';

export const metadata = pageMeta({ path: '/industries' });

export default function IndustriesPage() {
  const { hero, expertise, ai, others } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'Industries' }]} />

      {/* CORE EXPERTISE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal><Rich text={expertise.title} /></h2>
            <p className="lead" data-reveal data-delay="80">{expertise.text}</p>
          </div>
          <div className="card-grid">
            {expertise.items.map((ind, i) => {
              const body = (
                <>
                  <span className="svc-icon"><Icon name={ind.icon} size={26} /></span>
                  <h3>{ind.title}</h3>
                  <p className="svc-tag">{ind.tagline}</p>
                  <p>{ind.text}</p>
                  <div className="svc-tags">
                    {ind.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  {ind.href && (
                    <span className="link-arrow">{expertise.linkLabel} <Icon name="arrow" size={16} /></span>
                  )}
                </>
              );
              const props = { className: 'svc-card spot', 'data-reveal': true, 'data-delay': i * 90, 'data-tilt': true };
              return ind.href
                ? <Link key={ind.title} href={ind.href} {...props}>{body}</Link>
                : <div key={ind.title} {...props}>{body}</div>;
            })}
          </div>
        </div>
      </section>

      {/* AI & AUTOMATION */}
      <section className="section section-alt">
        <div className="container split">
          <div>
            <h2 className="h2" data-reveal><Rich text={ai.title} /></h2>
            {ai.paragraphs.map((p, i) => (
              <p key={i} className="lead" data-reveal data-delay={80 + i * 40}>{p}</p>
            ))}
            <Link href={ai.button.href} className="btn btn-primary" data-reveal data-delay="180" data-magnetic>
              {ai.button.label} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="value-card glass spot" data-reveal data-delay="120">
            <div className="value-rings" aria-hidden="true">
              <span /><span /><span />
            </div>
            <h3>{ai.card.title}</h3>
            <ul className="why-list">
              {ai.card.items.map((w) => (
                <li key={w.title}>
                  <span className="svc-icon"><Icon name={w.icon} size={20} /></span>
                  <div>
                    <strong>{w.title}</strong>
                    <p>{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OTHER INDUSTRIES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal><Rich text={others.title} /></h2>
            <p className="lead" data-reveal data-delay="80">{others.text}</p>
          </div>
          <div className="feature-grid">
            {content.items.map((ind, i) => (
              <div key={ind.title} className="feature spot" data-reveal data-delay={(i % 4) * 70} data-tilt>
                <span className="svc-icon"><Icon name={ind.icon} /></span>
                <h3>{ind.title}</h3>
                <p>{ind.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ title={<Rich text={content.faq.title} />} items={content.faq.items} />

      <CTASection {...content.cta} />
    </>
  );
}
