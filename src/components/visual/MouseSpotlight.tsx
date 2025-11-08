import React, {useEffect, useRef, useState} from "react";

export default function MouseSpotlight() {
  const lensRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const mouseRef = useRef({x: 0, y: 0, targetX: 0, targetY: 0});
  const rafRef = useRef<number>();
  const idleTimerRef = useRef<number>();

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    const lens = lensRef.current!;
    const halo = haloRef.current!;
    const vw = window.innerWidth;
    const RADIUS = Math.max(720, Math.min(vw * 0.35, 1000));
    const FOLLOW = 0.16;
    const OPACITY = 0.26;

    mouseRef.current.x = vw / 2;
    mouseRef.current.y = window.innerHeight / 2;
    mouseRef.current.targetX = mouseRef.current.x;
    mouseRef.current.targetY = mouseRef.current.y;

    let lastMouseEvent: MouseEvent | null = null;
    let isIdle = false;

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseEvent = e;

      if (isIdle) {
        isIdle = false;
        lens.style.opacity = OPACITY.toString();
        halo.style.opacity = '0.10';
      }

      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        isIdle = true;
        lens.style.opacity = '0';
        halo.style.opacity = '0';
      }, 1600);
    };

    window.addEventListener("mousemove", handleMouseMove, {passive: true});

    const animate = () => {
      if (lastMouseEvent) {
        mouseRef.current.targetX = lastMouseEvent.clientX;
        mouseRef.current.targetY = lastMouseEvent.clientY;
      }

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * FOLLOW;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * FOLLOW;

      const baseHue = Number(getComputedStyle(document.documentElement).getPropertyValue("--tone-hue") || "265");
      const biasedHue = 265 + (baseHue - 265) * 0.15;

      const scrollY = window.scrollY;
      const scale = Math.min(1.06, 1 + scrollY * 0.0003);

      const lensX = mouseRef.current.x - (RADIUS * scale) / 2;
      const lensY = mouseRef.current.y - (RADIUS * scale) / 2;

      lens.style.transform = `translate3d(${lensX}px, ${lensY}px, 0) scale(${scale})`;
      lens.style.width = `${RADIUS}px`;
      lens.style.height = `${RADIUS}px`;
      lens.style.background = `radial-gradient(circle at center,
        hsl(${biasedHue}, 100%, 70%, 0.22) 0%,
        hsl(${biasedHue}, 100%, 65%, 0.16) 28%,
        hsl(${biasedHue}, 95%, 55%, 0.10) 52%,
        transparent 72%
      )`;

      const haloSize = RADIUS * 1.45;
      halo.style.transform = `translate3d(${mouseRef.current.x - (haloSize * scale) / 2}px, ${mouseRef.current.y - (haloSize * scale) / 2}px, 0) scale(${scale})`;
      halo.style.width = `${haloSize}px`;
      halo.style.height = `${haloSize}px`;
      halo.style.background = `radial-gradient(circle at center,
        hsl(${biasedHue}, 100%, 75%, 0.08) 0%,
        transparent 65%
      )`;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <div
        ref={lensRef}
        aria-hidden
        className="mouse-spotlight-lens pointer-events-none fixed z-30"
        style={{
          mixBlendMode: 'screen',
          filter: 'blur(90px)',
          opacity: 0.26,
          willChange: 'transform, filter, opacity',
          transition: 'opacity 280ms ease, filter 280ms ease'
        }}
      />
      <div
        ref={haloRef}
        aria-hidden
        className="mouse-spotlight-halo pointer-events-none fixed z-20"
        style={{
          mixBlendMode: 'screen',
          filter: 'blur(130px)',
          opacity: 0.10,
          willChange: 'transform, filter, opacity',
          transition: 'opacity 280ms ease, filter 280ms ease'
        }}
      />
    </>
  );
}
