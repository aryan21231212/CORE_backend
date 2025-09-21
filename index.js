import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();



const app = express();
app.use(cors());



// mongoose connect
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err.message)
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})