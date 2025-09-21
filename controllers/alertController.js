import Alert from "../models/Alert.js";

// Get all alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    console.error("Error fetching alerts:", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

// Manually trigger alert
export const triggerAlert = async (req, res) => {
  try {
    const { zoneId, riskLevel, message, sentTo } = req.body;

    const alert = new Alert({
      zoneId,
      riskLevel,
      message,
      sentTo,
      status: "pending"
    });

    await alert.save();

    res.status(201).json(alert);
  } catch (err) {
    console.error("Error triggering alert:", err);
    res.status(500).json({ error: "Failed to trigger alert" });
  }
};
