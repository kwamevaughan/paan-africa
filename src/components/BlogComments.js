import { useState, useEffect, useRef } from "react";
import { usePublicBlog } from "@/hooks/usePublicBlog";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import ReCAPTCHA from "react-google-recaptcha";

const BlogComments = ({ blogId }) => {
  const {
    comments,
    commentsLoading,
    commentsError,
    addComment,
    fetchComments,
  } = usePublicBlog();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    content: false,
    captcha: false,
  });
  const recaptchaRef = useRef(null);

  // Fetch comments when component mounts
  useEffect(() => {
    if (blogId) {
      fetchComments(blogId);
    }
  }, [blogId, fetchComments]);

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email:
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      content: !formData.content.trim(),
      captcha: !recaptchaRef.current?.getValue(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!recaptchaRef.current?.getValue()) {
        toast.error("Please complete the captcha verification");
      } else {
        toast.error("Please fill in all required fields correctly");
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addComment({
        blogId,
        name: formData.name,
        email: formData.email,
        content: formData.content,
        captchaToken: recaptchaRef.current.getValue(),
      });

      if (result.success) {
        toast.success("Comment submitted successfully!");
        setFormData({ name: "", email: "", content: "" });
        recaptchaRef.current?.reset();
      } else {
        throw new Error(result.error || "Failed to submit comment");
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to submit comment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 mb-6">
            <Icon
              icon="heroicons:chat-bubble-left-right-20-solid"
              className="w-6 h-6 text-[#F25849]"
            />
            <span className="text-lg font-semibold text-slate-800">
              Join the Conversation
            </span>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Share your thoughts and connect with fellow readers
          </p>
        </div>

        {/* Comment Form */}
        <div className="mb-12">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Your Name <span className="text-[#F25849]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                        setFormErrors((prev) => ({ ...prev, name: false }));
                      }}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => {
                        setFocusedField(null);
                        setFormErrors((prev) => ({
                          ...prev,
                          name: !formData.name.trim(),
                        }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm transition-all duration-300 ${
                        focusedField === "name"
                          ? "border-[#F25849] ring-4 ring-red-50 shadow-lg"
                          : formErrors.name
                            ? "border-red-300"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                      placeholder="Enter your name"
                    />
                    <Icon
                      icon="heroicons:user"
                      className="absolute right-3 top-3.5 w-5 h-5 text-slate-400"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      Name is required
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email Address <span className="text-[#F25849]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                        setFormErrors((prev) => ({ ...prev, email: false }));
                      }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => {
                        setFocusedField(null);
                        setFormErrors((prev) => ({
                          ...prev,
                          email:
                            !formData.email.trim() ||
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
                        }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm transition-all duration-300 ${
                        focusedField === "email"
                          ? "border-[#F25849] ring-4 ring-red-50 shadow-lg"
                          : formErrors.email
                            ? "border-red-300"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    <Icon
                      icon="heroicons:envelope"
                      className="absolute right-3 top-3.5 w-5 h-5 text-slate-400"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {!formData.email.trim()
                        ? "Email is required"
                        : "Please enter a valid email address"}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="comment"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Your Comment <span className="text-[#F25849]">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="comment"
                    required
                    value={formData.content}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }));
                      setFormErrors((prev) => ({
                        ...prev,
                        content: false,
                      }));
                    }}
                    onFocus={() => setFocusedField("comment")}
                    onBlur={() => {
                      setFocusedField(null);
                      setFormErrors((prev) => ({
                        ...prev,
                        content: !formData.content.trim(),
                      }));
                    }}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm resize-none transition-all duration-300 ${
                      focusedField === "comment"
                        ? "border-[#F25849] ring-4 ring-red-50 shadow-lg"
                        : formErrors.content
                          ? "border-red-300"
                          : "border-slate-200 hover:border-slate-300"
                    }`}
                    placeholder="Share your thoughts, feedback, or questions..."
                  />
                  <Icon
                    icon="heroicons:chat-bubble-left"
                    className="absolute right-3 top-3.5 w-5 h-5 text-slate-400"
                  />
                </div>
                {formErrors.content && (
                  <p className="mt-1 text-sm text-red-500">
                    Comment is required
                  </p>
                )}
                <div className="mt-2 text-right">
                  <span className="text-sm text-slate-500">
                    {formData.content.length} characters
                  </span>
                </div>
              </div>

              {/* ReCAPTCHA and Button on the Same Row */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <div className="mb-4 sm:mb-0 sm:flex-1">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={() =>
                      setFormErrors((prev) => ({ ...prev, captcha: false }))
                    }
                    onExpired={() =>
                      setFormErrors((prev) => ({ ...prev, captcha: true }))
                    }
                  />
                  {formErrors.captcha && (
                    <p className="mt-2 text-sm text-red-500 text-center">
                      Please complete the captcha verification
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    isSubmitting
                      ? "bg-slate-400 cursor-not-allowed scale-95"
                      : "bg-gradient-to-r from-[#F25849] to-orange-400 hover:from-[#D6473C] to-red-400 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-3 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      Publishing Comment...
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="heroicons:paper-airplane"
                        className="w-5 h-5 mr-2"
                      />
                      Publish Comment
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-4 text-center">
                Fields marked with <span className="text-[#F25849]">*</span> are
                required. Your email will not be published.
              </p>
            </form>
          </div>
        </div>

        {/* Comments List */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 mb-6">
              <Icon
                icon="heroicons:chat-bubble-left-right-20-solid"
                className="w-6 h-6 text-[#F25849]"
              />
              <span className="text-lg font-semibold text-slate-800">
                Comments{" "}
                {comments?.length > 0 && (
                  <span className="inline-flex items-center justify-center w-8 h-8 ml-3 text-sm font-medium text-[#F25849] bg-red-50 rounded-full border border-red-100">
                    {comments.length}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end mb-8">
            <button
              onClick={() => fetchComments(blogId)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              <Icon icon="heroicons:arrow-path" className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            <div className="h-auto overflow-y-auto">
              {commentsLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#F25849] animate-spin"></div>
                    <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-orange-300 animate-spin animate-reverse"></div>
                  </div>
                  <p className="text-slate-500 mt-4 font-medium">
                    Loading comments...
                  </p>
                </div>
              ) : commentsError ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                    <Icon
                      icon="heroicons:exclamation-triangle"
                      className="w-8 h-8 text-red-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-slate-500">
                    Failed to load comments. Please try again later.
                  </p>
                </div>
              ) : comments && comments.length > 0 ? (
                <div className="p-6 space-y-6">
                  {comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 hover:shadow-lg hover:border-slate-200/80 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F25849]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>

                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F25849] to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {comment.author_name.charAt(0).toUpperCase()}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-semibold text-slate-800 text-lg">
                                {comment.author_name}
                              </h3>
                              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-full">
                                <Icon
                                  icon="heroicons:clock"
                                  className="w-3 h-3"
                                />
                                {new Date(
                                  comment.created_at
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>

                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                    <Icon
                      icon="heroicons:chat-bubble-left-ellipsis"
                      className="w-10 h-10 text-slate-400"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    No comments yet
                  </h3>
                  <p className="text-slate-500">
                    Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComments;
