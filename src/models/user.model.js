import mongoose, { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcript from "bcript"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
         fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avtar:{
            type:String, //clodinary 
            required:true
        },
        coverimage:{
            type:String, //clodinary 
        }
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshToken:{
            type:String
        }

    },
    {timestamps:true}
    );


    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
        this.password = bcript.hash(this.password ,10);
        next(); 
    })

    userSchema.mothed.isPasswordCorrect= async function(password){
       return await bcript.compare(password,this.password);
    }

    userSchema.method.generateAccessMethod = function(){
        Jwt.sign(
            {
                _id=this._id,
                username = this.username,
                email=this.email,
                fullname=this.fullname
            },  
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
            }
        )
    }
    userSchema.method.generateRefreshMethod = function(){
        Jwt.sign(
            {
                _id=this._id,
            },  
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
            }
            )
    }
    export const User = mongoose.module("User",userSchema);