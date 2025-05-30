import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/layouts/header';
import SEO from '@/components/SEO';
import Footer from '@/layouts/footer';

// Sample blog data - replace with your actual data source
const getBlogPost = (slug) => {
  const blogPosts = {
    'future-of-technology-in-africa': {
      slug: 'future-of-technology-in-africa',
      title: "The Future of Technology in Africa",
      date: "March 15, 2024",
      author: {
        name: "Tech Team",
        role: "Technology Analyst",
        image: "/images/author.jpg"
      },
      image: "/images/blog1.jpg",
      content: `
        <p>The African continent is experiencing a remarkable technological transformation that is reshaping its future. With a young, tech-savvy population and increasing internet penetration, Africa is becoming a hotbed for innovation and digital solutions.</p>

        <h2>Key Trends Shaping Africa's Tech Future</h2>
        <p>Several key trends are driving this transformation:</p>
        <ul>
          <li>Mobile-first approach to digital services</li>
          <li>Rise of fintech solutions</li>
          <li>Growing focus on renewable energy</li>
          <li>Expansion of e-commerce platforms</li>
        </ul>

        <h2>Challenges and Opportunities</h2>
        <p>While the opportunities are vast, there are also significant challenges to overcome. Infrastructure development, digital literacy, and regulatory frameworks need to keep pace with technological advancement.</p>

        <p>The future of technology in Africa is not just about adopting existing solutions but creating new ones that address the continent's unique challenges and opportunities.</p>
      `
    },
    'digital-transformation-african-enterprises': {
      slug: 'digital-transformation-african-enterprises',
      title: "Digital Transformation in African Enterprises",
      date: "March 10, 2024",
      author: {
        name: "PAAN Editorial",
        role: "Digital Strategy Consultant",
        image: "/images/author2.jpg"
      },
      image: "/images/blog2.jpg",
      content: `
        <p>Digital transformation is revolutionizing how African enterprises operate and compete in the global marketplace. This comprehensive guide explores the key aspects of digital transformation and its impact on African businesses.</p>

        <h2>The Digital Transformation Journey</h2>
        <p>Successful digital transformation requires a strategic approach:</p>
        <ul>
          <li>Leadership commitment and vision</li>
          <li>Employee training and upskilling</li>
          <li>Technology infrastructure investment</li>
          <li>Customer-centric digital solutions</li>
        </ul>

        <h2>Measuring Success</h2>
        <p>Key metrics for measuring digital transformation success include operational efficiency, customer satisfaction, and revenue growth. African enterprises must develop clear KPIs to track their progress.</p>
      `
    }
  };

  return blogPosts[slug] || null;
};

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const blog = slug ? getBlogPost(slug) : null;

  if (!blog) {
    return (
      <>
        <SEO
          title="Blog Post Not Found | PAAN"
          description="The requested blog post could not be found."
          noindex={true}
        />
        {/* Header */}
        <Header />
        
        {/* Not Found Content */}
        <div className="bg-white min-h-screen pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link 
              href="/blogs"
              className="inline-flex items-center text-[#F25849] font-semibold hover:text-[#D6473C] transition duration-300 mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>
            <h1 className="text-3xl font-bold text-[#172840]">Blog post not found</h1>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${blog.title} | PAAN Blog`}
        description={blog.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        image={blog.image}
      />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-[#172840] relative py-20 pt-32 overflow-hidden">
          <div className="absolute -top-3 left-4 w-6 h-6 bg-[#84C1D9] rounded-full z-0"></div>
          <div className="absolute -top-8 right-4 w-16 h-16 bg-[#F2B706] rounded-full z-0"></div>
          <div className="absolute -bottom-12 right-4 w-28 h-28 bg-[#F25849] rounded-full z-0"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/blogs"
              className="inline-flex items-center text-white/80 hover:text-white transition duration-300 mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{blog.title}</h1>
            <div className="flex items-center gap-4 text-white/80">
              <span>{blog.date}</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative h-[400px] mb-12 rounded-xl overflow-hidden">
            <Image 
              src={blog.image} 
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-[#172840] prose-a:text-[#F25849] prose-strong:text-[#172840]"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-16 pt-8 border-t border-gray-200 flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src={blog.author.image} 
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#172840]">{blog.author.name}</h3>
              <p className="text-gray-600">{blog.author.role}</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default BlogPost;