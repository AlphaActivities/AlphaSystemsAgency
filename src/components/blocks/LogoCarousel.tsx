import React, { useEffect, useRef, useState } from "react";

export default function LogoCarousel({ logos }: { logos: { src: string; alt: string; scale?: number }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const [cloneCount] = useState(4);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);
  const singleSetWidthRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const animationIdRef = useRef<number>(0);
  const prevFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const baseSpeed = 45; // px per second — consistent across all frame rates
    const friction = 0.92;
    const resumeDelay = 800;

    const normalizePosition = (pos: number, width: number): number => {
      if (width <= 0) return pos;
      const normalized = ((pos % width) - width) % width;
      return normalized === 0 ? -width : normalized;
    };

    const updateSingleSetWidth = () => {
      const totalWidth = track.scrollWidth;
      if (totalWidth > 0 && cloneCount > 0) {
        const newWidth = totalWidth / cloneCount;
        const prev = singleSetWidthRef.current;
        singleSetWidthRef.current = newWidth;
        // Normalize existing position so a width change never causes a visual snap
        if (prev === null || Math.abs(newWidth - prev) > 1) {
          positionRef.current = normalizePosition(positionRef.current, newWidth);
        }
      }
    };

    const startAnimation = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      prevFrameTimeRef.current = 0; // reset so first frame delta is not huge
      animationIdRef.current = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      isAnimatingRef.current = false;
      cancelAnimationFrame(animationIdRef.current);
    };

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        isAnimatingRef.current = false;
        return;
      }

      // Cap deltaTime at 50ms to absorb tab-switch, scroll-pause, or device-sleep
      // gaps without causing a position jump
      const rawDelta = prevFrameTimeRef.current ? timestamp - prevFrameTimeRef.current : 16;
      const deltaTime = Math.min(rawDelta, 50);
      prevFrameTimeRef.current = timestamp;

      const trackEl = trackRef.current;
      if (trackEl) {
        const now = performance.now();
        const timeSinceInteraction = now - lastInteractionTimeRef.current;

        if (!isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 0.1) {
            velocityRef.current *= friction;
            positionRef.current += velocityRef.current;
          } else if (timeSinceInteraction > resumeDelay) {
            velocityRef.current = 0;
            positionRef.current -= baseSpeed * (deltaTime / 1000);
          } else {
            velocityRef.current *= friction;
            positionRef.current += velocityRef.current;
          }
        } else {
          lastInteractionTimeRef.current = now;
        }

        if (!singleSetWidthRef.current) {
          updateSingleSetWidth();
        }

        const singleSetWidth = singleSetWidthRef.current;
        if (singleSetWidth && singleSetWidth > 0) {
          if (positionRef.current < -singleSetWidth || positionRef.current > 0) {
            positionRef.current = normalizePosition(positionRef.current, singleSetWidth);
          }
        }

        trackEl.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Wait for images to be loaded before measuring track width
    const images = Array.from(track.querySelectorAll("img"));
    let pendingImages = images.filter((img) => !img.complete);

    const onImageSettled = () => {
      pendingImages = pendingImages.filter((img) => !img.complete);
      if (pendingImages.length === 0) {
        updateSingleSetWidth();
      }
    };

    pendingImages.forEach((img) => {
      img.addEventListener("load", onImageSettled, { once: true });
      img.addEventListener("error", onImageSettled, { once: true });
    });

    updateSingleSetWidth();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateSingleSetWidth();
      });
      resizeObserver.observe(track);
    }

    // Pause/resume on tab visibility change — prevents large delta jumps when
    // the OS suspends the page (common on iOS Safari)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (isVisibleRef.current) {
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            startAnimation();
          } else {
            isVisibleRef.current = false;
            stopAnimation();
          }
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(container);

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      container.style.cursor = "grabbing";
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const deltaX = e.clientX - lastXRef.current;
      const deltaTime = now - lastTimeRef.current;
      if (deltaTime > 0) {
        velocityRef.current = (deltaX / deltaTime) * 16;
      }
      positionRef.current += deltaX;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
      e.preventDefault();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        container.style.cursor = "grab";
        lastInteractionTimeRef.current = performance.now();
        container.releasePointerCapture(e.pointerId);
      }
    };

    container.style.cursor = "grab";
    container.style.touchAction = "none";
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove, { passive: false });
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);

    return () => {
      stopAnimation();
      observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove, { passive: false } as EventListenerOptions);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
      pendingImages.forEach((img) => {
        img.removeEventListener("load", onImageSettled);
        img.removeEventListener("error", onImageSettled);
      });
    };
  }, [cloneCount]);

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-6">
      <div ref={containerRef} className="relative w-full overflow-hidden">
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
                  loading="eager"
                  draggable={false}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
