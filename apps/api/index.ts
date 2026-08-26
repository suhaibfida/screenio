import express from "express";
import "dotenv/config"
import {router} from "./router/router.js"
const port=process.env.PORT
const app=express();
app.use(express.json());
app.use(router);
app.listen(3000,()=>{
console.log(`Server is running on ${port}`)
})