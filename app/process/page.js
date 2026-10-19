import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProcessShowcase from '@/components/ProcessShowcase';
import Rich from '@/components/Rich';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/process.json';

export const metadata = pageMeta({ ...content.meta, path: '/process' });

export default function ProcessPage() {
  const { hero, showcase } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'Process' }]} />

      <ProcessShowcase title={<Rich text={showcase.title} />} text={showcase.text} />

      <CTASection {...content.cta} />
    </>
  );
}
