/**
 * Renders a content string, turning *starred* words into gradient accent text:
 * "What We *Build*" -> What We <span class="grad-text">Build</span>.
 * Pass `em` to wrap the accent in <em> instead.
 */
export default function Rich({ text, em = false }) {
  if (!text || !text.includes('*')) return text ?? null;
  return text.split(/\*(.+?)\*/).map((part, i) =>
    i % 2 === 0 ? part : em ? <em key={i}>{part}</em> : <span key={i} className="grad-text">{part}</span>
  );
}
