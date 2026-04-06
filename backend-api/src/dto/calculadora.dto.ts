/**
 * DTO para cálculo de dosagem
 */
export interface CalculadoraDTO {
  produto: {
    idProduto: number;
  };
  idCalculadora?: number;
  vazao: number;
  dosagem: number;
  resultado?: number;
}