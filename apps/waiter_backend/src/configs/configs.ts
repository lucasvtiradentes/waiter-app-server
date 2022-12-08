import { resolve } from "node:path";
import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  SERVER_BASE,
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_BASEURL,
  DB_NAME,
} = process.env;

const SERVER =
  NODE_ENV === "production" ? SERVER_BASE : `http://localhost:${PORT}`;
const SERVER_PORT = NODE_ENV === "production" ? PORT : 3000;
const DATABASE_CONNECTION_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_BASEURL}/${DB_NAME}?retryWrites=true&w=majority`;
const UPLOAD_PATH = resolve(__dirname, "../..", "uploads");
const API_BASE = "/api";

export {
  NODE_ENV,
  SERVER_PORT,
  SERVER,
  DATABASE_CONNECTION_URL,
  UPLOAD_PATH,
  API_BASE,
};
