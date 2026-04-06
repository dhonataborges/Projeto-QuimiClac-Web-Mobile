// Hooks React
import { useEffect, useRef, useState } from "react";

// Ícones
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Serviços
import { listarProdutos, removerProduto } from "@/services/produto.service";

// Tipagem
import { ProdutoDTO } from "@/types/ProdutoDTO";

// Navegação
import { useNavigate } from "react-router-dom";

export default function ProdutoLista() {

  // Hook navegação
  const navigate = useNavigate();

  // ================= STATES =================

  // Lista de produtos
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);

  // Controle de loading
  const [carregando, setCarregando] = useState(false);

  // Controle modal confirmação exclusão
  const [abrirConfirmacao, setAbrirConfirmacao] = useState(false);

  // Guarda id do produto que será excluído
  const [produtoExcluir, setProdutoExcluir] = useState<number | null>(null);

  // Evita executar useEffect duas vezes (StrictMode)
  const carregado = useRef(false);

  /**
   * Carrega produtos apenas uma vez
   */
  useEffect(() => {
    if (carregado.current) return;

    carregado.current = true;

    carregarProdutos();
  }, []);

  /**
   * Busca produtos na API
   */
  async function carregarProdutos() {
    try {
      setCarregando(true);

      const produtos = await listarProdutos();

      setProdutos(produtos);

    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setCarregando(false);
    }
  }

  /**
   * Abre modal confirmação exclusão
   */
  function confirmarExclusao(id: number) {
    setProdutoExcluir(id);
    setAbrirConfirmacao(true);
  }

  /**
   * Exclui produto
   */
  async function excluir(id: number) {
    try {
      await removerProduto(id);

      // fecha modal
      setAbrirConfirmacao(false);

      // limpa id
      setProdutoExcluir(null);

      // recarrega lista
      carregarProdutos();

    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  }

  // ================= PAGINAÇÃO =================

  // Página atual
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Quantidade por página
  const itensPorPagina = 4;

  // Índice inicial
  const inicio = (paginaAtual - 1) * itensPorPagina;

  // Índice final
  const fim = inicio + itensPorPagina;

  // Dados paginados
  const dadosPaginados = produtos.slice(inicio, fim);

  // Total páginas
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-6xl mx-auto mt-6">

      {/* TÍTULO */}
      <h2 className="text-base font-semibold text-blue-700 mb-4">
        Lista de Produtos
      </h2>

      {/* LOADING */}
      {carregando && <p>Carregando...</p>}

      {/* TABELA */}
      <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
        <table className="min-w-full divide-y-2 divide-gray-200">

          {/* CABEÇALHO */}
          <thead>
            <tr className="text-left text-gray-900 text-sm font-medium bg-gray-50">
              <th className="px-3 py-2">Nome</th>
              <th className="px-3 py-2">Concentração</th>
              <th className="px-3 py-2">Densidade</th>
              <th className="px-3 py-2">Concentração Final</th>
              <th className="px-3 py-2 text-right">Ações</th>
            </tr>
          </thead>

          {/* CORPO */}
          <tbody className="divide-y divide-gray-200 text-sm">
            {dadosPaginados.map((p) => (
              <tr key={p.idProduto} className="hover:bg-gray-50">

                <td className="px-3 py-2 font-medium">
                  {p.nome}
                </td>

                <td className="px-3 py-2">
                  {p.concentracao}
                </td>

                <td className="px-3 py-2">
                  {p.densidade}
                </td>

                <td className="px-3 py-2">
                  {p.concentracaoFinal}
                </td>

                {/* AÇÕES */}
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">

                    {/* EDITAR */}
                    <button
                      onClick={() =>
                        navigate(`/produtos/cadastro/editar/${p.idProduto}`)
                      }
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    {/* EXCLUIR */}
                    <button
                      onClick={() => confirmarExclusao(p.idProduto)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= PAGINAÇÃO ================= */}
      <div className="flex items-center justify-between mt-6">

        {/* BOTÃO ANTERIOR */}
        <button
          onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
          className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
          disabled={paginaAtual === 1}
        >
          Anterior
        </button>

        {/* NUMEROS PAGINAS */}
        <div className="flex gap-1">
          {Array.from({ length: totalPaginas }).map((_, index) => {

            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setPaginaAtual(page)}
                className={`px-3 py-1.5 rounded-lg text-sm border
                ${
                  paginaAtual === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* BOTÃO PRÓXIMO */}
        <button
          onClick={() =>
            setPaginaAtual((p) => Math.min(p + 1, totalPaginas))
          }
          className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
          disabled={paginaAtual === totalPaginas}
        >
          Próximo
        </button>
      </div>

      {/* ================= MODAL CONFIRMAÇÃO ================= */}
      {abrirConfirmacao && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl p-6 w-96">

            <h2 className="text-lg font-semibold text-gray-900">
              Confirmar exclusão
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Deseja realmente excluir este produto?
            </p>

            <div className="flex justify-end gap-3 mt-6">

              {/* CANCELAR */}
              <button
                onClick={() => setAbrirConfirmacao(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>

              {/* CONFIRMAR EXCLUSÃO */}
              <button
                onClick={() => produtoExcluir && excluir(produtoExcluir)}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-lg"
              >
                Excluir
              </button>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}