// Importar a variável de conexão com o banco de dados
const connection = require('./connection');

// Função responsável por buscar todas as tarefas no banco de dados
const getTasks = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks'); // como é uma função assincrona, eu preciso esperar o retorno, para isso adiciono o await
    return tasks;
};

// Função para buscar a tarefa indicada no ID
const getTaskById = async (id) => {
    const [taskById] = await connection.execute('SELECT * FROM tasks WHERE id_task = ?', [id]);
    return taskById[0]; // Retorna a primeira (e única) tarefa encontrada
};

// Função/rota para criar uma nova tarefa
const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString(); //conversão da data para o formato utc para salvar no bd

    const query = 'INSERT INTO tasks (title) VALUES (?)';

    const [createdTask] = await connection.execute(query, [title]);

    return {insertId: createdTask.insertId};
};

// Função para deletar as tarefas criadas
const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id_task = ?', [id]);
    return removedTask;
};

// Função para atualizar as tarefas criadas
const updateTask = async (id, task) => {
    const { title } = task;
    
    const query = 'UPDATE tasks SET title = ? WHERE id_task = ?';
       
    const [updatedTask] = await connection.execute(query, [title, id]);
    return updatedTask;
};

// Fazendo desta forma ao invés de eu exportar o getAll diretamente, eu exporto um objeto que 
// contém o getAll. Isso é útil para quando eu tiver mais de uma função para 
// exportar, pois assim eu posso exportar todas elas dentro de um objeto.
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask
};



