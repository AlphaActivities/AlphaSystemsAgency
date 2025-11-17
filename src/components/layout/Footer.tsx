import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="tile p-6">
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/work" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
            </ul>
          </div>

          <div className="tile p-6">
            <h3 className="font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div className="tile p-6">
            <h3 className="font-semibold mb-4 text-lg">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:agency.alphasystems@gmail.com" className="hover:text-uv-500 transition-colors">info@alphasystemsagency</a></li>
              <li><a href="tel:+12148627913" className="hover:text-uv-500 transition-colors">+1 (214) 862-7913</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Alpha Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
