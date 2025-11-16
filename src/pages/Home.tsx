import React from "react";
import Counter from "../components/ui/Counter";
import LogoCarousel from "../components/blocks/LogoCarousel";
import { getVerifiedLaunchCount } from "../data/clients";
import { Star, Zap, Rocket } from "lucide-react";

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
        <p className="text-xl md:text-2xl text-white mt-[220px] mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto">
          We build high-performance websites and growth systems for businesses ready to scale.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-0 sm:mt-0 md:mt-1 lg:mt-1 mb-20">
          <div className="tile tile-uv-glow px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-gold-400" size={24} />
              <span className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction score</span>
            </div>
            <div className="text-4xl font-semibold">100%</div>
          </div>

          <div className="tile tile-uv-glow px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-uv-500" size={24} />
              <span className="text-sm text-gray-400 uppercase tracking-wider">Avg project launch</span>
            </div>
            <div className="text-4xl font-semibold flex items-baseline gap-2">
              <span>Under</span>
              <Counter to={14} duration={2000} />
              <span>days</span>
            </div>
          </div>

          <div className="tile tile-uv-glow px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="text-gold-400" size={24} />
              <span className="text-sm text-gray-400 uppercase tracking-wider">Verified Launches</span>
            </div>
            <Counter to={launchCount} duration={2000} />
          </div>
        </div>
      </section>

      <section className="section-rhythm">
        <h2 className="text-3xl font-bold text-center mb-8">Trusted By Leading Brands</h2>
        <LogoCarousel logos={[
          {src: "https://via.placeholder.com/150x40/6f59ff/ffffff?text=Aksarben", alt: "Aksarben Locksmiths"},
          {src: "https://via.placeholder.com/150x40/6f59ff/ffffff?text=TechSolutions", alt: "Tech Solutions"},
          {src: "https://via.placeholder.com/150x40/6f59ff/ffffff?text=Digital", alt: "Digital Ventures"}
        ]} />
      </section>

      <section className="section-rhythm">
        <h2 className="text-3xl font-bold text-center mb-12">Client Feedback</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "John Smith", company: "Aksarben Locksmiths", text: "Outstanding work! The site is fast, beautiful, and exactly what we needed." },
            { name: "Sarah Johnson", company: "Tech Solutions Inc", text: "Professional team that delivered beyond our expectations. Highly recommended!" }
          ].map((review, i) => (
            <div key={i} className="tile p-8">
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
      </section>   // FIN DE TON HERO

{/* 🔥 SECTION POUR GOOGLE ADS – TEXTE SEO CLAIR */}
<section className="px-6 py-12 max-w-4xl mx-auto text-white">
  <h1 className="text-3xl md:text-4xl font-bold mb-4">
    RV Rentals & Golf Cart Rentals in Texas
  </h1>
  <p className="text-lg text-gray-300">
    Triple W Rentals offers affordable RV rentals and golf cart rentals across East Texas.
    Whether you need a travel trailer for a weekend getaway or a golf cart delivered to your 
    location, we provide fast service, clean equipment, and reliable delivery in Tyler, Jacksonville, 
    Whitehouse, Bullard, and surrounding areas. We focus on high-quality customer service, fast 
    delivery, and simple booking for your next outdoor adventure.
  </p>
</section>

    </div>
  );
}
