import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import { pageMeta, SITE_URL, DEFAULT_TITLE } from '@/lib/seo';
import './globals.css';

const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata = {
  ...pageMeta({ path: '/' }),
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s | Innovage' },
  icons: { icon: '/images/innovage-footer-logo.png' },
};

export const viewport = {
  themeColor: '#0b0a14',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body suppressHydrationWarning>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">Skip to content</a>
        <Effects />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
