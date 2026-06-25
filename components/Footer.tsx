"use client";

import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink px-6 py-8 sm:px-10 lg:px-16">
      <div className="flex flex-col items-start justify-between gap-3 font-mono text-[11px] text-ink-soft sm:flex-row sm:items-center">
        <span>
          © {year} {profile.name} · exit code 0
        </span>
        <a href="#top" className="transition-colors hover:text-ink">
          cd ~ ↑
        </a>
      </div>
    </footer>
  );
}
