import { Request, Response } from "express";
import * as calculadoraService from "../services/calculadora.service";
import { CalculadoraDTO } from "../dto/calculadora.dto";

/**
 * Controller responsável pelos cálculos da calculadora
 */

/**
 * Calcula produto em mililitros
 */
export const calcularProdutoMl = async (
  req: Request<{}, {}, CalculadoraDTO>,
  res: Response
) => {

  try {

    /**
     * Desestrutura os dados enviados no body
     */
    const { produto, vazao, dosagem } = req.body;

    /**
     * Valida se o produto foi informado
     */
    if (!produto) {
      throw new Error("Produto não informado");
    }

    /**
     * Chama o service que realiza o cálculo
     */
    const resultado =
    await calculadoraService.calcularProdutoMililitro(
    produto.idProduto,
    vazao,
    dosagem
  );

    /**
     * Retorna o resultado da operação
     */
    return res.json({
      produto,
      vazao,
      dosagem,
      resultado
    });

  } catch (erro: any) {

    /**
     * Retorna erro caso aconteça algum problema
     */
    return res.status(400).json({
      mensagem: erro.message
    });

  }

};

/**
 * Calcula produto em mg/L
 */
export const calcularProdutoMgLitro = async (req: Request, res: Response) => {

  try {

    // extrai os dados da requisição
    const { produto, vazao, dosagem } = req.body;

    if (!produto?.idProduto) {
      throw new Error("Produto não informado");
    }

    // chama o service passando apenas o id do produto
    const resultado =
    await calculadoraService.calcularProdutoMiligramaPorLitro(
      produto.idProduto,
      vazao,
      dosagem
    );

    return res.json({
      produto: produto.idProduto,
      vazao,
      dosagem,
      resultado: Number(resultado.toFixed(2))
    });

  } catch (erro: any) {

    return res.status(400).json({
      mensagem: erro.message
    });

  }

};