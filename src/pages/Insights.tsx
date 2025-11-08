import React from "react";
import { Calendar, User } from "lucide-react";

export default function Insights() {
  const posts = [
    { title: "Building High-Performance Web Apps", author: "Tech Team", date: "2025-10-28", excerpt: "Learn the strategies we use to deliver lightning-fast web experiences" },
    { title: "The Future of Web Design", author: "Design Team", date: "2025-10-20", excerpt: "Exploring emerging trends in digital design and user experience" },
    { title: "Optimizing for Core Web Vitals", author: "Tech Team", date: "2025-10-15", excerpt: "A deep dive into performance metrics that matter" }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl section-rhythm">
      <div>
        <h1 className="text-5xl font-bold">Insights</h1>
        <div className="page-tone-line" />
      </div>
      <p className="text-xl text-gray-400 mb-16 mt-6 max-w-2xl">
        Thoughts, ideas, and best practices from our team
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <article key={i} className="tile p-6 ">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                {post.author}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
            <p className="text-gray-400">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
