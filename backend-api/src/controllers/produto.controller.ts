import { Request, Response } from "express";
import * as produtoService from "../services/produto.service";
import { ProdutoDTO } from "../dto/produto.dto";

/**
 * Lista todos os produtos
 */
export const listarProdutos = async (req: Request, res: Response) => {

  const produtos = await produtoService.listarProdutos();

  return res.json(produtos);
};


/**
 * Busca produto por ID
 */
export const buscarProduto = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new Error("ID inválido");
  }

  const produto = await produtoService.buscarProduto(id);

  if (!produto) {
    return res.status(404).json({
      mensagem: "Produto não encontrado"
    });
  }

  return res.json(produto);
};


/**
 * Cria um novo produto
 */
export const criarProduto = async (
  req: Request<{}, {}, ProdutoDTO>,
  res: Response
) => {
  console.log("Dados do front:", req.body)

  const produto = req.body;

  console.log("Dados produto:", produto)

  const novoProduto = await produtoService.criarProduto(produto);

  console.log("Dados novoProduto:", req.body)

  return res.status(201).json(novoProduto);
};


/**
 * Atualiza um produto
 */
export const atualizarProduto = async (
  req: Request<{ id: string }, {}, ProdutoDTO>,
  res: Response
) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new Error("ID inválido");
  }

  const dados = req.body;

  const produtoAtualizado = await produtoService.atualizarProduto(id, dados);

  return res.json(produtoAtualizado);
};


/**
 * Remove um produto
 */
export const removerProduto = async (req: Request, res: Response) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new Error("ID inválido");
  }

  await produtoService.removerProduto(id);

  return res.json({
    mensagem: "Produto removido com sucesso"
  });
};