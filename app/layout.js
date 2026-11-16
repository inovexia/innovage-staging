import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import { pageMeta, ALLOW_INDEXING, SITE_URL, DEFAULT_TITLE } from '@/lib/seo';
import './globals.css';

const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

const GTM_ID = 'GTM-N3WJWCPW';

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
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
