import "dotenv/config";
import { onRequest } from "firebase-functions/https";
import express from "express";
import eventRoutes from "./routes/eventRoutes";
import cors from "cors";
import "./db/firebase";

const allowed = ["http://localhost:4200"]; // CORS configuration
const expressApp = express();
expressApp.use(cors({ origin: allowed, credentials: true })); // use CORS configuration
expressApp.use(express.json());
expressApp.use("", eventRoutes);

export const api = onRequest(expressApp);
