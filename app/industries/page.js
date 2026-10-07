import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Icon from '@/components/Icon';
import { industries } from '@/lib/data';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Industries',
  description: 'Custom software, automation and digital products for businesses across industries.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Solutions for"
        accent="Every Industry"
        text="Every industry runs differently. We design technology around the workflows, customers and regulations that make yours unique."
        crumbs={[{ label: 'Industries' }]}
      />

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {industries.map((ind, i) => (
              <div key={ind.title} className="feature spot" data-reveal data-delay={(i % 4) * 70} data-tilt>
                <span className="svc-icon"><Icon name={ind.icon} /></span>
                <h3>{ind.title}</h3>
                <p>{ind.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Don't See Your Industry?" text="We've built solutions for businesses of every shape. Tell us about yours and we'll show you what's possible." />
    </>
  );
}
