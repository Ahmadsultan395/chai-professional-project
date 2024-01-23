import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{

    try {
       const connectioninstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`/n mogodb connect !! DB host 
                      ${connectioninstance.connection.host}`)
    } catch (error) {
     console.log("MOGODB connection Faild",error)
     throw error   
     process.exit(1)
    }

}

export default connectDB;