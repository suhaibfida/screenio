import {Request,Response,NextFunction} from "express"
import {prisma} from "@repo/db/prisma"
import {JwtPayload} from "jsonwebtoken"
import jwt from "jsonwebtoken"
import "dotenv/config"
const jwtSecret=process.env.JWT_SECRET
declare global {
    namespace Express{
        interface Request{
            id?:String
        }
    }
}
const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.token
  
    if(!jwtSecret){
        console.error("Jwt is empty")
        return res.status(500).json({
            message:"Internal server error"
        })
    }let verify;
        try{
            verify=jwt.verify(
                token,jwtSecret
            )}catch(err){
                return res.status(400).json({
            message:"Invalid user, please login again"
        })
    }
         req.id=(verify as JwtPayload).data
    
    
   
    next();


}
export default authMiddleware;