const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Database host e.g., localhost
  user: process.env.DB_USER,       // Database user
  password: process.env.DB_PASS,   // Database password
  database: process.env.DB_NAME,   // Database name
  waitForConnections: true,        // Queue connection requests if no available connection
  connectionLimit: 10,             // Max number of connections in pool
  queueLimit: 0                   // Unlimited queued connection requests
});

module.exports = pool;
