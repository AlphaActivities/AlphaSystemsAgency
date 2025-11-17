import React, {useEffect, useRef, useState} from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string; scale?: number}[]}) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const [cloneCount] = useState(4);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    const speed = 0.75;

    const animate = () => {
      if (!isPaused && track.firstElementChild) {
        positionRef.current -= speed;

        const singleSetWidth = track.scrollWidth / cloneCount;

        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current = positionRef.current % singleSetWidth;
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, cloneCount]);

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
        className="flex gap-12 items-center will-change-transform"
      >
        {Array.from({ length: cloneCount }).map((_, cloneIndex) => (
          <React.Fragment key={`clone-${cloneIndex}`}>
            {logos.map((l, i) => (
              <img
                key={`${cloneIndex}-${i}`}
                src={l.src}
                alt={l.alt}
                className="h-28 w-auto max-w-[350px] opacity-100 flex-shrink-0"
                style={l.scale ? { transform: `scale(${l.scale})` } : undefined}
                loading="lazy"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
