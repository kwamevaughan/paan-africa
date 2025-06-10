import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export const usePublicBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [regularPosts, setRegularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
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

      if (blogsError) {
        console.error('Blogs query error:', blogsError);
        throw blogsError;
      }

      if (!blogsData || blogsData.length === 0) {
        setBlogs([]);
        setFeaturedPost(null);
        setRegularPosts([]);
        setLoading(false);
        return;
      }

      // Get unique author IDs from all blogs
      const authorIds = [...new Set(blogsData.map(blog => blog.author))].filter(Boolean);

      // Fetch all authors in one query
      const { data: authorsData, error: authorsError } = await supabase
        .from("hr_users")
        .select('id, name')
        .in('id', authorIds);

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
          readTime: `${Math.ceil((cleanContent.length || 0) / 1000) || 5} min read`,
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

      setFeaturedPost(featured || null);
      setRegularPosts(regular || []);
      setBlogs(transformedData);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogBySlug = useCallback(async (slug) => {
    try {
      setLoading(true);
      setError(null);
      
      // First fetch the blog
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
        // Don't throw here, just use Unknown Author
      }

      // Transform the blog data
      const transformedBlog = {
        ...blogData,
        article_category: blogData.category?.name || 'Uncategorized',
        article_tags: blogData.tags?.map((t) => t.tag.name) || [],
        author: authorData?.name || 'Unknown Author'
      };

      setCurrentBlog(transformedBlog);
    } catch (err) {
      console.error("Error fetching blog by slug:", err);
      setError(err.message);
      setCurrentBlog(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    featuredPost,
    regularPosts,
    currentBlog,
    loading,
    error,
    refetch: fetchBlogs,
    fetchBlogBySlug,
  };
}; 