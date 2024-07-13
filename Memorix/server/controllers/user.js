import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { json } from 'stream/consumers';

export const googleSignIn=async(req,res)=>{
  const sec=process.env.JWT_SEC;

  const email=req.body.email;
  console.log(email);
  try{
    let oldUser = await User.findOne({ email });
    if(!oldUser){
      const user=await User.create({email,name:req.body.name,password:"Not needed !",isGoogleSignedIn:true});
      oldUser=user;
    }
    if(!oldUser.isGoogleSignedIn){
      return res.status(404).json({message:"A signed-in user already exists! Please use sign-in instead."})
    }
    const token = jwt.sign( { email: oldUser.email, id: oldUser._id }, sec, { expiresIn: "1h" } );
    res.status(200).json({result:oldUser,token});
  }
  catch(err){
    res.status(500).json({ message: "Something went wrong" });
      
      console.log(err);
  }
}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const sec=process.env.JWT_SEC;

  
    try {
      const oldUser = await User.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
      if(oldUser.isGoogleSignedIn) return res.status(404).json({message:"A google signed-in user already exists! Please use google sign-in instead."})
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, sec, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const sec=process.env.JWT_SEC;

  
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
      const salt=await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const result = await User.create({ email:email, password: hashedPassword, name: `${firstName} ${lastName}`,isGoogleSignedIn:false });
  
      const token = jwt.sign( { email: result.email, id: result._id }, sec, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };