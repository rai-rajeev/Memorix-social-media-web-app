import mongoose from "mongoose";
const commentsSchema = mongoose.Schema({
    commentedBy: { type: String, required: true },
    comment: { type: String, required: true },
  }, { timestamps: true });
const memoriesSchema=mongoose.Schema
({
    title: {type:String,required:true},
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    isVideo:{type:Boolean,required:true},
    likes: { type: [String], default: [] },
    comments: { type: [commentsSchema], default: [] },
},{timestamps:true});
export  const Memory=mongoose.model('Memory',memoriesSchema);
