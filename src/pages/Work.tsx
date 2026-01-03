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
      title: "Classy Roofs Market Growth Case Study",
      client: "Classy Roofs",
      description: "Roofing lead generation and installation-focused growth system validated through a 17-day test campaign.",
      image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2024-12-01",
      slug: "/work/classy-roofs"
    },
    {
      title: "Triple W Rentals Case Study",
      client: "Triple W Rentals",
      description: "Complete digital presence and rental property management platform",
      image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-01",
      slug: "/work/triple-w-rentals"
    },
    {
      title: "Rocket Baller Case Study",
      client: "Rocket Baller",
      description: "Sports brand website and e-commerce platform",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-01",
      slug: "/work/rocket-baller"
    },
    {
      title: "Remax Case Study",
      client: "Remax",
      description: "Real estate website with property listings and agent profiles",
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-01",
      slug: "/work/remax"
    },
    {
      title: "Centre Dentaire Case Study",
      client: "Centre Dentaire",
      description: "Modern dental practice website with appointment booking",
      image: "https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-01",
      slug: "/work/centre-dentaire"
    },
    {
      title: "Elite Barbershop Case Study",
      client: "Elite Barbershop",
      description: "Premium barbershop website with online booking system",
      image: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-01",
      slug: "/work/elite-barbershop"
    },
    {
      title: "Culture Barbershop Case Study",
      client: "Culture Barbershop",
      description: "Modern barbershop brand and digital booking platform",
      image: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-01",
      slug: "/work/culture-barbershop"
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
                  <Counter to={calculateWeeksLive(project.launchDate)} duration={3000} />
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
