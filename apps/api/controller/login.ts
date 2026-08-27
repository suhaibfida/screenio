import {Request,Response} from "express"
import {loginSchema} from "@repo/zod/zod"
import {prisma} from "@repo/db/prisma"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"
const jwtSecret=process.env.JWT_SECRET
const production=process.env.PRODUCTION
 const login=async(req:Request,res:Response)=>{
    if(!jwtSecret){
        console.error("jwtSecret is empty")
        return res.status(500).json({
            message:"Internal server error"
        })
    }

    const {email,password}=req.body;
    const safeParse=loginSchema.safeParse({email,password});
    if(!safeParse.success){
       return res.status(400).json({
        message:safeParse.error
       })
    }
    const check=await prisma.user.findFirst({
        where:{
            email:safeParse.data.email
        }
    })
    console.log("after check")
    if(!check){
        return res.status(400).json({
            message:"Email does not exist, please register"
        })
    }
    const pass=check.password
    console.log("after check")
    const compare=await bcrypt.compare(safeParse.data.password,pass)
    if(!compare){
        return res.status(400).json({
            message:"Password does not match"
        })
    }
    console.log("after check")
    const sign=await jwt.sign({data:check.id},jwtSecret,{expiresIn:"30d"});
    if(!sign){
        return res.status(400).json({
            message:"Please login again"
        })
    }
    const token=sign
    console.log(token)
    
     res.cookie("token",token,{
        maxAge:1000*60*60*24*30,
        httpOnly:true,
        sameSite:"lax",
        secure:production?true:false,
    })
    return res.status(200).json({
        message:"Login successfull"
    })
}
export default login;