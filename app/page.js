import Link from 'next/link';
import Image from 'next/image';
import HeroScene from '@/components/three/HeroScene';
import Icon from '@/components/Icon';
import Counter from '@/components/Counter';
import ProcessExplorer from '@/components/ProcessExplorer';
import SolutionsList from '@/components/SolutionsList';
import CTASection from '@/components/CTASection';
import CanHubShowcase from '@/components/CanHubShowcase';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
// import BlogSection from '@/components/BlogSection'; // blog section hidden on the homepage for now
import Rich from '@/components/Rich';
import { stats, clients } from '@/lib/data';
import content from '@/content/pages/home.json';
import industryContent from '@/content/pages/industries.json';

const { hero, marquee, intro, services, solutions, industries, canhub, process: processSection, testimonials, blog, faq, cta } = content;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <HeroScene />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="container hero-inner">
          <div>
            <h1 className="hero-title" data-reveal>
              <Rich text={hero.title} />
            </h1>
            <p className="lead" data-reveal data-delay="120">{hero.text}</p>
            <div className="hero-industries" data-reveal data-delay="160">
              <span className="hero-industries-label">{hero.industriesLabel}</span>
              <ul>
                {[...industryContent.expertise.items, industries.ai].map((ind) => (
                  <li key={ind.title}>
                    <Link href={ind.href || industries.button.href} className="hero-industry">
                      <Icon name={ind.icon} size={16} />
                      {ind.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn-row" data-reveal data-delay="200">
              <Link href={hero.primaryButton.href} className="btn btn-primary btn-lg" data-magnetic>
                {hero.primaryButton.label} <Icon name="arrow" size={18} />
              </Link>
              <Link href={hero.secondaryButton.href} className="btn btn-ghost btn-lg" data-magnetic>
                {hero.secondaryButton.label}
              </Link>
            </div>
          </div>
          <div className="hero-visual" data-reveal data-delay="160">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              sizes="(max-width: 960px) 100vw, 640px"
              priority
            />
          </div>
          <dl className="hero-stats" data-reveal data-delay="280">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt>{typeof s.value === 'number' ? <Counter value={s.value} suffix={s.suffix} /> : s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-label="What we build">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} aria-hidden={i >= marquee.length}>
              {m} <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* CANHUB 365 — our new product, featured straight after the hero */}
      <CanHubShowcase {...canhub} />

      {/* VALUE PROP + WHY US */}
      <section className="section" id="intro">
        <div className="container split">
          <div>
            <h2 className="h2" data-reveal>
              <Rich text={intro.title} />
            </h2>
            {intro.paragraphs.map((p, i) => (
              <p key={i} className="lead" data-reveal data-delay={80 + i * 40}>{p}</p>
            ))}
            <Link href={intro.button.href} className="btn btn-primary" data-reveal data-delay="180" data-magnetic>
              {intro.button.label} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="value-card glass spot" data-reveal data-delay="120">
            <div className="value-rings" aria-hidden="true">
              <span /><span /><span />
            </div>
            <h3>{intro.card.title}</h3>
            <ul className="why-list">
              {intro.card.items.map((w) => (
                <li key={w.title}>
                  <span className="svc-icon"><Icon name={w.icon} size={20} /></span>
                  <div>
                    <strong>{w.title}</strong>
                    <p>{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href={intro.card.link.href} className="link-arrow">
              {intro.card.link.label} <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal><Rich text={services.title} /></h2>
            <p className="lead" data-reveal data-delay="80">{services.text}</p>
          </div>
          <div className="card-grid four">
            {services.items.map((p, i) => (
              <Link key={p.title} href={p.href} className="svc-card spot" data-reveal data-delay={(i % 3) * 90} data-tilt>
                <span className="svc-icon"><Icon name={p.icon} size={26} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="svc-tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <span className="link-arrow">{services.linkLabel} <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head left">
            <h2 className="h2" data-reveal>
              <Rich text={solutions.title} />
            </h2>
            <p className="lead" data-reveal data-delay="120">{solutions.text}</p>
          </div>
          <SolutionsList />
        </div>
      </section>

      {/* INDUSTRY EXPERTISE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal><Rich text={industries.title} /></h2>
            <p className="lead" data-reveal data-delay="80">{industries.text}</p>
          </div>
          <div className="card-grid four">
            {[...industryContent.expertise.items, industries.ai].map((ind, i) => (
              <Link key={ind.title} href={ind.href || industries.button.href} className="svc-card spot" data-reveal data-delay={(i % 4) * 90} data-tilt>
                <span className="svc-icon"><Icon name={ind.icon} size={26} /></span>
                <h3>{ind.title}</h3>
                <p className="svc-tag">{ind.tagline}</p>
                <div className="svc-tags">
                  {ind.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <span className="link-arrow">{industries.linkLabel} <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
          <div className="section-head" style={{ margin: 'var(--space-head) auto 0' }}>
            <Link href={industries.button.href} className="btn btn-ghost" data-reveal data-magnetic>
              {industries.button.label} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessExplorer title={<Rich text={processSection.title} />} text={processSection.text}>
        <Link href={processSection.button.href} className="btn btn-ghost" data-magnetic>
          {processSection.button.label} <Icon name="arrow" size={18} />
        </Link>
      </ProcessExplorer>

      {/* STATS + CLIENTS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal><Rich text={content.clients.title} /></h2>
            <p className="lead" data-reveal data-delay="80">{content.clients.text}</p>
          </div>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="stat spot" data-reveal data-delay={i * 80}>
                <strong><Counter value={s.value} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="logo-row" data-reveal>
            {clients.map((c) => (
              <div key={c.name} className="logo-tile" title={c.name}>
                <Image src={c.logo} alt={c.name} width={160} height={60} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials {...testimonials} />

      {/* BLOG — hidden for now; restore the import above and this line to bring it back */}
      {/* <BlogSection {...blog} /> */}

      {/* FAQ */}
      <FAQ title={<Rich text={faq.title} />} items={faq.items} />

      <CTASection {...cta} />
    </>
  );
}
