import React, { useEffect, useRef, useState } from "react";
import LogoCarousel from "./LogoCarousel";

interface LazyLogoCarouselProps {
  logos: { src: string; alt: string; scale?: number }[];
}

export default function LazyLogoCarousel({ logos }: LazyLogoCarouselProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-[160px]">
      {shouldLoad ? (
        <LogoCarousel logos={logos} />
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-500">
          <div className="animate-pulse">Loading...</div>
        </div>
      )}
    </div>
  );
}
