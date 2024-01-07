const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

//Função para buscar as tarefas no banco de dados
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}

//Criar uma nova tarefa
const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };

    await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();
    inputTask.value = '';

}

//Excluir uma tarefa
const deleteTask = async (id_task) => {
    await fetch(`http://localhost:3333/tasks/${id_task}`, {
        method: 'DELETE',
    });

    loadTasks();
}

// Função para atualizar a situação da tarefa
const updateTask = async({id_task, title}) => {
   
    await fetch(`http://localhost:3333/tasks/${id_task}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title}),
    });

    loadTasks();
}

//Formatação da data
const formatDate = (dateUTC) => {
    if (!dateUTC) {
        return '-';
    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateUTC);

    // Verifica se a data é válida
    if (isNaN(date)) {
        return '-';
    }

    const dateString = date.toLocaleString('pt-br', options);

    // Extração manual dos componentes da data e hora
    const day = dateString.slice(0, 2) || '-';
    const month = dateString.slice(3, 5) || '-';
    const year = dateString.slice(6, 10) || '-';
    const hour = dateString.slice(12, 14) || '-';
    const minute = dateString.slice(15, 17) || '-';

    // Formato desejado: dd/mm/aaaa - hh:mm
    const formattedDate = `${day}/${month}/${year} - ${hour}:${minute}`;

    return formattedDate;
}

//Função para criar os elementos (adiantar o processo de criação)
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;


}

const createSelectSituation = (value) => {
    const options = `
        <option value="Pendente">Pendente</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Concluída">Concluída</option>
    `;

    const selectSituation = createElement('select', '', options);

    selectSituation.value = value;
    return selectSituation;
}

// Função para redirecionar para a página de detalhes
const redirectToDetailsPage = (taskId) => {
    window.location.href = `details.html?id=${taskId}`;
}

//Funções para gerar a estrutura do HTML
const createTableHeader = () => {
    const thead = createElement('thead');
    const tr = createElement('tr');
    const headers = ['Task', 'Created at', 'Updated at', 'Situation', 'Actions'];

    headers.forEach((header) => {
        const th = createElement('th', header);
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
}

const createRow = (task) => {
    const { id_task, title, created_at, updated_at, situation_id } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdUpdatedAt = createElement('td', formatDate(updated_at));
    const tdSituationId = createElement('td');
    const tdActions = createElement('td');

    const selectSituation = createSelectSituation(situation_id);

    selectSituation.addEventListener('change', ({ target }) => updateTask({ ...task, situation_id: target.value }));

    const viewButton = createElement('button', '', '<span class="material-symbols-outlined">visibility</span>');
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    viewButton.addEventListener('click', () => redirectToDetailsPage(task.id_task));

    editInput.value = title;

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ ...task, title: editInput.value });
    });

    editForm.appendChild(editInput);

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });

    deleteButton.addEventListener('click', () => deleteTask(id_task));

    viewButton.classList.add('btn-action');
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdSituationId.appendChild(selectSituation);

    tdActions.appendChild(viewButton);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    // Montagem da estrutura da tabela
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdUpdatedAt);
    tr.appendChild(tdSituationId);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);

    return tr;
}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);

        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);
createTableHeader();
loadTasks();