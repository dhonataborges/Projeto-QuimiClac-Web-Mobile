// Funções genéricas da API
import { buscar, listar, criar, atualizar, remover } from "../api/api";

// Tipagem do produto
import { ProdutoDTO } from "../types/ProdutoDTO";

/**
 * ================================
 * SERVICE DE PRODUTOS
 * Responsável por comunicação com API
 * ================================
 */

/**
 * Lista todos os produtos
 *
 * GET /produtos
 */
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
export function criarProduto(dados: ProdutoDTO) {
  return criar<ProdutoDTO>("produtos", dados);
}

/**
 * Atualiza um produto existente
 *
 * PUT /produtos/{id}
 */
export function atualizarProduto(id: number, dados: ProdutoDTO) {
  return atualizar<ProdutoDTO>("produtos", id, dados);
}

/**
 * Remove um produto
 *
 * DELETE /produtos/{id}
 */
export function removerProduto(id: number) {
  return remover("produtos", id);
}
