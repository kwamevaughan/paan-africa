import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/layouts/blogs-header';
import SEO from '@/components/SEO';
import Footer from '@/layouts/footer';
import { usePublicBlog } from '@/hooks/usePublicBlog';

const Blogs = () => {
  const { featuredPost, regularPosts, loading, error } = usePublicBlog();

  console.log('Blogs page - Loading:', loading);
  console.log('Blogs page - Error:', error);
  console.log('Blogs page - Featured post:', featuredPost);
  console.log('Blogs page - Regular posts:', regularPosts);

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
          <div className="text-red-500">Error loading blogs: {error}</div>
        </div>
      </>
    );
  }

  // If no blogs are found
  if (!featuredPost && (!regularPosts || regularPosts.length === 0)) {
    return (
          <>
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

  return (
    <>
      <SEO
        title="PAAN Blog | Insights from Africa's Creative & Tech Landscape"
        description="Explore the latest insights, trends, and stories from Africa's creative and tech landscape. Stay informed with expert analysis, industry news, and thought leadership from PAAN."
        keywords="PAAN blog, African tech insights, creative industry Africa, tech trends Africa, African innovation, creative tech blog, African digital transformation, tech leadership Africa"
        ogTitle="PAAN Blog | Africa's Creative & Tech Insights"
        ogDescription="Discover the latest insights and trends from Africa's creative and tech landscape. Expert analysis, industry news, and thought leadership from PAAN."
        ogImage="/images/blog-og-image.jpg"
        twitterCard="summary_large_image"
        twitterTitle="PAAN Blog | Africa's Creative & Tech Insights"
        twitterDescription="Discover the latest insights and trends from Africa's creative and tech landscape. Expert analysis, industry news, and thought leadership from PAAN."
        twitterImage="/images/blog-og-image.jpg"
        canonicalUrl="https://paan.africa/blogs"
      />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#172840] via-[#1e3147] to-[#243a52] relative py-24 pt-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-4 left-8 w-8 h-8 bg-[#84C1D9] rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -top-6 right-12 w-20 h-20 bg-[#F2B706] rounded-full opacity-70"></div>
          <div className="absolute -bottom-10 right-8 w-32 h-32 bg-[#F25849] rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-[#84C1D9] rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#F2B706] rounded-full opacity-40"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative  text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Our <span className="text-[#F2B706]">Blog</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Insights, trends, and stories from Africa's creative and tech landscape
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-[#F25849] via-[#F2B706] to-[#84C1D9] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-20">
              <div className="flex items-center mb-8">
                <div className="bg-[#F25849] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Featured Post
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                <div className="md:flex">
                  <div className="relative md:w-1/2 h-64 md:h-96">
                    <Image 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.author}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-6 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blogs/${featuredPost.slug}`}
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
            <h3 className="text-3xl font-bold text-[#172840] mb-12 text-center">
              Latest Articles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((blog, index) => (
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
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 uppercase tracking-wide">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#172840] mb-3 leading-tight group-hover:text-[#F25849] transition-colors duration-300">
                      {blog.title}
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
          </div>

          {/* Newsletter Subscription Section */}
          <div className="mt-20 bg-gradient-to-r from-[#172840] to-[#243a52] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest insights from Africa's creative and tech landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F2B706]"
              />
              <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D6473C] transition-colors duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer/>
    </>
  );
};

export default Blogs;