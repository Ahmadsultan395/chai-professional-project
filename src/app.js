import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"

const app= express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true , limit:"16b"}))
app.use(express.static("Public"))
app.use(cookieParser())

// Router import 
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user", userRouter)
//https://localhost:8000/api/v1/user/registor

export default app;