// Funções de API
import { calcProdutoMl } from "@/api/api";

// Serviços de cálculo
import {
  calcularProdutoMgLitro,
  calcularProdutoMl,
} from "@/services/calculadora.service";

// Serviços de produto
import { buscarProduto, listarProdutos } from "@/services/produto.service";

// Tipos utilizados no componente
import { CalculadoraDTO } from "@/types/CalculadoraDTO";
import { ProdutoDTO } from "@/types/ProdutoDTO";

// Hooks do React
import { useEffect, useState } from "react";

// Biblioteca de notificação
import toast from "react-hot-toast";

export default function Example() {
  // Lista de produtos carregados da API
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);

  // Produto selecionado no select
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | "">("");

  // Campo vazão digitado pelo usuário
  const [vazao, setVazao] = useState("");

  // Campo dosagem digitado pelo usuário
  const [dosagem, setDosagem] = useState("");

  // Resultado final exibido na tela
  const [resultado, setResultado] = useState<string>("");

  /**
   * useEffect executado apenas uma vez
   * quando o componente é carregado
   */
  useEffect(() => {
    carregarProdutos();
  }, []);

  /**
   * Carrega todos os produtos da API
   * e armazena no state
   */
  async function carregarProdutos() {
    const resposta = await listarProdutos();
    setProdutos(resposta);
  }

  /**
   * Função responsável por calcular o resultado
   * chamada ao clicar no botão calcular
   */
  async function calcularResultado(e: React.FormEvent) {
    e.preventDefault(); // impede reload da página

    // valida campos obrigatórios
    if (!produtoSelecionado || !vazao || !dosagem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      // Monta objeto conforme DTO esperado pela API
      const dados: CalculadoraDTO = {
        produto: {
          idProduto: Number(produtoSelecionado),
        },
        vazao: Number(vazao),
        dosagem: Number(dosagem),
        resultado: 0,
      };

      // Chamada da API de cálculo
      const resultado = await calcularProdutoMgLitro(dados);

      // Atualiza resultado formatado com 2 casas decimais
      setResultado(resultado.resultado.toFixed(2));

    } catch (error: any) {
      // Mensagem de erro
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
          {/* Título */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-blue-700">
              Calcular Dosagem em mg/L
            </h2>

            {/* GRID DO FORM */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* ================= PRODUTO ================= */}
              <div className="sm:col-span-6">
                <label className="block text-sm text-gray-600 mb-1">
                  Produto
                </label>

                <select
                  value={produtoSelecionado}
                  onChange={(e) =>
                    setProdutoSelecionado(Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Selecione...</option>

                  {/* Lista produtos dinamicamente */}
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
                  readOnly // somente leitura
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 
                  bg-blue-50 font-semibold text-blue-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTÕES */}
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
