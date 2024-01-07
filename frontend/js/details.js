// Função para buscar os detalhes da tarefa pelo ID
const fetchTaskDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:3333/tasks/${taskId}`);
        const taskDetails = await response.json();

        // Verifica se a resposta contém a propriedade 'error'
        if (taskDetails.error) {
            console.error('Erro ao obter detalhes da tarefa:', taskDetails.error);
        } else {
            return taskDetails;
        }
    } catch (error) {
        console.error('Erro ao obter detalhes da tarefa:', error);
        throw error; // Rejeita a promessa para indicar falha
    }
}

const displayTaskDetails = async () => {
    try {
        const taskDetails = await fetchTaskDetails();

        document.getElementById('taskId').value = taskDetails.id_task;
        document.getElementById('taskTitle').value = taskDetails.title;
        document.getElementById('taskDetails').value = taskDetails.details || '';
        document.getElementById('taskDeadline').value = taskDetails.deadline || '';
        // Adicione aqui mais campos conforme necessário
    } catch (error) {
        // Lida com o erro, se necessário
    }
}

window.onload = displayTaskDetails;

