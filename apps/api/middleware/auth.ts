import {Request,Response} from "express"
import {prisma} from "@repo/db/prisma"
import jwt from "jsonwebtoken"
import "dotenv"
const jwtSecret=process.env.JWT_SECRET
const authMiddleware=async(req:Request,res:Response)=>{
    if(!jwtSecret){
        console.error("Jwt is empty")
        return res.status(500).json({
            message:"Internal server error"
        })
    }
    const user=await prisma.user.findOne({
        where:{
            id:req.body.id
        }
    }

    )
    if(!user){
        res.status(400).json({
            message:"Please login again"
        })
    }
    const verify=jwt.verify(
        user.id,jwtSecret

    )
    if(!verify){
        return res.status(400).json({
            message:"Invalid user, please login again"
        })
    }
    res.status(200).json({
        message:"Login successful"
    })


}
export default authMiddleware;