import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PropsWithChildren } from "react";

/**
 * Layout padrão da aplicação
 * 
 * Estrutura:
 * Navbar (fixo topo)
 * Conteúdo das páginas
 * Footer (fixo rodapé)
 */
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Menu superior */}
      <Navbar />

      {/* Conteúdo das páginas */}
      <main className="flex-1">
        {children}
      </main>

      {/* Rodapé */}
      <Footer />

    </div>
  );
}