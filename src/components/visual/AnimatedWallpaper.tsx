import React, { useEffect, useRef, useState } from "react";

export default function AnimatedWallpaper() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [shouldBreath, setShouldBreath] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const breath = useRef({ scale: 1, translateY: 0, targetScale: 1, targetTranslateY: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) {
      setShouldBreath(false);
      setShouldAnimate(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldBreath) return;
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 400, 1);
      breath.current.targetScale = Math.min(1.02, 1 + progress * 0.02);
      breath.current.targetTranslateY = Math.min(8, progress * 8);
    };
    const tick = () => {
      breath.current.scale += (breath.current.targetScale - breath.current.scale) * 0.08;
      breath.current.translateY += (breath.current.targetTranslateY - breath.current.translateY) * 0.08;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `scale(${breath.current.scale}) translateY(${breath.current.translateY}px)`;
        wrapperRef.current.style.willChange = "transform";
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (wrapperRef.current) wrapperRef.current.style.willChange = "auto";
    };
  }, [shouldBreath]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" data-wallpaper>
      <div ref={wrapperRef} className="absolute inset-0">
        <div
          className={`absolute -inset-[50%] blur-3xl mix-blend-screen ${
            shouldAnimate ? "crystalline-rotator" : ""
          }`}
          style={{
            opacity: 0.26,
            backgroundImage: "conic-gradient(from 45deg, #D4AF37, #7A2CFF, #D4AF37)",
          }}
          aria-hidden
        />

        <div
          className="absolute inset-0 tone-smooth"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 40%, hsla(var(--tone-hue, 265), 70%, 50%, 0.06) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
