import express from "express";
import session from "express-session";
import path from "path";
import homeRoutes from './routes/homeRoutes.js'
import { authRoutes} from "./routes/authRoutes.js";
const app = express();

// Configuração de sessões
app.use(
  session({
    secret: "minha_chave_secreta",
    resave: false,
    saveUninitialized: true,
  })
);

// Configuração do EJS para views
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Middleware para processar formulários
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/auth", authRoutes);
app.use('/', homeRoutes)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
