import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Counter from '@/components/Counter';
import Icon from '@/components/Icon';
import { stats } from '@/lib/data';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About',
  description: 'Innovage is a Canadian-based software studio with 10+ years of digital experience and 100+ projects delivered.',
  path: '/about',
});

const values = [
  { icon: 'target', title: 'Business First', text: 'We build the right solution—not simply what was initially requested—by understanding how your business actually works.' },
  { icon: 'compass', title: 'Total Visibility', text: 'Work is delivered in manageable phases so you can review progress and give feedback throughout the journey.' },
  { icon: 'shield', title: 'Built to Last', text: 'Secure, scalable solutions designed for long-term growth, backed by ongoing support and optimization.' },
  { icon: 'users', title: 'True Partnership', text: 'Launch is not the end. We stay on as your technology partner as your business, customers and technology evolve.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Innovage"
        title="Your Technology Partner"
        accent="From First Idea to Long-Term Success"
        text="Innovage works with you beyond development. We provide strategy, UX/UI, development, deployment, maintenance and continuous optimization as your technology partner."
        crumbs={[{ label: 'About' }]}
      />

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow" data-reveal>Who we are</span>
            <h2 className="h2" data-reveal data-delay="60">
              Your Business Is Unique. <span className="grad-text">Your Software Should Be Too.</span>
            </h2>
            <p className="lead" data-reveal data-delay="120">
              We design and develop custom software around the way your business actually works—helping you automate
              processes, improve customer experiences and scale with confidence.
            </p>
            <p className="lead" data-reveal data-delay="160">
              Based in Mississauga, Ontario, we combine our software development expertise with proven technology
              platforms to build solutions that are secure, scalable, and designed for long-term growth.
            </p>
          </div>
          <div className="about-visual" data-reveal data-delay="120" aria-hidden="true">
            <div className="orbit"><i /></div>
            <div className="orbit"><i /></div>
            <div className="orbit"><i /></div>
            <div className="orbit-core">
              <span>10+<small>years</small></span>
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
            <span className="eyebrow" data-reveal>What drives us</span>
            <h2 className="h2" data-reveal data-delay="60">How We <span className="grad-text">Work With You</span></h2>
          </div>
          <div className="feature-grid">
            {values.map((v, i) => (
              <div key={v.title} className="feature spot" data-reveal data-delay={i * 80} data-tilt>
                <span className="svc-icon"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
