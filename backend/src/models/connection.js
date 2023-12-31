//A ideia é que todos os arquivos que conectam com o banco de dados fiquem aqui dentro da pasta models.

//Importação do mysql2/promise, que usaremos as promises do mysql que são uma versão mais recente
const mysql = require('mysql2/promise');
const { use } = require('../router'); 
require('dotenv').config();


//Criação da conexão com o banco de dados
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,   //desta forma as variáveis de ambiente ficam protegidas e não são expostas no código
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,  

});

//Exportação da conexão com o banco de dados
module.exports = connection;