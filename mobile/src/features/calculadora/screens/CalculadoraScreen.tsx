import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useNumeroInput } from "../../../utils/useNumeroInput";
import { CalculadoraDTO } from "../types/CalculadoraDTO";
import { listarProdutos } from "../../produtos/services/ProdutoServices";
import { ProdutoDTO } from "../../produtos/types/ProdutoDTO";
import {
  calcularProdutoMgLitro,
  calcularProdutoMl,
} from "../services/CalculadoraServices";

export function CalculadoraScreen() {
  const [tipoMedida, setTipoMedida] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | "">("");
  const [resultado, setResultado] = useState<number>(0);
  const [unidade, setUnidade] = useState<string>("");
  const vazaoInput = useNumeroInput();
  const dosagemInput = useNumeroInput();

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

  function validar() {
    if (!produtoSelecionado || !vazaoInput.valor || !dosagemInput.valor) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Preencha todos os campos obrigatórios",
      });
      return false;
    }
    return true;
  }

  async function calcularResultadoML() {
    if (!validar()) return;

    try {
      const dados: CalculadoraDTO = {
        produto: { idProduto: Number(produtoSelecionado) },
        vazao: vazaoInput.getNumero(),
        dosagem: dosagemInput.getNumero(),
        resultado: 0,
      };

      const response = await calcularProdutoMl(dados);
      setResultado(response.resultado);
      setUnidade("mL");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error?.message || "Erro ao calcular",
      });
    }
  }

  async function calcularResultadoMgLitro() {
    if (!validar()) return;

    try {
      const dados: CalculadoraDTO = {
        produto: { idProduto: Number(produtoSelecionado) },
        vazao: vazaoInput.getNumero(),
        dosagem: dosagemInput.getNumero(),
        resultado: 0,
      };

      const response = await calcularProdutoMgLitro(dados);
      setResultado(response.resultado);
      setUnidade("mg/L");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error?.message || "Erro ao calcular",
      });
    }
  }

  function limpar() {
    setResultado(0);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom"]}
    >
      <View style={{ padding: 20 }}>
        <Text style={styles.titulo}>Cálculo de Dosagem</Text>

        <View style={styles.inputPicker}>
          <Picker
            selectedValue={produtoSelecionado}
            onValueChange={(idSelecionado) => {
              setProdutoSelecionado(
                idSelecionado === 0 ? "" : Number(idSelecionado),
              );
            }}
            style={{
              fontSize: 15,
              color: "#333",
              padding: 15,
              borderWidth: 0, // remove borda dupla (já tem no inputPicker)
              backgroundColor: "transparent",
            }}
          >
            <Picker.Item label="Selecione um produto..." value={0} />
            {produtos.map((p) => (
              <Picker.Item
                key={p.idProduto}
                label={p.nome}
                value={p.idProduto}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Tipo de Medida:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            onPress={() => setTipoMedida(true)}
            style={styles.radioOption}
          >
            <View
              style={[
                styles.radioCircle,
                tipoMedida && styles.radioSelecionado,
              ]}
            >
              {tipoMedida && <View style={styles.radioPonto} />}
            </View>
            <Text style={styles.radioTexto}>mg/L</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTipoMedida(false)}
            style={styles.radioOption}
          >
            <View
              style={[
                styles.radioCircle,
                !tipoMedida && styles.radioSelecionado,
              ]}
            >
              {!tipoMedida && <View style={styles.radioPonto} />}
            </View>
            <Text style={styles.radioTexto}>mL</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Vazão"
          placeholderTextColor="#aaa"
          value={vazaoInput.valor}
          onChangeText={vazaoInput.onChange}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Dosagem"
          placeholderTextColor="#aaa"
          value={dosagemInput.valor}
          onChangeText={dosagemInput.onChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Resultado Final:</Text>
        <Text style={styles.resultado}>
          <Text style={styles.resultadoValor}>
            {resultado
              ? `${Number(resultado).toFixed(2).replace(".", ",")} ${unidade}`
              : "0,00"}
          </Text>
        </Text>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={
              tipoMedida ? calcularResultadoMgLitro : calcularResultadoML
            }
          >
            <Text style={styles.botaoCadastrarTexto}>CALCULAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCancelar} onPress={limpar}>
            <Text style={styles.botaoCancelarTexto}>LIMPAR</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  inputPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  resultado: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#daeeff",
  },
  resultadoValor: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#2341f0",
  },
  label: {
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
});
