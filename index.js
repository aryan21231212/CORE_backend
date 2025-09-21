import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import predictionRoutes from "./routes/predictionRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";


dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());


// mongoose connect
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err.message)
})


app.use("/api/predictions", predictionRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/alerts", alertRoutes);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})