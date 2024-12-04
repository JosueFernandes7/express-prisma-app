import dotenv from 'dotenv';
dotenv.config();

class Settings {
    SESSION_SECRET = process.env.SESSION_SECRET
    PORT = process.env.PORT
}

const settings = new Settings()

export {
    settings
}