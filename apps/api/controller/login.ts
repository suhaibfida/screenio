import {Request,Response} from "express"
import {loginSchema} from "@repo/zod/zod"
import {prisma} from "@repo/db/prisma"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"
const jwtSecret=process.env.JWTSECRET
export const login=async(req:Request,res:Response)=>{
    if(!jwtSecret){
        console.error("jwtSecret is empty")
        return res.status(500).json({
            message:"Internal server error"
        })
    }

    const {email,password}=req.body;
    const safeParse=loginSchema.safeParse(email,password);
    if(!safeParse.success){
       return res.status(400).json({
        message:safeParse.error
       })
    }
    const check=await prisma.user.findOne({
        where:{
            email:safeParse.data.email
        }
    })
    if(!check){
        return res.status(400).json({
            message:"Email does not exist, please register"
        })
    }
    const pass=check.password
    const compare=bcrypt.compare(safeParse.data.password,pass)
    if(!compare){
        return res.status(400).json({
            message:"Password does not match"
        })
    }
    const sign=await jwt.sign({data:check.id},jwtSecret,{expiresIn:"30d"});
    if(!sign){
        return res.status(400).json({
            message:"Please login again"
        })
    }
    const token=check.id
    
    return res.cookie("token",token,{
        maxAge:1000*60*60*24*30,
        httpOnly:true,
        sameSite:"lax",
        secure:true,
    })





}