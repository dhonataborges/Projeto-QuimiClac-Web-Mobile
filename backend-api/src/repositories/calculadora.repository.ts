import { db } from "../config/database";
import { CalculadoraDTO } from "../dto/calculadora.dto";

/**
 * =========================================
 * REPOSITORY - CALCULADORA
 * =========================================
 * Responsável pelo acesso ao banco de dados
 * Tabela: tb_calculadora
 */

/**
 * =========================================
 * BUSCAR TODAS AS CALCULADORAS
 * =========================================
 * Retorna todos os registros da tabela tb_calculadora
 *
 * SELECT * FROM tb_calculadora
 */
export const buscarTodos = async (): Promise<CalculadoraDTO[]> => {
  // Executa consulta no banco
  const result = await db.query("SELECT * FROM tb_calculadora");

  // Retorna lista de registros
  return result.rows;
};

/**
 * =========================================
 * BUSCAR CALCULADORA POR ID
 * =========================================
 * Busca uma calculadora específica pelo ID
 *
 * SELECT * FROM tb_calculadora WHERE id = ?
 */
export const buscarPorId = async (
  id: number,
): Promise<CalculadoraDTO | null> => {
  const result = await db.query("SELECT * FROM tb_calculadora WHERE id = $1", [
    id,
  ]);

  // Retorna primeiro registro ou null
  return result.rows[0] || null;
};

/**
 * =========================================
 * SALVAR CALCULADORA
 * =========================================
 * Insere uma nova calculadora no banco
 *
 * INSERT INTO tb_calculadora
 */
export const salvar = async (
  calculadora: CalculadoraDTO,
): Promise<CalculadoraDTO> => {
  const result = await db.query(
    `INSERT INTO tb_calculadora
        (
            vazao,
            dosagem,
            resultadomg
        ) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
    [calculadora.vazao, calculadora.dosagem, calculadora.resultado],
  );

  // Retorna registro inserido
  return result.rows[0];
};
