import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { calculateReadTime } from '@/utils/readTime';

export const usePublicBlog = (initialData) => {
  const [blogs, setBlogs] = useState(initialData?.blogs || []);
  const [featuredPost, setFeaturedPost] = useState(initialData?.featuredPost || null);
  const [regularPosts, setRegularPosts] = useState(initialData?.regularPosts || []);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(initialData?.error || null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedPostsLoading, setRelatedPostsLoading] = useState(false);
  const commentsFetchedRef = useRef(new Set());
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchBlogs = async () => {
    if (!isMounted.current) return;

    try {
      console.log('Starting to fetch blogs...');
      setLoading(true);
      setError(null);

      // First fetch blogs with categories and tags
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

      console.log('Blogs data received:', {
        hasData: !!blogsData,
        dataLength: blogsData?.length,
        error: blogsError,
        firstBlog: blogsData?.[0]
      });

      if (blogsError) {
        console.error('Blogs query error:', blogsError);
        throw blogsError;
      }

      if (!blogsData || blogsData.length === 0) {
        console.log('No blogs data found');
        if (isMounted.current) {
          setBlogs([]);
          setFeaturedPost(null);
          setRegularPosts([]);
          setLoading(false);
        }
        return;
      }

      // Get unique author IDs from all blogs
      const authorIds = [...new Set(blogsData.map(blog => blog.author))].filter(Boolean);
      console.log('Author IDs to fetch:', authorIds);

      // Fetch all authors in one query
      const { data: authorsData, error: authorsError } = await supabase
        .from("hr_users")
        .select('id, name')
        .in('id', authorIds);

      console.log('Authors data received:', {
        hasData: !!authorsData,
        dataLength: authorsData?.length,
        error: authorsError,
        firstAuthor: authorsData?.[0]
      });

      if (authorsError) {
        console.error('Authors query error:', authorsError);
        throw authorsError;
      }

      // Create a map of author IDs to names
      const authorMap = new Map(
        (authorsData || []).map(author => [author.id, author.name])
      );

      // Transform the data to match the blog page structure
      const transformedData = blogsData.map((blog) => {
        // Clean HTML and get a snippet of the content
        const cleanContent = blog.article_body 
          ? blog.article_body
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
              .trim()                   // Trim whitespace
          : '';
        
        // Get first 150 characters of clean content
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

      console.log('Transformed data:', {
        totalBlogs: transformedData.length,
        hasFeaturedPost: transformedData.some(blog => blog.featured),
        regularPostsCount: transformedData.filter(blog => !blog.featured).length,
        firstTransformedBlog: transformedData[0]
      });

      // Find the first featured post
      const featured = transformedData.find(blog => blog.featured);
      // Get all non-featured posts
      const regular = transformedData.filter(blog => !blog.featured);

      if (isMounted.current) {
        setFeaturedPost(featured || null);
        setRegularPosts(regular || []);
        setBlogs(transformedData);
        console.log('State updated with new data');
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      if (isMounted.current) {
        setError(err.message);
      }
    } finally {
      if (isMounted.current) {
        console.log('Setting loading to false');
        setLoading(false);
      }
    }
  };

  const fetchComments = useCallback(async (blogId) => {
    if (!blogId) {
      return;
    }

    // Check if we've already fetched comments for this blog
    if (commentsFetchedRef.current.has(blogId)) {
      return;
    }
    
    try {
      setCommentsLoading(true);
      setCommentsError(null);

      const { data: commentsData, error: commentsError } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: false });

      if (commentsError) {
        console.error('Comments query error:', commentsError);
        throw commentsError;
      }

      
      // Always update comments state with the fetched data
      setComments(commentsData || []);
      // Mark this blog's comments as fetched
      commentsFetchedRef.current.add(blogId);
      
    } catch (err) {
      console.error("Error fetching comments:", err);
      setCommentsError(err.message);
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  const addComment = async (commentData) => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert([{
          blog_id: commentData.blogId,
          author_name: commentData.name,
          author_email: commentData.email,
          content: commentData.content,
          is_approved: true  // Set to true by default
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        throw error;
      }

      // Refresh comments after adding a new one
      await fetchComments(commentData.blogId);
      
      return { success: true, data };
    } catch (err) {
      console.error("Error adding comment:", err);
      return { success: false, error: err.message };
    }
  };

  const fetchBlogBySlug = useCallback(async (slug) => {
    try {
      console.log('Fetching blog by slug:', slug);
      setLoading(true);
      setError(null);
      setCurrentBlog(null); // Clear current blog before fetching new one
      
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

      if (blogError) {
        console.error('Blog query error:', blogError);
        throw blogError;
      }

      if (!blogData) {
        setCurrentBlog(null);
        setLoading(false);
        return;
      }

      // Fetch the author
      const { data: authorData, error: authorError } = await supabase
        .from("hr_users")
        .select('id, name')
        .eq('id', blogData.author)
        .single();

      if (authorError) {
        console.error('Author query error:', authorError);
      }

      // Transform the blog data
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

      console.log('Setting new blog data:', transformedBlog);
      
      // Update blog data first
      setCurrentBlog(transformedBlog);
      
      // Then fetch comments
      await fetchComments(blogData.id);

    } catch (err) {
      console.error("Error fetching blog by slug:", err);
      setError(err.message);
      setCurrentBlog(null);
    } finally {
      setLoading(false);
    }
  }, [fetchComments]);

  // Add effect to fetch comments when blogId changes
  useEffect(() => {
    if (currentBlog?.id) {
      fetchComments(currentBlog.id);
    }
  }, [currentBlog?.id, fetchComments]);

  // Add effect to monitor comments state
  useEffect(() => {
  }, [comments]);

  const fetchRelatedPosts = useCallback(async (currentBlog) => {
    if (!currentBlog) {
      console.log('No current blog to fetch related posts for');
      return;
    }
    
    try {
      console.log('Fetching related posts for blog:', {
        id: currentBlog.id,
        category: currentBlog.article_category,
        tags: currentBlog.article_tags
      });
      
      setRelatedPostsLoading(true);
      
      // Build the filter conditions
      let query = supabase
        .from("blogs")
        .select(`
          *,
          category:blog_categories(name),
          tags:blog_post_tags(
            tag:blog_tags(name)
          )
        `)
        .eq("is_published", true)
        .neq("id", currentBlog.id); // Exclude current post

      // Add category filter if it exists
      if (currentBlog.article_category) {
        query = query.eq('category.name', currentBlog.article_category);
      }

      // Add tags filter if they exist
      if (currentBlog.article_tags && currentBlog.article_tags.length > 0) {
        query = query.contains('tags.tag.name', currentBlog.article_tags);
      }

      // Execute the query
      const { data: relatedData, error: relatedError } = await query
        .order("created_at", { ascending: false })
        .limit(3);

      console.log('Related posts query result:', {
        data: relatedData,
        error: relatedError,
        count: relatedData?.length
      });

      if (relatedError) throw relatedError;

      // Transform related posts data
      const transformedRelatedPosts = relatedData.map(post => ({
        id: post.id,
        slug: post.slug || post.id.toString(), // Ensure we have a slug
        title: post.article_name,
        excerpt: post.article_body 
          ? post.article_body.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
          : 'No content available',
        image: post.article_image || '/images/blog-placeholder.jpg',
        date: post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) : 'No date',
        category: post.category?.name || 'Uncategorized',
        readTime: calculateReadTime(post.article_body)
      }));

      console.log('Transformed related posts:', transformedRelatedPosts);

      setRelatedPosts(transformedRelatedPosts);
    } catch (err) {
      console.error("Error fetching related posts:", err);
      setRelatedPosts([]);
    } finally {
      setRelatedPostsLoading(false);
    }
  }, []);

  // Add effect to fetch related posts when current blog changes
  useEffect(() => {
    if (currentBlog?.id) {
      fetchRelatedPosts(currentBlog);
    }
  }, [currentBlog, fetchRelatedPosts]);

  useEffect(() => {
    if (!initialData) {
      console.log('No initial data, fetching blogs...');
      fetchBlogs();
    } else {
      console.log('Using initial data from getServerSideProps');
    }
  }, [initialData]);

  return {
    blogs,
    featuredPost,
    regularPosts,
    currentBlog,
    loading,
    error,
    comments,
    commentsLoading,
    commentsError,
    relatedPosts,
    relatedPostsLoading,
    refetch: fetchBlogs,
    fetchBlogBySlug,
    addComment,
    fetchComments
  };
}; 