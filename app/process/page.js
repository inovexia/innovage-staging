import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProcessShowcase from '@/components/ProcessShowcase';
import FAQ from '@/components/FAQ';
import Rich from '@/components/Rich';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/process.json';

export const metadata = pageMeta({ path: '/process' });

export default function ProcessPage() {
  const { hero, showcase, faq } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'Process' }]} path="/process" />

      <ProcessShowcase title={<Rich text={showcase.title} />} text={showcase.text} stepText={showcase.stepText} />

      <FAQ title={<Rich text={faq.title} />} items={faq.items} />

      <CTASection {...content.cta} />
    </>
  );
}
