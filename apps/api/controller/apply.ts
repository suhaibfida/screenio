import {Request,Response} from "express"
import {prisma} from "@repo/db/prisma"
export const apply=(req:Request,res:Response)=>{
    const {appliedTo,link,description}=req.body
    const apply=prisma.user.create({
        data:{
            appliedTo,
            link,
            description,
            req.id
        }
    })
       res.status(200).json({
        message:"Applied Successfully"
       })
    

}