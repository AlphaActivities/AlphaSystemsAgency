import React from "react";
import { ExternalLink } from "lucide-react";
import Counter from "../components/ui/Counter";

export default function Work() {
  const projects = [
    {
      title: "E-Commerce Platform",
      client: "Retail Co",
      description: "Full-stack solution with payment integration",
      image: "/images/our-work-photos/josh/Aksarbenlocksmiths.png",
      launchDate: "2025-02-15"
    },
    {
      title: "SaaS Dashboard",
      client: "Tech Startup",
      description: "Real-time analytics and data visualization",
      image: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2025-01-20"
    },
    {
      title: "Marketing Website",
      client: "Agency",
      description: "SEO-optimized with modern animations",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      launchDate: "2024-12-10"
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
      <p className="text-xl text-gray-400 mb-16 mt-6 max-w-2xl">
        Explore our portfolio of high-performance web applications built for modern businesses
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div key={i} className="tile overflow-hidden group">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-uv-500">{project.client}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Counter to={calculateWeeksLive(project.launchDate)} duration={1200} />
                  <span>wks live</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                {project.title}
                <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
