import express from "express"
 import { AccessToken } from 'livekit-server-sdk';
 import {prisma} from "@repo/db/prisma"
import {Request,Response} from "express"

export const liveKit=async (req:Request,res:Response)=>{
    try{
         const id=req.id;
    if(!id){
        return res.status(400).json({
            message:"Internal server error"
        })
    }
// if this room doesn't exist, it'll be automatically created when the first
// client joins
const roomName = 'tech-interview';
const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
  identity: id.toString(),
});
at.addGrant({ roomJoin: true, room: roomName });

const token = await at.toJwt();
res.status(200).json({
    message:"Token received",
    token:token
})
    }
    catch(error){
        console.error(error)
    }
   
}
