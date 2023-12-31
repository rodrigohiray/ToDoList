//Importação do express e do router
const express = require('express');
const tasksController = require('./controllers/tasksController');
const taskMiddlewares = require('./middlewares/tasksMiddlewares');
const router = express.Router();


//Definição das rotas, com os endpoints que serão utilizados
router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddlewares.validateFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', 
    taskMiddlewares.validateFieldTitle, 
    taskMiddlewares.validateFieldStatus, 
    tasksController.updateTask
);





module.exports = router;