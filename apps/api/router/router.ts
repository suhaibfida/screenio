import {Router} from "express"
import signup from "../controller/signup.js"
import login from "../controller/login.js"
import authMiddleware from "../middleware/auth.js"
const router:Router=Router();

router.post("/api/v1/auth/signup",signup)
router.post("/api/v1/auth/login")
router.get("/api/v1/profile")
export {router};