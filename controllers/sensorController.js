import Sensor from "../models/Sensor.js";

// Add new sensor reading
export const addSensorData = async (req, res) => {
  try {
    const { sensorId, type, coordinates, value } = req.body;

    let sensor = await Sensor.findOne({ sensorId });

    if (!sensor) {
      // Create sensor if it doesn’t exist
      sensor = new Sensor({
        sensorId,
        type,
        location: { type: "Point", coordinates }
      });
    }

    sensor.readings.push({ value, timestamp: new Date() });
    await sensor.save();

    res.status(201).json(sensor);
  } catch (err) {
    console.error("Error adding sensor data:", err);
    res.status(500).json({ error: "Failed to add sensor data" });
  }
};

// Get sensor data by ID
export const getSensorData = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const sensor = await Sensor.findOne({ sensorId });

    if (!sensor) return res.status(404).json({ message: "Sensor not found" });

    res.json(sensor);
  } catch (err) {
    console.error("Error fetching sensor data:", err);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
};
