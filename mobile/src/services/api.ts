import axios from "axios";

export const api = axios.create({
  baseURL: "https://generic-riveter-moonlike.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  }
});

/**
 * GET lista
 */
export function listar<T>(rota: string) {
  return api.get<T[]>(`/${rota}`).then(res => res.data);
}

/**
 * GET por ID
 */
export function buscar<T>(rota: string, id: number) {
  return api.get<T>(`/${rota}/${id}`).then(res => res.data);
}

/**
 * POST
 */
export function criar<T>(rota: string, dados: any) {
  return api.post<T>(`/${rota}`, dados).then(res => res.data);
}

/**
 * PUT
 */
export function atualizar<T>(rota: string, id: number, dados: any) {
  return api.put<T>(`/${rota}/${id}`, dados).then(res => res.data);
}

/**
 * DELETE
 */
export function remover(rota: string, id: number) {
  return api.delete(`/${rota}/${id}`).then(res => res.data);
}

export async function calcProdutoMl<T>(rota: string, dados: T): Promise<T> {
  return api.post<T>(`/${rota}/produto-ml`, dados).then(res => res.data);
}

export async function calcProdutoMgLitro<T>(rota: string, dados: T): Promise<T> {
  return api.post<T>(`/${rota}/produto-mg-litro`, dados).then(res => res.data);
}