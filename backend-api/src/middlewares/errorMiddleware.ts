import { Request, Response, NextFunction } from "express";

/**
 * Middleware global responsável por capturar erros da aplicação
 */
export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error("Erro na aplicação:", error);

  return res.status(500).json({
    erro: error.message || "Erro interno do servidor"
  });

};