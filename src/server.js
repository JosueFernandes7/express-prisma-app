import express from "express";
import session from "express-session";
import path from "path";
import homeRoutes from "./routes/homeRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { permissionRoutes } from "./routes/permissionRoutes.js";
import { moduleRoutes } from "./routes/moduleRoutes.js";
import { logRoutes } from "./routes/logRoutes.js";
import {profileRoutes} from './routes/profileRoutes.js'
import fs from 'fs';

const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

// Configuração de sessões
app.use(
  session({
    secret: "minha_chave_secreta",
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Configuração do EJS para views
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Middleware para processar formulários
app.use(express.urlencoded({ extended: true }));

// Middleware para processar json
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/permissions", permissionRoutes);
app.use("/modules", moduleRoutes);
app.use("/logs", logRoutes);
app.use("/profile", profileRoutes);
app.use("/", homeRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});