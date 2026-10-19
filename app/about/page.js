import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Counter from '@/components/Counter';
import Icon from '@/components/Icon';
import Rich from '@/components/Rich';
import { stats } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/about.json';

export const metadata = pageMeta({ ...content.meta, path: '/about' });

export default function AboutPage() {
  const { hero, intro, values } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'About' }]} />

      <section className="section">
        <div className="container about-grid">
          <div>
            <h2 className="h2" data-reveal data-delay="60">
              <Rich text={intro.title} />
            </h2>
            {intro.paragraphs.map((p, i) => (
              <p key={i} className="lead" data-reveal data-delay={120 + i * 40}>{p}</p>
            ))}
          </div>
          <div className="about-visual" data-reveal data-delay="120" aria-hidden="true">
            <div className="orbit"><i /></div>
            <div className="orbit"><i /></div>
            <div className="orbit"><i /></div>
            <div className="orbit-core">
              <span>{intro.badge.value}<small>{intro.badge.label}</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="stat spot" data-reveal data-delay={i * 80}>
                <strong><Counter value={s.value} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal data-delay="60"><Rich text={values.title} /></h2>
          </div>
          <div className="feature-grid">
            {values.items.map((v, i) => (
              <div key={v.title} className="feature spot" data-reveal data-delay={i * 80} data-tilt>
                <span className="svc-icon"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection {...content.cta} />
    </>
  );
}
