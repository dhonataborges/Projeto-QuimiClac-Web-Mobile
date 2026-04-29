import React, { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProdutoDTO } from "../types/ProdutoDTO";
import {
  atualizarProduto,
  criarProduto,
  listarProdutos,
  removerProduto,
} from "../services/ProdutoServices";
import Toast from "react-native-toast-message";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { useNumeroInput } from "../../../utils/useNumeroInput";

export function ProdutoScreen() {
  const insets = useSafeAreaInsets();
  const [possuiDensidade, setPossuiDensidade] = useState(true);
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);

  const concentracaoInput = useNumeroInput();
  const concentracaoFinalInput = useNumeroInput();
  const densidadeInput = useNumeroInput();

  const [produto, setProduto] = useState<ProdutoDTO>({
    idProduto: 0,
    nome: "",
    densidade: 0,
    concentracao: 0,
    concentracaoFinal: 0,
  });

  {
    /** BLOCO RESPONSAVEL POR LISTAR PRODUTOS NA TELA */
  }
  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      const lista = await listarProdutos();
      setProdutos(lista);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Erro ao carregar produtos",
      });
    } finally {
      setCarregando(false);
    }
  }

  {
    /** BLOCO RESPONSAVEL PELA EDIÇÃO */
  }
  useEffect(() => {
    if (editandoId && produto) {
      densidadeInput.onChange(
        produto.densidade ? String(produto.densidade).replace(".", ",") : "",
      );

      concentracaoInput.onChange(
        produto.concentracao
          ? String(produto.concentracao).replace(".", ",")
          : "",
      );

      concentracaoFinalInput.onChange(
        produto.concentracaoFinal
          ? String(produto.concentracaoFinal).replace(".", ",")
          : "",
      );
    }
  }, [editandoId, produto]);

  function editar(p: ProdutoDTO) {
    setProduto(p);
    setPossuiDensidade(p.densidade != null && p.densidade > 0);
    setEditandoId(p.idProduto ?? null);
  }

  {
    /** BLOCO RESPONSAVEL POR CALCULAR AUTOMATICAMETE */
  }
  useEffect(() => {
    if (possuiDensidade) {
      const concentracao = concentracaoInput.getNumero();
      const densidade = densidadeInput.getNumero();

      if (concentracao && densidade) {
        const resultado = concentracao * densidade;

        concentracaoFinalInput.onChange(String(resultado).replace(".", ","));
      }
    }
  }, [possuiDensidade, concentracaoInput.valor, densidadeInput.valor]);

  {
    /** BLOCO RESPONSAVEL PELA SALVAR */
  }
  async function salvar() {
    // converter valores dos inputs (string → number)
    const concentracao = concentracaoInput.getNumero();
    const concentracaoFinal = concentracaoFinalInput.getNumero();
    const densidade = densidadeInput.getNumero();

    if (possuiDensidade) {
      if (!produto.nome || !concentracao || !densidade) {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Preencha todos os campos obrigatórios",
        });
        return;
      }
    } else {
      if (!produto.nome || !concentracaoFinal) {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Preencha todos os campos obrigatórios",
        });
        return;
      }
    }

    // monta o objeto final com números já convertidos
    const produtoFinal = {
      ...produto,
      concentracao,
      concentracaoFinal,
      densidade,
    };

    try {
      if (editandoId) {
        await atualizarProduto(editandoId, produtoFinal);
        Toast.show({
          type: "success",
          text1: "Produto atualizado!",
          text2: "Produto atualizado com sucesso!",
        });

        limparFormulario();
      } else {
        await criarProduto(produtoFinal);
        Toast.show({
          type: "success",
          text1: "Produto cadastrado!",
          text2: "Produto cadastrado com sucesso!",
        });

        limparFormulario();
      }
      cancelar();
      carregarProdutos();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error?.message || "Erro ao salvar",
      });
    }
  }

  {
    /** BLOCO RESPONSAVEL PELA CANCELAR */
  }
  function cancelar() {
    limparFormulario();
  }

  {
    /** BLOCO RESPONSAVEL PELA EXCLUIR */
  }
  function excluir(id: number) {
    setIdParaExcluir(id);
    setDialogVisivel(true); 
  }

  async function confirmarExclusao() {
    try {
      await removerProduto(idParaExcluir!);
      setProdutos((prev) => prev.filter((p) => p.idProduto !== idParaExcluir));
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro!", text2: "Erro ao excluir" });
    } finally {
      setDialogVisivel(false);
      setIdParaExcluir(null);
    }
  }

  {
    /** BLOCO RESPONSAVEL PELA LIMPAR FORMULARIO */
  }
  function limparFormulario() {
    // limpa inputs (string)
    concentracaoInput.onChange("");
    concentracaoFinalInput.onChange("");
    densidadeInput.onChange("");

    // limpa objeto
    setProduto({
      idProduto: 0,
      nome: "",
      concentracao: 0,
      concentracaoFinal: 0,
      densidade: 0,
    });

    // limpa edição
    setEditandoId(null);
  }
 
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom"]}
    >
      {/* FORM FIXO */}
      <View style={{ padding: 20, width: "100%" }}>
        <Text style={styles.titulo}>Cadastrar Produtos</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          placeholderTextColor="#aaa"
          value={produto.nome}
          onChangeText={(text) =>
            setProduto((prev) => ({ ...prev, nome: text }))
          }
        />
        <Text style={styles.labelDensidade}>Possui densidade?</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            onPress={() => setPossuiDensidade(true)}
            style={styles.radioOption}
          >
            <View
              style={[
                styles.radioCircle,
                possuiDensidade && styles.radioSelecionado,
              ]}
            >
              {possuiDensidade && <View style={styles.radioPonto} />}
            </View>
            <Text style={styles.radioTexto}>Sim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPossuiDensidade(false)}
            style={styles.radioOption}
          >
            <View
              style={[
                styles.radioCircle,
                !possuiDensidade && styles.radioSelecionado,
              ]}
            >
              {!possuiDensidade && <View style={styles.radioPonto} />}
            </View>
            <Text style={styles.radioTexto}>Não</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linha}>
          {possuiDensidade && (
            <>
              {/* Densidade */}
              <TextInput
                style={[styles.input, styles.inputMetade]}
                placeholder="Densidade"
                placeholderTextColor="#aaa"
                value={densidadeInput.valor}
                onChangeText={densidadeInput.onChange}
                keyboardType="numeric"
              />
              {/* Concentração */}
              <TextInput
                style={[styles.input, styles.inputMetade]}
                placeholder="Concentração"
                placeholderTextColor="#aaa"
                value={concentracaoInput.valor}
                onChangeText={concentracaoInput.onChange}
                keyboardType="numeric"
              />
            </>
          )}
        </View>
        {/* Concentração Final */}
        <TextInput
          style={styles.input}
          placeholder="Concentração Final Desejada"
          placeholderTextColor="#aaa"
          value={concentracaoFinalInput.valor}
          onChangeText={concentracaoFinalInput.onChange}
          editable={!possuiDensidade}
          keyboardType="numeric"
        />
        <View style={styles.linha}>
          <TouchableOpacity style={styles.botaoCadastrar} onPress={salvar}>
            <Text style={styles.botaoCadastrarTexto}>
              {editandoId ? "ATUALIZAR" : "CADASTRAR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCancelar} onPress={cancelar}>
            <Text style={styles.botaoCancelarTexto}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CABEÇALHO FIXO DA TABELA */}
      <View style={[styles.tabelaHeader, { marginHorizontal: 20 }]}>
        <Text style={[styles.tabelaHeaderTexto, { flex: 2 }]}>
          NOME DO PRODUTO
        </Text>
        <Text
          style={[styles.tabelaHeaderTexto, { flex: 1, textAlign: "center" }]}
        >
          CONC. FINAL
        </Text>
        <Text
          style={[styles.tabelaHeaderTexto, { flex: 1, textAlign: "center" }]}
        >
          AÇÕES
        </Text>
      </View>

      {/* TABELA COM SCROLL */}
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={produtos}
        keyExtractor={(item) => item.idProduto.toString()}
        showsVerticalScrollIndicator={true}
        ListFooterComponent={<View style={{ height: insets.bottom + 10 }} />}
        renderItem={({ item }) => (
          <View style={styles.tabelaLinha}>
            <Text style={[styles.tabelaCelula, { flex: 2 }]}>{item.nome}</Text>

            <Text
              style={[
                styles.tabelaCelula,
                { flex: 1, textAlign: "center", color: "#2c9e50" },
              ]}
            >
              {item.concentracaoFinal}
            </Text>

            <View style={[styles.acoes, { flex: 1 }]}>
              <TouchableOpacity onPress={() => editar(item)}>
                <Ionicons name="pencil" size={20} color="#3498db" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluir(item.idProduto)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/** DIALOG DE CONFIRMAÇÃO */}
      <ConfirmDialog
        visivel={dialogVisivel}
        titulo="Excluir Produto"
        mensagem="Tem certeza que deseja excluir este produto?"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setDialogVisivel(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2341f0",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 15,
    color: "#333",
    width: "100%",
  },
  labelDensidade: {
    color: "#2341f0",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelecionado: {
    borderColor: "#2341f0",
  },
  radioPonto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2341f0",
  },
  radioTexto: {
    fontSize: 15,
    color: "#333",
  },
  linha: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  inputMetade: {
    flex: 1,
    marginBottom: 0,
    width: "100%",
  },
  botaoCadastrar: {
    flex: 1,
    backgroundColor: "#2341f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoCadastrarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  botaoCancelar: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#2341f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoCancelarTexto: {
    color: "#2341f0",
    fontWeight: "bold",
    fontSize: 15,
  },
  tabelaHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
  },
  tabelaHeaderTexto: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#555",
  },
  tabelaLinha: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabelaCelula: {
    fontSize: 15,
    color: "#333",
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
});
