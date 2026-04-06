// Componentes do React Router
import { Routes, Route } from "react-router-dom";

// Páginas
import Home from "@/pages/home/Home";
import ProdutoForm from "@/pages/produtos/ProdutoForm";
import ProdutoLista from "@/pages/produtos/ProdutoLista";
import DosagemMgL from "@/pages/calculadora/DosagemMgL";
import DosagemML from "@/pages/calculadora/DosagemML";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= HOME ================= */}

      {/* Página inicial */}
      <Route path="/" element={<Home />} />

      {/* Rota alternativa para home */}
      <Route path="/home" element={<Home />} />

      {/* ================= PRODUTOS ================= */}

      {/* Cadastro de produto */}
      <Route path="/produtos/cadastro" element={<ProdutoForm />} />

      {/* Lista de produtos */}
      <Route path="/produtos/lista" element={<ProdutoLista />} />

      {/* Edição de produto (usa mesmo formulário) */}
      <Route path="/produtos/cadastro/editar/:id" element={<ProdutoForm />} />

      {/* (NÃO ESTÁ SENDO UTILIZADA - pode remover) */}
      <Route path="/produtos/delete/:id" element={<ProdutoLista />} />

      {/* ================= CALCULADORAS ================= */}

      {/* Cálculo dosagem mg/L */}
      <Route path="/dosagem-mg" element={<DosagemMgL />} />

      {/* Cálculo dosagem mL */}
      <Route path="/dosagem-ml" element={<DosagemML />} />
    </Routes>
  );
}
