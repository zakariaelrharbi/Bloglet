import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-navy dark:bg-slate-950 text-white pt-16 pb-8 transition-colors duration-300">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo & Socials */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold font-serif text-white">
              BloGlet<span className="text-brand-amber">.</span>
            </Link>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-serif">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-brand-amber transition-colors text-sm"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-brand-amber transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-brand-amber transition-colors text-sm"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-serif">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-brand-amber transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-400 hover:text-brand-amber transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-400 hover:text-brand-amber transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-700 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2026 BloGlet All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer