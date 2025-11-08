import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectGoal: "",
    budget: "",
    message: "",
    consent: false
  });
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.projectGoal.trim()) newErrors.projectGoal = "Project goal is required";
    if (!formData.budget) newErrors.budget = "Budget range is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.consent) newErrors.consent = "You must agree to be contacted";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    } else {
      setFormState("error");
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl section-rhythm">
      <div>
        <h1 className="text-5xl font-bold">Get In Touch</h1>
        <div className="page-tone-line" />
      </div>
      <p className="text-xl text-gray-400 mb-16 max-w-2xl">
        Ready to start your project? Let's talk about how we can help
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-uv-500/10">
                <Mail className="text-uv-500" size={24} />
              </div>
              <div>
                <div className="font-semibold mb-1">Email</div>
                <div className="text-gray-400">hello@alphasystems.agency</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-uv-500/10">
                <Phone className="text-uv-500" size={24} />
              </div>
              <div>
                <div className="font-semibold mb-1">Phone</div>
                <div className="text-gray-400">+1 (214) 862-7913</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-uv-500/10">
                <MapPin className="text-uv-500" size={24} />
              </div>
              <div>
                <div className="font-semibold mb-1">Location</div>
                <div className="text-gray-400">Remote & On-site Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tile p-8">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:border-uv-500 focus:outline-none transition-colors`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:border-uv-500 focus:outline-none transition-colors`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-2 bg-gray-900 border ${errors.company ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:border-uv-500 focus:outline-none transition-colors`}
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Project Goal *</label>
              <input
                type="text"
                value={formData.projectGoal}
                onChange={(e) => setFormData({ ...formData, projectGoal: e.target.value })}
                className={`w-full px-4 py-2 bg-gray-900 border ${errors.projectGoal ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:border-uv-500 focus:outline-none transition-colors`}
              />
              {errors.projectGoal && <p className="text-red-500 text-xs mt-1">{errors.projectGoal}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Budget Range *</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className={`w-full px-4 py-2 bg-gray-900 border ${errors.budget ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:border-uv-500 focus:outline-none transition-colors`}
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 – $15,000</option>
                <option value="15k-30k">$15,000 – $30,000</option>
                <option value="30k+">$30,000+</option>
              </select>
              {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-2 bg-gray-900 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:border-uv-500 focus:outline-none transition-colors`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-gray-400">
                I agree to be contacted about my project and understand my information will be handled according to the <a href="/privacy" className="text-uv-500 hover:underline">privacy policy</a>.
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}

            {formState === "success" && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-lg text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {formState === "error" && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                Please fix the errors above and try again.
              </div>
            )}

            <button
              type="submit"
              className="cta-btn w-full bg-gold-400 text-gray-900 px-6 py-3 rounded-lg font-medium hover:shadow-[0_0_30px_rgba(245,215,110,.35)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
