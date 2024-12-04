import app from "./src/app.js";
import { settings } from "./src/config/settings.js";

const { PORT } = settings;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});