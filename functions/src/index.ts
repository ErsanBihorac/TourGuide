import "dotenv/config";
import { onRequest } from "firebase-functions/https";
import express from "express";
import "./db/firebase";

const expressApp = express();
expressApp.use(express.json());

export const api = onRequest(expressApp);
