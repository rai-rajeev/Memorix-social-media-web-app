import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/memories.js';
import userRouter from'./routes/user.js';
import dotenv from'dotenv';
import cors from 'cors';
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const conectingUrl=process.env.MONGO_URL;
const port=process.env.PORT||8000
mongoose.connect(conectingUrl,).then(()=>{
    console.log('connected successfully');
    app.listen(port,()=>console.log('server running fine on',port));
}).catch((e)=>console.log(e));
app.use("/posts", postRoutes ,(req,res)=>{console.log("request made ", req)});
app.use("/user", userRouter);