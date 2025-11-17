import React, {useEffect, useRef, useState} from "react";

export default function Counter({to=100, duration=1400, label}:{to:number; duration?:number; label?:string}) {
  const [val, setVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const startRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const easeOutExpo = (t:number)=> t===1?1:1 - Math.pow(2, -10*t);
    const step = (ts:number)=>{
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current)/duration);
      setVal(Math.round(to * easeOutExpo(p)));
      if (p<1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(id);
  }, [hasAnimated, to, duration]);

  return (
    <div ref={containerRef} className="text-4xl font-semibold tracking-tight tabular-nums">
      {val}{label? <span className="ml-1 text-base opacity-80">{label}</span>: null}
    </div>
  );
}
