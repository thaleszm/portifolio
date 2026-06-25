import { Resend } from "resend";
import { NextResponse } from "next/server";

// E-mail que vai RECEBER as mensagens do formulário (você).
// Troque para o seu e-mail real.
const TO_EMAIL = "marquesthales345@gmail.com";

// Remetente. Em produção, precisa ser um endereço de um domínio
// verificado na Resend (ver README.md / seção "Configurando o Resend").
const FROM_EMAIL = "Portfólio <onboarding@resend.dev>";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.message === "string" &&
    b.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY não configurada.");
    return NextResponse.json(
      { error: "Servidor de e-mail não configurado. Veja o README." },
      { status: 500 },
    );
  }

  // Instanciado dentro do handler (lazy): evita que o Next.js tente
  // construir o cliente em build-time, quando a env var ainda não existe.
  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido no corpo da requisição." },
      { status: 400 },
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Campos obrigatórios: name, email, message." },
      { status: 422 },
    );
  }

  const { name, email, message } = body;

  // honeypot simples opcional: se quiser bloquear bots, adicione um campo
  // invisível no form chamado "website" e rejeite aqui se vier preenchido.

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Novo contato pelo portfólio — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Novo contato pelo portfólio</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Falha ao enviar o e-mail. Tente novamente em breve." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { id: data?.id, status: "queued" },
      { status: 201 },
    );
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "Erro inesperado no servidor." },
      { status: 500 },
    );
  }
}

// Escapa HTML básico para evitar injeção no corpo do e-mail.
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
