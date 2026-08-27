import express from "express";
import "dotenv/config"
import {router} from "./router/router.js"
import cors from "cors"
const port=process.env.PORT
const app=express();
const access=app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(router);
app.listen(3000,()=>{
console.log(`Server is running on ${port}`)
})