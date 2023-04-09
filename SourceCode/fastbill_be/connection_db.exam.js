const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db name', 'user name', 'user pass', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connection_db = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connection_db()