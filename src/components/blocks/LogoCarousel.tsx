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

  // Cached width of a single logo set, used for modulo wrapping
  const singleSetWidthRef = useRef<number | null>(null);

  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let animationId: number;
    const baseSpeed = 0.75;
    const friction = 0.92;
    const resumeDelay = 800;

    // Initialize cached width once the track has a measurable width
    const updateSingleSetWidth = () => {
      const totalWidth = track.scrollWidth;
      if (totalWidth > 0 && cloneCount > 0) {
        singleSetWidthRef.current = totalWidth / cloneCount;
      }
    };

    updateSingleSetWidth();

    // Keep cached width in sync if layout changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSingleSetWidth();
      });
      resizeObserver.observe(track);
    }

    // Visibility observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            // Resume animation loop immediately
            animationId = requestAnimationFrame(animate);
          } else {
            isVisibleRef.current = false;
            // Stop animation when not visible
            cancelAnimationFrame(animationId);
          }
        }
      },
      {
        root: null,
        threshold: 0.1, // Consider visible if at least 10 percent is on-screen
      }
    );

    observer.observe(container);

    const animate = () => {
      const trackEl = trackRef.current;

      // Phase Two: stop processing if not visible
      if (!isVisibleRef.current) {
        return; // Do not schedule next frame
      }

      if (trackEl && trackEl.firstElementChild) {
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

        const totalWidth = trackEl.scrollWidth;
        const singleSetWidth = cloneCount > 0 ? totalWidth / cloneCount : 0;

        if (singleSetWidth > 0) {
          if (positionRef.current < -singleSetWidth) {
            positionRef.current = positionRef.current % singleSetWidth;
          } else if (positionRef.current > 0) {
            positionRef.current = -(singleSetWidth + (positionRef.current % singleSetWidth));
          }
        }

        trackEl.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
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

    container.style.cursor = 'grab';
    container.style.touchAction = 'none';
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      observer.disconnect();
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
