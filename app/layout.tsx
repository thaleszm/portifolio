import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thales Marques — Desenvolvedor Back-end Java",
  description:
    "Portfólio de Thales Marques, transformando lógica e código em soluções escaláveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
