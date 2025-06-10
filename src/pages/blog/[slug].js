import { usePublicBlog } from "@/hooks/usePublicBlog";
import { useRouter } from "next/router";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/layouts/blogs-header";
import Footer from "@/layouts/footer";
import SEO from "@/components/SEO";
import BlogComments from '@/components/BlogComments';

// Social share icons component
const SocialShare = ({ url, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  };

  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
      <div className="flex flex-col gap-3 bg-white rounded-full p-3 shadow-lg">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1DA1F2] hover:scale-110 transition-transform"
          title="Share on Twitter"
        >
          <Icon icon="mdi:twitter" className="w-6 h-6" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4267B2] hover:scale-110 transition-transform"
          title="Share on Facebook"
        >
          <Icon icon="mdi:facebook" className="w-6 h-6" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0077B5] hover:scale-110 transition-transform"
          title="Share on LinkedIn"
        >
          <Icon icon="mdi:linkedin" className="w-6 h-6" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] hover:scale-110 transition-transform"
          title="Share on WhatsApp"
        >
          <Icon icon="mdi:whatsapp" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

// Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  // Add ordinal suffix to day
  const ordinal = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `Published on ${day}${ordinal(day)} ${month}, ${year}`;
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { currentBlog, loading, error, fetchBlogBySlug, comments, fetchComments } = usePublicBlog();
  const [currentUrl, setCurrentUrl] = useState('');
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', error: false });

  // Single useEffect to handle both blog and comment fetching
  useEffect(() => {
    const loadBlogAndComments = async () => {
      if (slug && typeof slug === 'string' && slug !== 'index') {
        try {
          await fetchBlogBySlug(slug);
          // Comments will be fetched automatically by fetchBlogBySlug
          // as it's already set up to call fetchComments after getting the blog
        } catch (err) {
          console.error('Error loading blog:', err);
        }
      }
    };

    loadBlogAndComments();
    // Set current URL for sharing
    setCurrentUrl(window.location.href);
  }, [slug, fetchBlogBySlug]);

  if (!router.isReady) {
    return null;
  }

  if (slug === 'index') {
    return null;
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F25849]"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-[#F25849]">Error loading blog: {error}</div>
        </div>
      </>
    );
  }

  if (!currentBlog) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Icon
              icon="heroicons:document-text"
              className="mx-auto h-12 w-12 text-[#172840]"
            />
            <h3 className="mt-2 text-sm font-medium text-[#172840]">Blog not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-[#F25849] hover:bg-[#D6473C] transition-all duration-300"
              >
                <Icon icon="heroicons:arrow-left" className="mr-2 h-4 w-4" />
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const hasContent = currentBlog.article_body !== null && 
                    currentBlog.article_body !== undefined && 
                    currentBlog.article_body !== '' && 
                    currentBlog.article_body.trim().length > 0;

  // Generate SEO metadata
  const seoTitle = currentBlog.article_name ? `${currentBlog.article_name} | PAAN Blog` : 'PAAN Blog';
  const seoDescription = currentBlog.meta_description || 
                        (currentBlog.article_body ? 
                          currentBlog.article_body.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
                          'Read the latest insights and trends from Africa\'s creative and tech landscape on the PAAN blog.');
  const seoKeywords = currentBlog.article_tags ? 
                     currentBlog.article_tags.join(', ') + ', PAAN blog, African tech insights, creative industry Africa' : 
                     'PAAN blog, African tech insights, creative industry Africa, tech trends Africa';
  const seoImage = currentBlog.article_image || 'https://paan.africa/assets/images/opengraph.png';

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: '', error: false });
    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscribeForm),
      });

      if (response.ok) {
        setSubscribeStatus({ loading: false, message: 'Subscription successful!', error: false });
      } else {
        setSubscribeStatus({ loading: false, message: 'Subscription failed. Please try again later.', error: true });
      }
    } catch (err) {
      setSubscribeStatus({ loading: false, message: 'An error occurred. Please try again later.', error: true });
    }
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        image={seoImage}
        ogTitle={seoTitle}
        ogDescription={seoDescription}
        ogImage={seoImage}
        twitterCard="summary_large_image"
        twitterTitle={seoTitle}
        twitterDescription={seoDescription}
        twitterImage={seoImage}
        canonicalUrl={`https://paan.africa/blog/${slug}`}
      />
      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Social Share Icons */}
        <SocialShare url={currentUrl} title={currentBlog?.article_name || ""} />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#172840] via-[#1e3147] to-[#243a52] relative py-12 sm:py-16 md:py-24 pt-20 sm:pt-24 md:pt-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-4 left-8 w-6 h-6 sm:w-8 sm:h-8 bg-[#84C1D9] rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -top-6 right-12 w-16 h-16 sm:w-20 sm:h-20 bg-[#F2B706] rounded-full opacity-70"></div>
          <div className="absolute -bottom-10 right-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#F25849] rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-[#84C1D9] rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-[#F2B706] rounded-full opacity-40"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
              {currentBlog?.article_category && (
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 text-sm font-medium capitalize text-[#F25849] bg-[#F25849]/10 rounded-full">
                  {currentBlog.article_category}
                </span>
              )}
              <span className="text-sm text-gray-300">
                {currentBlog?.created_at && formatDate(currentBlog.created_at)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4">
              {currentBlog?.article_name}
            </h1>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#F25849] via-[#F2B706] to-[#84C1D9] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Article Content and Comments */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
          {/* Article */}
          <article className="bg-white rounded-xl overflow-hidden mb-12">
            {currentBlog?.article_image && (
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={currentBlog.article_image}
                  alt={currentBlog.article_name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            <div className="p-6 sm:p-8 md:p-12 lg:p-16">
              {/* Add read time and author info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                {currentBlog?.read_time && (
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:clock" className="w-4 h-4" />
                    <span>{currentBlog.read_time}</span>
                  </div>
                )}
                {currentBlog?.author && (
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:user" className="w-4 h-4" />
                    <span>By {currentBlog.author}</span>
                  </div>
                )}
              </div>

              {!hasContent && (
                <div className="text-center py-12 sm:py-16">
                  <Icon
                    icon="heroicons:document-text"
                    className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-[#172840]"
                  />
                  <h3 className="mt-4 text-base sm:text-lg font-medium text-[#172840]">
                    Content Coming Soon
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-500">
                    This article is being prepared. Please check back later.
                  </p>
                </div>
              )}

              {hasContent && (
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-[#172840] prose-a:text-[#F25849] prose-strong:text-[#172840] prose-img:rounded-xl prose-img:shadow-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentBlog.article_body,
                    }}
                  />
                </div>
              )}

              {currentBlog?.article_tags &&
                currentBlog.article_tags.length > 0 && (
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <h3 className="text-sm sm:text-base font-medium text-[#172840] mb-3 sm:mb-4">
                      Tags:
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {currentBlog.article_tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm text-[#172840] bg-[#172840]/5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </article>

          {/* Newsletter Section */}

          {/* Comments Section - Only show if article has content */}
          {hasContent && currentBlog?.id && (
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden">
              <BlogComments blogId={currentBlog.id} />
            </div>
          )}

          {/* Back to Blogs Button */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center bg-gradient-to-r from-[#F25849] to-[#D6473C] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:from-[#D6473C] hover:to-[#C13F32] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Icon
                icon="heroicons:arrow-left"
                className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              />
              Back to Blogs
            </Link>
          </div>

          <div className="bg-gradient-to-r from-[#172840] to-[#243a52] rounded-xl p-8 mt-12 md:p-12 text-center text-white mb-8">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest insights
              from Africa's creative and tech landscape.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <input
                type="text"
                placeholder="Enter your name"
                value={subscribeForm.name}
                onChange={(e) =>
                  setSubscribeForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={subscribeForm.email}
                onChange={(e) =>
                  setSubscribeForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
              />
              <button
                type="submit"
                disabled={subscribeStatus.loading}
                className={`bg-[#F25849] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                  subscribeStatus.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-[#D6473C]"
                }`}
              >
                {subscribeStatus.loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {/* Status Message */}
            {subscribeStatus.message && (
              <div
                className={`mt-4 text-sm font-medium ${
                  subscribeStatus.error ? "text-red-300" : "text-green-300"
                }`}
              >
                {subscribeStatus.message}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 