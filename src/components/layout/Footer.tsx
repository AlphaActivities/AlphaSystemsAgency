import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 footer-shell">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Top footer content */}
        <div className="grid gap-8 mb-10 md:grid-cols-4">
          {/* Brand tile */}
          <div className="tile tile-uv-glow p-6 flex flex-col items-center text-center">
            <img
              src="/images/Alpha-Logo.PNG"
              alt="Alpha Systems"
              className="mb-4 h-9 w-9 rounded-sm brand-logo-glow"
            />
            <span
              className="brand-wrap text-white font-semibold text-[17px] sm:text-[18px]"
              style={{ fontKerning: "normal" }}
            >
              {Array.from("Alpha Systems").map((ch, i) => {
                if (ch === " ") return " ";
                return (
                  <span
                    key={i}
                    className="brand-letter-v9 text-white"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            <p className="mt-3 text-sm text-white/90">
              <span className="block">Your unified expert team</span>
              <span className="block">elevating your customer growth.</span>
            </p>
          </div>

          {/* About Us */}
          <div className="tile tile-uv-glow p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">About Us</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link
                  to="/work"
                  className="transition-colors hover:text-uv-500"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-uv-500"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="transition-colors hover:text-uv-500"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="tile tile-uv-glow p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link
                  to="/insights"
                  className="transition-colors hover:text-uv-500"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-uv-500"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-uv-500"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="tile tile-uv-glow p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Connect</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a
                  href="mailto:info@alphasystemsagency.com"
                  className="transition-colors hover:text-uv-500"
                >
                  info@alphasystemsagency.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+12148627913"
                  className="transition-colors hover:text-uv-500"
                >
                  (214) 862-7913
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/5 pt-6 text-center text-sm text-white">
          <p>&copy; 2025 Alpha Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
