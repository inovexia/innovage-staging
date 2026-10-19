import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/privacy-policy.json';

export const metadata = pageMeta({ ...content.meta, path: '/privacy-policy' });

export default function Page() {
  return <LegalPage {...content} title={content.hero.title} text={content.hero.text} />;
}
