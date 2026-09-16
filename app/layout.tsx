import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXO | Origem — Banco de Dados I",
  description: "Jogo de ação para revisar Banco de Dados I — Engenharia de Software, 4º período.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
