import { ProdutoDTO } from "../dto/produto.dto";
import * as produtoRepository from "../repositories/produto.repository";

/**
 * Lista todos os produtos cadastrados
 */
export async function listarProdutos(): Promise<ProdutoDTO[]> {
  return await produtoRepository.listarProdutos();
}

/**
 * Busca um produto pelo ID
 *
 * @param id identificador do produto
 */
export async function buscarProduto(id: number): Promise<ProdutoDTO | null> {
  return await produtoRepository.buscarProduto(id);
}

/**
 * Cria um novo produto
 * Antes de salvar, calcula automaticamente a concentração final
 *
 * @param produto dados do produto
 */
export async function criarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
  const possuiDensidade = produto.densidade > 0 && produto.concentracao > 0;

  const existente = await produtoRepository.buscarPorNome(produto.nome);

  if (existente) {
    throw new Error("Produto já cadastrado!");
  }

  if (possuiDensidade) {
    produto.concentracaoFinal = calcularConcentracaoFinal(
      produto.densidade,
      produto.concentracao,
    );
  }

  return produtoRepository.criarProduto(produto);
}

/**
 * Atualiza um produto existente
 *
 * @param id id do produto
 * @param produto dados atualizados
 */
export async function atualizarProduto(
  id: number,
  produto: ProdutoDTO,
): Promise<ProdutoDTO> {
  const possuiDensidade = produto.densidade > 0 && produto.concentracao > 0;

  const produtoAtualizado: ProdutoDTO = {
    idProduto: id,
    nome: produto.nome,
    densidade: produto.densidade,
    concentracao: produto.concentracao,
    concentracaoFinal: possuiDensidade
      ? calcularConcentracaoFinal(produto.densidade, produto.concentracao)
      : produto.concentracaoFinal,
  };

  return await produtoRepository.atualizarProduto(produtoAtualizado);
}

/**
 * Remove um produto pelo ID
 */
export async function removerProduto(id: number): Promise<ProdutoDTO> {
  return await produtoRepository.removerProduto(id);
}

/**
 * Calcula a concentração final
 *
 * Fórmula:
 * densidade × concentração
 */
function calcularConcentracaoFinal(
  densidade: number,
  concentracao: number,
): number {
  return densidade * concentracao;
}
