import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"
import app from "../app.js";


const connectDB = async ()=>{

    try {
       const connectioninstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`/n mogodb connect !! DB host 
                      ${connectioninstance.connection.host}`)
                      app.on("error",(error)=>{
                        console.log("error",error);
                        throw error
                      })
    } catch (error) {
     console.log("MOGODB connection Faild",error)
     throw error   
     process.exit(1)
    }

}

export default connectDB;