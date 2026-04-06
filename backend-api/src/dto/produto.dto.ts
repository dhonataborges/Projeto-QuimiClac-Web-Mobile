/**
 * DTO para criação ou atualização de produto
 */
export interface ProdutoDTO {
    idProduto?: number;
    nome: string;
    densidade: number;
    concentracao: number;
    concentracaoFinal: number;
}