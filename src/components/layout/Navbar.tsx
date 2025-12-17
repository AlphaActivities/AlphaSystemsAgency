import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Our work" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Team" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [menuH, setMenuH] = useState(0);
  const location = useLocation();

  // Dispatch custom event when menu state changes to pause animations
  useEffect(() => {
    const event = new CustomEvent('menuStateChange', { detail: { isOpen: open } });
    window.dispatchEvent(event);
  }, [open]);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (setOpen) setOpen(false);

    if (location.pathname === "/") {
      e.preventDefault();
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const letters = document.querySelectorAll(".brand-letter-v9");
      letters.forEach((el) => {
        // Restart animation by removing and re-adding the class
        el.classList.remove("brand-letter-v9");
        void (el as HTMLElement).offsetWidth; // force reflow
        el.classList.add("brand-letter-v9");
      });
    }, 3000); // every 3 seconds - reduced frequency for better performance
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (panelRef.current) {
        setMenuH(panelRef.current.scrollHeight || 0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (open) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("overflow-hidden");
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const scrollToTarget = (to: string) => {
    const id = to.startsWith("/#") ? to.slice(2) : (to.startsWith("#") ? to.slice(1) : "");
    if (!id) return false;
    const el = document.getElementById(id);
    if (!el) return true;
    const offset = 72;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-6xl px-4 pointer-events-auto">
        <div id="nav-wrap" className="relative mx-auto w-full sm:w-[94%] md:w-[92%]">
        <div
          className="nav-glass z-50 relative mx-auto w-full border border-white/10 bg-black/40 shadow-[0_0_40px_rgb(0_0_0/0.20)] overflow-hidden"
          data-open={open ? "true" : "false"}
          style={{
            ["--navH" as any]: open ? `${64 + menuH}px` : "64px",
            ["--navDur" as any]: open ? "360ms" : "180ms"
          }}
        >
          <div className="nav-row relative z-10 h-16 flex items-center justify-between px-4">
            <Link to="/" onClick={handleBrandClick} className="flex items-center gap-2 relative z-20">
              <div className="logo-wrapper h-8 w-8">
                <img src="/images/profile-photos/Alpha-Logo.png" alt="Alpha Systems" className="h-8 w-8 rounded-sm object-contain shrink-0" />
              </div>

              {/* Single brand element, kerning-safe per-letter spans, real spaces preserved */}
              <span
                className="brand-wrap text-white font-semibold text-[17px] sm:text-[18px]"
                style={{ fontKerning: 'normal' as any }}
              >
                {Array.from("Alpha Systems").map((ch, i) => {
                  if (ch === " ") return " ";
                  return (
                    <span
                      key={i}
                      className="brand-letter-v9 text-white"
                      style={{ animationDelay: `${i * 55}ms` }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 z-10">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="py-3 px-2"
                  onClick={(e) => {
                    if (location.pathname === l.to) {
                      e.preventDefault();
                      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
                      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                    }
                  }}
                >
                  {({ isActive }) => (
                    <span className={`pb-1 transition-colors ${isActive ? "text-white border-b-2 border-[var(--gold-500,#d4af37)]" : "text-white/70 hover:text-white"}`}>
                      {l.label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <Link to="/contact" className="cta-uv hidden lg:inline-flex items-center rounded-full bg-[var(--gold-500,#d4af37)] px-4 py-2 text-[13.5px] font-semibold text-black relative z-20">
              Book a strategy call
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen(v => !v)}
              className="lg:hidden relative grid h-10 w-10 place-items-center rounded-full bg-[rgb(122,44,255)] text-white focus:outline-none focus:ring-4 ring-white/20 self-center"
            >
              <svg
                className={`h-5 w-5 transition-transform duration-150 ${open ? "scale-0" : "scale-100"}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M7 12h10" />
                <path d="M4 17h16" />
              </svg>
              <svg
                className={`absolute h-5 w-5 transition-transform duration-150 ${open ? "scale-100" : "scale-0"}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </svg>
            </button>
          </div>

          <div
            className={`lg:hidden relative z-50 transition-[max-height,opacity,transform] ease-[cubic-bezier(.2,.8,.2,1)] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
            role="menu"
            aria-label="Mobile navigation"
            style={{
              maxHeight: open ? `${menuH}px` : "0px",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-4px)",
              transitionDuration: open ? "360ms" : "180ms"
            }}
          >
            <div ref={panelRef} className="divide-y divide-white/10 overflow-hidden rounded-b-[32px]">
              {links.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (l.to.startsWith("#") || l.to.startsWith("/#")) {
                      e.preventDefault();
                      scrollToTarget(l.to);
                    } else if (location.pathname === l.to) {
                      e.preventDefault();
                      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
                      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                    }
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    [
                      "menu-link",
                      "block w-full px-5 py-4",
                      "rounded-xl transition-colors duration-150",
                      "text-white/90 hover:text-white",
                      "outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                      isActive ? "bg-fuchsia-500/15" : "hover:bg-white/5",
                      "lg:bg-transparent lg:hover:bg-transparent lg:rounded-none",
                      "motion-safe:animate-menuItem"
                    ].join(" ")
                  }
                  style={{ animationDelay: `${40 + i * 60}ms` }}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          aria-hidden
        />
        </div>
      </div>
    </header>
  );
}
