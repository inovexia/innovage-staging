import Link from 'next/link';
import Image from 'next/image';
import HeroScene from '@/components/three/HeroScene';
import Icon from '@/components/Icon';
import Counter from '@/components/Counter';
import ProcessShowcase from '@/components/ProcessShowcase';
import SolutionsList from '@/components/SolutionsList';
import CTASection from '@/components/CTASection';
import TeckHubShowcase from '@/components/TeckHubShowcase';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';
import { pillars, stats, clients, marquee } from '@/lib/data';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <HeroScene />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="container hero-inner">
          <span className="eyebrow pill" data-reveal>
            <span className="pulse" /> Canadian-based software studio · 10+ years
          </span>
          <h1 className="hero-title" data-reveal data-delay="80">
            We Build <span className="grad-text">Digital Products</span> That Move Your Business Forward
          </h1>
          <p className="lead" data-reveal data-delay="180">
            Custom web apps, business portals, SaaS platforms and mobile applications — designed around the way your
            business actually works.
          </p>
          <div className="btn-row" data-reveal data-delay="260">
            <Link href="/contact" className="btn btn-primary btn-lg" data-magnetic>
              Start Your Project <Icon name="arrow" size={18} />
            </Link>
            <Link href="/services" className="btn btn-ghost btn-lg" data-magnetic>
              Explore Services
            </Link>
          </div>
          <dl className="hero-stats" data-reveal data-delay="340">
            <div>
              <dt><Counter value={10} suffix="+" /></dt>
              <dd>Years of experience</dd>
            </div>
            <div>
              <dt><Counter value={100} suffix="+" /></dt>
              <dd>Projects delivered</dd>
            </div>
            <div>
              <dt>Web · SaaS · Mobile</dt>
              <dd>End-to-end delivery</dd>
            </div>
          </dl>
        </div>
        <a href="#intro" className="scroll-cue" aria-label="Scroll to content">
          <span />
        </a>
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

      {/* VALUE PROP */}
      <section className="section" id="intro">
        <div className="container split">
          <div>
            <span className="eyebrow" data-reveal>Why Innovage</span>
            <h2 className="h2" data-reveal data-delay="60">
              Your Business Is Unique. <span className="grad-text">Your Software Should Be Too.</span>
            </h2>
            <p className="lead" data-reveal data-delay="120">
              We design and develop custom software around the way your business actually works—helping you automate
              processes, improve customer experiences and scale with confidence.
            </p>
            <Link href="/contact" className="btn btn-primary" data-reveal data-delay="180" data-magnetic>
              Book a Free Consultation <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="value-card glass spot" data-reveal data-delay="120" data-tilt>
            <div className="value-rings" aria-hidden="true">
              <span /><span /><span />
            </div>
            <h3>From First Idea to Long-Term Success</h3>
            <p>
              Innovage works with you beyond development. We provide strategy, UX/UI, development, deployment,
              maintenance and continuous optimization as your technology partner.
            </p>
            <ul className="check-list">
              {['Strategy & discovery', 'UX/UI design', 'Development & deployment', 'Maintenance & optimization'].map((t) => (
                <li key={t}><Icon name="check" size={16} /> {t}</li>
              ))}
            </ul>
            <Link href="/contact" className="link-arrow">
              Get a Free Quote <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Services</span>
            <h2 className="h2" data-reveal data-delay="60">What We Do <span className="grad-text">Best</span></h2>
            <p className="lead" data-reveal data-delay="120">We offer a full suite of digital services to bring your vision to life.</p>
          </div>
          <div className="card-grid">
            {pillars.map((p, i) => (
              <Link key={p.title} href={p.href} className="svc-card spot" data-reveal data-delay={(i % 3) * 90} data-tilt>
                <span className="svc-icon"><Icon name={p.icon} size={26} /></span>
                <h3>{p.title}</h3>
                <p className="svc-tag">{p.tagline}</p>
                <p>{p.text}</p>
                <span className="link-arrow">Read More <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head left">
            <span className="eyebrow" data-reveal>Solutions</span>
            <h2 className="h2" data-reveal data-delay="60">
              Technology Built Around <span className="grad-text">Real Business Needs</span>
            </h2>
            <p className="lead" data-reveal data-delay="120">
              From business automation to custom software platforms, we design and build digital solutions that solve
              complex operational challenges.
            </p>
          </div>
          <SolutionsList />
        </div>
      </section>

      {/* TECKHUB360 */}
      <TeckHubShowcase />

      {/* PROCESS */}
      <ProcessShowcase
        eyebrow="How we work"
        title={<>Our Proven <span className="grad-text">Process</span></>}
        text="Our proven process brings together business discovery, product strategy, UX/UI design, development, testing, deployment, and ongoing improvement. At every stage, we work closely with you to reduce uncertainty, maintain visibility, and build technology that delivers real business value."
      >
        <Link href="/process" className="btn btn-ghost" data-magnetic>
          See the full process <Icon name="arrow" size={18} />
        </Link>
      </ProcessShowcase>

      {/* STATS + CLIENTS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Our Clients</span>
            <h2 className="h2" data-reveal data-delay="60">Businesses We&apos;ve <span className="grad-text">Helped Build</span></h2>
            <p className="lead" data-reveal data-delay="120">
              We combine our software development expertise with proven technology platforms to build solutions that
              are secure, scalable, and designed for long-term growth.
            </p>
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
      <Testimonials />

      {/* BLOG */}
      <BlogSection />

      <CTASection />
    </>
  );
}
