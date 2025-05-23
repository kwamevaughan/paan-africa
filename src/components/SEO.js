import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter for dynamic URL

const SEO = ({
  title = "Pan-African Agency Network (PAAN)",
  description = "Discover the Pan-African Agency Network (PAAN), a dynamic alliance of creative and tech agencies across Africa and the diaspora. Join us to unlock global opportunities, access exclusive resources, and collaborate with top talent to redefine Africa’s creative and technological footprint. Explore our membership tiers, services, and upcoming events today!",
  keywords = "Pan-African Agency Network, PAAN, African agencies, creative network, tech network, collaboration, innovation, global influence",
  image = "https://paan.africa/assets/images/opengraph.png",
  noindex = false,
  imageWidth = 1200, // Default image width
  imageHeight = 630, // Default image height
}) => {
  const router = useRouter();
  // Construct the full URL for the current page
  const canonicalUrl = `https://paan.africa${router.asPath === "/" ? "" : router.asPath.split("?")[0]}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pan-African Agency Network (PAAN)" />
      <meta name="robots" content={noindex ? "noindex" : "index, follow"} />
      <meta charSet="UTF-8" /> {/* Updated charset to charSet */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} /> {/* Dynamic URL */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />{" "}
      {/* Ensure HTTPS */}
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta
        property="og:image:alt"
        content="PAAN - Redefining Africa’s Creative & Tech Footprint"
      />
      <meta
        property="og:site_name"
        content="Pan-African Agency Network (PAAN)"
      />
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="PAAN - Redefining Africa’s Creative & Tech Footprint"
      />
      <meta name="twitter:site" content="@paan_network" />
      <meta name="twitter:creator" content="@paan_network" />
    </Head>
  );
};

export default SEO;
