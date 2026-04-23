"use client";
import ThemeToggle from "./ThemeToggle";

const links = ["About", "Projects", "Skills", "Research", "Contact"];

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-base bg-navy-950/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold tracking-tight text-sm text-white">Ryan Martin</span>
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex gap-6 text-sm text-muted">
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
