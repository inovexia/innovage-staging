import Link from 'next/link';
import Image from 'next/image';
import { site, services } from '@/lib/data';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/innovage-footer-logo.png" alt="Innovage" width={200} height={33} />
          <p>
            We design and develop custom software around the way your business actually works — web apps, portals, SaaS
            platforms and mobile applications.
          </p>
          <Link href="/contact" className="btn btn-ghost btn-sm" data-magnetic>
            Book a Free Consultation <Icon name="arrow" size={16} />
          </Link>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/teckhub360">TeckHub360</Link></li>
            <li><Link href="/case-studies">Case Studies</Link></li>
            <li><Link href="/industries">Industries</Link></li>
            <li><Link href="/process">Process</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact Info</h4>
          <ul className="contact-list">
            <li>
              <Icon name="phone" size={18} />
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <Icon name="pin" size={18} />
              <span>
                {site.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.legalName} All rights reserved.</span>
        <span className="footer-legal">
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </span>
      </div>
      <div className="footer-word" aria-hidden="true">INNOVAGE</div>
    </footer>
  );
}
