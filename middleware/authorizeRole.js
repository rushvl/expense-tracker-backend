export const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.roleId)) {
        return res.status(403).json({error: "Invalid role, Access denied"});
    }
    next();
}