import {z} from "zod";
const signupSchema= z.object({
    username:z.string(),
    email:z.email(),
    password:z.string().min(8).max(100)
    })
    const loginSchema=z.object({
        email:z.email(),
        password:z.string().min(8).max(100)
    })
export {signupSchema,loginSchema}