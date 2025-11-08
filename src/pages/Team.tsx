import React from "react";

type Member = {
  initials: string;
  name: string;
  role: string;
  blurb: string;
  tags: string[];
};

const members: Member[] = [
  {
    initials: "J",
    name: "Josh",
    role: "Founder and System Architect",
    blurb:
      "Josh leads strategy, architecture, and implementation, focusing on fast builds, clean analytics, and measurable growth.",
    tags: [
      "React",
      "TypeScript",
      "System Design",
      "Analytics",
      "Attribution",
      "CRO",
      "Automation",
      "GA4",
    ],
  },
  {
    initials: "H",
    name: "Heber",
    role: "Design and Meta Specialist",
    blurb:
      "Heber shapes the visual system, brand consistency, and paid social performance across Meta and creative iterations.",
    tags: [
      "UI and UX",
      "Figma",
      "Meta Ads",
      "Visual Systems",
      "Brand Strategy",
      "Content",
      "Motion",
      "Prototyping",
    ],
  },
  {
    initials: "J",
    name: "Juan",
    role: "Ads and Data Strategist",
    blurb:
      "Juan drives Google Ads strategy, telemetry, and budget control with operator-style measurement and clear reporting.",
    tags: [
      "Google Ads",
      "Attribution",
      "Keyword Strategy",
      "Landing Pages",
      "GTM",
      "GA4",
      "Dashboards",
      "Experimentation",
    ],
  },
];

export default function Team() {
  return (
    <section className="relative min-h-screen px-6 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Three specialized minds working as one
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
                <div className="h-12 w-12 shrink-0 rounded-full bg-[var(--violet-600,_#7a2cff)] text-white grid place-items-center text-lg font-bold">
                  {m.initials}
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
