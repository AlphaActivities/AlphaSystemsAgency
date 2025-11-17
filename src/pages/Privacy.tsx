import React from "react";

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-400 mb-12">Last updated: November 3, 2025</p>

      <div className="tile p-8 space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
          <p>
            At Alpha Systems, we take your privacy seriously. This policy outlines how we collect,
            use, and protect your personal information when you interact with our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including name, email address,
            company information, and project details when you submit inquiries through our contact form.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p>
            Your information is used solely to respond to your inquiries, provide requested services,
            and communicate about ongoing projects. We never sell or share your information with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{" "}
            <a href="mailto:agency.alphasystems@gmail.com" className="text-uv-500 hover:underline">
              info@alphasystemsagency
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
