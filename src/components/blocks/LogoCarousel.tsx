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

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const baseSpeed = 0.75;
    const friction = 0.92;
    const resumeDelay = 800;

    const updateSingleSetWidth = () => {
      const totalWidth = track.scrollWidth;
      if (totalWidth > 0 && cloneCount > 0) {
        singleSetWidthRef.current = totalWidth / cloneCount;
      }
    };

    const startAnimation = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      isAnimatingRef.current = false;
      cancelAnimationFrame(animationIdRef.current);
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        isAnimatingRef.current = false;
        return;
      }

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
            positionRef.current -= baseSpeed;
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
          if (positionRef.current < -singleSetWidth) {
            positionRef.current = positionRef.current % singleSetWidth;
          } else if (positionRef.current > 0) {
            positionRef.current = -(singleSetWidth + (positionRef.current % singleSetWidth));
          }
        }

        trackEl.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

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
