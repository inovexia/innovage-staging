import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import SolutionsList from '@/components/SolutionsList';
import Icon from '@/components/Icon';
import { services } from '@/lib/data';

export const metadata = {
  title: 'Services',
  description: 'Website design, development, mobile apps, custom software, business automation, SaaS platforms and ongoing support.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What We Do"
        accent="Best"
        text="We offer a full suite of digital services to bring your vision to life—from strategy and design to development, launch and long-term support."
        crumbs={[{ label: 'Services' }]}
      />

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card spot" data-reveal data-delay={(i % 3) * 90} data-tilt>
                <span className="svc-icon"><Icon name={s.icon} size={26} /></span>
                <h3>{s.title}</h3>
                <p className="svc-tag">{s.tagline}</p>
                <p>{s.summary}</p>
                <span className="link-arrow">Read More <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head left">
            <span className="eyebrow" data-reveal>Solutions</span>
            <h2 className="h2" data-reveal data-delay="60">
              Technology Built Around <span className="grad-text">Real Business Needs</span>
            </h2>
          </div>
          <SolutionsList />
        </div>
      </section>

      <CTASection />
    </>
  );
}
