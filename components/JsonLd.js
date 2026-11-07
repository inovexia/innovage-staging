/** Outputs structured data for search engines. Pass one schema object or several (see lib/schema.js). */
export default function JsonLd({ data }) {
  const body = Array.isArray(data) ? { '@graph': data } : data;
  // "<" is escaped so content can never close the script tag early
  const json = JSON.stringify({ '@context': 'https://schema.org', ...body }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
