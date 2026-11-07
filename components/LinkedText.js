import Link from 'next/link';

/** Renders a content string, turning [words](/path) into internal links. */
export default function LinkedText({ text }) {
  return text.split(/(\[[^\]]+\]\(\/[^)]*\))/).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    return link ? <Link key={i} href={link[2]}>{link[1]}</Link> : part;
  });
}
