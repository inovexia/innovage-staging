import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Icon from '@/components/Icon';
import { caseStudies } from '@/lib/data';
import Rich from '@/components/Rich';
import { pageMeta } from '@/lib/seo';
import page from '@/content/pages/case-studies.json';

const t = page.detail;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.client} — Case Study`,
    description: `${c.title}. ${c.text}`,
    path: `/case-studies/${c.slug}`,
    type: 'article',
    ...(c.images && { image: { url: `/images/og/case-${c.images.desktop.split('/').pop().replace('-desktop.webp', '.jpg')}`, width: 1200, height: 630, alt: `${c.client} website designed and built by Innovage` } }),
  });
}

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// Longer pages scroll for longer, so the speed feels the same on every case study.
const scrollSeconds = (img) => Math.min(Math.max(Math.round(((img.fullHeight || 0) / 1200) * 2.8), 6), 14);

// Sections sit at different depths on the desktop and mobile layouts, so a plain
// top-to-bottom scroll drifts apart. With sync points, both screens get keyframes
// that reach each section at the same moment.
function syncKeyframes(slug, img) {
  if (!img.scrollSync) return null;
  const maxD = img.fullHeight - 750; // desktop frame is 16:10 of a 1200px-wide image
  const maxM = img.mobileFullHeight - 844; // phone frame is 390 x 844
  const pts = [...img.scrollSync.map(([d, m]) => [Math.min(d, maxD), Math.min(m, maxM)]), [maxD, maxM]]
    .filter(([d, m], i, a) => i === 0 || (d > a[i - 1][0] && m > a[i - 1][1]));
  const at = ([d, m]) => (((d / maxD + m / maxM) / 2) * 100).toFixed(2);
  const kf = (name, i, h) =>
    `@keyframes ${name}{${pts.map((p) => `${at(p)}%{transform:translateY(-${((p[i] / h) * 100).toFixed(3)}%)}`).join('')}}`;
  const d = `cd-sync-${slug}-d`;
  const m = `cd-sync-${slug}-m`;
  return { d, m, css: kf(d, 0, img.fullHeight) + kf(m, 1, img.mobileFullHeight) };
}

function Showcase({ c }) {
  if (!c.images) {
    return (
      <div className="cd-logo-stage">
        <div className="logo-tile">
          <Image src={c.logo} alt={c.client} width={200} height={80} />
        </div>
      </div>
    );
  }
  return (
    <div className="cd-devices">
      <div className="cd-browser">
        <div className="cd-browser-bar">
          <span className="cd-dots"><i /><i /><i /></span>
          <span className="cd-url">{c.url ? host(c.url) : c.client}</span>
        </div>
        <Image src={c.images.desktop} alt={`${c.client} website on desktop`} width={1440} height={900} priority sizes="(max-width: 960px) 90vw, 560px" />
      </div>
      <div className="cd-phone">
        <Image src={c.images.mobile} alt={`${c.client} website on mobile`} width={500} height={1000} sizes="160px" />
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const c = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const sync = c.images?.full && syncKeyframes(c.slug, c.images);

  const facts = [
    { label: t.factLabels.client, value: c.client },
    { label: t.factLabels.industry, value: c.industry },
    c.location && { label: t.factLabels.location, value: c.location },
    { label: t.factLabels.services, value: c.services.join(', ') },
  ].filter(Boolean);

  const story = [
    { n: '01', title: t.storyLabels.overview, text: c.overview },
    { n: '02', title: t.storyLabels.challenge, text: c.challenge },
    { n: '03', title: t.storyLabels.solution, text: c.solution },
  ];

  return (
    <>
      <PageHero
        title={c.client}
        text={c.title + '. ' + c.text}
        crumbs={[{ label: 'Case Studies', href: '/case-studies' }, { label: c.client }]}
        visual={<Showcase c={c} />}
      >
        <div className="btn-row" data-reveal data-delay="220">
          <Link href={t.heroButton.href} className="btn btn-primary btn-lg" data-magnetic>
            {t.heroButton.label} <Icon name="arrow" size={18} />
          </Link>
        </div>
      </PageHero>

      {/* FACTS */}
      <section className="section cd-facts-wrap">
        <div className="container">
          <dl className="cd-facts" data-reveal>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="section-head left">
            <h2 className="h2" data-reveal data-delay="60">
              <Rich text={t.storyTitle} />
            </h2>
          </div>
          <div className="cd-story">
            {story.map((s, i) => (
              <div key={s.n} className="cd-step spot" data-reveal data-delay={i * 120}>
                <span className="cd-step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" data-reveal data-delay="60">
              <Rich text={t.featuresTitle} />
            </h2>
          </div>
          <div className="cd-features">
            {c.features.map((f, i) => (
              <div key={f.title} className="feature spot" data-reveal data-delay={(i % 3) * 80} data-tilt>
                <span className="svc-icon"><Icon name={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLLING PREVIEW */}
      {c.images && (
        <section className="section cd-preview-section">
          <div className="container">
            <div className="section-head">
              <h2 className="h2" data-reveal data-delay="60">
                <Rich text={t.previewTitle} />
              </h2>
              <p className="lead" data-reveal data-delay="120">
                {c.images.full ? t.previewTextScroll : t.previewTextStatic}
              </p>
            </div>
            {sync && <style>{sync.css}</style>}
            <div className={`cd-preview ${c.images.full ? 'scrolls' : ''} ${sync ? 'synced' : ''}`} style={{ '--dur': `${scrollSeconds(c.images)}s` }}>
              <div className="cd-browser big" data-reveal>
                <div className="cd-browser-bar">
                  <span className="cd-dots"><i /><i /><i /></span>
                  <span className="cd-url">{c.url ? host(c.url) : c.client}</span>
                </div>
                <div className="cd-scroll">
                  <Image
                    src={c.images.full || c.images.desktop}
                    alt={`${c.client} homepage`}
                    width={1200}
                    height={c.images.fullHeight || 750}
                    sizes="(max-width: 960px) 92vw, 820px"
                    style={sync ? { '--anim': sync.d } : undefined}
                  />
                </div>
              </div>
              <div className="cd-phone big" data-reveal data-delay="150">
                <div className="cd-scroll phone">
                  <Image
                    src={c.images.mobileFull || c.images.mobile}
                    alt={`${c.client} on mobile`}
                    width={390}
                    height={c.images.mobileFullHeight || 780}
                    sizes="240px"
                    style={sync ? { '--anim': sync.m } : undefined}
                  />
                </div>
              </div>
              {c.images.full && (
                <span className="cd-hint" aria-hidden="true">
                  <Icon name="arrow" size={14} /> {t.previewHint}
                </span>
              )}
            </div>
            <div className="cd-tags" data-reveal>
              {c.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEXT PROJECT */}
      <section className="section section-alt">
        <div className="container">
          <Link href={`/case-studies/${next.slug}`} className="cd-next spot" data-reveal>
            <div>
              <small>{t.nextLabel}</small>
              <strong>{next.client}</strong>
              <span>{next.title}</span>
            </div>
            <div className="cd-next-logo">
              <Image src={next.logo} alt="" width={160} height={60} />
            </div>
            <span className="cd-next-arrow"><Icon name="arrowUpRight" size={22} /></span>
          </Link>
        </div>
      </section>

      <CTASection {...t.cta} />
    </>
  );
}
