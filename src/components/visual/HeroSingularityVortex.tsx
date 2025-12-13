import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

const useBreakpoint = (): Breakpoint => {
  const [bp, setBp] = useState<Breakpoint>("mobile");

  useEffect(() => {
    const qSm = window.matchMedia("(min-width: 640px)");
    const qLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (qLg.matches) setBp("desktop");
      else if (qSm.matches) setBp("tablet");
      else setBp("mobile");
    };

    update();
    qSm.addEventListener("change", update);
    qLg.addEventListener("change", update);

    return () => {
      qSm.removeEventListener("change", update);
      qLg.removeEventListener("change", update);
    };
  }, []);

  return bp;
};

const sizeMap: Record<Breakpoint, [number, number]> = {
  mobile: [280, 280],
  tablet: [300, 300],
  desktop: [320, 320],
};

interface HeroSingularityVortexProps {
  heroId?: string;
  paraSelector?: string;
  biasUpPx?: number;
}

const HeroSingularityVortex: React.FC<HeroSingularityVortexProps> = ({
  heroId = "heroTitle",
  paraSelector = "section#hero p",
  biasUpPx = 14,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bp = useBreakpoint();

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const hero = document.getElementById(heroId);
    const paragraph = document.querySelector<HTMLElement>(paraSelector);
    const heroSection = host.closest("section#hero") as HTMLElement | null;

    if (!hero || !paragraph || !heroSection) return;

    // Throttle helper function
    let throttleTimer: number | null = null;
    const throttle = (callback: () => void, delay: number) => {
      if (throttleTimer !== null) return;
      throttleTimer = window.setTimeout(() => {
        callback();
        throttleTimer = null;
      }, delay);
    };

    // Cache for getBoundingClientRect results
    const rectCache = {
      titleRect: null as DOMRect | null,
      pRect: null as DOMRect | null,
      secRect: null as DOMRect | null,
      lastUpdate: 0
    };

    const place = () => {
      const now = Date.now();
      // Cache rects for 100ms to reduce layout thrashing
      if (now - rectCache.lastUpdate > 100) {
        rectCache.titleRect = hero.getBoundingClientRect();
        rectCache.pRect = paragraph.getBoundingClientRect();
        rectCache.secRect = heroSection.getBoundingClientRect();
        rectCache.lastUpdate = now;
      }

      const titleRect = rectCache.titleRect!;
      const pRect = rectCache.pRect!;
      const secRect = rectCache.secRect!;

      const gap = Math.max(0, pRect.top - titleRect.bottom);

      const [w, h] = sizeMap[bp];

      const centerViewportY = titleRect.bottom + gap / 2 - biasUpPx;

      const localCenterY = centerViewportY - secRect.top;

      host.style.position = "absolute";
      host.style.top = `${Math.max(0, localCenterY)}px`;
      host.style.left = "50%";
      host.style.transform = "translate(-50%, -50%)";
      host.style.width = `${w}px`;
      host.style.height = `${h}px`;
      host.style.marginLeft = "0";
      host.style.marginRight = "0";
    };

    place();

    // Throttled scroll handler - only runs every 150ms
    const throttledPlace = () => throttle(place, 150);

    // Debounced resize handler
    let resizeTimer: number | null = null;
    const debouncedPlace = () => {
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rectCache.lastUpdate = 0; // Force cache refresh on resize
        place();
      }, 100);
    };

    const ro = new ResizeObserver(debouncedPlace);
    ro.observe(document.documentElement);

    window.addEventListener("scroll", throttledPlace, { passive: true });
    window.addEventListener("orientationchange", debouncedPlace);
    window.addEventListener("resize", debouncedPlace);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", throttledPlace);
      window.removeEventListener("orientationchange", debouncedPlace);
      window.removeEventListener("resize", debouncedPlace);
      if (throttleTimer !== null) clearTimeout(throttleTimer);
      if (resizeTimer !== null) clearTimeout(resizeTimer);
    };
  }, [bp, heroId, paraSelector, biasUpPx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const rafRef = { current: null as number | null };
    let t = 0;
    let isPaused = false;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = Array.from({ length: 150 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.48 + 0.08,
      speed: 0.004 + Math.random() * 0.006,
      drift: (Math.random() - 0.5) * 0.003,
      hue: 270 + Math.random() * 30,
      alpha: 0.35 + Math.random() * 0.4,
    }));

    // Limit to 30 FPS for better performance
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const animate = (currentTime: number = 0) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Skip rendering if paused (during menu interactions)
      if (isPaused) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Throttle to 30 FPS
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      t += 1;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);
      const coreR = minDim * 0.06;

      const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, minDim * 0.5);
      rg.addColorStop(0, "rgba(160,100,255,0.14)");
      rg.addColorStop(0.35, "rgba(255,220,160,0.08)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(cx, cy, minDim * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(255,255,255,0.5)";

      for (const p of particles) {
        p.angle += p.speed;
        p.radius += p.drift * Math.sin(t * 0.005);

        const r = (minDim * 0.5) * p.radius;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * (r * 0.72);

        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
        ctx.moveTo(x, y);

        const tx = cx + Math.cos(p.angle - 0.12) * (r * 0.98);
        const ty = cy + Math.sin(p.angle - 0.12) * (r * 0.72 * 0.98);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }

      ctx.beginPath();
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
      coreG.addColorStop(0, "rgba(255,255,255,0.75)");
      coreG.addColorStop(0.4, "rgba(172,112,255,0.55)");
      coreG.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreG;
      ctx.arc(cx, cy, coreR * 2.2, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const heroSection = host.closest("section#hero") as HTMLElement | null;

    // Listen for menu state changes and pause animation during interactions
    const handleMenuStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      isPaused = customEvent.detail.isOpen;

      // Resume with a small delay after menu closes for smooth experience
      if (!customEvent.detail.isOpen) {
        setTimeout(() => {
          isPaused = false;
        }, 300);
      }
    };

    window.addEventListener('menuStateChange', handleMenuStateChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      stopAnimation();
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener('menuStateChange', handleMenuStateChange);
    };
  }, [bp]);

  return (
    <div ref={hostRef} className="hero-digital-vortex-host">
      <canvas
        ref={canvasRef}
        className="hero-digital-vortex-canvas"
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroSingularityVortex;
