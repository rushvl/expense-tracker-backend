import sequelize from "../db.js";
import {DataTypes} from "sequelize";
import Role from "./role.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "users",
    timestamps: true,
});

User.belongsTo(Role, {foreignKey: 'roleId'});
Role.hasMany(User, {foreignKey: 'roleId'});

export default User;