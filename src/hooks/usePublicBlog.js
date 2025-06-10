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

      console.log('Fetching blogs from Supabase...');
      const { data, error } = await supabase
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched blogs data:', data);

      // Transform the data to match the blog page structure
      const transformedData = data.map((blog) => ({
        slug: blog.slug || '',
        title: blog.article_name || 'Untitled',
        excerpt: blog.meta_description || (blog.article_body ? `${blog.article_body.substring(0, 200)}...` : 'No content available'),
        image: blog.article_image || '/images/blog-placeholder.jpg',
        date: blog.created_at ? new Date(blog.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) : 'No date',
        author: blog.author || 'PAAN Team',
        readTime: `${Math.ceil((blog.article_body?.length || 0) / 1000) || 5} min read`,
        featured: blog.is_featured || false,
        category: blog.category?.name || 'Uncategorized',
        tags: blog.tags?.map((t) => t.tag.name) || [],
      }));

      console.log('Transformed blogs data:', transformedData);

      // Find the first featured post
      const featured = transformedData.find(blog => blog.featured);
      // Get all non-featured posts
      const regular = transformedData.filter(blog => !blog.featured);

      console.log('Featured post:', featured);
      console.log('Regular posts:', regular);

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

      console.log('Fetching blog by slug:', slug);
      const { data, error } = await supabase
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        setCurrentBlog(null);
        return;
      }

      // Transform the blog data
      const transformedBlog = {
        ...data,
        article_category: data.category?.name || 'Uncategorized',
        article_tags: data.tags?.map((t) => t.tag.name) || [],
      };

      console.log('Fetched blog data:', transformedBlog);
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