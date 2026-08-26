import {Request,Response} from "express"
import {signupSchema} from "@repo/zod/zod"
import {prisma} from "@repo/db/prisma"
interface user{
    username:String,
    email :String,
    password:String
}
const signup =async (req:Request,res:Response)=>{
    try{
            const {username,email,password}:user=req.body
    const result=await signupSchema.safeParse({username,email,password});
     if(!result.success){
        return res.status(400).json({
            message:"Please enter valid username,email,password"
        })
    }
    const findCheck=await prisma.user.findFirst({
        where:{
            OR:[
                {username:result.data.username},
                {email:result.data.email}
            ]
        }
    })
    if(findCheck)
        {
            return res.status(400).json({

                message:"Email or Username already exists"
            })
        }
        console.log("here")
    const user=await prisma.user.create({
        data:{
            username:result.data.username,
            email:result.data.email,
            password:result.data.password
        }
    })
    console.log("here12")
        return res.status(200).send({
        message:"Account created successfully"
    })}
    catch(error:any){
        console.log(error)
    }
}
export default signup