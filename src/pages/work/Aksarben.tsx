import React, { useEffect, useRef } from "react";
import Counter from "../../components/ui/Counter";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Gauge,
  Globe,
  AlertTriangle,
  Check,
  ArrowLeft,
  ArrowUpRight,
  Settings,
  Layers,
  Award,
  Shield,
} from "lucide-react";

export default function Aksarben() {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animatedElements = new Set<Element>();

    const checkScrollComplete = () => {
      if (window.scrollY < 20) {
        setupObserver();
      } else {
        requestAnimationFrame(checkScrollComplete);
      }
    };

    const setupObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            animatedElements.add(entry.target);

            const hasNestedItems = entry.target.querySelector(".luxury-lazy-item");

            if (hasNestedItems) {
              entry.target.classList.add("luxury-visible");

              const items = entry.target.querySelectorAll(".luxury-lazy-item");
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("luxury-visible");
                }, index * 1400);
              });
            } else {
              entry.target.classList.add("luxury-visible");
            }

            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      const containers = document.querySelectorAll(".luxury-lazy-container");
      containers.forEach((container) => {
        observer.observe(container);
      });

      return () => {
        containers.forEach((container) => {
          observer.unobserve(container);
        });
      };
    };

    requestAnimationFrame(checkScrollComplete);
  }, []);

  const weeksLive = Math.max(0, Math.floor((Date.now() - new Date('2025-04-01T00:00:00-05:00').getTime()) / (1000*60*60*24*7)));

  const contributors = [
    {
      name: "Josh Lad",
      roles: ["Full Website Build", "Local SEO", "Google Ads Strategy & Setup", "Social Content Systems", "Conversion Strategy"],
      image: "/images/profile-photos/Josh.jpg",
      title: "Systems Architect",
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl section-rhythm">
      <div className="mb-12">
        <Link
          to="/work"
          className="cta-btn inline-flex items-center gap-2 bg-[#d4af37] text-gray-900 px-5 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_30px_rgba(212,175,55,.35)] mb-[34px]"
        >
          <ArrowLeft size={16} />
          <span>Back to Our Work</span>
        </Link>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold leading-tight">
            Aksarben<br className="md:hidden" />
            <span className="md:ml-3">Locksmiths</span>
          </h1>
          <div className="logo-wrapper-locksmith">
            <img
              src="/images/company-logos/Aksarben Locksmiths logo.PNG"
              alt="Aksarben Locksmiths Logo"
              className="h-24 sm:h-28 md:h-16 lg:h-20 w-auto object-contain flex-shrink-0"
            />
          </div>
        </div>
        <p className="text-xl text-gray-400">
          Modern web presence for Omaha's trusted locksmith service
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-white uppercase tracking-wider font-semibold mb-2">Total Weeks Live</div>
          <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(212,175,55,0.6)]"><Counter to={weeksLive} duration={1400} /></div>
        </div>
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-white uppercase tracking-wider font-semibold mb-2">Lighthouse Optimization Results</div>
          <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(212,175,55,0.6)]"><Counter to={98} label="/100" duration={1600} /></div>
        </div>
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-white uppercase tracking-wider font-semibold mb-2">Site Loading Speed</div>
          <div className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(212,175,55,0.6)]">&lt;1s</div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden max-h-[480px] md:max-h-[520px] mb-16 border border-white/10 luxury-lazy-container">
        <a
          href="https://aksarbenlocksmiths.com"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/our-work-photos/josh/Aksarbenlocksmiths.png"
            alt="Aksarben Locksmiths Website"
            className="w-full h-full object-cover"
          />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="tile tile-red-glow p-8 bg-red-900/40 border border-red-500/30 luxury-lazy-container transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.75)]">
              <AlertTriangle className="w-[30px] h-[30px] text-red-800 -translate-y-[1px]" strokeWidth={2.5} />
            </div>
            <span>The Problem</span>
          </h2>
          <p className="text-gray-100 leading-relaxed">
            Aksarben Locksmiths had no active website or domain when we stepped in. Their previous marketing provider let the domain lapse after inconsistent performance and support, leaving the business with zero online presence even though their materials still pointed customers to a non-existent site.
          </p>
        </div>

        <div className="tile tile-green-glow p-8 bg-emerald-900/40 border border-emerald-500/30 luxury-lazy-container transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.75)]">
              <Check className="w-7 h-7 text-emerald-700 stroke-[3]" />
            </div>
            <span>The Solution</span>
          </h2>
          <p className="text-gray-100 leading-relaxed">
            We recovered the original domain, rebuilt the entire online presence from scratch, and moved hosting and ownership into the client's control. The new site is a high end, video driven experience with dedicated service pages, a service areas page, and a search page, blog content system, and full SEO and full Looker Studio analytics tracking, plus Google ad game-plan strategy designed to turn visitors into booked emergency calls.
          </p>
        </div>
      </div>

      <div className="tile tile-purple-glow p-8 mb-16 luxury-lazy-container">
        <h2 className="text-2xl font-bold mb-6">Stack & Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 group">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] group-hover:scale-110 group-hover:rotate-3">
              <Sparkles className="text-gray-900" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-[#d4af37]">Development</h3>
              <p className="text-sm text-white">Custom React and Tailwind build with a video hero, responsive layout, and modern branding tailored to the locksmith market.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 group">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] group-hover:scale-110 group-hover:rotate-3">
              <Gauge className="text-gray-900" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-[#00d4ff]">Performance</h3>
              <p className="text-sm text-white">Lighthouse optimised structure with compressed media, GA4 event tracking, and search friendly page architecture.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 group">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] group-hover:scale-110 group-hover:rotate-3">
              <Globe className="text-gray-900" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-[#00ff88]">Hosting</h3>
              <p className="text-sm text-white">Secure Netlify hosting with SSL, CDN backed delivery, and the domain held in the client's name.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tile tile-uv-glow p-8 luxury-lazy-container">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12">
          {/* Left Panel: Project Lead / Contributors */}
          <div className="flex flex-col items-center md:items-start md:border-r md:border-white/10 md:pr-8">
            <h3 className="text-lg font-semibold mb-6 text-[#d4af37]">
              {contributors.length === 1 ? "Project Lead" : "Built By"}
            </h3>

            <div className={`w-full ${contributors.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-0'}`}>
              {contributors.map((contributor, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#d4af37]/40 shadow-[0_0_24px_rgba(212,175,55,0.4)]">
                      <img
                        src={contributor.image}
                        alt={contributor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="font-bold text-white mb-2 text-center w-24">
                    {contributor.name}
                  </h4>
                  <div className="text-sm text-gray-300 mb-3 text-center whitespace-nowrap">
                    {contributor.title}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {contributor.roles.map((role, roleIdx) => (
                      <span
                        key={roleIdx}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 relative impact-container">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/12 via-[#f4d03f]/6 to-[#d4af37]/12 rounded-lg blur-sm"></div>
              <div className="relative border border-[#d4af37]/30 rounded-lg p-4 bg-gradient-to-br from-[#d4af37]/4 to-transparent backdrop-blur-sm">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                  Impact
                </div>
                <p className="text-white text-sm leading-relaxed text-center md:text-left pt-2">
                  Josh fully designed & implemented the complete online web presence growth system powering this project for <span className="font-semibold text-[#f4d03f] whitespace-nowrap">10 calls/conversions daily</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Results */}
          <div className="flex flex-col" ref={resultsRef}>
            <div className="mb-6 relative inline-block">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent relative inline-block pb-3 animate-gradient bg-[length:200%_100%]">
                Results
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 animate-underline-draw"></div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-3 text-white mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>98/100 Google Optimization score across all pages</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>40% increase in mobile conversions within first month</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>Top 3 local search rankings for key locksmith terms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>Client reports significantly more emergency call requests</span>
              </li>
              </ul>

              <div className="text-white text-sm leading-relaxed space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Settings className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>These outcomes are directly attributable to the systems implemented for this project.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Layers className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>The outcome reflects a unified system where paid traffic, content, and local search work together.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Award className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>Website, SEO, content, and paid media systems were fully designed and executed by Alpha Systems.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Shield className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>Domain ownership resides with the client.</span>
                </div>
              </div>

              {/* CTA Button inside tile */}
              <div className="pt-4 flex justify-center md:justify-end">
                <a
                  href="https://aksarbenlocksmiths.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn inline-flex items-center gap-2 bg-[#d4af37] text-gray-900 px-8 py-3 rounded-full font-medium hover:shadow-[0_0_30px_rgba(212,175,55,.35)] w-full md:w-auto max-w-xs md:max-w-none justify-center"
                >
                  Visit Live Site
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
