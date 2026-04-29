// src/components/ConfirmDialog.tsx

import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ConfirmDialogProps {
  visivel: boolean;
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmDialog({
  visivel,
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
}: ConfirmDialogProps) {
  return (
    <Modal transparent animationType="fade" visible={visivel}>
      <View style={styles.overlay}>
        <View style={styles.caixa}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <View style={styles.linha}>
            <TouchableOpacity style={styles.botaoCancelar} onPress={onCancelar}>
              <Text style={styles.botaoCancelarTexto}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoConfirmar} onPress={onConfirmar}>
              <Text style={styles.botaoConfirmarTexto}>EXCLUIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  caixa: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    width: "80%",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2341f0",
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 15,
    color: "#333",
    marginBottom: 20,
  },
  linha: {
    flexDirection: "row",
    gap: 10,
  },
  botaoCancelar: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#2341f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoCancelarTexto: {
    color: "#2341f0",
    fontWeight: "bold",
    fontSize: 15,
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoConfirmarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});