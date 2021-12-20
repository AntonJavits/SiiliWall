import * as sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../../config/config.js`)[env]

export const dbConfig = new sequelize.Sequelize(
    config.database,
    config.username,
    config.password,
    {
        port: Number(config.port) || 3306,
        host: config.host || "localhost",
        dialect: config.dialect,
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        }
    }
)
