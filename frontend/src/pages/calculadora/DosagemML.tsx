// ================= IMPORTS =================

// Serviço responsável por calcular em ML
import { calcularProdutoMl } from "@/services/calculadora.service";

// Serviços de produtos
import { listarProdutos } from "@/services/produto.service";

// Tipagens utilizadas no formulário
import { CalculadoraDTO } from "@/types/CalculadoraDTO";
import { ProdutoDTO } from "@/types/ProdutoDTO";

// Hooks React
import { useEffect, useState } from "react";

// Toast para mensagens
import toast from "react-hot-toast";

export default function Example() {
  // ================= STATES =================

  // Lista de produtos carregados da API
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);

  // Produto selecionado no select
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | "">("");

  // Campo vazão digitado pelo usuário
  const [vazao, setVazao] = useState("");

  // Campo dosagem digitado pelo usuário
  const [dosagem, setDosagem] = useState("");

  // Resultado final exibido no input
  const [resultado, setResultado] = useState<string>("");

  // Objeto padrão da calculadora (estrutura do backend)
  const [calculadora, setCalculadora] = useState<CalculadoraDTO>({
    produto: {
      idProduto: 0,
    },
    vazao: 0,
    dosagem: 0,
    resultado: 0,
  });

  /**
   * Executa apenas uma vez ao carregar o componente
   * Responsável por buscar os produtos
   */
  useEffect(() => {
    carregarProdutos();
  }, []);

  /**
   * Busca todos os produtos cadastrados
   * e salva no state "produtos"
   */
  async function carregarProdutos() {
    const resposta = await listarProdutos();
    setProdutos(resposta);
  }

  /**
   * Função responsável por calcular o resultado
   * chamada ao clicar no botão "Calcular"
   */
  async function calcularResultado(e: React.FormEvent) {
    // Evita reload da página
    e.preventDefault();

    // valida campos obrigatórios
    if (!produtoSelecionado || !vazao || !dosagem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      // Monta objeto conforme esperado pela API
      const dados: CalculadoraDTO = {
        produto: {
          idProduto: Number(produtoSelecionado),
        },
        vazao: Number(vazao),
        dosagem: Number(dosagem),
        resultado: 0,
      };

      // Chama serviço de cálculo
      const resultado = await calcularProdutoMl(dados);

      // Atualiza resultado formatado com 2 casas decimais
      setResultado(resultado.resultado.toFixed(2));

    } catch (error: any) {
      // Exibe erro caso aconteça
      toast.error(error?.message || "Erro ao calcular");
    }
  }

  /**
   * Limpa apenas o resultado
   */
  async function limparResultado() {
    setResultado("");
  }

  return (
    <div className="bg-gray-50">
      <form className="bg-white shadow-2xl rounded-xl p-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          {/* ================= TÍTULO ================= */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-blue-700">
              Calcular Dosagem em mL
            </h2>

            {/* ================= GRID FORM ================= */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* ================= PRODUTO ================= */}
              <div className="sm:col-span-6">
                <label className="block text-sm text-gray-600 mb-1">
                  Produto
                </label>

                <select
                  value={produtoSelecionado}
                  // Atualiza produto selecionado
                  onChange={(e) =>
                    setProdutoSelecionado(Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Selecione...</option>

                  {/* Lista dinâmica de produtos */}
                  {produtos.map((produto) => (
                    <option key={produto.idProduto} value={produto.idProduto}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* ================= VAZÃO ================= */}
              <div className="sm:col-span-3">
                <input
                  type="number"
                  required
                  min="0.000001"
                  placeholder="Vazão"
                  // Atualiza vazão
                  value={vazao}
                  onChange={(e) => setVazao(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* ================= DOSAGEM ================= */}
              <div className="sm:col-span-3">
                <input
                  type="number"
                  required
                  min="0.000001"
                  placeholder="Dosagem"
                  // Atualiza dosagem
                  value={dosagem}
                  onChange={(e) => setDosagem(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* ================= RESULTADO ================= */}
              <div className="sm:col-span-6">
                <label className="block text-sm text-gray-600 mb-1">
                  Resultado Final
                </label>

                <input
                  type="text"
                  value={resultado}
                  // Campo somente leitura
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 
                  bg-blue-50 font-semibold text-blue-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTÕES ================= */}
        <div className="mt-6 flex justify-end gap-x-4">
          {/* BOTÃO LIMPAR */}
          <button
            onClick={limparResultado}
            type="button"
            className="text-sm font-semibold text-gray-700"
          >
            Limpar
          </button>

          {/* BOTÃO CALCULAR */}
          <button
            onClick={calcularResultado}
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Calcular
          </button>
        </div>
      </form>
    </div>
  );
}
