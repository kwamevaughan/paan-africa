import { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const tocRef = useRef(null);
  const activeHeadingRef = useRef(null);

  useEffect(() => {
    // Create a temporary div to parse the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Extract headings (h1, h2, h3)
    const headingElements = tempDiv.querySelectorAll('h1, h2, h3');
    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      // Generate a unique ID for each heading if it doesn't have one
      const id = heading.id || `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setHeadings(extractedHeadings);

    // Update the actual content with the new IDs
    const contentDiv = document.getElementById('blog-content');
    if (contentDiv) {
      contentDiv.innerHTML = tempDiv.innerHTML;
    }
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Auto-scroll the active heading into view in the sidebar
  useEffect(() => {
    if (activeHeadingRef.current && tocRef.current) {
      const tocRect = tocRef.current.getBoundingClientRect();
      const activeRect = activeHeadingRef.current.getBoundingClientRect();
      
      // Check if the active heading is outside the visible area
      if (activeRect.top < tocRect.top || activeRect.bottom > tocRect.bottom) {
        activeHeadingRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeId]);

  // Progress calculation
  const activeIndex = headings.findIndex(h => h.id === activeId);
  const progress = headings.length > 1 ? (activeIndex + 1) / headings.length : 0;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Get the element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      
      // Calculate offset for sticky header (adjust this value based on your header height)
      const headerOffset = 100; // Adjust this value if needed
      
      // Scroll to the element with offset
      window.scrollTo({
        top: elementTop - headerOffset,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside
      className="hidden lg:block w-72 xl:w-80 sticky top-24 max-h-[calc(100vh-6rem)] overflow-hidden mr-2"
      ref={tocRef}
    >
      <div className="bg-[#F8FBFD] rounded-2xl p-6 relative">
        <h2 className="text-xl font-semibold text-paan-dark-blue mb-6">Table of Contents</h2>
        {/* Progress vertical line */}
        <div className="absolute left-4 top-10 bottom-6 w-1 bg-[#E3EEF7] rounded-full z-0" style={{}} />
        {/* Progress fill */}
        <div
          className="absolute left-4 w-1 bg-paan-blue rounded-full z-10 transition-all duration-300"
          style={{
            top: '2.5rem', // matches top-10
            bottom: `calc(100% - ${(progress * 100).toFixed(2)}%)`,
            height: `calc(${progress * 100}% - 0.5rem)`,
            minHeight: '0.5rem',
          }}
        />
        <ol className="space-y-1 relative z-20">
          {headings.map((heading, idx) => {
            const isActive = activeId === heading.id;

            return (
              
              <li
                key={heading.id}
                className="group flex items-start relative"
              >
                {/* Active item highlight (blends into progress line) */}
                <span
                  className={`absolute left-4 top-0 h-full w-1 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-transparent' : 'bg-transparent'
                  }`}
                  aria-hidden="true"
                />
                <button
                  ref={isActive ? activeHeadingRef : null}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`pr-2 py-1 w-full text-left rounded-lg transition-all duration-200
                  ${isActive ? 'font-semibold text-paan-dark-blue bg-white shadow-sm' : 'text-gray-600 font-normal hover:bg-paan-blue/20'}
                    ${heading.level > 1 ? 'ml-3' : ''}
                  `}
                  style={{ fontSize: '0.98rem', lineHeight: '1.4' }}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
};

export default TableOfContents;
