import { atualizar, buscar, criar, listar, remover } from "../../../services/api";
import { ProdutoDTO } from "../types/ProdutoDTO";

export function listarProdutos() {
  return listar<ProdutoDTO>("produtos");
}

/**
 * Busca produto por ID
 *
 * GET /produtos/{id}
 */
export function buscarProduto(id: number) {
  return buscar<ProdutoDTO>("produtos", id);
}

/**
 * Cria um novo produto
 *
 * POST /produtos
 */
export async function criarProduto(dados: ProdutoDTO): Promise<ProdutoDTO> {
  try {
    return await criar<ProdutoDTO>("produtos", dados);
  } catch (erro: any) {
    const mensagem = erro?.response?.data?.erro || "Erro ao cadastrar produto";
    throw new Error(mensagem);
  }
}

/**
 * Atualiza um produto existente
 *
 * PUT /produtos/{id}
 */
export async function atualizarProduto(id: number, dados: ProdutoDTO): Promise<ProdutoDTO> {
  try {
    return await atualizar<ProdutoDTO>("produtos", id, dados);
  } catch (erro: any) {
    const mensagem = erro?.response?.data?.erro || "Erro ao atualizar produto";
    throw new Error(mensagem);
  }
}

/**
 * Remove um produto
 *
 * DELETE /produtos/{id}
 */
export function removerProduto(id: number) {
  return remover("produtos", id);
}
