import { usePublicBlog } from "@/hooks/usePublicBlog";
import { useRouter } from "next/router";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Header from "@/layouts/blogs-header";
import Footer from "@/layouts/footer";
import BlogComments from '@/components/blog/BlogComments';
import CommentCount from '@/components/blog/CommentCount';
import TableOfContents from '@/components/blog/TableOfContents';
import Head from 'next/head';
import { supabase } from "@/lib/supabase";

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

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    // Fetch blog data
    const { data: blogData, error: blogError } = await supabase
      .from("blogs")
      .select(`
        *,
        category:blog_categories(name),
        tags:blog_post_tags(
          tag:blog_tags(name)
        )
      `)
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (blogError) throw blogError;

    if (!blogData) {
      return {
        props: {
          blog: null,
          error: 'Blog not found'
        }
      };
    }

    // Fetch author data
    const { data: authorData } = await supabase
      .from("hr_users")
      .select('id, name')
      .eq('id', blogData.author)
      .single();

    // Transform the blog data
    const transformedBlog = {
      ...blogData,
      article_category: blogData.category?.name || 'Uncategorized',
      article_tags: blogData.tags?.map((t) => t.tag.name) || [],
      author: authorData?.name || 'Unknown Author',
      read_time: `${Math.ceil((blogData.article_body?.replace(/<[^>]*>/g, '').length || 0) / 1000) || 5} min read`,
      meta_title: blogData.meta_title || blogData.article_name,
      meta_description: blogData.meta_description || '',
      meta_keywords: blogData.meta_keywords || '',
      focus_keyword: blogData.focus_keyword || ''
    };

    return {
      props: {
        blog: transformedBlog,
        error: null
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        blog: null,
        error: error.message
      }
    };
  }
}

export default function BlogPost({ blog: initialBlog, error: serverError }) {
  const router = useRouter();
  const { slug } = router.query;
  const { currentBlog, loading, error: clientError, fetchBlogBySlug, comments, fetchComments, commentsLoading, commentsError } = usePublicBlog();
  const [currentUrl, setCurrentUrl] = useState('');
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', error: false });
  const hasFetchedRef = useRef(false);

  // Fetch blog and comments when slug is available
  useEffect(() => {
    if (slug && slug !== 'index' && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchBlogBySlug(slug);
    }
  }, [slug, fetchBlogBySlug]);

  // Add debug logging for comments
  useEffect(() => {
    console.log('Comments state in [slug].js:', {
      comments,
      isArray: Array.isArray(comments),
      length: comments?.length,
      type: typeof comments,
      stringified: JSON.stringify(comments)
    });
  }, [comments]);

  // Use the server-rendered blog data if available
  const blog = currentBlog || initialBlog;
  const error = clientError || serverError;

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!router.isReady) {
    return null;
  }

  if (slug === 'index') {
    return null;
  }

  if (loading && !initialBlog) {
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

  if (!blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found | PAAN</title>
          <meta name="robots" content="noindex" />
        </Head>
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

  const hasContent = blog.article_body !== null && 
                    blog.article_body !== undefined && 
                    blog.article_body !== '' && 
                    blog.article_body.trim().length > 0;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: '', error: false });
    try {
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
      <Head>
        <title>{blog.meta_title || blog.article_name}</title>
        <meta name="description" content={blog.meta_description || 
          (blog.article_body ? 
            blog.article_body.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
            'Read the latest insights and trends from Africa\'s creative and tech landscape on the PAAN blog.')} 
        />
        <meta name="keywords" content={blog.meta_keywords || 
          (blog.article_tags ? 
            blog.article_tags.join(', ') + ', PAAN blog, African tech insights, creative industry Africa' : 
            'PAAN blog, African tech insights, creative industry Africa, tech trends Africa')} 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content={blog.meta_title || blog.article_name} />
        <meta property="og:description" content={blog.meta_description || 
          (blog.article_body ? 
            blog.article_body.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
            'Read the latest insights and trends from Africa\'s creative and tech landscape on the PAAN blog.')} 
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://paan.africa/blog/${slug}`} />
        <meta property="og:image" content={blog.article_image || 'https://paan.africa/assets/images/opengraph.png'} />
        <meta property="og:image:secure_url" content={blog.article_image || 'https://paan.africa/assets/images/opengraph.png'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Pan-African Agency Network (PAAN)" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.meta_title || blog.article_name} />
        <meta name="twitter:description" content={blog.meta_description || 
          (blog.article_body ? 
            blog.article_body.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
            'Read the latest insights and trends from Africa\'s creative and tech landscape on the PAAN blog.')} 
        />
        <meta name="twitter:image" content={blog.article_image || 'https://paan.africa/assets/images/opengraph.png'} />
        <meta name="twitter:site" content="@paan_network" />
        <meta name="twitter:creator" content="@paan_network" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://paan.africa/blog/${slug}`} />
      </Head>

      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Social Share Icons */}
        <SocialShare url={currentUrl} title={blog?.article_name || ""} />

        {/* Hero Section */}
        <div 
          className="relative py-12 sm:py-16 md:py-24 pt-20 sm:pt-24 md:pt-32 overflow-hidden"
          style={{
            backgroundImage: blog?.article_image ? `url(${blog.article_image})` : 'linear-gradient(to bottom right, #172840, #243a52)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#172840]/90 via-[#1e3147]/90 to-[#243a52]/90"></div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 left-8 w-6 h-6 sm:w-8 sm:h-8 bg-[#84C1D9] rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -top-6 right-12 w-16 h-16 sm:w-20 sm:h-20 bg-[#F2B706] rounded-full opacity-70"></div>
          <div className="absolute -bottom-10 right-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#F25849] rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-[#84C1D9] rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-[#F2B706] rounded-full opacity-40"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
              {blog?.article_category && (
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 text-sm font-medium capitalize text-[#F25849] bg-[#F25849]/10 rounded-full">
                  {blog.article_category}
                </span>
              )}
              <span className="text-sm text-gray-300">
                {blog?.created_at && formatDate(blog.created_at)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4 leading-snug lg:leading-tight">
  {blog?.article_name}
</h1>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#F25849] via-[#F2B706] to-[#84C1D9] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Article Content and Comments */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
          {/* Article */}
          <div className="flex gap-8">
            {/* Main Content */}
            <article className="flex-1 bg-white rounded-xl overflow-hidden">
              {blog?.article_image && (
                <div className="relative w-full h-[400px]">
                  <Image
                    src={blog.article_image}
                    alt={blog.article_name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 md:p-12 lg:p-10">
                {/* Add read time and author info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                  {blog?.read_time && (
                    <div className="flex items-center gap-2">
                      <Icon icon="heroicons:clock" className="w-4 h-4" />
                      <span>{blog.read_time}</span>
                    </div>
                  )}
                  {blog?.author && (
                    <div className="flex items-center gap-2">
                      <Icon icon="heroicons:user" className="w-4 h-4" />
                      <span>By {blog.author}</span>
                    </div>
                  )}
                  {hasContent && blog?.id && (
                    <CommentCount 
                      comments={comments}
                      loading={commentsLoading}
                      onClick={() => {
                        document.querySelector('#comments-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
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
                  <div
                    className="prose prose-sm sm:prose-base md:prose-lg max-w-none
                      prose-headings:font-bold prose-headings:text-[#172840] prose-headings:tracking-tight
                      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
                      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-6
                      prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                      prose-a:text-[#F25849] prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-[#172840] prose-strong:font-semibold
                      prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                      prose-blockquote:border-l-4 prose-blockquote:border-[#F25849] prose-blockquote:pl-4 prose-blockquote:italic
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                      prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                      prose-li:mb-2 prose-li:text-gray-600
                      prose-code:text-[#F25849] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg
                      prose-hr:my-8 prose-hr:border-gray-200"
                    id="blog-content"
                  >
                    <div dangerouslySetInnerHTML={{ __html: blog.article_body }} />
                  </div>
                )}

                {blog?.article_tags &&
                  blog.article_tags.length > 0 && (
                    <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                      <h3 className="text-sm sm:text-base font-medium text-[#172840] mb-3 sm:mb-4">
                        Tags:
                      </h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {blog.article_tags.map((tag, index) => (
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

            {/* Table of Contents Sidebar */}
            <TableOfContents content={blog.article_body} />
          </div>

          {/* Newsletter Section */}

          {/* Comments Section - Only show if article has content */}
          {hasContent && blog?.id && (
            <div id="comments-section" className="bg-white rounded-xl sm:rounded-2xl overflow-hidden">
              <BlogComments 
                blogId={blog.id} 
                comments={comments}
                commentsLoading={commentsLoading}
                commentsError={commentsError}
                onCommentAdded={() => fetchComments(blog.id)}
              />
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
                    <Icon icon="eos-icons:loading" className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
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