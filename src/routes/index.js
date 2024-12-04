import express from "express";
import { homeRoutes } from "./homeRoutes.js";
import { authRoutes } from "./authRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { permissionRoutes } from "./permissionRoutes.js";
import { logRoutes } from "./logRoutes.js";
import { profileRoutes } from "./profileRoutes.js";
import { financeiroRoutes } from "./financeiroRoutes.js";
import { relatorioRoutes } from "./relatorioRoutes.js";
import { gestaoRoutes } from "./gestaoRoutes.js";
import { produtosRoutes } from "./produtosRoutes.js";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/permissions", permissionRoutes);
router.use("/logs", logRoutes);
router.use("/profile", profileRoutes);
router.use("/financeiro", financeiroRoutes);
router.use("/relatorios", relatorioRoutes);
router.use("/gestao", gestaoRoutes);
router.use("/produtos", produtosRoutes);

export default router;
