"use client";

import { useEffect, useState } from "react";

const PaystackScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if Paystack script is already loaded
    if (typeof window !== "undefined" && window.PaystackPop) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existingScript) {
      // Script is already being loaded, wait for it
      existingScript.addEventListener('load', () => {
        setIsLoaded(true);
        setHasError(false);
      });
      existingScript.addEventListener('error', () => {
        setHasError(true);
      });
      return;
    }

    // Load Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => {
      console.log("Paystack script loaded successfully");
      setIsLoaded(true);
      setHasError(false);
    };
    script.onerror = () => {
      console.error("Failed to load Paystack script");
      setHasError(true);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const scriptToRemove = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
      if (scriptToRemove && document.head.contains(scriptToRemove)) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  // Optional: You can use this state to show loading indicators
  if (hasError) {
    console.error("Paystack script failed to load");
  }

  return null;
};

export default PaystackScript;
