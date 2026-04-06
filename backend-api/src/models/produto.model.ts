/**
 * Modelo que representa um Produto
 * Usado para transportar dados entre controller, service e repository
 */
export class Produto {

  // identificador do produto
  idProduto: number;

  // nome do produto químico
  nome: string;

  // densidade do produto
  densidade: number;

  // concentração do produto
  concentracao: number;

  // concentração final desejada
  concentracaoFinal: number;

  /**
   * Construtor do Produto
   */
  constructor(
    idProduto: number,
    nome: string,
    densidade: number,
    concentracao: number,
    concentracaoFinal: number
  ) {

    this.idProduto = idProduto;
    this.nome = nome;
    this.densidade = densidade;
    this.concentracao = concentracao;
    this.concentracaoFinal = concentracaoFinal;

  }
}