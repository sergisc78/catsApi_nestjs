import { Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";



export const CatSchema = new mongoose.Schema({
    name: {type:String,required:true},
    sex:String,
    age:String,
    description: String,
    image: String,
    createdAt:{
        type:Date,
        default:Date.now
    }
  });
  
  