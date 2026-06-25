"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { projects, colorTokens, type Project } from "@/lib/data";

function statusColor(status: Project["status"]) {
  if (status === "deployed") return "text-sky-text bg-sky";
  return "text-mint-text bg-mint";
}

function methodColor(method: Project["method"]) {
  switch (method) {
    case "GET":
      return "bg-sky text-sky-text";
    case "POST":
      return "bg-mint text-mint-text";
    case "PUT":
      return "bg-butter text-butter-text";
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const token = colorTokens[project.color];

  return (
    <article className="project-card group relative overflow-hidden rounded-2xl border-2 border-ink bg-paper-soft transition-shadow hover:shadow-[6px_6px_0_0_var(--ink)]">
      {/* color bar = category token */}
      <div className="absolute left-0 top-0 h-full w-2" style={{ backgroundColor: token.bg }} />

      <div className="p-6 pl-8 sm:p-8 sm:pl-10">
        {/* request line */}
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className={`rounded px-2 py-0.5 font-semibold ${methodColor(project.method)}`}>
            {project.method}
          </span>
          <span className="text-ink-soft">/projetos/{project.slug}</span>
          <span className={`ml-auto rounded px-2 py-0.5 font-semibold ${statusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h3 className="font-display text-2xl font-semibold leading-tight text-balance sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-ink-soft">
              {project.client} · {project.year}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 self-start rounded-full border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-paper"
          >
            {expanded ? "ocultar log" : "ver log"}
          </button>
        </div>

        {expanded && (
          <div className="mt-6 rounded-xl border border-ink/15 bg-ink p-4 font-mono text-[11px] leading-relaxed text-paper/80">
            <div className="text-mint">$ git log --oneline -1</div>
            <div>{project.commit}  feat: finaliza entrega do projeto {project.client.toLowerCase()}</div>
            <div className="mt-2 text-mint">$ curl -I /projetos/{project.slug}</div>
            <div>HTTP/1.1 {project.status}</div>
            <div>Content-Category: {project.category}</div>
            <div>Cache-Control: no-cache (sempre revisitado)</div>
          </div>
        )}
      </div>

      <span className="absolute right-6 top-6 font-mono text-[11px] text-ink-soft/40 sm:right-8 sm:top-8">
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        scale: 0.97,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      });

      gsap.from(".projects-eyebrow, .projects-title, .projects-desc", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="projetos" ref={sectionRef} className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="projects-eyebrow font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
            GET /projetos · {projects.length} resultados
          </span>
          <h2 className="projects-title mt-2 font-display text-4xl font-semibold sm:text-5xl">
            Trabalho selecionado
          </h2>
        </div>
        <p className="projects-desc max-w-xs text-sm text-ink-soft">
          Cada projeto abaixo é tratado como um recurso: tem entrada, saída e um log do que
          aconteceu no caminho.
        </p>
      </div>

      <div className="projects-grid flex flex-col gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
