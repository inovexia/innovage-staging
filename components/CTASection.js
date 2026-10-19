import Link from 'next/link';
import Icon from './Icon';
import { site } from '@/lib/data';

// Defaults come from "cta" in content/site.json; pages override any of them from their own JSON.
export default function CTASection({ title = site.cta.title, text = site.cta.text, button = site.cta.button }) {
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
              {button} <Icon name="arrow" size={18} />
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
