import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
};
