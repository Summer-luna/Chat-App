const mysql = require("mysql");
// const mysql = require("mysql2");
require("dotenv").config();

const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  multipleStatements: true,
});

con.getConnection((err, connection) => {
  if (err) {
    throw err;
  } else {
    console.log("Database connected successfully");
    connection.release();
  }
});

// const con = mysql.createConnection(process.env.DATABASE_URL);

module.exports = {
  db: con,
};
