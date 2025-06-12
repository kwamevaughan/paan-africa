import { useEffect, useState, useCallback, useRef } from "react";
import { Icon } from "@iconify/react";

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef(null);
  const tocRef = useRef(null);

  const processHeadings = useCallback(() => {
    const blogContent = document.getElementById('blog-content');
    if (!blogContent) return;

    const headingElements = blogContent.querySelectorAll('h1, h2, h3, h4');
    const headingList = Array.from(headingElements).map((heading) => {
      // Create a SEO-friendly ID from the heading text
      const baseId = heading.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens

      // Ensure uniqueness by adding a number if needed
      let id = baseId;
      let counter = 1;
      while (document.getElementById(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }
      
      // Set the ID on the heading element
      heading.id = id;
      
      return {
        id,
        text: heading.textContent?.trim() || '',
        level: parseInt(heading.tagName[1]),
      };
    });

    setHeadings(headingList);

    // Set up intersection observer after headings are processed
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-100px 0px -50%',
        threshold: 0
      }
    );

    observerRef.current = observer;

    // Observe all headings
    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    // Set initial active heading
    const firstHeading = headingElements[0];
    if (firstHeading) {
      setActiveId(firstHeading.id);
    }
  }, []);

  // Auto-scroll the active item into view
  useEffect(() => {
    if (!activeId || !tocRef.current) return;

    const activeElement = tocRef.current.querySelector(`[data-heading-id="${activeId}"]`);
    if (activeElement) {
      const tocContainer = tocRef.current;
      const containerRect = tocContainer.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();

      // Calculate if the element is outside the visible area
      const isAbove = elementRect.top < containerRect.top;
      const isBelow = elementRect.bottom > containerRect.bottom;

      if (isAbove || isBelow) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [activeId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (content && mounted) {
      // Process headings immediately and then again after a short delay
      processHeadings();
      const timer = setTimeout(processHeadings, 1000);

      return () => {
        clearTimeout(timer);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [content, mounted, processHeadings]);

  const scrollToHeading = useCallback((headingId) => {
    const element = document.getElementById(headingId);
    if (!element) {
      processHeadings();
      setTimeout(() => {
        const retryElement = document.getElementById(headingId);
        if (retryElement) {
          const headerOffset = 100;
          const elementPosition = retryElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          // Update URL with the heading ID
          window.history.pushState({}, '', `#${headingId}`);
        }
      }, 100);
      return;
    }

    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    // Update URL with the heading ID
    window.history.pushState({}, '', `#${headingId}`);
  }, [processHeadings]);

  // Add effect to handle initial hash in URL
  useEffect(() => {
    if (mounted && window.location.hash) {
      const headingId = window.location.hash.substring(1);
      scrollToHeading(headingId);
    }
  }, [mounted, scrollToHeading]);

  if (!mounted || headings.length === 0) return null;

  return (
    <div className="hidden lg:block w-96 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto" ref={tocRef}>
        <div className="p-6 bg-white/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
          <h2 className="text-xl font-bold text-[#172840] mb-4">On This Page</h2>
          <nav>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
                >
                  <button
                    data-heading-id={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`text-left w-full transition-colors duration-200 px-2 py-1 rounded-md ${
                      activeId === heading.id
                        ? 'text-[#F25849] font-medium bg-gray-100'
                        : 'text-gray-600 hover:text-[#F25849] hover:bg-gray-50'
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents; 