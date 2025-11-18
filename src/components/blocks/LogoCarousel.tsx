import React, {useEffect, useRef, useState} from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string; scale?: number}[]}) {
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const [cloneCount] = useState(4);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    const baseSpeed = 0.75;
    const friction = 0.92;
    const resumeDelay = 800;

    const animate = () => {
      if (track.firstElementChild) {
        const now = performance.now();
        const timeSinceInteraction = now - lastInteractionTimeRef.current;

        if (!isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 0.1) {
            velocityRef.current *= friction;
            positionRef.current += velocityRef.current;
          } else if (timeSinceInteraction > resumeDelay && !isHovering) {
            velocityRef.current = 0;
            positionRef.current -= baseSpeed;
          } else {
            velocityRef.current *= friction;
            positionRef.current += velocityRef.current;
          }
        } else {
          lastInteractionTimeRef.current = now;
        }

        const singleSetWidth = track.scrollWidth / cloneCount;

        if (positionRef.current < -singleSetWidth) {
          positionRef.current = positionRef.current % singleSetWidth;
        } else if (positionRef.current > 0) {
          positionRef.current = -(singleSetWidth + (positionRef.current % singleSetWidth));
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      track.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const now = performance.now();
      const deltaX = e.clientX - lastXRef.current;
      const deltaTime = now - lastTimeRef.current;

      if (deltaTime > 0) {
        velocityRef.current = deltaX / deltaTime * 16;
      }

      positionRef.current += deltaX;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        track.style.cursor = 'grab';
        lastInteractionTimeRef.current = performance.now();
      }
    };

    track.style.cursor = 'grab';
    track.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [cloneCount, isHovering]);

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-12 items-center will-change-transform select-none"
      >
        {Array.from({ length: cloneCount }).map((_, cloneIndex) => (
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
