import React, {useEffect, useRef, useState} from "react";

export default function LogoCarousel({logos}:{logos:{src:string; alt:string; scale?: number}[]}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const [cloneCount] = useState(4);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let animationId: number;
    const baseSpeed = 0.75;
    const friction = 0.92;
    const resumeDelay = 800;

    let singleSetWidth = 0;

    const computeSingleSetWidth = () => {
      if (!track || cloneCount <= 0) return;
      const width = track.scrollWidth / cloneCount;
      if (!Number.isFinite(width) || width <= 0) return;
      singleSetWidth = width;
    };

    const animate = () => {
      if (track.firstElementChild) {
        const now = performance.now();
        const timeSinceInteraction = now - lastInteractionTimeRef.current;

        if (!isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 0.1) {
            velocityRef.current *= friction;
            positionRef.current += velocityRef.current;
          } else if (timeSinceInteraction > resumeDelay) {
            velocityRef.current = 0;
            positionRef.current -= baseSpeed;
          } else {
            velocityRef.current *= friction;
            positionRef.current += velocityRef.current;
          }
        } else {
          lastInteractionTimeRef.current = now;
        }

        if (!singleSetWidth) {
          computeSingleSetWidth();
        }

        if (singleSetWidth > 0) {
          if (positionRef.current < -singleSetWidth) {
            positionRef.current = positionRef.current % singleSetWidth;
          } else if (positionRef.current > 0) {
            positionRef.current = -(singleSetWidth + (positionRef.current % singleSetWidth));
          }
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
      container.style.cursor = 'grabbing';
      container.setPointerCapture(e.pointerId);
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
      e.preventDefault();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        container.style.cursor = 'grab';
        lastInteractionTimeRef.current = performance.now();
        container.releasePointerCapture(e.pointerId);
      }
    };

    computeSingleSetWidth();

    let resizeObserver: ResizeObserver | null = null;
    if (track) {
      resizeObserver = new ResizeObserver(() => {
        computeSingleSetWidth();
      });
      resizeObserver.observe(track);
    }

    const handleResize = () => {
      computeSingleSetWidth();
    };

    window.addEventListener("resize", handleResize);

    container.style.cursor = 'grab';
    container.style.touchAction = 'none';
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [cloneCount]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-6"
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
