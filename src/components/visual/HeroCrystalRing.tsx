import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type BP = "mobile" | "tablet" | "desktop";

const useBreakpoint = (): BP => {
  const [bp, setBp] = useState<BP>("mobile");

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

interface HeroCrystalRingProps {
  heroId?: string;
  paraSelector?: string;
  positionBias?: number;
}

const sizeMap = {
  mobile: [190, 150],
  tablet: [220, 170],
  desktop: [260, 190],
} as const;

export default function HeroCrystalRing({
  heroId = "heroTitle",
  paraSelector = "section#hero p",
  positionBias = 0.33,
}: HeroCrystalRingProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bp = useBreakpoint();

  useLayoutEffect(() => {
    const host = hostRef.current;
    const hero = document.getElementById(heroId);
    const para = document.querySelector<HTMLElement>(paraSelector);
    if (!host || !hero || !para) return;

    const place = () => {
      const heroRect = hero.getBoundingClientRect();
      const paraRect = para.getBoundingClientRect();
      const heroSection = host.parentElement as HTMLElement;
      if (!heroSection) return;
      const secRect = heroSection.getBoundingClientRect();

      const gap = Math.max(0, paraRect.top - heroRect.bottom);
      const [w, h] =
        bp === "desktop" ? sizeMap.desktop : bp === "tablet" ? sizeMap.tablet : sizeMap.mobile;

      const yWithinViewport = heroRect.bottom + gap * positionBias;
      const localY = yWithinViewport - secRect.top - h / 2;

      host.style.top = `${Math.max(0, localY)}px`;
      host.style.width = `${w}px`;
      host.style.height = `${h}px`;
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
  }, [bp, heroId, paraSelector, positionBias]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frameId = 0;
    let t = 0;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;

      ctx.clearRect(0, 0, w, h);

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      coreGrad.addColorStop(0, "rgba(255,255,255,0.35)");
      coreGrad.addColorStop(0.25, "rgba(214,180,255,0.38)");
      coreGrad.addColorStop(1, "rgba(18,0,40,0.0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      const segments = 18;
      const ringInner = radius * 0.82;
      const ringOuter = radius * 1.06;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.01);

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const pulse = 0.4 + 0.6 * Math.sin(t * 0.03 + i * 0.6);
        const alpha = 0.25 + 0.55 * pulse;

        ctx.beginPath();
        const a1 = angle - (Math.PI * 2) / segments / 3;
        const a2 = angle + (Math.PI * 2) / segments / 3;

        const x1 = Math.cos(a1) * ringInner;
        const y1 = Math.sin(a1) * ringInner;
        const x2 = Math.cos(a2) * ringInner;
        const y2 = Math.sin(a2) * ringInner;
        const x3 = Math.cos(a2) * ringOuter;
        const y3 = Math.sin(a2) * ringOuter;
        const x4 = Math.cos(a1) * ringOuter;
        const y4 = Math.sin(a1) * ringOuter;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();

        ctx.fillStyle = `rgba(186,140,255,${alpha})`;
        ctx.shadowColor = "rgba(180,120,255,0.95)";
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(205,160,255,0.9)";
      ctx.strokeStyle = "rgba(230,205,255,0.9)";
      ctx.lineWidth = 1;

      const shardCount = 10;
      for (let i = 0; i < shardCount; i++) {
        const a = t * 0.02 + (i / shardCount) * Math.PI * 2;
        const r1 = ringOuter * 1.02;
        const r2 = ringOuter * (1.18 + 0.04 * Math.sin(t * 0.05 + i));
        const x1 = Math.cos(a) * r1;
        const y1 = Math.sin(a) * r1;
        const x2 = Math.cos(a) * r2;
        const y2 = Math.sin(a) * r2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      ctx.restore();

      t++;
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className="hero-anim-overlay">
      <canvas ref={canvasRef} className="hero-crystal-ring-canvas" />
    </div>
  );
}
