import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export const usePublicBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);

  const fetchPublicBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching public blogs...");

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
        .eq("is_draft", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("Fetched blogs data:", data);

      const transformedData = data.map((blog) => ({
        ...blog,
        article_category: blog.category?.name || null,
        article_tags: blog.tags?.map((t) => t.tag.name) || [],
      }));

      console.log("Transformed blogs data:", transformedData);
      setBlogs(transformedData || []);
    } catch (error) {
      console.error("Error fetching public blogs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBlogBySlug = useCallback(async (slug) => {
    if (slug === 'index') {
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Fetching blog by slug:", slug);

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
        .eq("is_draft", false)
        .single();

      if (error) throw error;

      console.log("Fetched blog data:", data);

      if (!data) {
        console.log("No blog found with slug:", slug);
        setCurrentBlog(null);
        return null;
      }

      const transformedData = {
        ...data,
        article_category: data.category?.name || null,
        article_tags: data.tags?.map((t) => t.tag.name) || [],
      };

      console.log("Transformed blog data:", transformedData);
      setCurrentBlog(transformedData);
      return transformedData;
    } catch (error) {
      console.error("Error fetching blog by slug:", error);
      setError(error.message);
      setCurrentBlog(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("usePublicBlog hook mounted");
    fetchPublicBlogs();
  }, [fetchPublicBlogs]);

  return {
    blogs,
    currentBlog,
    loading,
    error,
    fetchPublicBlogs,
    fetchBlogBySlug,
  };
}; 