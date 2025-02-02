import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth-routes.js";
import usersRoutes from "./routes/users-routes.js";
import expenseRoutes from "./routes/expense-routes.js";
import sequelize from "./db.js";
import User from "./models/user.js";
import {log} from "debug";
import {Role} from "./models/role.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
//
app.use('/api/auth', authRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/expenses', expenseRoutes);

sequelize.authenticate().then(()=>{
    console.log("DB connected");
    Role.sync({ alter:true }).then(()=>{
        console.log("Role synced");
    })
    User.sync({ alter:true }).then(()=> {
        console.log("User synced");
    });
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });

}).catch((err)=> {
    console.log("DB URL: ", process.env.DB_URL);
    console.log("Error connecting to db: ", err);
});