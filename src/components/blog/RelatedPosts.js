import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const RelatedPosts = ({ posts, loading, authorRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasManuallyClosed, setHasManuallyClosed] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const closed = localStorage.getItem('relatedPostClosed');
    if (closed === 'true') {
      setHasManuallyClosed(true);
    }
  }, []);

  useEffect(() => {
    console.log('RelatedPosts component mounted with:', {
      posts,
      loading,
      postsLength: posts?.length,
      isVisible
    });
  }, [posts, loading, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (!authorRef.current || hasManuallyClosed) return;

      const authorRect = authorRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Show related post when author section is in view
      if (authorRect.top <= windowHeight) {
        if (!isVisible) {
          console.log('Author section in view, showing related post');
          setIsVisible(true);
        }
      } else {
        // Hide when scrolling back up above author section
        if (isVisible) {
          console.log('Scrolled above author section, hiding related post');
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [authorRef, isVisible, hasManuallyClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasManuallyClosed(true);
    localStorage.setItem('relatedPostClosed', 'true');
  };

  if (loading) {
    console.log('RelatedPosts: Loading state');
    return (
      <div className="fixed bottom-8 right-8 w-80 bg-white shadow-lg rounded-xl p-4 transform transition-all duration-500 translate-x-full">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0 || hasManuallyClosed) {
    console.log('RelatedPosts: No posts available or manually closed');
    return null;
  }

  // Only show the first related post
  const post = posts[0];
  console.log('RelatedPosts: Rendering with post:', post);

  return (
    <div 
      className={`fixed bottom-8 right-0 w-80 bg-white/90 shadow-lg rounded-xl overflow-hidden transform transition-all duration-500 z-10 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="relative">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 text-gray-500 hover:text-[#F25849] transition-colors"
        >
          <Icon icon="heroicons:x-mark" className="w-5 h-5" />
        </button>
        
        <Link 
          href={`/blog/${post.slug}`} 
          className="group block"
          onClick={(e) => {
            // Close the related post when clicking the link
            handleClose();
          }}
        >
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h4 className="text-lg font-semibold text-[#172840] mb-2 line-clamp-2 group-hover:text-[#F25849] transition-colors">
              {post.title}
            </h4>
            
            <p className="text-gray-600 text-sm line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RelatedPosts; 