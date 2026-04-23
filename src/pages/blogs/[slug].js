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
import BlogAuthor from '@/components/blog/BlogAuthor';
import RelatedPosts from '@/components/blog/RelatedPosts';
import Head from 'next/head';
import { supabase } from "@/lib/supabase";
import ScrollToTop from "@/components/ScrollToTop";
import { calculateReadTime } from '@/utils/readTime';

// ─── Social Share Icons ────────────────────────────────────────────────────────
const SocialShare = ({ url, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
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
      <div className="flex flex-col gap-3 bg-white/40 rounded-full p-3 shadow-lg">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:scale-110 transition-transform" title="Share on Twitter">
          <Icon icon="mdi:twitter" className="w-6 h-6" />
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[#4267B2] hover:scale-110 transition-transform" title="Share on Facebook">
          <Icon icon="mdi:facebook" className="w-6 h-6" />
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-110 transition-transform" title="Share on LinkedIn">
          <Icon icon="mdi:linkedin" className="w-6 h-6" />
        </a>
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform" title="Share on WhatsApp">
          <Icon icon="mdi:whatsapp" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

// ─── Sticky Sidebar CTA ────────────────────────────────────────────────────────
// Appears on the right side after the user has scrolled past the hero.
const StickySidebarCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
        hidden xl:block`}
    >
      <div className="relative w-56 bg-[#172840] rounded-2xl shadow-2xl p-5 text-white overflow-hidden">
  
        {/* dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Dismiss"
        >
          <Icon icon="heroicons:x-mark" className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          <div className="w-10 h-10 bg-paan-red/20 rounded-xl flex items-center justify-center mb-3">
            <Icon icon="heroicons:building-office-2" className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-semibold text-paan-yellow uppercase tracking-widest mb-1">
            Work with PAAN
          </p>
          <h4 className="text-sm font-bold leading-snug mb-3">
            Ready to grow your brand across Africa?
          </h4>
          <Link
            href="/contact-us"
            className="block text-center bg-paan-red hover:bg-paan-red/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Mid-Article Inline CTA ────────────────────────────────────────────────────
// Injected inside the prose area roughly at the midpoint of the article.
const MidArticleCTA = () => (
  <div className="not-prose my-10 rounded-2xl overflow-hidden border border-paan-red/10 bg-gradient-to-r from-[#172840] to-[#1e3f5c] text-white relative">
    {/* decorative blobs */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-paan-yellow/10 rounded-full -translate-y-1/2 translate-x-1/4" />
    <div className="absolute bottom-0 left-0 w-28 h-28 bg-paan-red/10 rounded-full translate-y-1/2 -translate-x-1/4" />

    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 p-7 sm:p-8">
      <div className="flex-shrink-0 w-14 h-14 bg-paan-red/20 rounded-2xl flex items-center justify-center">
        <Icon icon="heroicons:light-bulb" className="w-7 h-7 text-paan-red" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <p className="text-xs font-semibold text-paan-yellow uppercase tracking-widest mb-1">
          PAAN Services
        </p>
        <h4 className="text-lg font-bold mb-1 leading-snug">
          Inspired by what you just read?
        </h4>
        <p className="text-sm text-gray-300">
          PAAN connects brands with Africa's top creative agencies. Let's build something exceptional together.
        </p>
      </div>

      <Link
        href="/contact-us"
        className="flex-shrink-0 inline-flex items-center gap-2 bg-paan-red hover:bg-paan-red/90 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
      >
        <Icon icon="heroicons:envelope" className="w-4 h-4" />
        Get in Touch
      </Link>
    </div>
  </div>
);

// ─── Post-Article CTA Banner ───────────────────────────────────────────────────
// Sits between the article body and the comments section.
const PostArticleCTABanner = () => (
  <div className="my-10 rounded-2xl bg-white border border-gray-100 shadow-md overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* Left accent strip */}
      <div className="md:w-2 bg-gradient-to-b from-paan-red via-paan-yellow to-paan-blue flex-shrink-0" />

      <div className="flex-1 p-7 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Icon cluster */}
          <div className="flex -space-x-2 flex-shrink-0">
            {['heroicons:globe-africa', 'heroicons:chart-bar', 'heroicons:megaphone'].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-[#172840] border-2 border-white flex items-center justify-center shadow"
              >
                <Icon icon={icon} className="w-5 h-5 text-paan-yellow" />
              </div>
            ))}
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-paan-red uppercase tracking-widest mb-1">
              Partner with us
            </p>
            <h4 className="text-xl font-bold text-[#172840] mb-1">
              Unlock Africa's creative economy for your brand
            </h4>
            <p className="text-sm text-gray-500">
              From strategy to execution: PAAN's network of vetted agencies delivers results across the continent.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#172840] hover:bg-[#1e3f5c] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Enquire About Services
              <Icon icon="heroicons:arrow-right" className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="text-xs text-gray-400 hover:text-paan-red underline underline-offset-2 transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Format date helper ────────────────────────────────────────────────────────
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const ordinal = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th';
    }
  };
  return `Published on ${day}${ordinal(day)} ${month}, ${year}`;
};

// ─── getServerSideProps ────────────────────────────────────────────────────────
export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
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
      return { props: { blog: null, error: 'Blog not found' } };
    }

    const { data: authorData } = await supabase
      .from("hr_users")
      .select('id, name')
      .eq('id', blogData.author)
      .single();

    const transformedBlog = {
      ...blogData,
      article_category: blogData.category?.name || 'Uncategorized',
      article_tags: blogData.tags?.map((t) => t.tag.name) || [],
      author: authorData?.name || 'Unknown Author',
      read_time: calculateReadTime(blogData.article_body),
      meta_title: blogData.meta_title || blogData.article_name,
      meta_description: blogData.meta_description || '',
      meta_keywords: blogData.meta_keywords || '',
      focus_keyword: blogData.focus_keyword || ''
    };

    return { props: { blog: transformedBlog, error: null } };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { blog: null, error: error.message } };
  }
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default function BlogPost({ blog: initialBlog, error: serverError }) {
  const router = useRouter();
  const { slug } = router.query;
  const {
    currentBlog,
    loading,
    error: clientError,
    fetchBlogBySlug,
    comments,
    fetchComments,
    commentsLoading,
    commentsError,
    relatedPosts,
    relatedPostsLoading
  } = usePublicBlog();
  const [currentUrl, setCurrentUrl] = useState('');
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', error: false });
  const hasFetchedRef = useRef(false);
  const authorRef = useRef(null);

  const blog = currentBlog || initialBlog;
  const error = clientError || serverError;

  useEffect(() => {
    if (slug && slug !== 'index') {
      hasFetchedRef.current = false;
      fetchBlogBySlug(slug);
    }
  }, [slug, fetchBlogBySlug]);

  useEffect(() => {
    console.log('Comments state in [slug].js:', {
      comments,
      isArray: Array.isArray(comments),
      length: comments?.length,
      type: typeof comments,
      stringified: JSON.stringify(comments)
    });
  }, [comments]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!router.isReady) return null;
  if (slug === 'index') return null;

  if (loading && !initialBlog) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-paan-red"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-paan-red">Error loading blog: {error}</div>
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
            <Icon icon="heroicons:document-text" className="mx-auto h-12 w-12 text-[#172840]" />
            <h3 className="mt-2 text-sm font-medium text-[#172840]">Blog not found</h3>
            <p className="mt-1 text-sm text-gray-500">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <div className="mt-6">
              <Link href="/blogs" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-paan-red hover:bg-paan-red transition-all duration-300">
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

  // ── Split article body at the midpoint for inline CTA injection ──
  const getMidpointSplit = (html) => {
    if (!html) return { before: '', after: '' };
    // Split on paragraph tags to find a clean insertion point
    const parts = html.split(/(?=<p[\s>])/i);
    const midIndex = Math.floor(parts.length / 2);
    return {
      before: parts.slice(0, midIndex).join(''),
      after: parts.slice(midIndex).join('')
    };
  };

  const { before: contentBefore, after: contentAfter } = getMidpointSplit(blog.article_body);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: '', error: false });
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
            "Read the latest insights and trends from Africa's creative and tech landscape on the PAAN blog.")}
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
            "Read the latest insights and trends from Africa's creative and tech landscape on the PAAN blog.")}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://paan.africa/blogs/${slug}`} />
        <meta property="og:image" content={blog.article_image || 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296'} />
        <meta property="og:image:secure_url" content={blog.article_image || 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Pan-African Agency Network (PAAN)" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.meta_title || blog.article_name} />
        <meta name="twitter:description" content={blog.meta_description ||
          (blog.article_body ?
            blog.article_body.replace(/<[^>]*>/g, '').substring(0, 160) + '...' :
            "Read the latest insights and trends from Africa's creative and tech landscape on the PAAN blog.")}
        />
        <meta name="twitter:image" content={blog.article_image || 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296'} />
        <meta name="twitter:site" content="@paan_network" />
        <meta name="twitter:creator" content="@paan_network" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://paan.africa/blogs/${slug}`} />
      </Head>

      <Header />

      <main className="bg-gray-50 min-h-screen relative">
        <ScrollToTop />

        {/* Social Share Icons */}
        <SocialShare url={currentUrl} title={blog?.article_name || ""} />

        {/* Sticky Sidebar CTA (desktop only, right side) */}
        <StickySidebarCTA />

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
          <div className="absolute inset-0 bg-gradient-to-br from-[#172840]/90 via-[#1e3147]/90 to-[#243a52]/90"></div>

          <div className="absolute -top-4 left-8 w-6 h-6 sm:w-8 sm:h-8 bg-paan-blue rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -top-6 right-12 w-16 h-16 sm:w-20 sm:h-20 bg-paan-yellow rounded-full opacity-70"></div>
          <div className="absolute -bottom-10 right-8 w-24 h-24 sm:w-32 sm:h-32 bg-paan-red rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-paan-blue rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-paan-yellow rounded-full opacity-40"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
              {blog?.article_category && (
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 text-sm font-medium capitalize text-paan-red bg-paan-red/10 rounded-full">
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
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-paan-red via-paan-yellow to-paan-blue rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Article Content and Comments */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">

          {/* Article */}
          <div className="flex gap-8">
            <TableOfContents content={blog.article_body} />

            <article className="flex-1 bg-white rounded-xl overflow-hidden">
              {blog?.article_image && (
                <div className="relative w-full h-[500px]">
                  <Image
                    src={blog.article_image}
                    alt={blog.article_name}
                    width={600}
                    height={0}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 md:p-12 lg:p-10">
                {/* Meta row: read time, author, comment count */}
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
                      onClick={() => document.querySelector('#comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                    />
                  )}
                </div>

                {!hasContent && (
                  <div className="text-center py-12 sm:py-16">
                    <Icon icon="heroicons:document-text" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-[#172840]" />
                    <h3 className="mt-4 text-base sm:text-lg font-medium text-[#172840]">Content Coming Soon</h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">This article is being prepared. Please check back later.</p>
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
                      prose-a:text-paan-red prose-a:no-underline hover:prose-a:underline
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
                    {/* First half of article */}
                    <div dangerouslySetInnerHTML={{ __html: contentBefore }} />

                    {/* ── CTA 1: Mid-Article Inline ── */}
                    <MidArticleCTA />

                    {/* Second half of article */}
                    <div dangerouslySetInnerHTML={{ __html: contentAfter }} />
                  </div>
                )}

                {/* Author bio */}
                {blog?.author && <div ref={authorRef}><BlogAuthor author={blog.author} /></div>}

                {/* Tags */}
                {blog?.article_tags && blog.article_tags.length > 0 && (
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <h3 className="text-sm sm:text-base font-medium text-[#172840] mb-3 sm:mb-4">Tags:</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {blog.article_tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm text-paan-dark-blue bg-paan-dark-blue/5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── CTA 2: Post-Article Banner ── */}
                {hasContent && <PostArticleCTABanner />}
              </div>
            </article>
          </div>

          {/* Comments Section */}
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

          {/* Back to Blogs */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center bg-gradient-to-r from-paan-red to-paan-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:from-paan-red hover:to-paan-red transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Icon icon="heroicons:arrow-left" className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Back to Blogs
            </Link>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue rounded-xl p-8 mt-12 md:p-12 text-center text-white mb-8">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest insights from Africa's creative and tech landscape.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Enter your name"
                value={subscribeForm.name}
                onChange={(e) => setSubscribeForm((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-paan-yellow"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={subscribeForm.email}
                onChange={(e) => setSubscribeForm((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-paan-yellow"
              />
              <button
                type="submit"
                disabled={subscribeStatus.loading}
                className={`bg-paan-red text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${subscribeStatus.loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-paan-red'}`}
              >
                {subscribeStatus.loading ? (
                  <span className="flex items-center justify-center">
                    <Icon icon="eos-icons:loading" className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </form>
            {subscribeStatus.message && (
              <div className={`mt-4 text-sm font-medium ${subscribeStatus.error ? 'text-red-300' : 'text-green-300'}`}>
                {subscribeStatus.message}
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} loading={relatedPostsLoading} authorRef={authorRef} />

        <Footer />
      </main>
    </>
  );
}