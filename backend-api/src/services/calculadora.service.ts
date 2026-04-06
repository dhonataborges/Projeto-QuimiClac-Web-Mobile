import { ProdutoDTO } from "../dto/produto.dto";
import * as produtoRepository from "../repositories/produto.repository";

/**
 * Converte a vazão para a unidade usada nos cálculos.
 * Essa função pode ser reutilizada em outros cálculos.
 */
export function calcularVazaoMinuto(vazao: number): number {

  // verifica se a vazão é válida
  if (vazao <= 0) {
    throw new Error("A vazão deve ser maior que zero");
  }

  // converte a vazão (ajuste conforme sua fórmula)
  const resultado = vazao * 6;

  return resultado;
}

/**
 * Calcula a quantidade de produto em mililitros
 */
export async function calcularProdutoMililitro(idProduto: number, vazao: number, dosagem: number): Promise<number> {

  // verifica se o produto foi informado
  if (!idProduto) {
    throw new Error("Produto não informado");
  }

  // verifica valores inválidos
  if (dosagem <= 0) {
    throw new Error("Dosagem inválida");
  }

  // busca o produto no banco
  const produto = await produtoRepository.buscarProduto(idProduto);
 
  console.log("Produto do banco:",produto);

  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  const vazaoMinuto = calcularVazaoMinuto(vazao);

  const concentracaoFinal = Number(produto.concentracaoFinal);

  console.log("Concentracao Final:", concentracaoFinal);

  if (!concentracaoFinal) {
    throw new Error("Concentração final inválida");
  }

  const resultado = (dosagem * vazaoMinuto) / concentracaoFinal;

  return resultado;
  }

/**
 * Calcula a quantidade de produto em Miligrama por Litro
 */
export async function calcularProdutoMiligramaPorLitro(
  idProduto: number,
  vazao: number,
  dosagem: number
): Promise<number> {

  const produto = await produtoRepository.buscarProduto(idProduto);

  if (!produto) {
    throw new Error("Produto não encontrado");
  }

  const vazaoMinuto = calcularVazaoMinuto(vazao);

  const resultado = (dosagem * produto.concentracaoFinal) / vazaoMinuto;

  return resultado;
}

