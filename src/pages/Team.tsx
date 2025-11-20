import React from "react";

type Member = {
  initials: string;
  name: string;
  role: string;
  blurb: string;
  tags: string[];
  photo?: string;
};

const members: Member[] = [
  {
    initials: "J",
    name: "Josh",
    role: "Founder & Systems Architect",
    photo: "/images/profile-photos/Josh.jpg",
    blurb:
      "Josh represents high-end, $50,000+ digital experiences, transforming complex architecture and GA4 insights into sleek, conversion-focused systems. He represents the agency's technical vision, ensuring every build is as fast and flawless as it is future-proof.",
    tags: [
      "React",
      "TypeScript",
      "System Design",
      "GA4",
      "Attribution",
      "CRO",
      "Automation",
      "Performance Architecture",
    ],
  },
  {
    initials: "H",
    name: "Heber",
    role: "Design and Meta Specialist",
    blurb:
      "Heber shapes the agency's visual and brand systems, blending UI/UX excellence with Meta ad performance. His expertise ensures every project is visually stunning, brand-consistent, and performance-driven.",
    tags: [
      "UI and UX",
      "Figma",
      "Meta Ads",
      "Brand Strategy",
      "Visual Systems",
      "Motion",
      "Prototyping",
      "Content Design",
    ],
  },
  {
    initials: "J",
    name: "Juan",
    role: "Ads and Data Strategist",
    blurb:
      "Juan drives Google Ads mastery and client systems into seamless, data-driven strategies. He bridges ad expertise with practical client insights, ensuring every campaign is measured, client-friendly, and results-driven.",
    tags: [
      "Google Ads",
      "Keyword Strategy",
      "Attribution",
      "Landing Pages",
      "GTM",
      "GA4",
      "Dashboards",
      "Experimentation",
    ],
  },
  {
    initials: "A",
    name: "Abdul",
    role: "Conversion & Creative Strategist",
    blurb:
      "Abdul specializes in conversion-driven messaging, funnel architecture, and offer positioning. He bridges creative strategy with performance outcomes, crafting compelling assets that raise engagement and accelerate revenue growth.",
    tags: [
      "Direct Response Copywriting",
      "Funnel Building",
      "Offer Positioning",
      "Meta Ads",
      "Google Ads",
      "Landing Pages",
      "Content Strategy",
      "Lead Magnet Creation",
    ],
  },
];

export default function Team() {
  return (
    <section className="relative min-h-screen px-6 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Specialized minds working as one
          </h1>
          <p className="mt-3 text-[var(--neutral-300)] max-w-3xl">
            Clear roles, shared standards, and measurable outcomes on every engagement.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <article
              key={m.name}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[var(--gold-500)]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-full bg-[var(--violet-600,_#7a2cff)] text-white grid place-items-center text-lg font-bold overflow-hidden">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[center_30%]" />
                  ) : (
                    m.initials
                  )}
                </div>
                <div>
                  <div className="text-white font-semibold">{m.name}</div>
                  <div className="text-sm text-[var(--neutral-400)]">{m.role}</div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--neutral-300)]">
                {m.blurb}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <li
                    key={t}
                    className="text-xs rounded-full border border-white/10 text-[var(--neutral-300)] px-3 py-1 bg-black/20"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
