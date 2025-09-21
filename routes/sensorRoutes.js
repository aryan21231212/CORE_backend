import express from "express";
import { addSensorData, getSensorData } from "../controllers/sensorController.js";

const router = express.Router();

// Add new sensor reading
router.post("/data", addSensorData);

// Get sensor’s data by ID
router.get("/:sensorId", getSensorData);

export default router;
