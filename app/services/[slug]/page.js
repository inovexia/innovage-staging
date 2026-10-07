import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProcessTimeline from '@/components/ProcessTimeline';
import Icon from '@/components/Icon';
import ModelScene from '@/components/three/ModelScene';
import Image from 'next/image';
import FAQ from '@/components/FAQ';
import { services, caseStudies } from '@/lib/data';
import { serviceDetails } from '@/lib/serviceDetails';
import { pageMeta } from '@/lib/seo';


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
  const info = serviceDetails[slug];
  const cases = info.cases.map((name) => caseStudies.find((c) => c.client === name)).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        text={service.tagline + '. ' + service.summary}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
        visual={<ModelScene set="services" active={services.indexOf(service)} className="page-hero-scene" zoom={5.3} />}
      />

      <section className="section">
        <div className="container detail-grid">
          <div>
            <span className="eyebrow" data-reveal>What&apos;s included</span>
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
            <h3 className="h2" data-reveal>How we deliver it</h3>
            <ProcessTimeline />
          </div>

          <aside className="detail-aside glass" data-reveal data-delay="120">
            <h3>All Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={s.slug === slug ? 'current' : ''}>
                    {s.title} <Icon name="arrow" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary" data-magnetic>
              Get a Free Quote <Icon name="arrow" size={18} />
            </Link>
          </aside>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section section-alt">
        <div className="container sd-why">
          <div>
            <span className="eyebrow" data-reveal>Why it matters</span>
            <h2 className="h2" data-reveal data-delay="60">{info.why.title}</h2>
            <p className="lead" data-reveal data-delay="120">{info.why.text}</p>
            <Link href="/contact" className="btn btn-primary" data-reveal data-delay="180" data-magnetic>
              Discuss your project <Icon name="arrow" size={18} />
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
            <span className="eyebrow">What you get</span>
            <h3>Deliverables</h3>
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
            <span className="eyebrow">How we build it</span>
            <h3>Tools &amp; technologies</h3>
            <p>We choose the simplest proven stack for the job — these are the tools we most often use for {service.title}.</p>
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
                <span className="eyebrow" data-reveal>Case studies</span>
                <h2 className="h2" data-reveal data-delay="60">
                  {service.title} <span className="grad-text">in action</span>
                </h2>
                <p className="lead" data-reveal data-delay="120">
                  A look at related work we&apos;ve delivered for businesses like yours.
                </p>
              </div>
              <Link href="/case-studies" className="btn btn-ghost bs-all" data-reveal data-delay="160" data-magnetic>
                All case studies <Icon name="arrow" size={18} />
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
                      Read the case study <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ title={<>{service.title} <span className="grad-text">questions</span></>} items={info.faqs} />

      <CTASection />
    </>
  );
}
