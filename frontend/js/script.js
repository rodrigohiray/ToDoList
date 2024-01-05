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

    const task = { title: inputTask.value};

    await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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


// Função para atualizar o status da tarefa
const updateTask = async({id_task, title, status}) => {
   
    await fetch(`http://localhost:3333/tasks/${id_task}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, status}),
    });

    loadTasks();
}

//Formatação da data
const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-br', options);


    return date;

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

const createSelect = (value) => {
    const options = `
        <option value="Pendente">Pendente</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Concluída">Concluída</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;
    return select;
}


//Funções para gerar a estrutura do HTML
const createRow = (task) => {
  const {id_task, title, created_at, status} = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));

  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value}) );

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
  
  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTask({ ...task, title: editInput.value});
  });
  
  editForm.appendChild(editInput);

  editButton.addEventListener('click', () => {
  tdTitle.innerText = '';  
  tdTitle.appendChild(editForm);

  });


  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  deleteButton.addEventListener('click', () => deleteTask(id_task) );


  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  //Montagem da estrutura da tabela
  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
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

loadTasks();
