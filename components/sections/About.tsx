"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { profile } from "@/lib/data";

const levelColor: Record<string, string> = {
  "daily-driver": "bg-mint text-mint-text",
  frequente: "bg-butter text-butter-text",
  ocasional: "bg-sky text-sky-text",
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".stack-row", {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".stack-block",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="border-t-2 border-ink px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="about-reveal font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
            cat sobre.txt
          </span>
          <h2 className="about-reveal mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {profile.name}
          </h2>
          <p className="about-reveal mt-1 font-mono text-xs text-ink-soft">
            {profile.role} · {profile.location}
          </p>

          <div className="about-reveal mt-8 flex flex-col gap-5">
            {profile.bio.map((p, i) => (
              <p key={i} className="max-w-lg text-base leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>

          <div className="about-reveal mt-10 flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="stack-block lg:col-span-5">
          <div className="rounded-2xl border-2 border-ink bg-ink p-6 font-mono text-[13px] leading-relaxed text-paper/90 shadow-[6px_6px_0_0_var(--lilac)]">
            <div className="mb-4 text-mint">// ferramentas que uso no dia a dia</div>
            {profile.stack.map((item) => (
              <div key={item.label} className="stack-row mb-2 flex items-center justify-between gap-3">
                <span>
                  console.log(<span className="text-butter">&quot;{item.label}&quot;</span>)
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold ${levelColor[item.level]}`}
                >
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
