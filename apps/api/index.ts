import express from "express";
import "dotenv/config"
const port=process.env.PORT
const app=express();
app.use(express.json())
app.listen(3000,()=>{
console.log(`Server is running on ${port}`)
})