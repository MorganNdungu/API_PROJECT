const {Sequelize} = require('sequelize');

// const connection = mysql.createConnection({
 const DB_HOST= 'localhost';
 const DB_USER= 'root';
 const DB_PASSWORD= '';
 const DB_NAME= 'api_project';


const sequelize= new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql',
});

module.exports= sequelize;