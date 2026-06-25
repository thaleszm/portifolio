"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/data";

export default function Navbar() {
  const [activePath, setActivePath] = useState("~");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href)) as HTMLElement[];

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "~";
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = nav[i].label;
        }
      });
      setActivePath(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className="font-mono text-xs sm:text-sm text-ink-soft"
        >
          <span className="text-ink-soft/60">/usr/</span>
          <span className="text-ink-soft/60">{profile.handle.replace("@", "")}</span>
          <span className="text-ink-soft/60">/</span>
          <span className="text-ink font-medium">{activePath}</span>
        </a>

        <nav className="hidden items-center gap-7 sm:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="rounded-full border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-paper transition-transform hover:-translate-y-0.5"
          >
            disponível ●
          </a>
        </nav>
      </div>
    </header>
  );
}
