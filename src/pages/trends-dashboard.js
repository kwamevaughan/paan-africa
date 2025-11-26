import React from 'react';
import Head from 'next/head';
import TrendsDashboard from '../components/TrendsDashboard';

const TrendsDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Creative Trends Dashboard - PAAN Africa</title>
        <meta name="description" content="Discover trending design styles, viral campaigns, and popular hashtags in African creative industries. Stay ahead with real-time insights from PAAN's Creative Trends Dashboard." />
        <meta name="keywords" content="creative trends, design trends, African creatives, viral campaigns, trending hashtags, design inspiration, advertising trends" />
        <meta property="og:title" content="Creative Trends Dashboard - PAAN Africa" />
        <meta property="og:description" content="Discover trending design styles, viral campaigns, and popular hashtags in African creative industries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://paan.africa/trends-dashboard" />
        <meta property="og:image" content="https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Creative Trends Dashboard - PAAN Africa" />
        <meta name="twitter:description" content="Discover trending design styles, viral campaigns, and popular hashtags in African creative industries." />
        <meta name="twitter:image" content="https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296" />
        <link rel="canonical" href="https://paan.africa/trends-dashboard" />
      </Head>

      <TrendsDashboard />
    </>
  );
};

export default TrendsDashboardPage;
