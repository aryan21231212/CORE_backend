import Prediction from "../models/Prediction.js";
import Alert from "../models/Alert.js";

// Create new prediction
export const createPrediction = async (req, res) => {
  try {
    const { zoneId, riskScore, geojson } = req.body;

    // Determine risk level
    let riskLevel = "Low";
    if (riskScore > 0.7) riskLevel = "High";
    else if (riskScore > 0.4) riskLevel = "Medium";

    const prediction = new Prediction({ zoneId, riskScore, riskLevel, geojson });
    await prediction.save();

    // If high risk → create alert
    if (riskLevel === "High") {
      const alert = new Alert({
        zoneId,
        riskLevel,
        message: `⚠️ High rockfall risk detected in Zone ${zoneId}`,
        sentTo: [] // You can fill this later with emails/phones
      });
      await alert.save();
    }

    res.status(201).json(prediction);
  } catch (err) {
    console.error("Error creating prediction:", err);
    res.status(500).json({ error: "Failed to create prediction" });
  }
};

// Get latest prediction
export const getLatestPrediction = async (req, res) => {
  try {
    const latest = await Prediction.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ message: "No predictions found" });
    res.json(latest);
  } catch (err) {
    console.error("Error fetching latest prediction:", err);
    res.status(500).json({ error: "Failed to fetch prediction" });
  }
};

// Get prediction history
export const getPredictionHistory = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const history = await Prediction.find().sort({ createdAt: -1 }).limit(parseInt(limit));
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
