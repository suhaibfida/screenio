import {Router} from "express"
import signup from "../controller/auth.js"
const router:Router=Router();

router.post("/api/v1/signup",signup)
export {router};