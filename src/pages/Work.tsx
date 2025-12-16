import React from "react";
import { Link } from "react-router-dom";
import Counter from "../components/ui/Counter";

export default function Work() {
  const projects = [
    {
      title: "Aksarben Locksmiths Client Market Growth Case Study",
      client: "Located in Omaha, NE",
      description: "High-conversion website, Google Ads, and Blog redesign for a local locksmith business",
      image: "/images/our-work-photos/josh/Aksarbenlocksmiths.png",
      launchDate: "2025-04-03",
      slug: "/work/aksarben-locksmiths"
    },
    {
      title: "Coming soon",
      client: "Tech Startup",
      description: "Coming soon",
      image: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2026-01-01"
    },
    {
      title: "Coming soon",
      client: "Agency",
      description: "Coming soon",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2026-01-01"
    }
  ];

  const calculateWeeksLive = (launchDate: string) => {
    return Math.max(0, Math.floor((Date.now() - new Date(launchDate).getTime()) / (1000*60*60*24*7)));
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl section-rhythm">
      <div>
        <h1 className="text-5xl font-bold">Our Work</h1>
        <div className="page-tone-line" />
      </div>
      <p className="text-xl text-white mb-16 mt-6 max-w-2xl">
        Explore our portfolio of high-performance web applications built for modern businesses
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <Link
            key={i}
            to={project.slug}
            className="tile tile-uv-glow overflow-hidden group block"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[#d4af37]">{project.client}</div>
                <div className="text-xs text-[#d4af37] flex items-center gap-1">
                  <Counter to={calculateWeeksLive(project.launchDate)} duration={1200} />
                  <span>wks live</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                {project.title}
              </h3>
              <p className="text-white text-sm [text-shadow:_2px_2px_6px_rgb(0_0_0_/_90%)]">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
