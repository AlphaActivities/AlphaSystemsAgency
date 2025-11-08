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
      <div
        ref={track}
        className="flex gap-10 items-center animate-marquee will-change-transform"
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {logos.map((l,i)=>(
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            className="h-8 w-auto max-w-[140px] grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
