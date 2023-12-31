//Importação do express e do router
const express = require('express');
const router = require('./router');


//Criação do app com uma instância do express
const app = express();

//Todas as requisições feitas ao app passarão pelo router
app.use(express.json());
app.use(router);

//Exportação do app
module.exports = app;