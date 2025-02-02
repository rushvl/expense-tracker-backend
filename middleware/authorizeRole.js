export const authorize = (roles) => (req, res, next) => {
    return function (req, res, next) {
        if (!roles.includes(req.user.roleId)) {
            return res.status(401).json({error: "Invalid role, Access denied"});
        }
        next();
    }
}