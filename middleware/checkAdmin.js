import User from "../models/user.js";
import {Role} from "../models/role.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{model: Role}],
        });

        if (user && user.roleId.role === 'admin') next();
        else {
            res.status(403).json({error: "Access denied, admins only"});
        }
    } catch (error) {
        res.status(500).json({message:"Failed at isAdmin", error: error.message});
    }
}