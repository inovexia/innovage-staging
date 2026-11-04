/**
 * OCR → GIFI infographic: a scanned PDF feeds extracted fields, which resolve
 * to a suggested GIFI code with a confidence ring; low confidence branches to a
 * manual check, and an accountant signs off either way. Colours come from the
 * theme tokens, so it works in light and dark.
 */
const fields = [
  { y: 92, label: 34, value: 26 },
  { y: 150, label: 26, value: 20 },
  { y: 208, label: 40, value: 30 },
];

export default function OcrDiagram() {
  return (
    <svg className="od" viewBox="0 0 520 420" role="img" aria-labelledby="od-title">
      <title id="od-title">
        An uploaded PDF is scanned, its figures are extracted, a CRA GIFI code is suggested with a confidence score,
        anything under 70% is flagged for a manual check, and an accountant confirms the code.
      </title>
      <defs>
        <linearGradient id="od-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--red)" stopOpacity="0" />
          <stop offset="85%" stopColor="var(--red)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--red)" stopOpacity="0.9" />
        </linearGradient>
        <clipPath id="od-doc-clip">
          <path d="M40 60h118l32 32v186a12 12 0 0 1-12 12H52a12 12 0 0 1-12-12V72a12 12 0 0 1 12-12z" />
        </clipPath>
      </defs>

      {/* connectors: document -> fields -> code -> reviewer */}
      <g className="od-wire">
        {fields.map((f) => (
          <path key={f.y} d={`M190 ${f.y + 18} C 220 ${f.y + 18}, 220 ${f.y + 18}, 246 ${f.y + 18}`} />
        ))}
        <path d="M366 110 C 386 110, 380 168, 402 168" />
        <path d="M366 168 L 402 168" />
        <path d="M366 226 C 386 226, 380 168, 402 168" />
        <path d="M448 216 L 448 300" />
        <path className="od-wire-warn" d="M416 202 C 400 262, 400 322, 374 322" />
      </g>

      {/* document being scanned */}
      <g className="od-doc">
        <path className="od-card" d="M40 60h118l32 32v186a12 12 0 0 1-12 12H52a12 12 0 0 1-12-12V72a12 12 0 0 1 12-12z" />
        <path className="od-fold" d="M158 60v22a10 10 0 0 0 10 10h22" />
        <rect className="od-red" x="58" y="80" width="38" height="18" rx="5" />
        <text className="od-tag" x="77" y="93" textAnchor="middle">PDF</text>
        {[118, 136, 154, 180, 198, 216, 242, 260].map((y, i) => (
          <rect key={y} className={i % 3 === 2 ? 'od-ink hi' : 'od-ink'} x="58" y={y} width={[110, 92, 74, 104, 86, 60, 96, 70][i]} height="7" rx="3.5" />
        ))}
        <g clipPath="url(#od-doc-clip)">
          <rect className="od-beam" x="40" y="20" width="150" height="46" fill="url(#od-beam)" />
        </g>
      </g>

      {/* extracted fields */}
      {fields.map((f, i) => (
        <g key={f.y} className="od-field" style={{ '--i': i }}>
          <rect className="od-card" x="246" y={f.y} width="120" height="36" rx="10" />
          <rect className="od-ink" x="260" y={f.y + 14} width={f.label} height="8" rx="4" />
          <rect className="od-ink strong" x={352 - f.value} y={f.y + 14} width={f.value} height="8" rx="4" />
        </g>
      ))}
      <text className="od-cap" x="306" y="270" textAnchor="middle">Figures extracted</text>

      {/* suggested code with confidence ring */}
      <g className="od-code">
        <circle className="od-card" cx="448" cy="168" r="46" />
        <circle className="od-track" cx="448" cy="168" r="38" />
        <circle className="od-arc" cx="448" cy="168" r="38" pathLength="100" transform="rotate(-90 448 168)" />
        <text className="od-code-text" x="448" y="166" textAnchor="middle">GIFI</text>
        <text className="od-cap" x="448" y="184" textAnchor="middle">suggested</text>
      </g>

      {/* low confidence branch */}
      <g className="od-flag">
        <rect className="od-warn-card" x="226" y="300" width="148" height="44" rx="12" />
        <path className="od-warn-icon" d="M246 314l9 16h-18z" />
        <text className="od-small" x="266" y="319">Under 70%</text>
        <text className="od-cap" x="266" y="334" textAnchor="start">manual check</text>
      </g>

      {/* accountant signs off */}
      <g className="od-review">
        <circle className="od-red" cx="448" cy="322" r="26" />
        <path className="od-check" d="M437 322l7 7 14-15" />
        <text className="od-small" x="448" y="372" textAnchor="middle">Accountant</text>
        <text className="od-cap" x="448" y="388" textAnchor="middle">confirms every code</text>
      </g>
    </svg>
  );
}
