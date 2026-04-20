import React, { useEffect, useRef, useState } from "react";

const MARQUEE_DURATION = 32; // seconds for one full loop

export default function LogoCarousel({ logos }: { logos: { src: string; alt: string; scale?: number }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cloneCount] = useState(4);

  // Drag state
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const dragStartXRef = useRef(0);
  const animStartOffsetRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const momentumIdRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Measure the width of one set of logos after images load
    const measureWidth = () => {
      const totalWidth = track.scrollWidth;
      if (totalWidth > 0) {
        singleSetWidthRef.current = totalWidth / cloneCount;
      }
    };

    const images = Array.from(track.querySelectorAll("img"));
    const pending = images.filter((img) => !img.complete);
    let settled = 0;
    const onSettle = () => {
      settled++;
      if (settled >= pending.length) measureWidth();
    };
    pending.forEach((img) => {
      img.addEventListener("load", onSettle, { once: true });
      img.addEventListener("error", onSettle, { once: true });
    });
    if (pending.length === 0) measureWidth();

    const resizeObs = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(measureWidth)
      : null;
    resizeObs?.observe(track);

    // Get the current animated translateX from the running CSS animation
    const getCurrentX = (): number => {
      const style = getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      return matrix.m41; // translateX
    };

    const applyMomentum = () => {
      const friction = 0.88;
      velocityRef.current *= friction;

      const width = singleSetWidthRef.current;
      if (width) {
        dragOffsetRef.current += velocityRef.current;
        // wrap offset within [-width, 0]
        dragOffsetRef.current = ((dragOffsetRef.current % width) + width) % width;
        if (dragOffsetRef.current > 0) dragOffsetRef.current -= width;
        track.style.transform = `translate3d(${dragOffsetRef.current}px, 0, 0)`;
      }

      if (Math.abs(velocityRef.current) > 0.3) {
        momentumIdRef.current = requestAnimationFrame(applyMomentum);
      } else {
        // Resume CSS animation from current position
        resumeAnimation();
      }
    };

    const resumeAnimation = () => {
      const width = singleSetWidthRef.current;
      if (!width) {
        // No width yet — just remove the inline override
        track.style.transform = "";
        track.style.animationPlayState = "running";
        return;
      }

      // Snap current offset into [- width, 0]
      let offset = dragOffsetRef.current % width;
      if (offset > 0) offset -= width;

      // CSS animation travels from 0 → -25% (one set width).
      // We need to resume at `offset`, i.e. set animation-delay so that
      // at t=0 the position equals offset.
      // position(t) = (offset_at_resume) + speed * t
      // CSS keyframe: translateX goes from 0 to -width over MARQUEE_DURATION seconds.
      // So position = -width * (t / MARQUEE_DURATION)
      // We want -width * (elapsed / MARQUEE_DURATION) = offset
      // => elapsed = -offset * MARQUEE_DURATION / width  (offset is negative)
      const elapsed = (-offset / width) * MARQUEE_DURATION;
      const delay = -elapsed; // negative delay = start mid-animation

      track.style.transform = "";
      track.style.animationDelay = `${delay}s`;
      track.style.animationPlayState = "running";
    };

    const handlePointerDown = (e: PointerEvent) => {
      cancelAnimationFrame(momentumIdRef.current);
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = performance.now();
      velocityRef.current = 0;

      // Freeze animation: read current animated X, store it as our offset base
      const currentX = getCurrentX();
      track.style.animationPlayState = "paused";
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      animStartOffsetRef.current = currentX;
      dragOffsetRef.current = currentX;
      pausedAtRef.current = currentX;

      container.style.cursor = "grabbing";
      container.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const deltaX = e.clientX - lastDragXRef.current;
      const deltaT = now - lastDragTimeRef.current;

      if (deltaT > 0) velocityRef.current = (deltaX / deltaT) * 16;

      dragOffsetRef.current += deltaX;
      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = now;

      const width = singleSetWidthRef.current;
      let displayOffset = dragOffsetRef.current;
      if (width) {
        displayOffset = ((displayOffset % width) + width) % width;
        if (displayOffset > 0) displayOffset -= width;
      }
      track.style.transform = `translate3d(${displayOffset}px, 0, 0)`;
      dragOffsetRef.current = displayOffset;
      e.preventDefault();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.style.cursor = "grab";
      container.releasePointerCapture(e.pointerId);

      if (Math.abs(velocityRef.current) > 0.5) {
        momentumIdRef.current = requestAnimationFrame(applyMomentum);
      } else {
        resumeAnimation();
      }
    };

    container.style.cursor = "grab";
    container.style.touchAction = "none";
    container.addEventListener("pointerdown", handlePointerDown, { passive: false });
    container.addEventListener("pointermove", handlePointerMove, { passive: false });
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);

    return () => {
      cancelAnimationFrame(momentumIdRef.current);
      resizeObs?.disconnect();
      pending.forEach((img) => {
        img.removeEventListener("load", onSettle);
        img.removeEventListener("error", onSettle);
      });
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [cloneCount]);

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-6">
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-12 items-center select-none"
          style={{
            willChange: "transform",
            animation: `logo-marquee ${MARQUEE_DURATION}s linear infinite`,
          }}
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
