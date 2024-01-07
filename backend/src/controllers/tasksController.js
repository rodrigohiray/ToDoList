
const tasksModel = require('../models/tasksModel');

//Basicamente aqui serão adicionadas as funções que serão executadas pelas rotas
const getTasks = async (_req, res) => {    
    const tasks = await tasksModel.getTasks();
    return res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await tasksModel.getTaskById(id);

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error('Erro ao obter detalhes da tarefa:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const createTask = async (req, res) => {
    const createdTask = await tasksModel.createTask(req.body);
    return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
    const {id} = req.params;

    await tasksModel.deleteTask(id);
    return res.status(204).json();
};

const updateTask = async (req, res) => {
    const {id} = req.params;

    await tasksModel.updateTask(id, req.body);
    return res.status(204).json();
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask
};