import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import {Role} from "../models/role.js";

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']; //Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({error:"Null token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) return res.status(403).json({error : error.message});
            req.user = user;
            next();
        });

        const user = User.findByPk(decoded.id);

        if(!user) {
            return res.status(401).json({error:"Invalid token"});
        }

        req.user = user;
        next();

    } catch(error){
        res.status(403).json({error:'Unauthorized'});
    }
}

export const authorize = (roles) => (req, res, next) => {
    return function(req, res, next) {
        if(!roles.includes(req.user.roleId)){
            return res.status(401).json({error:"Invalid role, Access denied"});
        }
        next();
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{model: Role}],
        });

        if(user && user.roleId.role === 'admin') next();
        else {
            res.status(403).json({error:"Access denied"});
        }
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}

