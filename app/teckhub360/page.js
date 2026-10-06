import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Icon from '@/components/Icon';

export const metadata = {
  title: 'TeckHub360',
  description: 'TeckHub360 by Innovage — a 360° hub for building, running and growing your business technology.',
};

// TODO: replace with the final TeckHub360 product copy
const features = [
  { icon: 'grid', title: 'One Hub. Every Tool.', text: 'Bring your website, portals, automations and reporting together in one connected place—so your team works from a single source of truth.' },
  { icon: 'bolt', title: 'Automation Built In', text: 'Trigger workflows, sync data and remove repetitive tasks across your systems.' },
  { icon: 'chart', title: 'Live Insights', text: 'Dashboards and reporting that show how your business is performing in real time.' },
  { icon: 'shield', title: 'Secure by Default', text: 'Roles, permissions, backups and monitoring handled for you.' },
  { icon: 'cloud', title: 'Cloud-Native', text: 'Scales with your business without infrastructure headaches.' },
  { icon: 'users', title: 'Expert Support', text: 'Backed by the Innovage team for setup, training and continuous improvement.' },
];

export default function TeckHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Introducing"
        title="TeckHub"
        accent="360"
        text="A 360° approach to your business technology—strategy, software, automation and support working together in one place."
        crumbs={[{ label: 'TeckHub360' }]}
      />

      <section className="section">
        <div className="container">
          <div className="hub-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature spot" data-reveal data-delay={i * 70} data-tilt>
                <span className="svc-icon"><Icon name={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="btn-row center" data-reveal>
            <Link href="/contact" className="btn btn-primary btn-lg" data-magnetic>
              Request Early Access <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection title="Ready to See TeckHub360 in Action?" cta="Book a Demo" />
    </>
  );
}
