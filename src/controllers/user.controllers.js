import asynchandler from "../utils/asynchandler.js";

const registorUser = asynchandler(async(req,res)=>{
 res.status(200).json({
    message:"ok"
 })   
})

export default registorUser;