import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do .env

class Settings {
    SESSION_SECRET = process.env.SESSION_SECRET
}

const settings = new Settings()

export {
    settings
}