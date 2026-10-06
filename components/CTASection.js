import Link from 'next/link';
import Icon from './Icon';

export default function CTASection({
  title = "Have an Idea? Let's Turn It Into a Solution.",
  text = "Tell us what you're trying to achieve. We'll help you explore the right technology, approach, and path forward.",
  cta = 'Start a Conversation',
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band spot" data-reveal>
          <div className="cta-orbs" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h2 className="h2">{title}</h2>
          <p className="lead">{text}</p>
          <div className="btn-row center">
            <Link href="/contact" className="btn btn-primary btn-lg" data-magnetic>
              {cta} <Icon name="arrow" size={18} />
            </Link>
            <Link href="/case-studies" className="btn btn-ghost btn-lg" data-magnetic>
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
