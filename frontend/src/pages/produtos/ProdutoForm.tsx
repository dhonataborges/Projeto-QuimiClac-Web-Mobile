// ================= IMPORTS =================

// Serviços de produto
import {
  atualizarProduto,
  buscarProduto,
  criarProduto,
} from "@/services/produto.service";

// Tipagem do produto
import { ProdutoDTO } from "@/types/ProdutoDTO";

// Hooks React
import { useEffect, useState } from "react";

// Navegação e parâmetros da URL
import { useNavigate, useParams } from "react-router-dom";

// Toast de mensagens
import toast from "react-hot-toast";

export default function Example() {
  // ================= STATES =================

  // Valores em texto (inputs formatados com vírgula)
  const [concentracaoTxt, setConcentracaoTxt] = useState("");
  const [densidadeTxt, setDensidadeTxt] = useState("");
  const [concentracaoFinalTxt, setConcentracaoFinalTxt] = useState("");

  // Radio button (sim / nao)
  const [possuiDensidade, setPossuiDensidade] = useState("sim");

  // Hook navegação
  const navigate = useNavigate();

  // id vindo da URL (modo edição)
  const { id } = useParams();

  // Objeto principal do produto
  const [produto, setProduto] = useState<ProdutoDTO>({
    idProduto: 0,
    nome: "",
    concentracao: 0,
    densidade: 0,
    concentracaoFinal: 0,
  });

  /**
   * Quando existir ID na URL
   * significa que estamos editando
   */
  useEffect(() => {
    if (id) {
      carregarProduto(Number(id));
    }
  }, [id]);

  /**
   * Carrega produto para edição
   */
  async function carregarProduto(id: number) {
    try {
      const response = await buscarProduto(id);

      // seta objeto completo
      setProduto(response);

      // verifica se possui densidade
      if (response.densidade && response.concentracao) {
        setPossuiDensidade("sim");
      } else {
        setPossuiDensidade("nao");
      }

      // preenche inputs texto formatando vírgula
      setDensidadeTxt(response.densidade?.toString().replace(".", ",") || "");

      setConcentracaoTxt(
        response.concentracao?.toString().replace(".", ",") || "",
      );

      setConcentracaoFinalTxt(
        response.concentracaoFinal?.toString().replace(".", ",") || "",
      );
    } catch (error: any) {
      toast.error(error?.message || "Erro ao carregar produto");
    }
  }

  /**
   * Cálculo automático da concentração final
   * Executa sempre que densidade ou concentração mudar
   */
  useEffect(() => {
    // Se não possui densidade
    // apenas mostra valor salvo
    if (possuiDensidade !== "sim") {
      setConcentracaoFinalTxt(
        produto.concentracaoFinal?.toString().replace(".", ",") || "",
      );
      return;
    }

    // Converte valores para número
    const densidade = Number(densidadeTxt.replace(",", "."));
    const concentracao = Number(concentracaoTxt.replace(",", "."));

    // Se ambos forem válidos calcula
    if (!isNaN(densidade) && !isNaN(concentracao)) {
      const resultado = densidade * concentracao;

      // Atualiza objeto produto
      setProduto((prev) => ({
        ...prev,
        concentracaoFinal: Number(resultado.toFixed(2)),
      }));

      // Atualiza campo texto formatado
      setConcentracaoFinalTxt(resultado.toFixed(2).replace(".", ","));
    }
  }, [
    densidadeTxt,
    concentracaoTxt,
    possuiDensidade,
    produto.concentracaoFinal,
  ]);

  /**
   * Salvar ou atualizar produto
   */
  async function salvar(e: React.FormEvent) {
    // evita reload
    e.preventDefault();
    
    // quando NÃO possui densidade
    if (!possuiDensidade) {
      if (!produto.nome || !produto.concentracao || !produto.densidade) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
    }

    // quando POSSUI densidade
    if (possuiDensidade) {
      if (!produto.nome || !produto.concentracaoFinal) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
    }

    try {
      // MODO EDIÇÃO
      if (id) {
        await atualizarProduto(Number(id), produto);

        toast.success("Produto atualizado com sucesso!");

        navigate("/produtos/lista");
      } else {
        // MODO CADASTRO
        await criarProduto(produto);

        toast.success("Produto salvo com sucesso!");

        // limpa objeto
        setProduto({
          idProduto: 0,
          nome: "",
          concentracao: 0,
          densidade: 0,
          concentracaoFinal: 0,
        });

        // limpa inputs
        setConcentracaoTxt("");
        setDensidadeTxt("");
        setConcentracaoFinalTxt("");

        navigate("/produtos/cadastro");
      }
    } catch (error: any) {
      toast.error(error?.message || "Erro ao salvar");
    }
  }

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={salvar}
        className="bg-white shadow-2xl rounded-xl p-6 max-w-6xl mx-auto"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            {/* TÍTULO DINÂMICO */}
            <h2 className="text-base font-semibold text-blue-700">
              {id ? "Atualizar Produto" : "Cadastrar Produto"}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* ================= NOME ================= */}
              <div className="sm:col-span-3">
                <input
                  type="text"
                  value={produto.nome}
                  // Atualiza nome
                  onChange={(e) =>
                    setProduto({ ...produto, nome: e.target.value })
                  }
                  placeholder="Nome do produto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* ================= RADIO DENSIDADE ================= */}
              <div className="sm:col-span-3 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Possui densidade?
                </span>

                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  {/* SIM */}
                  <label
                    className={`px-4 py-2 cursor-pointer ${
                      possuiDensidade === "sim"
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      value="sim"
                      className="hidden"
                      checked={possuiDensidade === "sim"}
                      onChange={(e) => setPossuiDensidade(e.target.value)}
                    />
                    Sim
                  </label>

                  {/* NÃO */}
                  <label
                    className={`px-4 py-2 cursor-pointer border-l ${
                      possuiDensidade === "nao"
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      value="nao"
                      className="hidden"
                      checked={possuiDensidade === "nao"}
                      onChange={(e) => {
                        const valor = e.target.value;

                        setPossuiDensidade(valor);

                        // Se não possuir densidade limpa campos
                        if (valor === "nao") {
                          setDensidadeTxt("");
                          setConcentracaoTxt("");

                          setProduto((prev) => ({
                            ...prev,
                            densidade: 0,
                            concentracao: 0,
                          }));
                        }
                      }}
                    />
                    Não
                  </label>
                </div>
              </div>

              {/* ================= CONCENTRAÇÃO ================= */}
              {possuiDensidade === "sim" && (
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={concentracaoTxt}
                    onChange={(e) => {
                      setConcentracaoTxt(e.target.value);

                      const numero = Number(e.target.value.replace(",", "."));

                      if (!isNaN(numero)) {
                        setProduto({
                          ...produto,
                          concentracao: numero,
                        });
                      }
                    }}
                    placeholder="Concentração"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              )}

              {/* ================= DENSIDADE ================= */}
              {possuiDensidade === "sim" && (
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={densidadeTxt}
                    onChange={(e) => {
                      setDensidadeTxt(e.target.value);

                      const numero = Number(e.target.value.replace(",", "."));

                      if (!isNaN(numero)) {
                        setProduto({
                          ...produto,
                          densidade: numero,
                        });
                      }
                    }}
                    placeholder="Densidade"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              )}

              {/* ================= CONCENTRAÇÃO FINAL ================= */}
              <div className="sm:col-span-3">
                <input
                  type="text"
                  // desabilita quando for calculado automático
                  disabled={possuiDensidade === "sim"}
                  value={concentracaoFinalTxt}
                  // edição manual quando não possui densidade
                  onChange={(e) => {
                    const valor = e.target.value;

                    setConcentracaoFinalTxt(valor);

                    if (valor === "") {
                      setProduto({
                        ...produto,
                        concentracaoFinal: 0,
                      });
                      return;
                    }

                    const numero = Number(valor.replace(",", "."));

                    if (!isNaN(numero)) {
                      setProduto({
                        ...produto,
                        concentracaoFinal: numero,
                      });
                    }
                  }}
                  placeholder={
                    possuiDensidade === "sim"
                      ? "Calculado automaticamente"
                      : "Concentração"
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 
                  disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTÕES ================= */}
        <div className="mt-6 flex justify-end gap-x-4">
          {/* CANCELAR */}
          <button
            type="button"
            onClick={() => navigate(id ? "/produtos/lista" : "/")}
            className="text-sm font-semibold text-gray-700"
          >
            Cancelar
          </button>

          {/* SALVAR */}
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
