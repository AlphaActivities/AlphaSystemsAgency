import React, {useEffect, useRef, useState} from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string}[]}) {
  const track = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(()=>{
    const el = track.current!;
    el.innerHTML = el.innerHTML + el.innerHTML;
  }, []);

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/100 via-black/50 to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/100 via-black/50 to-transparent z-10 pointer-events-none" />

      <div
        ref={track}
        className="flex gap-12 items-center animate-marquee will-change-transform"
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {logos.map((l,i)=>(
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            className="h-28 w-auto max-w-[350px] opacity-80 hover:opacity-100 transition-all duration-300 flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
