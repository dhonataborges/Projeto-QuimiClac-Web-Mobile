/**
 * Modelo que representa uma calculadora de dosagem
 * Utilizado para transportar dados entre service, repository e controller
 */
export class Calculadora {
  idCalculadora: number;
  idProduto: number;
  vazao: number;
  dosagem: number;
  resultado: number;

  /**
   * Construtor da classe Calculadora
   */
  constructor(
    idCalculadora: number,
    idProduto: number,
    vazao: number,
    dosagem: number,
    resultado: number
  ) {

    this.idCalculadora = idCalculadora;
    this.idProduto = idProduto;
    this.vazao = vazao;
    this.dosagem = dosagem;
    this.resultado = resultado;

  }
}