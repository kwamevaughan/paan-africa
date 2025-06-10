import { usePublicBlog } from "@/hooks/usePublicBlog";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect } from "react";

export default function BlogList() {
  const { blogs, loading, error } = usePublicBlog();

  useEffect(() => {
    console.log("BlogList component mounted");
    console.log("Current blogs state:", blogs);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
  }, [blogs, loading, error]);

  if (loading) {
    console.log("Rendering loading state");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.log("Rendering error state:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading blogs: {error}</div>
      </div>
    );
  }

  console.log("Rendering blog list with", blogs.length, "blogs");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600">
            Latest news, updates, and insights from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="group"
            >
              <article className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
                {blog.article_image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={blog.article_image}
                      alt={blog.article_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {blog.article_category && (
                      <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                        {blog.article_category}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {blog.article_name}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {blog.meta_description || blog.article_body.substring(0, 150) + "..."}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    {blog.article_tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm text-gray-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <Icon
              icon="heroicons:document-text"
              className="mx-auto h-12 w-12 text-gray-400"
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new blog post.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 