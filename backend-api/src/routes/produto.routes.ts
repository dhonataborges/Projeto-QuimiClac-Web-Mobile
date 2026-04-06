import { Router } from "express";
import * as produtoController from "../controllers/produto.controller";

/**
 * =========================================
 * ROTAS DE PRODUTOS
 * =========================================
 * Responsável por mapear endpoints de produtos
 */
const router = Router();

/**
 * =========================================
 * LISTAR PRODUTOS
 * =========================================
 * GET /produtos
 * Retorna todos os produtos
 */
router.get("/", produtoController.listarProdutos);

/**
 * =========================================
 * BUSCAR PRODUTO POR ID
 * =========================================
 * GET /produtos/:id
 * Retorna um produto específico
 */
router.get("/:id", produtoController.buscarProduto);

/**
 * =========================================
 * CRIAR PRODUTO
 * =========================================
 * POST /produtos
 * Cria um novo produto
 */
router.post("/", produtoController.criarProduto);

/**
 * =========================================
 * ATUALIZAR PRODUTO
 * =========================================
 * PUT /produtos/:id
 * Atualiza um produto existente
 */
router.put("/:id", produtoController.atualizarProduto);

/**
 * =========================================
 * REMOVER PRODUTO
 * =========================================
 * DELETE /produtos/:id
 * Remove um produto
 */
router.delete("/:id", produtoController.removerProduto);

export default router;
