import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Top footer content */}
        <div className="grid gap-8 mb-10 md:grid-cols-3">
          {/* Company */}
          <div className="tile tile-uv-glow p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/work"
                  className="transition-colors hover:text-white"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="transition-colors hover:text-white"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="tile tile-uv-glow p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/insights"
                  className="transition-colors hover:text-white"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="tile tile-uv-glow p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:agency.alphasystems@gmail.com"
                  className="transition-colors hover:text-uv-500"
                >
                  info@alphasystemsagency
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
        <div className="border-t border-white/5 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Alpha Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
