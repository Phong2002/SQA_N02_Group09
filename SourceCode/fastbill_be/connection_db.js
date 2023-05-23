const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,
  query: {
    "raw": true
  },
  timezone: "+07:00",
  createDatabase: true
});


const connection_db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(process.env.DB_HOST)
  } catch (error) {
    if (error.original.code === 'ER_BAD_DB_ERROR') { // kiểm tra nếu lỗi là do chưa có database
      console.log('Database not found. Creating new database...');
      const mysql = require('mysql2/promise');
      const connection = await mysql.createConnection({ // tạo kết nối tạm thời để tạo mới database
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`); // tạo mới database nếu chưa tồn tại
      console.log(`Database ${process.env.DB_NAME} created successfully.`);
      await connection.end(); // đóng kết nối tạm thời
    } else {
      console.error('Unable to connect to the database:', error);
    }
  }
}

connection_db()