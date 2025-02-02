import sequelize from "../db.js";
import {DataTypes} from "sequelize";
import User from "./user.js";

export const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: "roles",
        timestamps: false,
    }
);