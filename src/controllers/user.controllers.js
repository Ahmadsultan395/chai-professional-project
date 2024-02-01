import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asynchandler from "../utils/asynchandler.js";
import uploadonCloudinary from "../utils/cloudinary.js";

const registerUser = asynchandler(async(req,res)=>{
 
   // get detail from frontend
   // valication check - not empty 
   // if the user already exit - username and email
   // check for image and avtar 
   //upload them to cloudinary -- avtar 
   //create user object and entery db\
   // remove password and refresh token from the response 
   // check user is created 
   // return the response 

   const{fullname ,email,username,password}=req.body;
   console.log("email:",email)


   if (
      [fullname,email,username,password].some((field)=>{
         field?.trim()==="" })
   ) {
      throw new ApiError(400,"All fields are Required")
   } 

//for beginner 
   // if (fullname===""){
   //    throw new ApiError(400,"this filed is required")
   // } else {
      
   // }

  const existedUser= User.findOne({
      $or:[{username},{email}]
   }) 
   if (existedUser) {
      throw new ApiError(409,"User with this uername or email  already exist")
   }

   //check avtar
const avatarlocalpath=req.files?.avtar[0]?.path;
const coverimagelocalpath = req.files?.coverimage[0]?.path;

if (!avatarlocalpath) {
   throw new ApiError(400,"Avta file is required")
}
//upload to cloudinary 
const avatar = await uploadonCloudinary(avatarlocalpath);
const coverimage = await uploadonCloudinary(coverimagelocalpath);
 if (!avatar) {
   throw new ApiError(400,"Avta file is required")
 }

 //create object in database 
  const User =  await User.create({
   fullname,
   username:username.toLowerCase,
   password,
   avatar:avatar.url,
   coverimage:coverimage?.url || "",
   email
 })

 const createUser = await User.findById(User._id).select(
   "-password refreshToken"
 )
 //check user is created 
 if (!createUser) {
   throw new ApiError(500,"something went wrong while registering the user")   
 }
//return response 
return res.status(201).json(
    new ApiResponse(200,createUser,"User Created successfulyy")
);

})

export default registerUser;