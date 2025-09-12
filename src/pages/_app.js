// pages/_app.js
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(name => caches.delete(name)));
      }).then(() => console.log('All caches cleared'))
        .catch(console.error);

      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(r => r.unregister());
      });
    }
  }, []);

  // Set HTML lang attribute based on current locale
  useEffect(() => {
    if (router.locale) {
      document.documentElement.lang = router.locale;
    }
  }, [router.locale]);

  // Global schema (Organization + FAQPage only)
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "PAAN Africa",
        "url": "https://paan.africa",
        "logo": "https://paan.africa/assets/images/logo.png",
        "description": "PAAN Africa connects freelancers, businesses, and partners with AI-powered tools to drive digital growth across Africa.",
        "foundingDate": "2024-01-01",
        "founder": { "@type": "Person", "name": "Duncan Njue" },
        "sameAs": [
          "https://www.facebook.com/panafricanagencynetwork",
          "https://instagram.com/pan_african_agency_network",
          "https://www.linkedin.com/company/pan_african_agency_network",
          "https://x.com/paan_network"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+254701850850",
          "contactType": "customer service",
          "areaServed": "Africa",
          "availableLanguage": ["English"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7th Floor, Mitsumi Business Park, Westlands, Nairobi, Kenya",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi County",
          "postalCode": "00100",
          "addressCountry": "KE"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the value of joining PAAN?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Joining PAAN gives you access to cross-border deals, shared tools, mentorship, increased visibility, and revenue growth — all while keeping your agency fully independent."
            }
          },
          {
            "@type": "Question",
            "name": "Will we lose our identity or clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not at all. You retain your brand and clients. PAAN supports collaboration, not competition, between member agencies."
            }
          },
          {
            "@type": "Question",
            "name": "How are members selected?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Based on track record, regional relevance, capacity, and integrity. Every agency undergoes a due diligence process."
            }
          },
          {
            "@type": "Question",
            "name": "How does PAAN help us get new clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PAAN sources briefs and RFPs, enables joint pitching, and increases agency visibility through network promotions."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </Head>
      {/* Google Analytics (G-W8K184ZV92) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-W8K184ZV92"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W8K184ZV92');
          `,
        }}
      />
      {/* Google Ads (AW-437483343) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-437483343"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-437483343');
          `,
        }}
      />
      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '706159915533812');
          fbq('track', 'PageView');`
        }}
      />
      {/* Google Ads Conversion Event Function */}
      <Script
        id="gtag-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-437483343/25GQCIKkwPIBEM_uzdAB',
                  'transaction_id': '',
                  'event_callback': callback
              });
              return false;
            }
          `,
        }}
      />
      {/* Meta Pixel NoScript fallback */}
      <noscript>
        <img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=706159915533812&ev=PageView&noscript=1" />
      </noscript>
      <Component {...pageProps} />

      <Toaster position="top-right" toastOptions={{
        duration: 4000,
        style: { background: '#363636', color: '#fff' },
        success: { duration: 3000, iconTheme: { primary: '#4ade80', secondary: '#fff' } },
        error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}/>
    </>
  );
}

export default MyApp;
