import {Request,Response} from "express"
import {prisma} from "@repo/db/prisma"
export const profile=async (req:Request,res:Response)=>{
    try{
    const profile=await prisma.user.findFirst({
        where:{
            id:req.id
        }
    })
     return  res.status(200).json({
        username:profile.username,
        email:profile.email
    })}catch(error){console.error(error)}
}