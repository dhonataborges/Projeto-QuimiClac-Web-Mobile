import { useState } from "react";

export function useNumeroInput(valorInicial: string = "") {
  const [valor, setValor] = useState(valorInicial);

  function onChange(text: string) {
    // permite apenas números e vírgula
    const textoValido = text.replace(/[^0-9,]/g, "");
    setValor(textoValido);
  }

  function getNumero(): number {
    return Number(valor.replace(",", "."));
  }

  return {
    valor,
    onChange,
    getNumero,
  };
}