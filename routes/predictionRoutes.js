import express from "express";
import { createPrediction, getLatestPrediction, getPredictionHistory } from "../controllers/predictionController.js";

const router = express.Router();

// Create new prediction (from ML model output)
router.post("/", createPrediction);

// Get latest prediction
router.get("/latest", getLatestPrediction);

// Get prediction history
router.get("/history", getPredictionHistory);

export default router;
