"use client";

import { useEffect } from "react";

const PaystackScript = () => {
  useEffect(() => {
    // Check if Paystack script is already loaded
    if (typeof window !== "undefined" && window.PaystackPop) {
      return;
    }

    // Load Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => {
      console.log("Paystack script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load Paystack script");
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
      if (existingScript && document.head.contains(existingScript)) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

export default PaystackScript;
