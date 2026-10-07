import Icon from './Icon';
import ModelScene from './three/ModelScene';

const menu = [
  { icon: 'chart', label: 'Dashboard' },
  { icon: 'building', label: 'Business Clients' },
  { icon: 'users', label: 'Individual Clients' },
  { icon: 'layers', label: 'Prep Accounts' },
  { icon: 'target', label: 'Deadlines' },
  { icon: 'briefcase', label: 'Invoices' },
  { icon: 'cube', label: 'Payroll' },
];

const kpis = [
  { label: 'Active clients', value: 128 },
  { label: 'Returns in progress', value: 34 },
  { label: 'Due this month', value: 9, accent: true },
];

const balance = [
  { label: 'Assets', value: '412k' },
  { label: 'Liabilities', value: '188k' },
  { label: 'Equity', value: '224k' },
];

/** TeckHub360 dashboard mock-up tilted in 3D, with floating 3D accents and status chips. */
export default function TeckHubStage({ className = '' }) {
  return (
    <div className={`th-stage ${className}`} data-reveal data-delay="160">
      <div className="th-tilt" data-tilt>
        <div className="th-dash" aria-label="TeckHub360 dashboard preview" role="img">
          <div className="th-bar">
            <span className="th-dots"><i /><i /><i /></span>
            <span className="th-url">portal.yourfirm.ca</span>
          </div>
          <div className="th-body">
            <aside className="th-side">
              <div className="th-brand"><b>Y</b><span /></div>
              {menu.map((m, i) => (
                <span key={m.label} className={`th-nav ${i === 0 ? 'on' : ''}`}>
                  <Icon name={m.icon} size={13} /> {m.label}
                </span>
              ))}
            </aside>
            <div className="th-main">
              <div className="th-head">
                <div>
                  <strong>Dashboard</strong>
                  <small>Firm overview · FY 2026</small>
                </div>
                <span className="th-btn">Upload report</span>
              </div>
              <div className="th-kpis">
                {kpis.map((k) => (
                  <div key={k.label} className="th-kpi">
                    <small>{k.label}</small>
                    <strong className={k.accent ? 'accent' : ''}>{k.value}</strong>
                  </div>
                ))}
              </div>
              <div className="th-panels">
                <div className="th-panel">
                  <div className="th-panel-head">
                    <small>Profit &amp; loss</small>
                    <span className="th-badge">+18%</span>
                  </div>
                  <svg className="th-chart" viewBox="0 0 240 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="thFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ed001c" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#ed001c" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="th-area" d="M0 66 L30 60 L60 64 L90 48 L120 52 L150 36 L180 40 L210 22 L240 16 L240 80 L0 80 Z" fill="url(#thFill)" />
                    <path className="th-line" d="M0 66 L30 60 L60 64 L90 48 L120 52 L150 36 L180 40 L210 22 L240 16" />
                  </svg>
                </div>
                <div className="th-panel">
                  <div className="th-panel-head">
                    <small>Balance sheet</small>
                  </div>
                  {balance.map((b) => (
                    <div key={b.label} className="th-row">
                      <span>{b.label}</span>
                      <b>{b.value}</b>
                    </div>
                  ))}
                  <div className="th-progress"><span /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <ModelScene set="teckhub" className="th-scene" zoom={7.4} />
  
      <div className="th-chip th-chip-a glass">
        <span className="th-chip-icon"><Icon name="spark" size={15} /></span>
        <span>
          <small>OCR · Fuel receipt</small>
          GIFI 9281 · 94% match
        </span>
      </div>
      <div className="th-chip th-chip-b glass">
        <span className="th-chip-icon ok"><Icon name="check" size={15} /></span>
        <span>
          <small>GST/HST · Q1</small>
          Filed with CRA
        </span>
      </div>
    </div>
  );
}
