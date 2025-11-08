import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollLuxuryBottom() {
  const location = useLocation();
  const navType = useNavigationType();
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    if (navType !== "PUSH") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const scrollEl = document.scrollingElement || document.documentElement;

    const getMaxScroll = () => {
      const max = (scrollEl.scrollHeight || 0) - (window.innerHeight || 0);
      return Math.max(0, Math.floor(max));
    };

    if (reduce) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const DELAY_MS = 60;
    const FAUX_DIP = Math.round(window.innerHeight * 0.35);

    requestAnimationFrame(() => {
      const bottom1 = getMaxScroll();
      const startPos = bottom1 > 0 ? bottom1 : FAUX_DIP;
      scrollEl.scrollTop = startPos;

      requestAnimationFrame(() => {
        const bottom2 = getMaxScroll();
        if (bottom2 > startPos) {
          scrollEl.scrollTop = bottom2;
        }
        const id = window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, DELAY_MS);
        return () => window.clearTimeout(id);
      });
    });
  }, [location.pathname, navType]);

  return null;
}
