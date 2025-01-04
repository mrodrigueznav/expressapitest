require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect:  process.env.DIALECT,
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        },
        logging: true,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect:  process.env.DIALECT,
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        },
        logging: false,
    },
}