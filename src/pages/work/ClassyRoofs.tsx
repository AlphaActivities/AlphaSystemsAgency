import React, { useEffect, useRef, useState } from "react";
import Counter from "../../components/ui/Counter";
import ImageModal from "../../components/ui/ImageModal";
import { Link } from "react-router-dom";
import { projects, calculateWeeksLive } from "../../data/projects";
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
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  RotateCcw,
  Cog,
  Activity,
  Rocket,
  Clock,
  Box,
} from "lucide-react";

export default function ClassyRoofs() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ imageSrc: "", caption: "" });

  useEffect(() => {
    const animatedElements = new Set<Element>();
    const resultsAnimated = new Set<Element>();

    const checkScrollComplete = () => {
      if (window.scrollY < 20) {
        setupObserver();
        setupResultsObserver();
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
            const hasCascadeItems = entry.target.querySelector(".luxury-cascade-item");

            if (hasNestedItems) {
              entry.target.classList.add("luxury-visible");

              const items = entry.target.querySelectorAll(".luxury-lazy-item");
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("luxury-visible");
                }, index * 1400);
              });
            } else if (hasCascadeItems) {
              entry.target.classList.add("luxury-visible");

              const cascadeItems = entry.target.querySelectorAll(".luxury-cascade-item");
              cascadeItems.forEach((item) => {
                const delay = parseInt(item.getAttribute("data-delay") || "0", 10);
                setTimeout(() => {
                  item.classList.add("luxury-visible");
                }, delay);
              });
            } else {
              entry.target.classList.add("luxury-visible");
            }

            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      const containers = document.querySelectorAll(".luxury-lazy-container, .luxury-cascade-trigger");
      containers.forEach((container) => {
        observer.observe(container);
      });

      return () => {
        containers.forEach((container) => {
          observer.unobserve(container);
        });
      };
    };

    const setupResultsObserver = () => {
      if (!resultsRef.current) return;

      const resultsObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      };

      const resultsObserverCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !resultsAnimated.has(entry.target)) {
            resultsAnimated.add(entry.target);

            const heading = entry.target.querySelector(".results-cascade-heading");
            if (heading) {
              heading.classList.add("results-visible");
            }

            const items = entry.target.querySelectorAll(".results-cascade-item");
            items.forEach((item) => {
              const delay = parseInt(item.getAttribute("data-delay") || "0", 10);
              setTimeout(() => {
                item.classList.add("results-visible");
              }, delay);
            });

            resultsObserver.unobserve(entry.target);
          }
        });
      };

      const resultsObserver = new IntersectionObserver(resultsObserverCallback, resultsObserverOptions);
      resultsObserver.observe(resultsRef.current);

      return () => {
        if (resultsRef.current) {
          resultsObserver.unobserve(resultsRef.current);
        }
      };
    };

    requestAnimationFrame(checkScrollComplete);
  }, []);

  const weeksLive = calculateWeeksLive(projects['classy-roofs'].kickoffDate);

  const contributors = [
    {
      name: "Abdul",
      roles: ["Growth Strategy", "Funnel Design", "Ad Campaign Setup", "Lead System Optimization"],
      image: "/images/profile-photos/Abdul.PNG",
      title: "Growth Strategist",
      company: "DWK Digital"
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
            Classy<br className="md:hidden" />
            <span className="md:ml-3">Roofs</span>
          </h1>
          <div className="logo-wrapper-locksmith">
            <img
              src="/images/company-logos/Classy Roofs logo.PNG"
              alt="Classy Roofs Logo"
              className="h-32 sm:h-36 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0"
            />
          </div>
        </div>
        <p className="text-xl text-gray-400">
          Fast validation campaign generating 72+ roofing enquiries through Google Ads in Nigeria
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-white uppercase tracking-wider font-semibold mb-2">Total Weeks Live</div>
          <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(212,175,55,0.6)]"><Counter to={weeksLive} duration={1400} /></div>
        </div>
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-white uppercase tracking-wider font-semibold mb-2">Roofing Enquiries</div>
          <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(212,175,55,0.6)]"><Counter to={72} label="+" duration={1400} /></div>
        </div>
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-white uppercase tracking-wider font-semibold mb-2">Avg Cost per Lead</div>
          <div className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(212,175,55,0.6)]">₦489</div>
        </div>
      </div>

      <div className="tile tile-uv-glow rounded-3xl overflow-hidden max-h-[480px] md:max-h-[520px] mb-16 luxury-lazy-container">
        <a
          href="https://classyroofing.classygroups.com/"
          target="_blank"
          rel="noreferrer"
          className="luxury-image-hover"
        >
          <img
            src="/images/our-work-photos/Abdul/classy-roofs.png"
            alt="Classy Roofs Website"
            className="w-full h-full object-cover"
          />
          <div className="luxury-image-hover-btn">
            <span className="luxury-gold-cta inline-flex items-center gap-2 text-gray-900 px-8 py-3 rounded-full font-bold relative z-10">
              Visit Live Site
              <ArrowUpRight size={18} />
            </span>
          </div>
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
          <div className="luxury-cascade-item" data-delay="250">
            <p className="text-gray-100 leading-relaxed">
              Classy Roofs needed to validate demand for their roofing installation services in the Nigerian market. With no existing digital presence or proven lead generation system, they required a fast, cost-effective method to test market response and establish a foundation for scalable growth.
            </p>
          </div>
        </div>

        <div className="tile tile-green-glow p-8 bg-emerald-900/40 border border-emerald-500/30 luxury-lazy-container transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.75)]">
              <Check className="w-7 h-7 text-emerald-700 stroke-[3]" />
            </div>
            <span>The Solution</span>
          </h2>
          <div className="luxury-cascade-item" data-delay="250">
            <p className="text-gray-100 leading-relaxed">
              We deployed a Google Ads campaign focused on roofing installation services. Starting October 10, the 17-day validation phase generated 72+ enquiries through conversion-focused ad campaigns. Enquiries came primarily through WhatsApp, with additional phone calls. Enquiries included a mix of serious homeowners and active buyers, with several converting into paying customers. The validation phase is now complete, transitioning into scaling.
            </p>
          </div>
        </div>
      </div>

      <div className="tile tile-timeline-glow p-8 mb-16 luxury-lazy-container transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Clock className="text-[#d4af37]" size={28} strokeWidth={2} />
          Project Timeline
        </h2>
        <div className="page-tone-line-soft mb-8" />
        <div className="space-y-8">
          <div className="luxury-cascade-item group" data-delay="400">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] flex-shrink-0 ring-2 ring-[#d4af37]/30 ring-offset-2 ring-offset-gray-900 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] group-hover:scale-110 group-hover:rotate-3">
                <Target className="text-gray-900" size={20} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#d4af37] mb-2">Validation Phase Complete (October 10 - October 27)</h3>
                <p className="text-sm text-white">17-day fast-track validation campaign launched October 10 to test market demand, audience response, and lead quality for roofing installation services. Validation completed successfully, now transitioning into scaling.</p>
              </div>
            </div>
          </div>

          <div className="luxury-cascade-item group" data-delay="800">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)] flex-shrink-0 ring-2 ring-[#00ff88]/30 ring-offset-2 ring-offset-gray-900 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] group-hover:scale-110 group-hover:rotate-3">
                <Rocket className="text-gray-900" size={20} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#00ff88] mb-2">Transitioning to Scale</h3>
                <p className="text-sm text-white">With proven demand and cost-effective lead generation validated, the campaign is being prepared for scaled deployment across Nigeria.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tile tile-purple-glow p-8 mb-16 luxury-lazy-container transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Box className="text-[#d4af37]" size={28} strokeWidth={2} />
          Stack & Campaign Structure
        </h2>
        <div className="page-tone-line-soft mb-8" />

        <div className="mb-8">
          <h3 className="font-semibold text-lg text-[#d4af37] mb-4">Technology Stack</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="luxury-cascade-item flex items-start gap-3" data-delay="400">
              <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Google Ads</span>
                <p className="text-sm text-gray-300">Active campaign, transitioning to scaling phase</p>
              </div>
            </div>
            <div className="luxury-cascade-item flex items-start gap-3" data-delay="600">
              <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Google Analytics</span>
                <p className="text-sm text-gray-300">Connected for performance tracking</p>
              </div>
            </div>
            <div className="luxury-cascade-item flex items-start gap-3" data-delay="800">
              <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Conversion-Focused Setup</span>
                <p className="text-sm text-gray-300">WhatsApp and phone lead capture system</p>
              </div>
            </div>
            <div className="luxury-cascade-item flex items-start gap-3" data-delay="1000">
              <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Validation-Driven Launch</span>
                <p className="text-sm text-gray-300">Fast-track testing strategy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-tone-line-soft mb-8" />

        <h3 className="font-semibold text-lg text-[#d4af37] mb-4">Campaign Approach</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 group">
            <div className="luxury-cascade-item flex items-start gap-4" data-delay="1200">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] group-hover:scale-110 group-hover:rotate-3">
                <Target className="text-gray-900" size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-semibold mb-1 text-[#d4af37]">Targeting</h3>
            </div>
            <div className="luxury-cascade-item" data-delay="1400">
              <p className="text-sm text-white">Nigeria-wide targeting focused on property owners, construction professionals, and building renovation market segments.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 group">
            <div className="luxury-cascade-item flex items-start gap-4" data-delay="1600">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] group-hover:scale-110 group-hover:rotate-3">
                <BarChart3 className="text-gray-900" size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-semibold mb-1 text-[#00d4ff]">Conversion System</h3>
            </div>
            <div className="luxury-cascade-item" data-delay="1800">
              <p className="text-sm text-white">Primarily WhatsApp enquiries with additional phone calls. Lead forms optimized for mobile with qualification questions.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 group">
            <div className="luxury-cascade-item flex items-start gap-4" data-delay="2000">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] group-hover:scale-110 group-hover:rotate-3">
                <Zap className="text-gray-900" size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-semibold mb-1 text-[#00ff88]">Traffic Source</h3>
            </div>
            <div className="luxury-cascade-item" data-delay="2200">
              <p className="text-sm text-white">All 72+ enquiries generated exclusively through Google Ads during the validation phase.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tile tile-uv-glow rounded-3xl overflow-hidden max-h-[480px] md:max-h-[520px] mb-16 luxury-lazy-container">
        <div
          className="luxury-image-hover"
          role="button"
          tabIndex={0}
          onClick={() => {
            setModalContent({
              imageSrc: "/images/our-work-photos/Abdul/classy-roofs-income-report-oct-9th-to-oct-22nd.jpeg",
              caption: "GA4 Revenue Overview, 17 Days Report, Classy Roofs"
            });
            setModalOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setModalContent({
                imageSrc: "/images/our-work-photos/Abdul/classy-roofs-income-report-oct-9th-to-oct-22nd.jpeg",
                caption: "GA4 Revenue Overview, 17 Days Report, Classy Roofs"
              });
              setModalOpen(true);
            }
          }}
        >
          <img
            src="/images/our-work-photos/Abdul/classy-roofs-income-report-oct-9th-to-oct-22nd.jpeg"
            alt="GA4 Revenue Overview - Classy Roofs"
            className="w-full h-full object-cover"
          />
          <div className="luxury-image-hover-btn">
            <span className="luxury-gold-cta inline-flex items-center gap-2 text-gray-900 px-8 py-3 rounded-full font-bold relative z-10">
              View Revenue Overview
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </div>

      <div
        style={{ overflow: 'visible' }}
        className="tile tile-outcome-glow p-8 mb-16 transition-transform duration-300 hover:scale-105 max-w-3xl mx-auto relative luxury-cascade-trigger"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full text-sm font-bold text-gray-900 uppercase tracking-widest shadow-[0_0_28px_rgba(212,175,55,0.6)] whitespace-nowrap min-w-max text-center">
          Verified Outcome
        </div>
        <div className="relative w-full flex justify-center pt-2 mb-6 py-6">
          <div className="relative inline-flex justify-center h-12 py-8 mb-8">
            <img
              src="/images/extras/green-ribbon.png"
              alt="Client Outcome"
              className="h-[220px] w-auto select-none pointer-events-none relative z-10 -translate-y-[86px]"
              loading="eager"
              decoding="sync"
              style={{
                transformOrigin: "center",
                willChange: "auto",
                backfaceVisibility: "hidden"
              }}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="luxury-cascade-item" data-delay="400">
            <p className="text-white leading-relaxed">
              72+ roofing enquiries generated through Google Ads in 17 days starting October 10. Enquiries included a mix of serious homeowners and active buyers, with several converting into paying customers.
            </p>
          </div>
          <div className="relative w-full max-w-md mx-auto my-4 h-[3px]">
            <div className="absolute inset-0 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          </div>
          <div className="luxury-cascade-item" data-delay="800">
            <p className="text-gray-300 text-sm leading-relaxed">
              The validation phase demonstrated clear market demand at ₦489 per enquiry, establishing a foundation for scaled roofing installation campaigns across Nigeria. Validation phase completed, transitioning into scaling.
            </p>
          </div>
        </div>
      </div>

      <div className="tile tile-uv-glow p-8 luxury-lazy-container transition-transform duration-300 hover:scale-105">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start md:border-r md:border-white/10 md:pr-8">
            <h3 className="text-lg font-semibold mb-6 text-[#d4af37]">
              Attribution
            </h3>

            <div className="w-full space-y-6">
              {contributors.map((contributor, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div className="luxury-cascade-item relative mb-4" data-delay="300">
                    <div className="profile-photo-hover w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#d4af37]/40 shadow-[0_0_24px_rgba(212,175,55,0.4)]">
                      <img
                        src={contributor.image}
                        alt={contributor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="luxury-cascade-item" data-delay="300">
                    <h4 className="font-bold text-white mb-1 text-center w-24">
                      {contributor.name}
                    </h4>
                    <div className="text-sm text-gray-300 mb-1 text-center whitespace-nowrap">
                      {contributor.title}
                    </div>
                    <div className="text-xs text-gray-400 mb-3 text-center whitespace-nowrap">
                      {contributor.company}
                    </div>
                  </div>
                  <div className="luxury-cascade-item flex flex-wrap gap-2 justify-start" data-delay="600">
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

              <div className="luxury-cascade-item mt-6 relative impact-container" data-delay="900">
                <div className="absolute inset-0 rounded-lg"></div>
                <div className="relative border border-[#d4af37]/30 rounded-lg p-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                    Impact
                  </div>
                  <p className="text-white text-sm leading-relaxed text-center md:text-left pt-2">
                    Abdul designed & executed the Google Ads campaign that generated <span className="font-semibold text-[#f4d03f] whitespace-nowrap">72+ roofing enquiries in 17 days</span>, with several converting into paying customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col" ref={resultsRef}>
            <div className="mb-6 relative inline-block results-cascade-heading">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent relative inline-block pb-3 animate-gradient bg-[length:200%_100%]">
                Results
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 animate-underline-draw"></div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-3 text-white mb-8">
              <li className="flex items-start gap-3 results-cascade-item" data-delay="600">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>72+ enquiries generated through Google Ads in 17-day validation phase</span>
              </li>
              <li className="flex items-start gap-3 results-cascade-item" data-delay="1300">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>Primarily WhatsApp enquiries with additional phone calls</span>
              </li>
              <li className="flex items-start gap-3 results-cascade-item" data-delay="2000">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>Enquiries included a mix of serious homeowners and active buyers</span>
              </li>
              <li className="flex items-start gap-3 results-cascade-item" data-delay="2700">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>Several enquiries converted into paying customers</span>
              </li>
              <li className="flex items-start gap-3 results-cascade-item" data-delay="3400">
                <span className="text-green-500 text-3xl font-bold leading-none">✓</span>
                <span>Validation phase completed, transitioning into scaling</span>
              </li>
              </ul>

              <div className="text-white text-sm leading-relaxed space-y-3 mb-6">
                <div className="flex items-start gap-3 results-cascade-item" data-delay="4100">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Settings className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>These outcomes are directly attributable to the growth systems implemented for this project.</span>
                </div>
                <div className="flex items-start gap-3 results-cascade-item" data-delay="4800">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Layers className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>Google Ads campaign strategy, setup, and execution led by Abdul at DWK Digital.</span>
                </div>
                <div className="flex items-start gap-3 results-cascade-item" data-delay="5500">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)] border border-[#d4af37]/30">
                    <Award className="text-[#d4af37]" size={14} strokeWidth={2.5} />
                  </div>
                  <span>Case study system, UX design, and presentation developed by Alpha Systems Agency.</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center md:justify-end">
                <a
                  href="https://classyroofing.classygroups.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxury-gold-cta inline-flex items-center gap-2 text-gray-900 px-8 py-3 rounded-full font-bold hover:shadow-[0_0_30px_rgba(212,175,55,.35)] w-full md:w-auto max-w-xs md:max-w-none justify-center relative z-10"
                >
                  Visit Live Site
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={modalContent.imageSrc}
        alt="Campaign Performance Overview"
        caption={modalContent.caption}
      />
    </div>
  );
}
