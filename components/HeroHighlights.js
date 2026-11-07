// Animated highlights drawn over /images/canhub/receipt-review.png. The coordinates are
// that image's own pixels, so they need updating if the image changes. CSS only, no script.
const ROWS = [
  {
    line: 'M 618 573 H 694 Q 712 573 712 555 V 413 Q 712 395 730 395 H 748',
    amount: { x: 498, y: 554, width: 110, height: 39 },
    field: { x: 876, y: 370, width: 425, height: 51 },
  },
  {
    line: 'M 618 606 H 704 Q 722 606 722 588 V 473 Q 722 455 740 455 H 748',
    amount: { x: 498, y: 590, width: 110, height: 33 },
    field: { x: 876, y: 430, width: 425, height: 52 },
  },
  {
    line: 'M 618 650 H 717 Q 735 650 735 632 V 534 Q 735 516 748 516',
    amount: { x: 498, y: 630, width: 110, height: 41 },
    field: { x: 876, y: 490, width: 425, height: 53 },
  },
];

export default function HeroHighlights() {
  return (
    <svg className="hh" viewBox="0 0 1405 902" aria-hidden="true">
      {ROWS.map((row, i) => (
        <g key={row.line} style={{ '--row': i }}>
          <rect className="hh-ring hh-amount" rx="9" {...row.amount} />
          <rect className="hh-ring hh-field" rx="14" {...row.field} />
          <polygon className="hh-arrow" points="-17,-14 17,0 -17,14 -9,0" style={{ offsetPath: `path('${row.line}')` }} />
        </g>
      ))}
      <g className="hh-callout">
        <rect className="hh-ring" x="1040" y="233" width="282" height="60" rx="30" />
        <path className="hh-pointer" d="M 1168 150 H 1192 V 196 H 1214 L 1180 230 L 1146 196 H 1168 Z" />
      </g>
    </svg>
  );
}
