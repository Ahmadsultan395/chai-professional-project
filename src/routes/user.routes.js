import { Router } from "express";
import registorUser from "../controllers/user.controllers.js";

const router =Router()
router.route("/registor").post(registorUser)

 export default router;