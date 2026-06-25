"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { profile } from "@/lib/data";
import Terminal from "@/components/Terminal";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".hero-shape", { opacity: 0, scale: 0.6 });
      gsap.set(".hero-word", { yPercent: 110, opacity: 0 });
      gsap.set(".hero-sub", { opacity: 0, y: 16 });
      gsap.set(".hero-terminal", { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".hero-shape", {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "back.out(1.6)",
        stagger: 0.08,
      })
        .to(
          ".hero-word",
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.7"
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(".hero-terminal", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");

      // floating ambient loop for shapes
      gsap.utils.toArray<HTMLElement>(".hero-shape").forEach((shape, i) => {
        gsap.to(shape, {
          y: i % 2 === 0 ? -18 : 18,
          x: i % 3 === 0 ? 10 : -10,
          duration: 4 + i * 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 sm:px-10"
    >
      {/* ambient pastel shapes */}
      <div className="hero-shape absolute left-[8%] top-[18%] h-24 w-24 rounded-full bg-lilac sm:h-36 sm:w-36" />
      <div className="hero-shape absolute right-[10%] top-[22%] h-16 w-16 rotate-12 rounded-2xl bg-butter sm:h-24 sm:w-24" />
      <div className="hero-shape absolute bottom-[16%] left-[12%] h-20 w-20 rounded-2xl bg-mint sm:h-28 sm:w-28" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
      <div className="hero-shape absolute bottom-[26%] right-[8%] h-28 w-28 rounded-full bg-rose sm:h-40 sm:w-40" />
      <div className="hero-shape absolute right-[28%] top-[8%] h-14 w-14 rounded-xl bg-sky sm:h-20 sm:w-20" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-soft px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          status: disponível para novos projetos
        </span>

        <h1 className="max-w-4xl overflow-hidden font-display text-[14vw] font-semibold leading-[0.95] tracking-tight sm:text-[8vw] lg:text-[5.2vw]">
          <span className="block overflow-hidden">
            <span className="hero-word inline-block">Backend</span>{" "}
            <span className="hero-word inline-block">moderno</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-word inline-block">com</span>{" "}
            <span className="hero-word inline-block bg-lilac px-3 -rotate-1 rounded-lg">
              estrutura
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-word inline-block">de</span>{" "}
            <span className="hero-word inline-block">sistema.</span>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-md text-base leading-relaxed text-ink-soft">
          {profile.tagline} Sou {profile.name}, {profile.role.toLowerCase()} baseado em{" "}
          {profile.location}.
        </p>

        <div className="hero-terminal mt-12 w-full max-w-xl">
          <Terminal />
          <p className="mt-3 font-mono text-[11px] text-ink-soft/70">
            dica: digite <span className="text-ink-soft">help</span> no terminal acima ↑
          </p>
        </div>
      </div>
    </section>
  );
}
