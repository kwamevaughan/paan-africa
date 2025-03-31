// components/SEO.js
import Head from 'next/head';

const SEO = ({
  title = 'Pan-African Agency Network (PAAN)',
  description = 'The Pan-African Agency Network (PAAN) is a bold alliance of independent agencies across Africa and the diaspora, transforming fragmentation into unity and potential into global influence.',
  keywords = 'Pan-African Agency Network, PAAN, African agencies, creative network, tech network, collaboration, innovation, global influence',
  image = 'https://www.paan.africa/assets/images/logo.svg',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pan-African Agency Network (PAAN)" />
      <meta name="robots" content="index, follow" />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.paan.africa/" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="PAAN - Redefining Africa’s Creative & Tech Footprint" />
      <meta property="og:site_name" content="Pan-African Agency Network (PAAN)" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="PAAN - Redefining Africa’s Creative & Tech Footprint" />
      {/* <meta name="twitter:site" content="@PAANetwork" />
      <meta name="twitter:creator" content="@PAANetwork" /> */}

    </Head>
  );
};

export default SEO;