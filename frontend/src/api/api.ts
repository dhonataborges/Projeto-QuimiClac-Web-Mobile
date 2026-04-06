/**
 * =========================================
 * CONFIGURAÇÃO BASE DA API
 * =========================================
 * URL base do backend
 * Altere apenas aqui se a API mudar
 */
const API_URL = "http://localhost:3000/api";

/**
 * =========================================
 * LISTAR
 * =========================================
 * Busca todos os registros de uma rota
 *
 * Ex:
 * listar<Produto>("produtos")
 *
 * GET /rota
 */
export async function listar<T>(rota: string): Promise<T[]> {
  const resposta = await fetch(`${API_URL}/${rota}`);

  // Verifica erro HTTP
  if (!resposta.ok) {
    throw new Error("Erro ao buscar dados");
  }

  // Retorna JSON convertido
  return resposta.json();
}

/**
 * =========================================
 * BUSCAR POR ID
 * =========================================
 * Busca um único registro pelo ID
 *
 * Ex:
 * buscar<Produto>("produtos", 1)
 *
 * GET /rota/{id}
 */
export async function buscar<T>(rota: string, id: number): Promise<T> {
  const resposta = await fetch(`${API_URL}/${rota}/${id}`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar dados");
  }

  return resposta.json();
}

/**
 * =========================================
 * CRIAR (POST)
 * =========================================
 * Envia um novo registro para API
 *
 * Ex:
 * criar<Produto>("produtos", produto)
 *
 * POST /rota
 */
export async function criar<T>(rota: string, dados: T): Promise<T> {
  const resposta = await fetch(`${API_URL}/${rota}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const json: any = await resposta.json();

  // Tratamento de erro da API
  if (!resposta.ok) {
    throw new Error(
      json?.mensagem || json?.erro || json?.message || "Erro ao criar",
    );
  }

  return json;
}

/**
 * =========================================
 * ATUALIZAR (PUT)
 * =========================================
 * Atualiza um registro existente
 *
 * Ex:
 * atualizar<Produto>("produtos", 1, produto)
 *
 * PUT /rota/{id}
 */
export async function atualizar<T>(
  rota: string,
  id: number,
  dados: T,
): Promise<T> {
  const resposta = await fetch(`${API_URL}/${rota}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const json: any = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      json?.mensagem || json?.erro || json?.message || "Erro ao atualizar",
    );
  }

  return json;
}

/**
 * =========================================
 * REMOVER (DELETE)
 * =========================================
 * Remove um registro pelo ID
 *
 * Ex:
 * remover("produtos", 1)
 *
 * DELETE /rota/{id}
 */
export async function remover(rota: string, id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${rota}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao remover");
  }
}

/**
 * =========================================
 * CALCULAR PRODUTO (ML)
 * =========================================
 * Calcula dosagem em ML
 *
 * Endpoint:
 * POST /rota/produto-ml
 *
 * Trata erro retornado da API:
 * - mensagem
 * - erro
 * - message
 * - texto puro
 */
export async function calcProdutoMl<T>(rota: string, dados: T): Promise<T> {
  const resposta = await fetch(`${API_URL}/${rota}/produto-ml`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const texto = await resposta.text();

  let json = null;

  try {
    json = texto ? JSON.parse(texto) : null;
  } catch {}

  if (!resposta.ok) {
    throw new Error(
      json?.mensagem ||
        json?.erro ||
        json?.message ||
        texto ||
        "Erro ao processar requisição",
    );
  }

  return json;
}

/**
 * =========================================
 * CALCULAR PRODUTO (MG/L)
 * =========================================
 * Calcula dosagem em MG/L
 *
 * Endpoint:
 * POST /rota/produto-mg-litro
 *
 * Trata erro retornado da API:
 * - mensagem
 * - erro
 * - message
 * - texto puro
 */
export async function calcProdutoMgLitro<T>(
  rota: string,
  dados: T,
): Promise<T> {
  const resposta = await fetch(`${API_URL}/${rota}/produto-mg-litro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const texto = await resposta.text();

  let json = null;

  try {
    json = texto ? JSON.parse(texto) : null;
  } catch {}

  if (!resposta.ok) {
    throw new Error(
      json?.mensagem ||
        json?.erro ||
        json?.message ||
        texto ||
        "Erro ao processar requisição",
    );
  }

  return json;
}
