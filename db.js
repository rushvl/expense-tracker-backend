import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL;

const sequelize = new Sequelize(DB_URL, {
    dialect: 'postgres',
    logging: false,
})

//test database

//
// try {
//     await sequelize.authenticate();
//     console.log('Connected to db');
// } catch (error) {
//     console.error('Unable to connect to db', error);
// }

export default sequelize;
