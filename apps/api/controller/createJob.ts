import {prisma} from "@repo/db/prisma"
import {Request,Response} from "express"
export const createJob =async (req:Request,res:Response)=>{
    const {title,description}:any=req.body;
    if(!title || !description){
        res.status(400).json({
            messsage:"Please sent the details correctly"
        })
    }

    const job=await prisma.jobs.create({
        data:{
            title:title,
            description:description,
            userId:req.id
        }
    })
}