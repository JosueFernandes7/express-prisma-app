import express from "express";
import session from "express-session";
import path from "path";
import homeRoutes from "./routes/homeRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { permissionRoutes } from "./routes/permissionRoutes.js";
import { moduleRoutes } from "./routes/moduleRoutes.js";
import { logRoutes } from "./routes/logRoutes.js";
import { profileRoutes } from "./routes/profileRoutes.js";
import { settings } from "./config/settings.js";
import logger from "./config/logger.js";
import fs from "fs";

const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

// Session Config
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

// Middleware forms
app.use(express.urlencoded({ extended: true }));

// Middleware json
app.use(express.json());

// Rotas
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/permissions", permissionRoutes);
app.use("/modules", moduleRoutes);
app.use("/logs", logRoutes);
app.use("/profile", profileRoutes);

// Middleware for not found routes
app.use((req, res, next) => {
  res.redirect("/");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
