import express from "express";
import session from "express-session";
import router from "./routes/index.js";
import path from "path";
import fs from "fs";
import { settings } from "./config/settings.js";

const app = express();

// Criar o diretório de uploads se não existir
const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurações do express-session
app.use(
  session({
    secret: settings.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Configuração do multer para upload de arquivos
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Configuração EJS para as views
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Middleware para forms e json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// App router
app.use('/', router)

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.redirect("/");
});

export default app;