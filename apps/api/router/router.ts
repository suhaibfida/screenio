import {Router} from "express"
import signup from "../controller/signup.js"
import login from "../controller/login.js"
import {profile} from "../controller/profile.js"
import authMiddleware from "../middleware/auth.js"
import {createJob} from "../controller/createJob.js"
import {apply} from "../controller/apply.js"
const router:Router=Router();

router.post("/api/v1/auth/signup",signup)
router.post("/api/v1/auth/login",login)
router.get("/api/v1/profile",authMiddleware,profile)
router.post("/api/v1/createjob",authMiddleware,createJob)
router.post("/api/v1/apply",authMiddleware,apply)
export {router};