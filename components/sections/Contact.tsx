"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { profile } from "@/lib/data";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Não foi possível enviar. Tente novamente.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMsg(
        "Falha de conexão. Verifique sua internet e tente novamente.",
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="border-t-2 border-ink px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="contact-reveal lg:col-span-5">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
            POST /contato
          </span>
          <h2 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Vamos criar
            <br />
            algo juntos?
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
            Responda o formulário ao lado ou escreva direto pro meu e-mail.
            Costumo responder em até 2 dias úteis.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block font-display text-xl font-semibold underline decoration-lilac decoration-4 underline-offset-4"
          >
            {profile.email}
          </a>

          <div className="mt-8 flex gap-3">
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

        <div className="contact-reveal lg:col-span-7">
          {status !== "sent" ? (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border-2 border-ink bg-paper-soft p-6 shadow-[6px_6px_0_0_var(--rose)] sm:p-8"
            >
              <div className="mb-5 font-mono text-[11px] text-ink-soft">
                Content-Type: application/json
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                    "nome":
                  </span>
                  <input
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='"seu nome"'
                    className="rounded-lg border border-ink/20 bg-paper px-3 py-2.5 text-sm outline-none placeholder:text-ink-soft/50 focus:border-ink"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                    "email":
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder='"voce@email.com"'
                    className="rounded-lg border border-ink/20 bg-paper px-3 py-2.5 text-sm outline-none placeholder:text-ink-soft/50 focus:border-ink"
                  />
                </label>
              </div>

              <label className="mt-5 flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                  "mensagem":
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder='"conte um pouco sobre seu projeto..."'
                  className="resize-none rounded-lg border border-ink/20 bg-paper px-3 py-2.5 text-sm outline-none placeholder:text-ink-soft/50 focus:border-ink"
                />
              </label>

              {status === "error" && (
                <div className="mt-4 rounded-lg border border-rose bg-rose/40 px-4 py-3 font-mono text-xs text-rose-text">
                  <span className="font-semibold">400 ERROR</span> — {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 w-full rounded-full border-2 border-ink bg-mint px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-mint-text transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "enviando..." : "enviar requisição →"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-2xl border-2 border-ink bg-mint p-8 shadow-[6px_6px_0_0_var(--ink)]">
              <span className="rounded bg-ink px-2 py-0.5 font-mono text-[11px] font-semibold text-paper">
                201 CREATED
              </span>
              <p className="font-display text-2xl font-semibold text-mint-text">
                Obrigada{name ? `, ${name}` : ""}! Mensagem recebida.
              </p>
              <p className="font-mono text-xs text-mint-text/80">
                {`{ "status": "queued", "response_time": "~2 dias úteis" }`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
