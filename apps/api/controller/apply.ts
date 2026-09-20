import {Request,Response} from "express"
import {prisma} from "@repo/db/prisma"
export const apply=(req:Request,res:Response)=>{
    const {appliedTo,link,description}=req.body
    const userId=req.id
    const apply=prisma.user.create({
        data:{
            appliedTo,
            link,
            description,
            userId
        }
    })
       res.status(200).json({
        message:"Applied Successfully"
       })
    

}