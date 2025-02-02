import User from "../models/user.js";
import {Role} from "../models/role.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{model: Role}],
        });

        if (user && user.roleId.role === 'admin') next();
        else {
            res.status(403).json({error: "Access denied"});
        }
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}