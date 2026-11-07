import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Rich from '@/components/Rich';
import Icon from '@/components/Icon';
import { site } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/contact.json';

export const metadata = pageMeta({ path: '/contact' });

export default function ContactPage() {
  const { hero, labels } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'Contact' }]} path="/contact" />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-cards">
            <a href={site.phoneHref} className="contact-card spot" data-reveal>
              <span className="svc-icon"><Icon name="phone" /></span>
              <span><small>{labels.call}</small>{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="contact-card spot" data-reveal data-delay="80">
              <span className="svc-icon"><Icon name="mail" /></span>
              <span><small>{labels.email}</small>{site.email}</span>
            </a>
            <div className="contact-card spot" data-reveal data-delay="160">
              <span className="svc-icon"><Icon name="pin" /></span>
              <span>
                <small>{labels.visit}</small>
                {site.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </span>
            </div>
          </div>
          <div data-reveal data-delay="120">
            <ContactForm />
          </div>
        </div>
      </section>

      <FAQ title={<Rich text={content.faq.title} />} items={content.faq.items} />
    </>
  );
}
