import app from "../src/app";

const PORT = 3000;

/**
 * Inicializa o servidor
 */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});