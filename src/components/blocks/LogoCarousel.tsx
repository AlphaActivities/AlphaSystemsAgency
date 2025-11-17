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
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
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
            className="h-28 w-auto max-w-[350px] opacity-100 flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
