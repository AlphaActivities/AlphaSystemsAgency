import React, {useEffect, useRef, useState} from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string; scale?: number}[]}) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(14);

  useEffect(() => {
    if (trackRef.current) {
      const firstSet = trackRef.current.querySelector('.logo-set');
      if (firstSet) {
        const width = firstSet.getBoundingClientRect().width;
        const duration = width / 100;
        setAnimationDuration(duration);
      }
    }
  }, [logos]);

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
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{
          animation: `marqueeScroll ${animationDuration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        <div className="flex gap-12 items-center logo-set flex-shrink-0">
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
        </div>
        <div className="flex gap-12 items-center logo-set flex-shrink-0 ml-12">
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
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
      `}</style>
    </div>
  );
}
