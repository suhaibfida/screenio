import {Request,Response} from "express"
import {prisma} from "@repo/db/prisma"
const signup =(req:Request,res:Response)=>{
    const {username,email,password}=req.body
   
   

}
export default signup