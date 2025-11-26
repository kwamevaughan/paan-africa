import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter for dynamic URL

const SEO = ({
  title = "Pan-African Agency Network (PAAN)",
  description = "Discover the Pan-African Agency Network (PAAN), a dynamic alliance of creative and tech agencies across Africa and the diaspora. Join us to unlock global opportunities, access exclusive resources, and collaborate with top talent to redefine Africa's creative and technological footprint. Explore our membership tiers, services, and upcoming events today!",
  keywords = "Pan-African Agency Network, PAAN, African agencies, creative network, tech network, collaboration, innovation, global influence",
  image = "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296",
  noindex = false,
  imageWidth = 1200, // Default image width
  imageHeight = 630, // Default image height
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl
}) => {
  const router = useRouter();
  
  

  // Construct the full URL for the current page if not provided
  const finalCanonicalUrl = canonicalUrl || `https://paan.africa${router.asPath === "/" ? "" : router.asPath.split("?")[0]}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pan-African Agency Network (PAAN)" />
      <meta name="robots" content={noindex ? "noindex" : "index, follow"} />
      <meta charSet="UTF-8" /> {/* Updated charset to charSet */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={ogImage || image} />
      <meta property="og:image:secure_url" content={ogImage || image} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Pan-African Agency Network (PAAN)" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      <meta name="twitter:image" content={twitterImage || image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@paan_network" />
      <meta name="twitter:creator" content="@paan_network" />
      <meta name="twitter:domain" content="paan.africa" />
    </Head>
  );
};

export default SEO;
