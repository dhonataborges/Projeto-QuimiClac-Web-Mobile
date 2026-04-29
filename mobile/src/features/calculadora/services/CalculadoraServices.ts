import { calcProdutoMgLitro, calcProdutoMl } from "../../../services/api";
import { CalculadoraDTO } from "../types/CalculadoraDTO";

/**
 * Calcula dosagem em mL
 *
 * Envia os dados da calculadora para API
 * e retorna o resultado do cálculo em mL
 */
export function calcularProdutoMl(dados: CalculadoraDTO) {
  
  console.log("Dados no Server: =>", dados);
  return calcProdutoMl<CalculadoraDTO>("calculadoras", dados);
}

/**
 * Calcula dosagem em mg/L
 *
 * Envia os dados da calculadora para API
 * e retorna o resultado do cálculo em mg/L
 */
export function calcularProdutoMgLitro(dados: CalculadoraDTO) {
  return calcProdutoMgLitro<CalculadoraDTO>("calculadoras", dados);
}
