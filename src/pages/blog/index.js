import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import Header from '@/layouts/blogs-header';
import Footer from '@/layouts/footer';
import { usePublicBlog } from '@/hooks/usePublicBlog';
import { toast } from 'react-hot-toast';
import ScrollToTop from "@/components/ScrollToTop";
import SEO from '@/components/SEO';
import { supabase } from "@/lib/supabase";
import { calculateReadTime } from '@/utils/readTime';

export async function getServerSideProps() {
  try {
    // Fetch blogs with categories and tags
    const { data: blogsData, error: blogsError } = await supabase
      .from("blogs")
      .select(`
        *,
        category:blog_categories(name),
        tags:blog_post_tags(
          tag:blog_tags(name)
        )
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (blogsError) throw blogsError;

    if (!blogsData || blogsData.length === 0) {
      return {
        props: {
          initialBlogs: {
            featuredPost: null,
            regularPosts: [],
            blogs: []
          }
        }
      };
    }

    // Get unique author IDs from all blogs
    const authorIds = [...new Set(blogsData.map(blog => blog.author))].filter(Boolean);

    // Fetch all authors in one query
    const { data: authorsData, error: authorsError } = await supabase
      .from("hr_users")
      .select('id, name')
      .in('id', authorIds);

    if (authorsError) throw authorsError;

    // Create a map of author IDs to names
    const authorMap = new Map(
      (authorsData || []).map(author => [author.id, author.name])
    );

    // Transform the data
    const transformedData = blogsData.map((blog) => {
      const cleanContent = blog.article_body 
        ? blog.article_body
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim()
        : '';
      
      const contentSnippet = cleanContent.length > 150 
        ? cleanContent.substring(0, 150) + '...' 
        : cleanContent;

      return {
        id: blog.id,
        slug: blog.slug || '',
        title: blog.article_name || 'Untitled',
        excerpt: contentSnippet || 'No content available',
        image: blog.article_image || '/images/blog-placeholder.jpg',
        date: blog.created_at ? new Date(blog.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) : 'No date',
        author: authorMap.get(blog.author) || 'Unknown Author',
        readTime: calculateReadTime(blog.article_body),
        featured: blog.is_featured || false,
        category: blog.category?.name || 'Uncategorized',
        tags: blog.tags?.map((t) => t.tag.name) || [],
        article_body: blog.article_body || '',
        meta_description: blog.meta_description || '',
        article_category: blog.category?.name || 'Uncategorized',
        article_tags: blog.tags?.map((t) => t.tag.name) || [],
        article_image: blog.article_image || '/images/blog-placeholder.jpg',
        created_at: blog.created_at,
        updated_at: blog.updated_at
      };
    });

    // Find the first featured post
    const featured = transformedData.find(blog => blog.featured);
    // Get all non-featured posts
    const regular = transformedData.filter(blog => !blog.featured);

    return {
      props: {
        initialBlogs: {
          featuredPost: featured || null,
          regularPosts: regular || [],
          blogs: transformedData
        }
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialBlogs: {
          featuredPost: null,
          regularPosts: [],
          blogs: [],
          error: error.message
        }
      }
    };
  }
}

const Blogs = ({ initialBlogs }) => {
  const router = useRouter();
  const { category, search, sort } = router.query;
  const { featuredPost, regularPosts, loading, error } = usePublicBlog(initialBlogs);
  
  // Add detailed debug logs
  useEffect(() => {
    console.log('Blog Page State:', {
      loading,
      error,
      hasFeaturedPost: !!featuredPost,
      regularPostsCount: regularPosts?.length,
      category,
      search,
      sort,
      routerReady: router.isReady,
      featuredPostData: featuredPost,
      firstRegularPost: regularPosts?.[0]
    });
  }, [loading, error, featuredPost, regularPosts, category, search, sort, router.isReady]);

  // State management
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [searchQuery, setSearchQuery] = useState(search || '');
  const [sortBy, setSortBy] = useState(sort || 'newest');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', error: false });

  // Extract unique categories from all posts
  useEffect(() => {
    const allPosts = [...(featuredPost ? [featuredPost] : []), ...(regularPosts || [])];
    const categories = [...new Set(allPosts.map(post => post.category))].filter(Boolean);
    setAvailableCategories(categories);
  }, [featuredPost, regularPosts]);

  // Update URL when filters change
  useEffect(() => {
    const query = {};
    if (selectedCategory) query.category = selectedCategory;
    if (searchQuery) query.search = searchQuery;
    if (sortBy !== 'newest') query.sort = sortBy;

    router.push({
      pathname: '/blog',
      query: Object.keys(query).length > 0 ? query : {}
    }, undefined, { shallow: true });
  }, [selectedCategory, searchQuery, sortBy]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...(regularPosts || [])];
    
    // Apply category filter
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    posts.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'readTime':
          return parseInt(a.readTime) - parseInt(b.readTime);
        case 'newest':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });
    
    return posts;
  }, [regularPosts, selectedCategory, searchQuery, sortBy]);

  // Filter featured post
  const filteredFeaturedPost = useMemo(() => {
    if (!featuredPost) return null;
    
    if (selectedCategory && featuredPost.category !== selectedCategory) return null;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!(
        featuredPost.title.toLowerCase().includes(query) ||
        featuredPost.excerpt.toLowerCase().includes(query) ||
        featuredPost.category?.toLowerCase().includes(query) ||
        featuredPost.tags?.some(tag => tag.toLowerCase().includes(query))
      )) return null;
    }
    
    return featuredPost;
  }, [featuredPost, selectedCategory, searchQuery]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, message: '', error: false });

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscribeForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      setSubscribeStatus({
        loading: false,
        message: 'Thank you for subscribing! Please check your email for confirmation.',
        error: false
      });
      setSubscribeForm({ name: '', email: '' }); // Reset form
      
      // Show success toast
      toast.success('Successfully subscribed! Please check your email for confirmation.');
    } catch (error) {
      setSubscribeStatus({
        loading: false,
        message: error.message || 'Failed to subscribe. Please try again.',
        error: true
      });
      
      // Show error toast
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    }
  };

  // Render loading state
  if (loading) {
    console.log('Rendering loading state');
    return (
      <>
        <SEO 
          title="Loading Blog | PAAN"
          description="Loading blog content..."
          noindex={true}
        />
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F25849]"></div>
        </div>
      </>
    );
  }

  // Render error state
  if (error) {
    console.log('Rendering error state:', error);
    return (
      <>
        <SEO 
          title="Blog Not Found | PAAN"
          description={`Error loading blogs: ${error}`}
          noindex={true}
        />
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-red-500">Error loading blogs: {error}</div>
        </div>
      </>
    );
  }

  // Render no blogs state
  if (!featuredPost && (!regularPosts || regularPosts.length === 0)) {
    console.log('Rendering no blogs state');
    return (
      <>
        <SEO 
          title="No Blogs Found | PAAN"
          description="We're currently working on new content. Please check back soon!"
          noindex={true}
        />
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#172840] mb-4">No Blogs Found</h2>
              <p className="text-gray-600">We're currently working on new content. Please check back soon!</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Main render
  console.log('Rendering main content with:', {
    hasFeaturedPost: !!featuredPost,
    regularPostsCount: regularPosts?.length
  });

  return (
    <>
      <SEO 
        title="PAAN Blog | Insights from Africa's Creative & Tech Landscape"
        description="Explore the latest insights, trends, and stories from Africa's creative and tech landscape. Stay informed with expert analysis, industry news, and thought leadership from PAAN."
        keywords="PAAN blog, African tech insights, creative industry Africa, tech trends Africa, African innovation, creative tech blog, African digital transformation, tech leadership Africa"
        ogTitle="PAAN Blog | Africa's Creative & Tech Insights"
        ogDescription="Discover the latest insights and trends from Africa's creative and tech landscape. Expert analysis, industry news, and thought leadership from PAAN."
        ogImage="/assets/images/opengraph.png"
        twitterCard="summary_large_image"
        twitterTitle="PAAN Blog | Africa's Creative & Tech Insights"
        twitterDescription="Discover the latest insights and trends from Africa's creative and tech landscape. Expert analysis, industry news, and thought leadership from PAAN."
        twitterImage="/assets/images/opengraph.png"
        canonicalUrl="https://paan.africa/blog"
      />
      
      <Header />
      
      <main className="bg-gray-50 min-h-screen relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#172840] via-[#1e3147] to-[#243a52] relative py-24 pt-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-4 left-8 w-8 h-8 bg-[#84C1D9] rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -top-6 right-12 w-20 h-20 bg-[#F2B706] rounded-full opacity-70"></div>
          <div className="absolute -bottom-10 right-8 w-32 h-32 bg-[#F25849] rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-[#84C1D9] rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#F2B706] rounded-full opacity-40"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Our <span className="text-[#F2B706]">Blog</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-lg max-w-3xl mx-auto leading-relaxedm mb-8">
              Insights, trends, and stories from Africa's creative and tech landscape
            </p>

            {/* Search Form */}
            <div className="max-w-2xl mx-auto">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 border-2 border-white/20 focus:border-[#F2B706] focus:outline-none transition-all duration-300"
                />
                <Icon
                  icon="heroicons:magnifying-glass"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 bg-white rounded-xl p-4 shadow-sm">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-[#F25849] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#F25849] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F25849]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="readTime">Read Time</option>
              </select>
            </div>
          </div>

          {/* Search Results Summary */}
          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {filteredAndSortedPosts.length === 0
                  ? `No results found for "${searchQuery}"`
                  : `Found ${filteredAndSortedPosts.length} article${filteredAndSortedPosts.length === 1 ? '' : 's'} for "${searchQuery}"`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm text-[#F25849] hover:text-[#D6473C] transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Featured Post */}
          {filteredFeaturedPost && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-[#F25849] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Featured Post
                </div>
                {filteredFeaturedPost.category && (
                  <button
                    onClick={() => setSelectedCategory(filteredFeaturedPost.category)}
                    className="px-4 py-2 text-sm font-medium text-[#F25849] bg-[#F25849]/10 rounded-full hover:bg-[#F25849]/20 transition-colors"
                  >
                    {filteredFeaturedPost.category}
                  </button>
                )}
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                <div className="md:flex">
                  <div className="relative md:w-1/2 h-64 md:h-96">
                    <Image 
                      src={filteredFeaturedPost.image} 
                      alt={filteredFeaturedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span>{filteredFeaturedPost.date}</span>
                      <span>•</span>
                      <span>{filteredFeaturedPost.author}</span>
                      <span>•</span>
                      <span>{filteredFeaturedPost.readTime}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-6 leading-tight">
                      {filteredFeaturedPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      {filteredFeaturedPost.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blogs/${filteredFeaturedPost.slug}`}
                      className="inline-flex items-center bg-gradient-to-r from-[#F25849] to-[#D6473C] text-white px-8 py-4 rounded-full font-semibold hover:from-[#D6473C] hover:to-[#C13F32] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-fit"
                    >
                      Read Full Article
                      <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-[#172840] mb-12 text-center capitalize">
              {searchQuery
                ? 'Search Results'
                : selectedCategory
                ? `${selectedCategory} Articles`
                : ''}
            </h3>
            
            {filteredAndSortedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPosts.map((blog, index) => (
                  <article 
                    key={blog.slug}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        src={blog.image} 
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 text-xs text-gray-500 capitalize tracking-wide">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        {blog.category && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedCategory(blog.category);
                            }}
                            className="px-3 py-1 text-xs font-medium capitalize text-[#F25849] bg-[#F25849]/10 rounded-full hover:bg-[#F25849]/20 transition-colors"
                          >
                            {blog.category}
                          </button>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-[#172840] mb-3 leading-tight group-hover:text-[#F25849] transition-colors duration-300">
                        <Link href={`/blog/${blog.slug}`} className="hover:text-[#F25849] transition-colors duration-300">
                          {blog.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">
                          By {blog.author}
                        </span>
                        
                        <Link 
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center bg-[#84C1D9] text-[#172840] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#6FA1B7] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          Read More
                          <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon
                  icon="heroicons:magnifying-glass"
                  className="mx-auto h-12 w-12 text-gray-400"
                />
                <h3 className="mt-2 text-xl font-medium text-gray-900">
                  {searchQuery
                    ? 'No results found for the search query'
                    : selectedCategory
                    ? `No posts found in category "${selectedCategory}"`
                    : 'No posts found'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery
                    ? 'Try different keywords or browse all articles'
                    : selectedCategory
                    ? 'Try selecting a different category or check back later for new posts.'
                    : 'We\'re currently working on new content. Please check back soon!'}
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-[#F25849] bg-[#F25849]/10 rounded-full hover:bg-[#F25849]/20 transition-colors"
                  >
                    View All Posts
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Newsletter Subscription Section */}
          <div className="mt-20 bg-gradient-to-r from-[#172840] to-[#243a52] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest insights from Africa's creative and tech landscape.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={subscribeForm.name}
                onChange={(e) => setSubscribeForm(prev => ({ ...prev, name: e.target.value }))}
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F2B706]" 
              />
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={subscribeForm.email}
                onChange={(e) => setSubscribeForm(prev => ({ ...prev, email: e.target.value }))}
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
              />
              <button 
                type="submit"
                disabled={subscribeStatus.loading}
                className={`bg-[#F25849] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                  subscribeStatus.loading 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-[#D6473C]'
                }`}
              >
                {subscribeStatus.loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </form>

            {/* Status Message */}
            {subscribeStatus.message && (
              <div className={`mt-4 text-sm font-medium ${
                subscribeStatus.error ? 'text-red-300' : 'text-green-300'
              }`}>
                {subscribeStatus.message}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main> 
      <ScrollToTop />
    </>
  );
};

export default Blogs;