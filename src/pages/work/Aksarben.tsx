import React from "react";
import Counter from "../../components/ui/Counter";
import { ExternalLink, Code, Zap, Shield } from "lucide-react";

export default function Aksarben() {
  const weeksLive = Math.max(0, Math.floor((Date.now() - new Date('2025-04-01T00:00:00-05:00').getTime()) / (1000*60*60*24*7)));

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <a href="/work" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-6">
          ← Back to Work
        </a>
        <h1 className="text-5xl font-bold mb-4">Aksarben Locksmiths</h1>
        <p className="text-xl text-gray-400">
          Modern web presence for Omaha's trusted locksmith service
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="tile p-8 text-center ">
          <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Weeks Live</div>
          <Counter to={weeksLive} duration={1400} />
        </div>
        <div className="tile p-8 text-center ">
          <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Page Speed</div>
          <Counter to={98} label="/100" duration={1600} />
        </div>
        <div className="tile p-8 text-center ">
          <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Load Time</div>
          <div className="text-4xl font-semibold tracking-tight">&lt;1s</div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden max-h-[480px] md:max-h-[520px] mb-16 border border-white/10">
        <img
          src="/images/our-work-photos/josh/Aksarbenlocksmiths.png"
          alt="Aksarben Locksmiths Website"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="tile p-8">
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-gray-400 leading-relaxed">
            Aksarben Locksmiths needed a modern online presence that reflected their professionalism
            and made it easy for customers to request emergency locksmith services. Their old site
            was outdated, slow, and not mobile-friendly.
          </p>
        </div>

        <div className="tile p-8">
          <h2 className="text-2xl font-bold mb-4">The Solution</h2>
          <p className="text-gray-400 leading-relaxed">
            We built a fast, responsive website with a prominent call-to-action for emergency calls,
            clear service descriptions, and optimized SEO for local searches. The result is a
            professional site that converts visitors into customers.
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
              <p className="text-sm text-gray-400">React, Vite, Tailwind CSS</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-uv-500/10">
              <Zap className="text-uv-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Performance</h3>
              <p className="text-sm text-gray-400">Optimized images and asset delivery</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-uv-500/10">
              <Shield className="text-uv-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Hosting</h3>
              <p className="text-sm text-gray-400">Secure, fast CDN delivery</p>
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
          className="cta-btn inline-flex items-center gap-2 bg-gold-400 text-gray-900 px-8 py-3 rounded-lg font-medium hover:shadow-[0_0_30px_rgba(245,215,110,.35)]"
        >
          Visit Live Site
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}
