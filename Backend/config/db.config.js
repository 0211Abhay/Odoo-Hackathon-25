const mysql = require('mysql2');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_CA,
} = process.env;

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT || 3306,
    ssl: {
        ca: DB_CA, // Ensure DB_CA is a string with the full certificate
    },
};

const connection = mysql.createConnection(config);

connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to MySQL Database Successfully!');
    }
});

module.exports = connection;
