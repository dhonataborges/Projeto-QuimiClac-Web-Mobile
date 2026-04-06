import express from "express";
import cors from "cors";
import routes from "../src/routes";
import { errorMiddleware } from "../src/middlewares/errorMiddleware";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

/**
 * Middleware para interpretar JSON nas requisições
 */
app.use(express.json());

/**
 * Rotas da aplicação
 */
app.use("/api", routes);

/**
 * Middleware global de tratamento de erros
 * Deve sempre ser o último middleware registrado
 */
app.use(errorMiddleware);

export default app;
