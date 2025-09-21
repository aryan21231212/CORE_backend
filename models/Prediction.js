import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  zoneId: {
    type: String,
    required: true
  },
  riskScore: {
    type: Number,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },
  geojson: {
    type: Object, // Store GeoJSON directly
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Prediction", predictionSchema);
