import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProcessTimeline from '@/components/ProcessTimeline';
import Icon from '@/components/Icon';
import ModelScene from '@/components/three/ModelScene';
import Image from 'next/image';
import FAQ from '@/components/FAQ';
import Rich from '@/components/Rich';
import { services, caseStudies, fill } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import page from '@/content/pages/services.json';

const { detail: t, cta } = page;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMeta({ title: s.title, description: `${s.tagline}. ${s.summary}`, path: `/services/${s.slug}` }) : {};
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const info = service;
  const vars = { service: service.title };
  const cases = info.caseStudies.map((name) => caseStudies.find((c) => c.client === name)).filter(Boolean);

  return (
    <>
      <PageHero
        title={service.heroTitle || service.title}
        text={service.heroText || service.tagline + '. ' + service.summary}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
        visual={<ModelScene set="services" active={services.indexOf(service)} className="page-hero-scene" zoom={5.3} />}
      />

      <section className="section">
        <div className="container detail-grid">
          <div>
            <h2 className="h2" data-reveal data-delay="60">
              {service.tagline.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="grad-text">{service.tagline.split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="lead" data-reveal data-delay="120">{service.summary}</p>
            <div className="points">
              {service.points.map((p, i) => (
                <div key={p} className="point" data-reveal data-delay={i * 70}>
                  <Icon name="check" /> {p}
                </div>
              ))}
            </div>
            <h3 className="h2" data-reveal>{t.deliverTitle}</h3>
            <ProcessTimeline stepText={service.processText} />
          </div>

          <aside className="detail-aside glass" data-reveal data-delay="120">
            <h3>{t.asideTitle}</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={s.slug === slug ? 'current' : ''}>
                    {s.title} <Icon name="arrow" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={t.asideButton.href} className="btn btn-primary" data-magnetic>
              {t.asideButton.label} <Icon name="arrow" size={18} />
            </Link>
          </aside>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section section-alt">
        <div className="container sd-why">
          <div>
            <h2 className="h2" data-reveal data-delay="60">{info.why.title}</h2>
            <p className="lead" data-reveal data-delay="120">{info.why.text}</p>
            <Link href={t.whyButton.href} className="btn btn-primary" data-reveal data-delay="180" data-magnetic>
              {t.whyButton.label} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="sd-benefits">
            {info.benefits.map((b, i) => (
              <div key={b.title} className="feature spot" data-reveal data-delay={i * 80} data-tilt>
                <span className="svc-icon"><Icon name={b.icon} /></span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES + STACK */}
      <section className="section">
        <div className="container sd-deliver">
          <div className="sd-card spot" data-reveal>
            <h3>{t.deliverablesTitle}</h3>
            <ol className="sd-list">
              {info.deliverables.map((d, i) => (
                <li key={d} style={{ '--i': i }}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {d}
                </li>
              ))}
            </ol>
          </div>
          <div className="sd-card spot" data-reveal data-delay="120">
            <h3>{t.stackTitle}</h3>
            <p>{fill(t.stackText, vars)}</p>
            <div className="sd-stack">
              {info.stack.map((t, i) => (
                <span key={t} style={{ '--i': i }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      {cases.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="bs-head">
              <div>
                <h2 className="h2" data-reveal data-delay="60">
                  <Rich text={fill(t.casesTitle, vars)} />
                </h2>
                <p className="lead" data-reveal data-delay="120">{t.casesText}</p>
              </div>
              <Link href={t.casesButton.href} className="btn btn-ghost bs-all" data-reveal data-delay="160" data-magnetic>
                {t.casesButton.label} <Icon name="arrow" size={18} />
              </Link>
            </div>
            <div className={`sd-cases ${cases.length === 1 ? 'single' : ''}`}>
              {cases.map((c, i) => (
                <Link key={c.client} href={`/case-studies/${c.slug}`} className="sd-case spot" data-reveal data-delay={i * 120}>
                  <div className="sd-case-logo">
                    <Image src={c.logo} alt={c.client} width={180} height={64} />
                  </div>
                  <div className="sd-case-body">
                    <span className="sd-case-cat">{c.category}</span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    <div className="tags">
                      {c.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <span className="link-arrow">
                      {t.caseLinkLabel} <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ title={<Rich text={fill(t.faqTitle, vars)} />} items={info.faqs} />

      <CTASection {...cta} />
    </>
  );
}
