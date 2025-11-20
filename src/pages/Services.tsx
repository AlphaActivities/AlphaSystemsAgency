import React from "react";
import { Code, Palette, Zap, Rocket, Shield, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love to interact with"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast load times and optimal Core Web Vitals scores"
    },
    {
      icon: Rocket,
      title: "Launch & Deployment",
      description: "Seamless deployment with CI/CD pipelines and hosting solutions"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security measures and regulatory compliance"
    },
    {
      icon: HeartHandshake,
      title: "Ongoing Support",
      description: "Dedicated maintenance and support to keep your site running smoothly"
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl section-rhythm">
      <div>
        <h1 className="text-5xl font-bold">Our Services</h1>
        <div className="page-tone-line" />
      </div>
      <p className="text-xl text-gray-400 mb-16 mt-6 max-w-2xl">
        End-to-end digital solutions tailored to your business needs
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <div key={i} className="tile p-8">
              <div className="w-12 h-12 rounded-lg bg-uv-500/10 flex items-center justify-center mb-4">
                <Icon className="text-uv-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-20 tile p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Let's discuss your project and how we can help bring your vision to life
        </p>
        <Link
          to="/contact"
          className="cta-btn inline-block bg-gold-400 text-gray-900 px-8 py-3 rounded-lg font-medium hover:shadow-[0_0_30px_rgba(245,215,110,.35)]"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
