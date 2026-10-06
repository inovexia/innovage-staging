import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProcessTimeline from '@/components/ProcessTimeline';
import Icon from '@/components/Icon';
import { services } from '@/lib/data';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.summary } : {};
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        text={service.tagline + '. ' + service.summary}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
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

      <CTASection />
    </>
  );
}
