import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import { pageMeta, ALLOW_INDEXING, SITE_URL, DEFAULT_TITLE } from '@/lib/seo';
import './globals.css';

const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata = {
  ...pageMeta({ path: '/' }),
  metadataBase: new URL(SITE_URL),
  ...(ALLOW_INDEXING ? {} : { robots: { index: false, follow: false } }),
  title: { default: DEFAULT_TITLE, template: '%s | Innovage' },
  icons: { icon: '/images/favicon.png', apple: '/images/favicon.png' },
};

export const viewport = {
  themeColor: '#0b0a14',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* apply the saved (or OS-preferred) theme before first paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
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
