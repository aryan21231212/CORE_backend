import express from "express";
import { getAlerts, triggerAlert } from "../controllers/alertController.js";

const router = express.Router();

// Fetch all alerts
router.get("/", getAlerts);

// Trigger alert manually
router.post("/trigger", triggerAlert);

export default router;
