import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type BP = "mobile"|"tablet"|"desktop";
const useBP = (): BP => {
  const [bp,set] = useState<BP>("mobile");
  useEffect(() => {
    const qMd = matchMedia("(min-width: 640px)");
    const qLg = matchMedia("(min-width: 1024px)");
    const apply = () => set(qLg.matches ? "desktop" : qMd.matches ? "tablet" : "mobile");
    [qMd,qLg].forEach(q => q.addEventListener("change", apply));
    apply();
    return () => [qMd,qLg].forEach(q => q.removeEventListener("change", apply));
  }, []);
  return bp;
};

export default function HeroGapPortal({
  heroId = "heroTitle",
  paraSelector = "section#hero p",
  positionBias = 0.35,
  sizes = { mobile:[200,140], tablet:[220,160], desktop:[260,180] }
}: {
  heroId?: string;
  paraSelector?: string;
  positionBias?: number;
  sizes?: { mobile:[number,number], tablet:[number,number], desktop:[number,number] };
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bp = useBP();

  useLayoutEffect(() => {
    const hero = document.getElementById(heroId);
    const para = document.querySelector<HTMLElement>(paraSelector);
    const host = hostRef.current;
    if (!hero || !para || !host) return;
    const place = () => {
      const h = hero.getBoundingClientRect();
      const p = para.getBoundingClientRect();
      const gap = Math.max(0, p.top - h.bottom);
      const [w,hSize] = bp === "desktop" ? sizes.desktop : bp === "tablet" ? sizes.tablet : sizes.mobile;
      const heroSection = host.parentElement as HTMLElement;
      const sec = heroSection.getBoundingClientRect();
      const y = h.bottom + gap * positionBias;
      host.style.top = `${Math.max(0, y - sec.top - hSize/2)}px`;
      host.style.width = `${w}px`;
      host.style.height = `${hSize}px`;
      host.style.marginLeft = "auto";
      host.style.marginRight = "auto";
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(document.documentElement);
    addEventListener("scroll", place, { passive: true });
    addEventListener("orientationchange", place);
    return () => {
      ro.disconnect();
      removeEventListener("scroll", place);
      removeEventListener("orientationchange", place);
    };
  }, [bp, positionBias, heroId, paraSelector, sizes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0, t = 0;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = Array.from({length: 90}, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()*0.6-0.3), vy: (Math.random()*0.2+0.35),
      life: Math.random()*1
    }));

    const step = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0,0,w,h);

      const grad = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, Math.max(w,h)/2);
      grad.addColorStop(0, "rgba(255,255,255,0.25)");
      grad.addColorStop(0.25, "rgba(186,140,255,0.22)");
      grad.addColorStop(1, "rgba(20,0,60,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,w,h);

      for (let p of particles) {
        p.y -= p.vy * 0.8;
        p.x += Math.sin((t+p.y*8))*0.002 + p.vx*0.002;
        p.life -= 0.008;
        if (p.life <= 0 || p.y < -0.1) {
          p.x = Math.random();
          p.y = 1.1;
          p.vx = (Math.random()*0.6-0.3);
          p.vy = (Math.random()*0.2+0.35);
          p.life = 1;
        }
        const alpha = Math.max(0, Math.min(1, p.life));
        ctx.beginPath();
        ctx.arc(p.x*w, p.y*h, 2.2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(170,120,255,${0.35 + 0.55*alpha})`;
        ctx.shadowColor = "rgba(170,120,255,0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(210,170,255,0.8)";
      ctx.strokeStyle = "rgba(220,190,255,0.75)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const r = Math.min(w,h)*0.36;
      for (let i=0;i<6;i++){
        const a = t*0.03 + i*(Math.PI/3);
        const x1 = w/2 + Math.cos(a)*r*0.6;
        const y1 = h/2 + Math.sin(a)*r*0.35;
        const x2 = w/2 + Math.cos(a+0.9)*r;
        const y2 = h/2 + Math.sin(a+0.9)*r*0.8;
        ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
      }
      ctx.stroke();

      t++;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div ref={hostRef} className="hero-anim-overlay">
      <canvas ref={canvasRef} className="hero-stream-canvas"></canvas>
    </div>
  );
}
