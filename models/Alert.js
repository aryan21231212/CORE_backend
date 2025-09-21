import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  zoneId: {
    type: String,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentTo: {
    type: [String], // Emails / phone numbers
    default: []
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Alert", alertSchema);
