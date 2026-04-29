import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "../../../../assets/tela_inicial.svg";
import { Ionicons, FontAwesome, Fontisto, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
 
  const navigation = useNavigation();

  function irParaCadastro() {
   navigation.navigate("cadastro" as never);
  }

  function irParaCalculo() {
   navigation.navigate("calculadora" as never);
  }

  return (
    <View style={styles.container}>

      {/* IMAGEM TOPO */}
      <View style={styles.logoContainer}>
        <Logo width={300} height={250} />
      </View>

      {/* TÍTULO */}
      <Text style={styles.titulo}>QuimiCalc</Text>

      {/* BOTÕES */}
      <View style={styles.botoes}>

        <TouchableOpacity style={styles.botao} onPress={irParaCadastro}>
          <Foundation name="folder-add" size={45} color="#2341f0" />
          <View>
            <Text style={styles.botaoTitulo}>Cadastrar Produtos</Text>
            <Text style={styles.botaoSubtitulo}>Gerencie seu catálogo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={irParaCalculo}>
          <Fontisto name="laboratory" size={45} color="#2341f0" />
          <View>
            <Text style={styles.botaoTitulo}>Cálculo de Dosagem</Text>
            <Text style={styles.botaoSubtitulo}>Calcular mg/L ou mL</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 0,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2341f0",
    marginBottom: 30,
  },
  botoes: {
    width: "90%",
    gap: 15,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  botaoIcone: {
    fontSize: 36,
  },
  botaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  botaoSubtitulo: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
});