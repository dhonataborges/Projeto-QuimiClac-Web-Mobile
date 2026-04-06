import { db } from "../config/database";
import { ProdutoDTO } from "../dto/produto.dto";

export async function listarProdutos(): Promise<ProdutoDTO[]> {

    const result = await db.query(
        "SELECT * FROM tb_produto"
    );

     return result.rows.map((produto) => ({
        idProduto: produto.idproduto,
        nome: produto.nome,
        densidade: Number(produto.densidade),
        concentracao: Number(produto.concentracao),
        concentracaoFinal: Number(produto.concentracao_final) 
    }));
}

/**
 * Busca um produto pelo ID
 */
export async function buscarProduto(id: number): Promise<ProdutoDTO | null> {

    const result = await db.query(
        `
        SELECT
            idproduto AS "idProduto",
            nome,
            densidade::float AS densidade,
            concentracao::float AS concentracao,
            concentracao_final::float AS "concentracaoFinal"
        FROM tb_produto
        WHERE idproduto = $1
        `,
        [id]
    );

    return result.rows[0] || null;
}

/**
 * 
 * @param nome buscar produto no banco pelo nome
 * @returns 
 */
export async function buscarPorNome(nome: string): Promise<ProdutoDTO | null> {
  const sql = `
    SELECT *
    FROM tb_produto
    WHERE lower(nome) = lower($1)
    LIMIT 1
  `;

  const result = await db.query(sql, [nome]);

  return result.rows[0] || null;
}

export async function criarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
    console.log("SALVANDO:", produto);
    
    const result = await db.query(
        `INSERT INTO tb_produto (nome, densidade, concentracao, concentracao_final)
         VALUES ($1,$2,$3,$4) RETURNING *`,
        [
            produto.nome,
            produto.densidade,
            produto.concentracao,
            produto.concentracaoFinal
        ]
    );

    console.log("RETORNO DB:", result.rows[0]);

    return result.rows[0];
}

export async function atualizarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {

    const result = await db.query(
        `UPDATE tb_produto
         SET nome=$2, densidade=$3, concentracao=$4, concentracao_final=$5
         WHERE idproduto=$1
         RETURNING *`,
        [
            produto.idProduto,
            produto.nome,
            produto.densidade,
            produto.concentracao,
            produto.concentracaoFinal
        ]
    );

    return result.rows[0];
}

export async function removerProduto(id: number): Promise<ProdutoDTO> {

    const result = await db.query(
        "DELETE FROM tb_produto WHERE idproduto = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
}