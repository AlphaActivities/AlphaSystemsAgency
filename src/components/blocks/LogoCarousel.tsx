import React, {useEffect, useRef, useState} from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string; scale?: number}[]}) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const speedRef = useRef(0.5);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const animate = () => {
      if (!isPaused) {
        positionRef.current -= speedRef.current;

        const resetPoint = -(firstChild.offsetWidth / 2);

        if (positionRef.current <= resetPoint) {
          positionRef.current += firstChild.offsetWidth / 2;
        }

        container.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      <div
        ref={containerRef}
        className="flex gap-12 items-center will-change-transform"
      >
        {logos.map((l,i)=>(
          <img
            key={`original-${i}`}
            src={l.src}
            alt={l.alt}
            className="h-28 w-auto max-w-[350px] opacity-100 flex-shrink-0"
            style={l.scale ? { transform: `scale(${l.scale})` } : undefined}
            loading="lazy"
          />
        ))}
        {logos.map((l,i)=>(
          <img
            key={`duplicate-${i}`}
            src={l.src}
            alt={l.alt}
            className="h-28 w-auto max-w-[350px] opacity-100 flex-shrink-0"
            style={l.scale ? { transform: `scale(${l.scale})` } : undefined}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
