import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type BP = "mobile" | "tablet" | "desktop";

const useBP = (): BP => {
  const [bp, setBp] = useState<BP>("mobile");

  useEffect(() => {
    const qSm = window.matchMedia("(min-width: 640px)");
    const qLg = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      if (qLg.matches) setBp("desktop");
      else if (qSm.matches) setBp("tablet");
      else setBp("mobile");
    };

    apply();
    qSm.addEventListener("change", apply);
    qLg.addEventListener("change", apply);

    return () => {
      qSm.removeEventListener("change", apply);
      qLg.removeEventListener("change", apply);
    };
  }, []);

  return bp;
};

interface HeroVortexPortalProps {
  heroId?: string;
  paraSelector?: string;
  positionBias?: number;
  sizes?: {
    mobile: [number, number];
    tablet: [number, number];
    desktop: [number, number];
  };
}

const defaultSizes = {
  mobile: [200, 140],
  tablet: [220, 160],
  desktop: [260, 180],
} as const;

export default function HeroVortexPortal({
  heroId = "heroTitle",
  paraSelector = "section#hero p",
  positionBias = 0.35,
  sizes = defaultSizes,
}: HeroVortexPortalProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bp = useBP();

  useLayoutEffect(() => {
    const host = hostRef.current;
    const hero = document.getElementById(heroId);
    const para = document.querySelector<HTMLElement>(paraSelector);
    if (!host || !hero || !para) return;

    const place = () => {
      const hRect = hero.getBoundingClientRect();
      const pRect = para.getBoundingClientRect();
      const heroSection = host.parentElement as HTMLElement;
      if (!heroSection) return;

      const secRect = heroSection.getBoundingClientRect();
      const gap = Math.max(0, pRect.top - hRect.bottom);

      const [w, hSize] =
        bp === "desktop"
          ? sizes.desktop
          : bp === "tablet"
          ? sizes.tablet
          : sizes.mobile;

      const yViewport = hRect.bottom + gap * positionBias;
      const localY = yViewport - secRect.top - hSize / 2;

      host.style.top = `${Math.max(0, localY)}px`;
      host.style.width = `${w}px`;
      host.style.height = `${hSize}px`;
      host.style.marginLeft = "auto";
      host.style.marginRight = "auto";
    };

    place();

    const ro = new ResizeObserver(place);
    ro.observe(document.documentElement);

    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("orientationchange", place);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", place);
      window.removeEventListener("orientationchange", place);
    };
  }, [bp, heroId, paraSelector, positionBias, sizes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 800;
    let h = 240;
    let rafId: number | null = null;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = Math.max(320, Math.floor(rect.width));
      h = Math.max(120, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const particles = Array.from({ length: 220 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.48 + 0.08,
      speed: 0.004 + Math.random() * 0.006,
      drift: (Math.random() - 0.5) * 0.003,
      hue: 270 + Math.random() * 30,
      alpha: 0.35 + Math.random() * 0.4,
    }));

    let t = 0;

    function frame() {
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

      for (const p of particles) {
        p.angle += p.speed;
        p.radius += p.drift * Math.sin(t * 0.005);

        const r = (minDim * 0.5) * p.radius;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * (r * 0.72);

        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(172,112,255,0.75)";
        ctx.moveTo(x, y);
        const tx = cx + Math.cos(p.angle - 0.12) * (r * 0.98);
        const ty = cy + Math.sin(p.angle - 0.12) * (r * 0.72 * 0.98);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        if ((t + (x | 0)) % 60 === 0) {
          ctx.fillStyle = "rgba(255,220,160,0.9)";
          ctx.shadowBlur = 18;
          ctx.shadowColor = "rgba(255,220,160,0.9)";
          ctx.fillRect(x, y, 2, 2);
        }
      }

      ctx.beginPath();
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
      coreG.addColorStop(0, "rgba(255,255,255,0.95)");
      coreG.addColorStop(0.4, "rgba(172,112,255,0.55)");
      coreG.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreG;
      ctx.arc(cx, cy, coreR * 2.2, 0, Math.PI * 2);
      ctx.fill();

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className="hero-anim-overlay" aria-hidden>
      <canvas ref={canvasRef} className="vortex-core-canvas" />
    </div>
  );
}
