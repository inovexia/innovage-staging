import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Icon from '@/components/Icon';
import TeckHubStage from '@/components/TeckHubStage';
import ThemePreview from '@/components/teckhub/ThemePreview';
import ModelScene from '@/components/three/ModelScene';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'TeckHub360 — client portal for Canadian accounting firms',
  description:
    'A white-label client portal built for Canadian accounting firms — document intake, OCR that maps receipts to CRA GIFI codes, GST/HST and personal filing pipelines, financial invoices and payroll, under your own branding.',
  path: '/teckhub360',
});

const audiences = [
  { icon: 'briefcase', title: 'Accounting firms', text: 'Several accountants, a shared client load, and a partner who wants to see what is outstanding without asking anyone.' },
  { icon: 'layers', title: 'Bookkeeping practices', text: 'High document volume and clients who send receipts by whatever means is nearest to hand.' },
  { icon: 'users', title: 'Firms with both client types', text: 'Incorporated businesses and individual filers in one portal rather than two systems.' },
];

const modules = [
  { icon: 'building', title: 'Business clients', text: 'Organisations, their users, agreements and year ends.' },
  { icon: 'users', title: 'Individual filers', text: 'Personal-return clients and their assigned accountant.' },
  { icon: 'check', title: 'Checklists & documents', text: 'A structured request list clients work through themselves.', soon: true },
  { icon: 'spark', title: 'OCR & CRA coding', text: 'Receipts read and matched to CRA GIFI codes.' },
  { icon: 'layers', title: 'Filing pipelines', text: 'Ordered stages from documents in to return filed.' },
  { icon: 'briefcase', title: 'Financial invoices', text: 'One-off and T4 invoices, standing agreements and two payment ledgers.', soon: true },
  { icon: 'chart', title: 'Financial reports', text: 'Profit & loss and balance sheet, driving live dashboards.' },
  { icon: 'target', title: 'Deadlines & calendar', text: 'Every obligation across the whole book in one tracker.', soon: true },
  { icon: 'cube', title: 'Payroll', text: 'Pay runs, payslips, PD7A and T4 against each client.' },
  { icon: 'shield', title: 'Roles & security', text: 'Role-scoped access, two-factor login and activity logs.', soon: true },
];

const coded = [
  { doc: 'Restaurant receipt', code: '8523', label: 'Meals and entertainment', pct: 88 },
  { doc: 'Supplier invoice', code: '8962', label: 'Repairs and maintenance', pct: 61, verify: true },
  { doc: 'Bank statement', code: '9270', label: 'Other expenses', pct: 42, verify: true },
];

const pipelines = [
  { title: 'Prep Accounts', sub: 'Business clients · GST/HST', stages: 5, end: 'Filed with CRA', hidden: 3 },
  { title: 'Finalize Account', sub: 'Individual filers · Personal return', stages: 4, end: 'Return filed', hidden: 2 },
];

const billing = [
  { icon: 'briefcase', title: 'Financial invoices', text: 'One-off invoices for business clients and T4 invoices for individual filers, each with its own numbering and client view.', soon: true },
  { icon: 'link', title: 'Standing agreements', text: 'Agreed terms on the record, with the invoices raised against them in one place.' },
  { icon: 'layers', title: 'Two payment ledgers', text: 'Business and individual payments tracked separately, because they reconcile differently.' },
];

const checklist = [
  { item: 'Bank statements — Q1', status: 'Approved', tone: 'ok' },
  { item: 'Fuel receipts', status: 'In review', tone: 'info' },
  { item: 'Supplier invoices', status: 'Changes asked', tone: 'warn' },
  { item: 'Payroll summary', status: 'Not uploaded', tone: 'muted' },
];

const deadlines = [
  { item: 'GST/HST · Q1', due: '30 Apr', status: '6 days', tone: 'warn' },
  { item: 'T2 Corporate', due: '30 Jun', status: 'On track', tone: 'info' },
  { item: 'Payroll · PD7A', due: '15 Apr', status: 'Filed', tone: 'ok' },
  { item: 'T4 Summary', due: '28 Feb', status: 'Filed', tone: 'ok' },
];

const security = [
  { icon: 'shield', title: 'Two-factor on every login', text: 'A one-time code each time, not just on a new device.' },
  { icon: 'compass', title: 'Idle auto-logout', text: 'An unattended screen is not an open door.' },
  { icon: 'users', title: 'Role-scoped access', text: 'A client sees their own organisation and nothing else.' },
  { icon: 'chart', title: 'Activity logs', text: 'Who did what, and when, on every record that matters.' },
];

const upcoming = [
  { icon: 'briefcase', title: 'Recurring invoice agreements', text: 'Standing agreements that raise invoices on a schedule, with client acceptance and automatic reminders.' },
  { icon: 'mail', title: 'Secure in-portal messaging', text: "Firm-to-client conversations against the client record, so decisions stop living in someone's inbox." },
  { icon: 'layers', title: 'More return types', text: 'T2, PD7A and T4 pipelines alongside the GST/HST and personal flows.' },
  { icon: 'chart', title: 'Combined financial import', text: 'One upload carrying both the profit & loss and the balance sheet.' },
  { icon: 'grid', title: 'Payroll dashboards', text: "A per-company payroll overview for the accountant alongside the client's." },
  { icon: 'design', title: 'Self-serve branding', text: 'Upload your own logo, favicon and theme from settings without asking us.' },
];

const faqs = [
  { q: 'Does the OCR file returns automatically?', a: 'No, and that is on purpose. It extracts the figures and proposes a CRA GIFI code with a confidence score; an accountant confirms every code before it reaches a return. We will show you exactly how that review step works on a demo.' },
  { q: 'Can we use our own branding?', a: 'Yes — logo, favicon, colours and typeface, per firm. Your clients never see our name.' },
  { q: 'Does it handle both businesses and individual filers?', a: 'Both, with a separate filing pipeline, invoice type and payment ledger for each.' },
  { q: 'Where is client data hosted?', a: 'Canadian regions. Tax documents and SINs are exactly the kind of data residency rules exist for, and we will show you where it sits.' },
];

function SectionHead({ eyebrow, children, text, center }) {
  return (
    <div className={`section-head ${center ? '' : 'left'}`}>
      <span className="eyebrow" data-reveal>{eyebrow}</span>
      <h2 className="h2" data-reveal data-delay="60">{children}</h2>
      {text && <p className="lead" data-reveal data-delay="120">{text}</p>}
    </div>
  );
}

function Cards({ items, cols = '' }) {
  return (
    <div className={`tp-cards ${cols}`}>
      {items.map((f, i) => (
        <div key={f.title} className="feature spot" data-reveal data-delay={(i % 4) * 70} data-tilt>
          <span className="svc-icon"><Icon name={f.icon} /></span>
          <h3>
            {f.title}
            {f.soon && <span className="tp-soon">Rolling out</span>}
          </h3>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function DemoButtons({ center }) {
  return (
    <div className={`btn-row ${center ? 'center' : ''}`} data-reveal data-delay="220">
      <Link href="/contact" className="btn btn-primary btn-lg" data-magnetic>
        Book a demo <Icon name="arrow" size={18} />
      </Link>
      <Link href="/contact" className="btn btn-ghost btn-lg" data-magnetic>
        Request pricing
      </Link>
    </div>
  );
}

export default function TeckHubPage() {
  return (
    <>
      <PageHero
        eyebrow="TeckHub360"
        title="The portal Canadian accounting firms"
        accent="run filing season on."
        text="One place for your clients to send documents, for your team to code and file them, and for everyone to see where a return actually stands."
        crumbs={[{ label: 'TeckHub360' }]}
        visual={<TeckHubStage className="tp-hero-stage" />}
      >
        <DemoButtons />
      </PageHero>

      {/* WHO IT'S FOR */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Who it's for"
            text="TeckHub360 came out of building portals for Canadian practices one at a time. It handles both sides of a typical firm's book — incorporated businesses on GST/HST, and individuals on personal returns."
          >
            Built for the firms doing the filing, <span className="grad-text">not for enterprise procurement.</span>
          </SectionHead>
          <Cards items={audiences} cols="three" />
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="section section-alt tp-modules-section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Modules"
            text="Everything a practice touches during filing season, in one portal — rather than a document tool, a billing tool, a spreadsheet and an inbox. A demo goes into any of them in depth."
          >
            Ten modules, <span className="grad-text">one login.</span>
          </SectionHead>
          <div className="tp-modules">
            <div className="tp-hub" aria-hidden="true">
              <span className="tp-hub-ring" />
              <span className="tp-hub-ring r2" />
              <span className="tp-hub-core">
                <b>TeckHub</b>
                <span>360</span>
              </span>
            </div>
            {modules.map((m, i) => (
              <div key={m.title} className="tp-module spot" data-reveal data-delay={(i % 5) * 60} style={{ '--i': i }}>
                <span className="tp-module-icon"><Icon name={m.icon} size={20} /></span>
                <div>
                  <strong>
                    {m.title}
                    {m.soon && <span className="tp-soon">Rolling out</span>}
                  </strong>
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
            <SectionHead eyebrow="OCR & CRA coding">
              Receipts in. CRA GIFI codes out. <span className="grad-text">A human still signs off.</span>
            </SectionHead>
            <p className="lead" data-reveal data-delay="120">
              Coding a shoebox of receipts is the least pleasant, most repetitive part of the job. TeckHub360 reads each
              uploaded document, pulls out the totals and the tax, and matches it against the CRA&apos;s General Index of
              Financial Information.
            </p>
            <p className="lead" data-reveal data-delay="160">
              It does not file anything on its own. Every extraction carries a confidence score, low-confidence results
              are flagged for manual verification, and an accountant confirms the code before it moves on. The value is
              in removing the typing, not the judgement.
            </p>
          </div>

          <div className="tp-scanner" data-reveal data-delay="120">
            <ModelScene set="ocr" className="tp-scanner-scene" zoom={7.4} />
            <div className="tp-receipt glass">
              <div className="tp-receipt-head">
                <small>Review before coding</small>
                <span className="tp-badge ok">OCR confidence 94%</span>
              </div>
              <strong>Fuel receipt</strong>
              <dl>
                <div><dt>Subtotal</dt><dd>182.40</dd></div>
                <div><dt>HST</dt><dd>23.71</dd></div>
                <div className="total"><dt>Total</dt><dd>206.11</dd></div>
              </dl>
              <div className="tp-code">
                <small>CRA GIFI code</small>
                <b>9281</b>
                <span>Motor Vehicle</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="tp-coded">
            {coded.map((c, i) => (
              <div key={c.doc} className="tp-coded-card spot" data-reveal data-delay={i * 90} style={{ '--pct': `${c.pct}%` }}>
                <div className="tp-coded-top">
                  <small>{c.doc}</small>
                  <span className={`tp-badge ${c.verify ? 'warn' : 'ok'}`}>{c.verify ? `${c.pct}% · verify` : `${c.pct}%`}</span>
                </div>
                <strong>
                  <b>{c.code}</b> {c.label}
                </strong>
                <div className={`tp-meter ${c.verify ? 'warn' : ''}`}><span /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO BAND */}
      <section className="section tp-band-wrap">
        <div className="container">
          <div className="tp-band" data-reveal>
            <div>
              <h2 className="h2">Easier to show than to describe.</h2>
              <p className="lead">Bring one of your own filing scenarios and we&apos;ll run it through the portal on the call.</p>
            </div>
            <DemoButtons />
          </div>
        </div>
      </section>

      {/* PIPELINES */}
      <section id="pipelines" className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow="Filing pipelines"
            text="Each stage unlocks the next, and a partner can see exactly where any client sits without asking the accountant handling it."
          >
            Two ordered paths, <span className="grad-text">so nothing gets filed out of sequence.</span>
          </SectionHead>
          <div className="tp-pipes">
            {pipelines.map((p, i) => (
              <div key={p.title} className="tp-pipe spot" data-reveal data-delay={i * 120}>
                <div className="tp-pipe-head">
                  <div>
                    <strong>{p.title}</strong>
                    <small>{p.sub}</small>
                  </div>
                  <span className="tp-badge">{p.stages} stages</span>
                </div>
                <ol className="tp-track" style={{ '--n': p.stages }}>
                  {Array.from({ length: p.stages }).map((_, s) => (
                    <li key={s} className={s === 0 || s === p.stages - 1 ? 'named' : 'locked'} style={{ '--s': s }}>
                      <span className="tp-node">{s === p.stages - 1 ? <Icon name="check" size={14} /> : s + 1}</span>
                      <em>{s === 0 ? 'Documents in' : s === p.stages - 1 ? p.end : 'On demo'}</em>
                    </li>
                  ))}
                </ol>
                <p className="tp-pipe-note">
                  A return cannot jump a stage. We&apos;ll walk you through the {p.hidden} in between on a demo.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BILLING */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Billing"
            text="Invoicing sits inside the portal rather than beside it, so what you billed and what they paid are attached to the same client record as the return."
          >
            Billing that knows <span className="grad-text">which client it is looking at.</span>
          </SectionHead>
          <Cards items={billing} cols="three" />
        </div>
      </section>

      {/* CHECKLIST + DEADLINES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow="Checklists & deadlines"
            text="Clients work from a checklist rather than a reply-all thread, and your team sees every obligation across the whole book in one tracker."
          >
            Chasing paperwork, <span className="grad-text">without the chasing.</span>
          </SectionHead>
          <div className="tp-panels">
            <div className="tp-panel" data-reveal data-delay="60">
              <div className="tp-panel-head">
                <div>
                  <strong>Checklist &amp; documents</strong>
                  <small>Expenses · 12 of 18 complete</small>
                </div>
                <span className="tp-upload">Upload</span>
              </div>
              <div className="tp-complete">
                <small>Completion</small>
                <b>67%</b>
              </div>
              <div className="tp-meter big"><span style={{ '--pct': '67%' }} /></div>
              <ul className="tp-rows">
                {checklist.map((c, i) => (
                  <li key={c.item} style={{ '--i': i }}>
                    <span>{c.item}</span>
                    <span className={`tp-status ${c.tone}`}>{c.status}</span>
                  </li>
                ))}
              </ul>
              <small className="tp-foot">PDF, JPG and PNG · 10 MB per file</small>
            </div>

            <div className="tp-panel" data-reveal data-delay="160">
              <div className="tp-panel-head">
                <div>
                  <strong>Deadlines</strong>
                  <small>All clients · next 90 days</small>
                </div>
              </div>
              <div className="tp-table">
                <div className="tp-th">
                  <span>Obligation</span>
                  <span>Due</span>
                  <span>Status</span>
                </div>
                {deadlines.map((d, i) => (
                  <div key={d.item} className="tp-tr" style={{ '--i': i }}>
                    <span>{d.item}</span>
                    <span>{d.due}</span>
                    <span className={`tp-status ${d.tone}`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHITE LABEL */}
      <section className="section">
        <div className="container tp-split">
          <div>
            <SectionHead
              eyebrow="White-label"
              text="Clients log in to something that looks like you. Upload your logo and favicon, set heading, body and button colours, pick the typeface, and choose light, dark or a fully custom theme."
            >
              Your firm&apos;s portal, <span className="grad-text">not ours.</span>
            </SectionHead>
            <ul className="tp-checks">
              {['Logo and favicon uploaded per firm', 'Custom heading, body and button colours', 'Light, dark or custom theme', 'Applied before first paint, so there is no flash of our colours'].map((t, i) => (
                <li key={t} data-reveal data-delay={160 + i * 60}>
                  <Icon name="check" size={16} /> {t}
                </li>
              ))}
            </ul>
            <p className="tp-hint" data-reveal data-delay="420">
              <Icon name="spark" size={14} /> Try it — pick a colour and theme on the right.
            </p>
          </div>
          <ThemePreview />
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="section section-alt">
        <div className="container">
          <SectionHead center eyebrow="Security">
            Tax documents deserve <span className="grad-text">more than a password.</span>
          </SectionHead>
          <Cards items={security} cols="four" />
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="section">
        <div className="container">
          <SectionHead
            eyebrow="Roadmap"
            text="These are in build now. A demo covers where each one sits and what lands first — we would rather tell you that on a call than put a date on a web page."
          >
            And a good deal more <span className="grad-text">on the way.</span>
          </SectionHead>
          <Cards items={upcoming} cols="three" />
        </div>
      </section>

      <FAQ id="faq" eyebrow="FAQ" title={<>TeckHub360 <span className="grad-text">questions</span></>} items={faqs} />

      <CTASection
        title="See TeckHub360 on your own client list."
        text="A 30-minute walkthrough with one of your real filing scenarios, not a canned demo account. We will tell you honestly whether it fits how your practice already works."
        cta="Book a demo"
      />
    </>
  );
}
