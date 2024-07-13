import jwt from "jsonwebtoken";
import User from "../models/users.js";



const auth = async (req, res, next) => {
  const sec = process.env.JWT_SEC;
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      jwt.verify(bearerToken, sec, async (err, authData) => {
        if (err) {
          console.log(err);
            res.status(403).json('Authentication failed');
        }
        else {
            
                const user = await User.findById(authData.id);
                if (!user) {
                    res.status(403).json('Not auth user!');
                } else {
                    req.userId = authData.id;
                    next();
                }  
        }
    })
    } else {
      res.status(403).json("Invalid Token");
    }

    
  } catch (error) {
    console.log(error);
  }
};

export default auth;
