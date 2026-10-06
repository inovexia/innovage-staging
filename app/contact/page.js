import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/Icon';
import { site } from '@/lib/data';

export const metadata = {
  title: 'Contact',
  description: 'Start your project with Innovage. Book a free consultation.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's Start"
        title="Have an Idea?"
        accent="Let's Talk."
        text="Tell us what you're trying to achieve. We'll help you explore the right technology, approach, and path forward."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-cards">
            <a href={site.phoneHref} className="contact-card spot" data-reveal>
              <span className="svc-icon"><Icon name="phone" /></span>
              <span><small>Call us</small>{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="contact-card spot" data-reveal data-delay="80">
              <span className="svc-icon"><Icon name="mail" /></span>
              <span><small>Email us</small>{site.email}</span>
            </a>
            <div className="contact-card spot" data-reveal data-delay="160">
              <span className="svc-icon"><Icon name="pin" /></span>
              <span>
                <small>Visit us</small>
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
    </>
  );
}
