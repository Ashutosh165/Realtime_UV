import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import axios from "axios";

dotenv.config();


const port =3000;

const app = express();
const API_URL="https://api.openuv.io/api/v1/uv?";//lat,lng
let lat="";
let lng="";
const API_KEY = process.env.API_KEY;

//middle wares
app.use(cors());
app.use(bodyParser.json())

app.post("/api/get-UV",async (req,res)=>{
    const {lat,lng}=req.body;

    try {
        const response=await axios.get(`${API_URL}lat=${lat}&lng=${lng}`,{
            headers:{
                "x-access-token":`${API_KEY}`,
            }
        })
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching UV data:", error.message);
        res.status(500).json({ error: "Failed to fetch UV data" });
    }
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);   
})