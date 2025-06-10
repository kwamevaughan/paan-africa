import { usePublicBlog } from "@/hooks/usePublicBlog";
import { useRouter } from "next/router";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect } from "react";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { currentBlog, loading, error, fetchBlogBySlug } = usePublicBlog();

  useEffect(() => {
    if (slug && slug !== 'index') {
      fetchBlogBySlug(slug);
    }
  }, [slug, fetchBlogBySlug]);

  if (slug === 'index') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading blog: {error}</div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            icon="heroicons:document-text"
            className="mx-auto h-12 w-12 text-gray-400"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Blog not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Icon icon="heroicons:arrow-left" className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // More explicit content check
  const hasContent = currentBlog.article_body !== null && 
                    currentBlog.article_body !== undefined && 
                    currentBlog.article_body !== '' && 
                    currentBlog.article_body.trim().length > 0;

  console.log('Blog content check:', {
    article_body: currentBlog.article_body,
    hasContent,
    type: typeof currentBlog.article_body
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {currentBlog.article_image && (
            <div className="relative h-96 w-full">
              <Image
                src={currentBlog.article_image}
                alt={currentBlog.article_name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              {currentBlog.article_category && (
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  {currentBlog.article_category}
                </span>
              )}
              <span className="text-sm text-gray-500">
                {new Date(currentBlog.created_at).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {currentBlog.article_name}
            </h1>
            
            {!hasContent && (
              <div className="text-center py-12">
                <Icon
                  icon="heroicons:document-text"
                  className="mx-auto h-12 w-12 text-gray-400"
                />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Content Coming Soon</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This article is being prepared. Please check back later.
                </p>
              </div>
            )}

            {hasContent && (
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentBlog.article_body }} />
              </div>
            )}

            {currentBlog.meta_description && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Summary</h3>
                <p className="text-gray-600">{currentBlog.meta_description}</p>
              </div>
            )}

            {currentBlog.article_tags && currentBlog.article_tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentBlog.article_tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Icon icon="heroicons:arrow-left" className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </article>
    </div>
  );
} 