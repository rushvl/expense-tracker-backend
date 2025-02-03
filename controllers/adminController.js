import User from "../models/user.js";
import Role from "../models/role.js";

export const getUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: Role, attributes: ['role'] }],
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password, isActive, roleId } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.name = name !== undefined ? name : user.name;
        user.email = email !== undefined ? email : user.email;
        user.password = password !== undefined ? password : user.password;
        user.isActive = isActive !== undefined ? isActive : user.isActive;
        user.roleId = roleId !== undefined ? roleId : user.roleId;

        await user.save();

        res.status(201).json({ message: 'User role updated successfully.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.isActive = false;
        await user.save();

        res.json({ message: 'User deactivated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}

export const getAnalytics = async (req, res) => {
    try {
        const userCount = await User.count();
        const activeUsers = await User.count({ where: { isActive: true } });

        res.json({
            totalUsers: userCount,
            activeUsers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}