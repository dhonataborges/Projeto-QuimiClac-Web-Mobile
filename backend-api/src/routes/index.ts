import express from "express";

const router = express.Router();

import produtoRoutes from "./produto.routes";
import calculadoraRoutes from "./calculadora.routes";

router.use("/produtos", produtoRoutes);
router.use("/calculadoras", calculadoraRoutes);

export default router;