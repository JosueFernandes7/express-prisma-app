import express from "express";
import session from "express-session";
import path from "path";
import fs from "fs";
import { settings } from "./config/settings.js";

// import homeRoutes from "./routes/homeRoutes.js";
// import { authRoutes } from "./routes/authRoutes.js";
// import { userRoutes } from "./routes/userRoutes.js";
// import { permissionRoutes } from "./routes/permissionRoutes.js";
// import { logRoutes } from "./routes/logRoutes.js";
// import { profileRoutes } from "./routes/profileRoutes.js";
// import { financeiroRoutes } from "./routes/financeiroRoutes.js";
// import { relatorioRoutes } from "./routes/relatorioRoutes.js";
// import { gestaoRoutes } from "./routes/gestaoRoutes.js";
// import { produtosRoutes } from "./routes/produtosRoutes.js";

const app = express();

// uploadsDir if not exists
const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Session config
app.use(
  session({
    secret: settings.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Config for multer uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// EJS Config for views
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Middleware for Forms and Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


export default app;
// // Rotas
// app.use("/", homeRoutes);
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/permissions", permissionRoutes);

// // Modules 
// app.use("/financeiro", financeiroRoutes);
// app.use("/relatorios", relatorioRoutes);
// app.use("/gestao", gestaoRoutes);
// app.use("/logs", logRoutes);
// app.use("/profile", profileRoutes);
// app.use("/produtos", produtosRoutes);

// // Middleware for not found routes
// app.use((req, res, next) => {
//   res.redirect("/");
// });

// app.listen(settings.PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${settings.PORT}`);
// });
