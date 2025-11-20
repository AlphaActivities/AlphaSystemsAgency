import React from "react";
import Counter from "../components/ui/Counter";
import LogoCarousel from "../components/blocks/LogoCarousel";
import { getVerifiedLaunchCount } from "../data/clients";
import { Star, Zap, Rocket } from "lucide-react";
import HeroSingularityVortex from "../components/visual/HeroSingularityVortex";

export default function Home() {
  const launchCount = getVerifiedLaunchCount();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      <section id="hero" className="text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-8 sm:pb-10 md:pb-12 relative isolate overflow-visible scroll-mt-24">
        <div className="hero-uv-rim" aria-hidden="true" style={{ ['--rim-opacity' as any]: 0.15 }} />
        <div className="overflow-visible -mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36">
          <h1
            id="heroTitle"
            data-no-typewriter
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.18] sm:leading-[1.16] md:leading-[1.14] lg:leading-[1.12] pb-1"
          >
            <span className="inline-block mb-1 md:mb-2 text-[var(--neutral-50,#fafafa)]">
              Premium Digital
            </span>
            {' '}
            <span className="hero-gold-beam bg-gradient-to-r from-[var(--gold-400)] to-[var(--gold-600)] bg-clip-text text-transparent inline-block">
              Growth Engines
            </span>
          </h1>
        </div>

        <HeroSingularityVortex />

        <p className="text-xl md:text-2xl text-white mt-[220px] mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto">
          We build high-performance websites and growth systems for businesses ready to scale.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-0 sm:mt-0 md:mt-1 lg:mt-1 mb-20">
          <div className="tile tile-uv-glow px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-gold-400" size={24} />
              <span className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction score</span>
            </div>
            <div className="text-4xl font-semibold flex items-baseline justify-center">
              <Counter to={100} duration={4000} />
              <span>%</span>
            </div>
          </div>

          <div className="tile tile-uv-glow px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-uv-500" size={24} />
              <span className="text-sm text-gray-400 uppercase tracking-wider">Avg project launch</span>
            </div>
            <div className="text-4xl font-semibold flex items-baseline gap-2">
              <span>Under</span>
              <Counter to={14} duration={5000} />
              <span>days</span>
            </div>
          </div>

          <div className="tile tile-uv-glow px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="text-gold-400" size={24} />
              <span className="text-sm text-gray-400 uppercase tracking-wider">Verified Launches</span>
            </div>
            <Counter to={launchCount} duration={8000} />
          </div>
        </div>
      </section>

      <section className="section-rhythm">
        <h2 className="text-3xl font-bold text-center mb-8">Trusted By Leading Brands</h2>
        <LogoCarousel
          logos={[
            { src: "/images/company-logos/Aksarben Locksmiths logo.PNG", alt: "Aksarben Locksmiths" },
            { src: "/images/company-logos/Caliber Luxury Rentals logo.PNG", alt: "Caliber Luxury Rentals", scale: 1.2 },
            { src: "/images/company-logos/Centre Dentaire logo.PNG", alt: "Centre Dentaire" },
            { src: "/images/company-logos/Classy Roofs logo.PNG", alt: "Classy Roofs" },
            { src: "/images/company-logos/Culture Barbershop logo.PNG", alt: "Culture Barbershop", scale: 1.2 },
            { src: "/images/company-logos/Elite Barbershop logo.PNG", alt: "Elite Barbershop" },
            { src: "/images/company-logos/Remax logo.PNG", alt: "Remax" },
            { src: "/images/company-logos/Rocket Baller logo.PNG", alt: "Rocket Baller", scale: 1.2 },
            { src: "/images/company-logos/Triple W Rentals logo.PNG", alt: "Triple W Rentals", scale: 0.8 }
          ]}
        />
      </section>

      <section className="section-rhythm">
        <h2 className="text-3xl font-bold text-center mb-12">Client Feedback</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Mike Smith", company: "Aksarben Locksmiths", text: "Outstanding work! The site is fast, beautiful, and exactly what we needed." },
            { name: "Sarah Johnson", company: "Tech Solutions Inc", text: "Professional team that delivered beyond our expectations. Highly recommended!" }
          ].map((review, i) => (
            <div key={i} className="tile tile-uv-glow p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-uv-500 to-uv-700 flex items-center justify-center">
                  <span className="text-white font-semibold">{review.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-gray-400">{review.company}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-gold-400 text-gold-400" />)}
              </div>
              <p className="text-gray-300">{review.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
