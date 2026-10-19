import Link from 'next/link';
import Image from 'next/image';
import { site, services } from '@/lib/data';
import Icon from './Icon';

export default function Footer() {
  const { footer } = site;
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/innovage-footer-logo.png" alt="Innovage" width={200} height={33} className="logo-dark" />
          <Image src="/images/innovage-logo-dark.png" alt="Innovage" width={200} height={33} className="logo-light" />
          <p>{footer.text}</p>
          <Link href={footer.button.href} className="btn btn-ghost btn-sm" data-magnetic>
            {footer.button.label} <Icon name="arrow" size={16} />
          </Link>
        </div>

        <div>
          <h4>{footer.servicesTitle}</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>{footer.companyTitle}</h4>
          <ul>
            {footer.companyLinks.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>{footer.contactTitle}</h4>
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
          {footer.legalLinks.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </span>
      </div>
      <div className="footer-word" aria-hidden="true">INNOVAGE</div>
    </footer>
  );
}
