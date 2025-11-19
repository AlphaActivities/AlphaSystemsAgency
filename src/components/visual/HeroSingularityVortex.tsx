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
  mobile: [135, 135],
  tablet: [155, 155],
  desktop: [175, 175],
};

interface HeroSingularityVortexProps {
  heroId?: string;
  paraSelector?: string;
  biasUpPx?: number;
}

const HeroSingularityVortex: React.FC<HeroSingularityVortexProps> = ({
  heroId = "heroTitle",
  paraSelector = "section#hero p",
  biasUpPx = 10,
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

    const place = () => {
      const titleRect = hero.getBoundingClientRect();
      const pRect = paragraph.getBoundingClientRect();
      const secRect = heroSection.getBoundingClientRect();

      const gap = Math.max(0, pRect.top - titleRect.bottom);

      const [w, h] = sizeMap[bp];

      const midpointViewportY = titleRect.bottom + gap / 2 - biasUpPx;

      const localTop = midpointViewportY - secRect.top - h / 2;

      host.style.position = "absolute";
      host.style.top = `${Math.max(0, localTop)}px`;
      host.style.left = "50%";
      host.style.transform = "translateX(-50%)";
      host.style.width = `${w}px`;
      host.style.height = `${h}px`;
      host.style.marginLeft = "0";
      host.style.marginRight = "0";
    };

    place();

    const ro = new ResizeObserver(place);
    ro.observe(document.documentElement);

    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("orientationchange", place);
    window.addEventListener("resize", place);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", place);
      window.removeEventListener("orientationchange", place);
      window.removeEventListener("resize", place);
    };
  }, [bp, heroId, paraSelector, biasUpPx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frameId: number;
    let t = 0;
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

    const particles = Array.from({ length: 220 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.48 + 0.08,
      speed: 0.004 + Math.random() * 0.006,
      drift: (Math.random() - 0.5) * 0.003,
      hue: 270 + Math.random() * 30,
      alpha: 0.35 + Math.random() * 0.4,
    }));

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        frameId = requestAnimationFrame(render);
        return;
      }

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

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
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
