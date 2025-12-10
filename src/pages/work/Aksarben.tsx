import React from "react";
import Counter from "../../components/ui/Counter";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Code,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

export default function Aksarben() {
  const weeksLive = Math.max(0, Math.floor((Date.now() - new Date('2025-04-01T00:00:00-05:00').getTime()) / (1000*60*60*24*7)));

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <Link
          to="/work"
          className="cta-btn inline-flex items-center gap-2 bg-gold-400 text-gray-900 px-5 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_30px_rgba(245,215,110,.35)] mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Our Work</span>
        </Link>
        <h1 className="text-5xl font-bold mb-4">Aksarben Locksmiths</h1>
        <p className="text-xl text-gray-400">
          Modern web presence for Omaha's trusted locksmith service
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">Weeks Live</div>
          <Counter to={weeksLive} duration={1400} />
        </div>
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">Lighthouse Optimization Results</div>
          <Counter to={98} label="/100" duration={1600} />
        </div>
        <div className="tile tile-uv-glow p-8 text-center">
          <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">Site Loading Speed</div>
          <div className="text-4xl font-semibold tracking-tight">&lt;1s</div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden max-h-[480px] md:max-h-[520px] mb-16 border border-white/10">
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
        <div className="tile tile-red-glow p-8 bg-red-900/40 border border-red-500/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-gray-900" />
            </div>
            <span>The Problem</span>
          </h2>
          <p className="text-gray-100 leading-relaxed">
            Aksarben Locksmiths had no active website or domain when we stepped in. Their previous marketing provider let the domain lapse after inconsistent performance and support, leaving the business with zero online presence even though their materials still pointed customers to a non-existent site.
          </p>
        </div>

        <div className="tile tile-green-glow p-8 bg-emerald-900/40 border border-emerald-500/30">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-gray-900" />
            </div>
            <span>The Solution</span>
          </h2>
          <p className="text-gray-100 leading-relaxed">
            We recovered the original domain, rebuilt the entire online presence from scratch, and moved hosting and ownership into the client's control. The new site is a high end, video driven experience with dedicated service pages, a service areas page, and a search page, blog content system, and full SEO and full Looker Studio analytics tracking, plus Google ad game-plan strategy designed to turn visitors into booked emergency calls.
          </p>
        </div>
      </div>

      <div className="tile p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Stack & Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-uv-500/10">
              <Code className="text-uv-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Development</h3>
              <p className="text-sm text-gray-400">Custom React and Tailwind build with a video hero, responsive layout, and modern branding tailored to the locksmith market.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-uv-500/10">
              <Zap className="text-uv-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Performance</h3>
              <p className="text-sm text-gray-400">Lighthouse optimised structure with compressed media, GA4 event tracking, and search friendly page architecture.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-uv-500/10">
              <Shield className="text-uv-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Hosting</h3>
              <p className="text-sm text-gray-400">Secure Netlify hosting with SSL, CDN backed delivery, and the domain held in the client's name.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tile p-8">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-start gap-3">
            <span className="text-uv-500 mt-1">✓</span>
            <span>98/100 Google PageSpeed score across all pages</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-uv-500 mt-1">✓</span>
            <span>40% increase in mobile conversions within first month</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-uv-500 mt-1">✓</span>
            <span>Top 3 local search rankings for key locksmith terms</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-uv-500 mt-1">✓</span>
            <span>Client reports significantly more emergency call requests</span>
          </li>
        </ul>
      </div>

      <div className="mt-16 text-center">
        <a
          href="https://aksarbenlocksmiths.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn inline-flex items-center gap-2 bg-gold-400 text-gray-900 px-8 py-3 rounded-full font-medium hover:shadow-[0_0_30px_rgba(245,215,110,.35)]"
        >
          Visit Live Site
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
