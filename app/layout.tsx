import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vetor Studio | Inteligência de operação",
  description: "Landing page conceitual de uma ferramenta de análise para equipes criativas. Explore a demonstração com dados fictícios.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
