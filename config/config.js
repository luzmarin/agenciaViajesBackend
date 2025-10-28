import dotenv from 'dotenv';
dotenv.config();

//Variables del servidor Express
export const PORT =  3000;
export const DOMAIN = 'http://localhost';

//Variables de Base de datos para mongoDB
export const DB_USER = process.env.DB_USER || "user";
export const DB_PASS = process.env.DB_PASS || "clave-segura";
export const CLUSTER = process.env.CLUSTER || "servidor.mongodb.net";
export const DATABASE = process.env.DB_DATABASE || "proyecto_final";

//Variables de Auth con JWT
export const JWT_SECRET = process.env.JWT_SECRET || "clave-secreta-jwt";

export const FULLDOMAIN = `${DOMAIN}:${PORT}`;
