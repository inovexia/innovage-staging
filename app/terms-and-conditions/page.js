import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/terms-and-conditions.json';

export const metadata = pageMeta({ ...content.meta, path: '/terms-and-conditions' });

export default function Page() {
  return <LegalPage {...content} title={content.hero.title} text={content.hero.text} />;
}
