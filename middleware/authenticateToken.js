import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //Bearer Token
    // console.log(token);
    if (!token) return res.status(401).json({error:"Null token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(401).json({ message: 'Invalid token, couldnt find user' });
        // console.log(user);
        req.user = user;
        next();

    } catch(error){
        res.status(403).json({error:'Unauthorized'});
    }
}

