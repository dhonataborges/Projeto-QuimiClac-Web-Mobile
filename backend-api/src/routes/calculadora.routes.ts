import { Router } from "express";
import * as calculadoraController from "../controllers/calculadora.controller";

const router = Router();

/**
 * Rota para calcular produto em mililitros
 */
router.post("/produto-ml", calculadoraController.calcularProdutoMl);

/**
 * Rota para calcular produto em mg/L
 */
router.post("/produto-mg-litro", calculadoraController.calcularProdutoMgLitro);

export default router;