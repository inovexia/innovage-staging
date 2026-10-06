'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/data';
import Icon from './Icon';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileSub, setMobileSub] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(false);
    setMobileSub(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && (setOpen(false), setDropdown(false));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Innovage home">
          <Image src="/images/innovage-footer-logo.png" alt="Innovage" width={180} height={30} priority />
        </Link>

        <nav className="nav-pill" aria-label="Main">
          <ul>
            {nav.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className={`has-dd ${dropdown ? 'open' : ''}`}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <button
                    type="button"
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    aria-expanded={dropdown}
                    onClick={() => setDropdown((d) => !d)}
                  >
                    {item.label}
                    <Icon name="chevron" size={14} className="chev" />
                  </button>
                  <div className="mega">
                    <div className="mega-grid">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="mega-item">
                          <span className="mega-icon">
                            <Icon name={c.icon} size={20} />
                          </span>
                          <span>
                            <strong>{c.label}</strong>
                            <small>{c.text}</small>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/services" className="mega-foot">
                      View all services <Icon name="arrow" size={16} />
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="header-cta">
          <Link href="/contact" className="btn btn-primary btn-sm" data-magnetic>
            Let&apos;s Start <Icon name="arrowUpRight" size={16} />
          </Link>
          <button
            type="button"
            className={`burger ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <ul>
          {nav.map((item, i) => (
            <li key={item.label} style={{ '--i': i }}>
              {item.children ? (
                <>
                  <button type="button" className="m-link" onClick={() => setMobileSub((s) => !s)} aria-expanded={mobileSub}>
                    {item.label}
                    <Icon name="chevron" size={20} className={`chev ${mobileSub ? 'up' : ''}`} />
                  </button>
                  <div className={`m-sub ${mobileSub ? 'open' : ''}`}>
                    <div>
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href} className="m-link">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <Link href="/contact" className="btn btn-primary">
          Start Your Project <Icon name="arrow" size={18} />
        </Link>
      </div>
    </header>
  );
}
