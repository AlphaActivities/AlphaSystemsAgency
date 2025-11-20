import React from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string; scale?: number}[]}) {
  return (
    <div
      className="logo-marquee-outer py-6"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      <div className="logo-marquee-track">
        {Array.from({ length: 3 }).map((_, cloneIndex) => (
          <React.Fragment key={`clone-${cloneIndex}`}>
            {logos.map((l, i) => (
              <img
                key={`${cloneIndex}-${i}`}
                src={l.src}
                alt={l.alt}
                className="h-28 w-auto max-w-[350px] opacity-100 flex-shrink-0 pointer-events-none"
                style={l.scale ? { transform: `scale(${l.scale})` } : undefined}
                loading="lazy"
                draggable={false}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
