import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Icon from '@/components/Icon';
import TeckHubStage from '@/components/TeckHubStage';
import ThemePreview from '@/components/teckhub/ThemePreview';
import OcrDiagram from '@/components/teckhub/OcrDiagram';
import Rich from '@/components/Rich';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/teckhub360.json';

export const metadata = pageMeta({ ...content.meta, path: '/teckhub360' });

const c = content;

function SectionHead({ title, text, center }) {
  return (
    <div className={`section-head ${center ? '' : 'left'}`}>
      <h2 className="h2" data-reveal><Rich text={title} /></h2>
      {text && <p className="lead" data-reveal data-delay="80">{text}</p>}
    </div>
  );
}

function Cards({ items, cols = '' }) {
  return (
    <div className={`tp-cards ${cols}`}>
      {items.map((f, i) => (
        <div key={f.title} className="feature spot" data-reveal data-delay={(i % 4) * 70} data-tilt>
          <span className="svc-icon"><Icon name={f.icon} /></span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function DemoButtons({ center }) {
  const { primary, secondary } = c.demoButtons;
  return (
    <div className={`btn-row ${center ? 'center' : ''}`} data-reveal data-delay="220">
      <Link href={primary.href} className="btn btn-primary btn-lg" data-magnetic>
        {primary.label} <Icon name="arrow" size={18} />
      </Link>
      <Link href={secondary.href} className="btn btn-ghost btn-lg" data-magnetic>
        {secondary.label}
      </Link>
    </div>
  );
}

export default function TeckHubPage() {
  const { checklist, deadlines } = c.paperwork;
  return (
    <>
      <PageHero
        title={c.hero.title}
        text={c.hero.text}
        crumbs={[{ label: 'TeckHub360' }]}
        visual={<TeckHubStage className="tp-hero-stage" />}
      >
        <DemoButtons />
      </PageHero>

      {/* WHO IT'S FOR */}
      <section className="section">
        <div className="container">
          <SectionHead title={c.audiences.title} text={c.audiences.text} />
          <Cards items={c.audiences.items} cols="four" />
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="section section-alt tp-modules-section">
        <div className="container">
          <SectionHead center title={c.modules.title} text={c.modules.text} />
          <div className="tp-modules">
            <div className="tp-hub" aria-hidden="true">
              <span className="tp-hub-ring" />
              <span className="tp-hub-ring r2" />
              <span className="tp-hub-core">
                <b>TeckHub</b>
                <span>360</span>
              </span>
            </div>
            {c.modules.items.map((m, i) => (
              <div key={m.title} className="tp-module spot" data-reveal data-delay={(i % 5) * 60} style={{ '--i': i }}>
                <span className="tp-module-icon"><Icon name={m.icon} size={20} /></span>
                <div>
                  <strong>{m.title}</strong>
                  <small>{m.text}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OCR */}
      <section id="ocr" className="section tp-ocr">
        <div className="container tp-split">
          <div>
            <SectionHead title={c.ocr.title} />
            {c.ocr.paragraphs.map((p, i) => (
              <p key={i} className="lead" data-reveal data-delay={120 + i * 40}>{p}</p>
            ))}
          </div>
          <div className="tp-scanner" data-reveal data-delay="120">
            <OcrDiagram />
          </div>
        </div>

        <div className="container">
          <ol className="tp-flow">
            {c.ocr.steps.map((s, i) => (
              <li key={s.title} className="spot" data-reveal data-delay={i * 90}>
                <span className="tp-flow-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="tp-module-icon"><Icon name={s.icon} size={20} /></span>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DEMO BAND */}
      <section className="section tp-band-wrap">
        <div className="container">
          <div className="tp-band" data-reveal>
            <div>
              <h2 className="h2"><Rich text={c.demoBand.title} /></h2>
              <p className="lead">{c.demoBand.text}</p>
            </div>
            <DemoButtons />
          </div>
        </div>
      </section>

      {/* PIPELINES */}
      <section id="pipelines" className="section section-alt">
        <div className="container">
          <SectionHead center title={c.pipelines.title} text={c.pipelines.text} />
          <div className="tp-pipes">
            {c.pipelines.items.map((p, i) => (
              <div key={p.title} className="tp-pipe spot" data-reveal data-delay={i * 120}>
                <div className="tp-pipe-head">
                  <div>
                    <strong>{p.title}</strong>
                    <small>{p.sub}</small>
                  </div>
                  <span className="tp-badge">{p.steps.length} {c.pipelines.stepsLabel}</span>
                </div>
                <ol className="tp-track" style={{ '--n': p.steps.length }}>
                  {p.steps.map((label, s) => (
                    <li key={label} className="named" style={{ '--s': s }}>
                      <span className="tp-node">{s === p.steps.length - 1 ? <Icon name="check" size={14} /> : s + 1}</span>
                      <em>{label}</em>
                    </li>
                  ))}
                </ol>
                <p className="tp-pipe-note">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYROLL */}
      <section id="payroll" className="section">
        <div className="container">
          <SectionHead title={c.payroll.title} text={c.payroll.text} />
          <Cards items={c.payroll.items} cols="three" />
        </div>
      </section>

      {/* CHECKLIST + DEADLINES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead center title={c.paperwork.title} text={c.paperwork.text} />
          <div className="tp-panels">
            <div className="tp-panel" data-reveal data-delay="60">
              <div className="tp-panel-head">
                <div>
                  <strong>{checklist.title}</strong>
                  <small>{checklist.subtitle}</small>
                </div>
                <span className="tp-upload">{checklist.uploadLabel}</span>
              </div>
              <div className="tp-complete">
                <small>{checklist.completionLabel}</small>
                <b>{checklist.completion}</b>
              </div>
              <div className="tp-meter big"><span style={{ '--pct': checklist.completion }} /></div>
              <ul className="tp-rows">
                {checklist.items.map((row, i) => (
                  <li key={row.item} style={{ '--i': i }}>
                    <span>{row.item}</span>
                    <span className={`tp-status ${row.tone}`}>{row.status}</span>
                  </li>
                ))}
              </ul>
              <small className="tp-foot">{checklist.footnote}</small>
            </div>

            <div className="tp-panel" data-reveal data-delay="160">
              <div className="tp-panel-head">
                <div>
                  <strong>{deadlines.title}</strong>
                  <small>{deadlines.subtitle}</small>
                </div>
              </div>
              <div className="tp-table">
                <div className="tp-th">
                  {deadlines.columns.map((col) => <span key={col}>{col}</span>)}
                </div>
                {deadlines.items.map((d, i) => (
                  <div key={d.item} className="tp-tr" style={{ '--i': i }}>
                    <span>{d.item}</span>
                    <span>{d.due}</span>
                    <span className={`tp-status ${d.tone}`}>{d.status}</span>
                  </div>
                ))}
              </div>
              <small className="tp-foot">{deadlines.footnote}</small>
            </div>
          </div>
        </div>
      </section>

      {/* BILLING */}
      <section className="section">
        <div className="container">
          <SectionHead title={c.billing.title} text={c.billing.text} />
          <Cards items={c.billing.items} cols="three" />
        </div>
      </section>

      {/* EXTRAS */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead center title={c.extras.title} text={c.extras.text} />
          <Cards items={c.extras.items} cols="three" />
        </div>
      </section>

      {/* WHITE LABEL */}
      <section className="section">
        <div className="container tp-split">
          <div>
            <SectionHead title={c.whiteLabel.title} text={c.whiteLabel.text} />
            <ul className="tp-checks">
              {c.whiteLabel.checks.map((t, i) => (
                <li key={t} data-reveal data-delay={160 + i * 60}>
                  <Icon name="check" size={16} /> {t}
                </li>
              ))}
            </ul>
            <p className="tp-hint" data-reveal data-delay="420">
              <Icon name="spark" size={14} /> {c.whiteLabel.hint}
            </p>
          </div>
          <ThemePreview />
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="section section-alt">
        <div className="container">
          <SectionHead center title={c.security.title} text={c.security.text} />
          <Cards items={c.security.items} cols="four" />
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="section">
        <div className="container">
          <SectionHead title={c.roadmap.title} text={c.roadmap.text} />
          <Cards items={c.roadmap.items} cols="three" />
        </div>
      </section>

      <FAQ id="faq" title={<Rich text={c.faq.title} />} items={c.faq.items} />

      <CTASection {...c.cta} />
    </>
  );
}
