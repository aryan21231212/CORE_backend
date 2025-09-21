import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import predictionRoutes from "./routes/predictionRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.error("DB connection error:", err.message));

// API routes
app.use("/api/predictions", predictionRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/alerts", alertRoutes);

// WebSocket events
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


app.set("io", io);

const PORT =3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
