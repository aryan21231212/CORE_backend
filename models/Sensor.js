import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ["strain", "displacement", "porePressure", "rainfall", "temperature", "vibration"],
    required: true
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  readings: [
    {
      timestamp: { type: Date, default: Date.now },
      value: Number
    }
  ]
});

// Create geospatial index for querying sensors by location
sensorSchema.index({ location: "2dsphere" });

export default mongoose.model("Sensor", sensorSchema);
