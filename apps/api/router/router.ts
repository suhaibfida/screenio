import {Router} from "express"
import signup from "../controller/signup.js"
const router:Router=Router();

router.post("/api/v1/signup",signup)
export {router};