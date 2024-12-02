# express-prisma-app
## Organização

```bash
src/
  ├── config/           # Configurações globais (logger, banco de dados)
  ├── controllers/      # Controladores (lógica para lidar com requisições)
  ├── middlewares/      # Middlewares (autenticação, permissões, etc.)
  ├── repositories/     # Acesso ao banco de dados (via Prisma)
  ├── services/         # Lógica de negócio
  ├── views/            # Templates (EJS)
  └── routes/           # Definição de rotas

```