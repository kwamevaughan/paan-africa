import React, { useState, useEffect, useRef } from 'react';
import RelatedPosts from './RelatedPosts';

const BlogPost = () => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoadingRelated(true);
        const response = await fetch(`/api/blog/related?slug=${post.slug}`);
        const data = await response.json();
        setRelatedPosts(data);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedPosts();
  }, [post.slug]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* ... existing article content ... */}
      
      <footer ref={footerRef} className="mt-16 pt-8 border-t border-gray-200">
        {/* ... existing footer content ... */}
      </footer>

      <RelatedPosts 
        posts={relatedPosts} 
        loading={loadingRelated} 
        footerRef={footerRef}
      />
    </article>
  );
};

export default BlogPost; 