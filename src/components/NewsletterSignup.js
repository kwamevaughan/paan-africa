import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.", {
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processing your subscription...", {
      duration: Infinity,
    });

    try {
      console.log("Submitting newsletter subscription:", {
        name: formData.name,
        email: formData.email,
      });
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await response.json();

      console.log("API response:", { status: response.status, data });

      if (response.ok) {
        toast.success("Subscribed successfully!", {
          id: toastId,
          duration: 4000,
        });
        // Delay form reset to ensure toast is visible
        setTimeout(() => {
          setFormData({ name: "", email: "" });
          setIsSubmitting(false);
        }, 500);
      } else {
        toast.error(data.message || "Failed to subscribe.", {
          id: toastId,
          duration: 4000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.", {
        id: toastId,
        duration: 4000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white rounded-lg relative overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 1000000, // Increased to ensure toast appears above fixed header
            background: "#333",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      />
      <div className="relative z-10">
        <h3 className="text-2xl font-normal mb-4">
          Sign up for our newsletter
        </h3>
        <p className="text-gray-200 font-normal mb-6">
          Stay connected. Get insights, trend reports, and event invites
          delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                disabled={isSubmitting}
                className={`w-full border-b border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300 ${
                  errors.name ? "border-red-500" : ""
                } ${isSubmitting ? "opacity-50" : ""}`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourmail@email.com"
                disabled={isSubmitting}
                className={`w-full border-b border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300 ${
                  errors.email ? "border-red-500" : ""
                } ${isSubmitting ? "opacity-50" : ""}`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#D6473C]"
              }`}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
