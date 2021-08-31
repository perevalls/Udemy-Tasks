import {Task} from '../classes'; 
import {toDoList} from '../index';

// Html references

const divTodoList       = document.querySelector(".todo-list");
const inputNewTask      = document.querySelector(".new-todo");
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFiltors         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');

export const createTaskHtml = (task) => {

    const htmlTask = `
    <li class="${(task.completed)? 'completed':''}" data-id="${task.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(task.completed)? 'checked':''} >
							<label>${task.task}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTask;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}


// Events

inputNewTask.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && inputNewTask.value.length > 0) {
        const newTask = new Task(inputNewTask.value);
        toDoList.addTask(newTask);
        createTaskHtml(newTask);
        inputNewTask.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const elementName = event.target.localName;
    const taskElement = event.target.parentElement.parentElement;
    const taskId      = taskElement.getAttribute('data-id');
    
    if (elementName.includes('input')) {
        toDoList.toggleCompleted(taskId);
        // fa toggle te la classe css de l'element
        taskElement.classList.toggle('completed');
    } else if (elementName.includes('button')) {
        toDoList.deleteTask(taskId);
        divTodoList.removeChild(taskElement);
    }
});

btnClearCompleted.addEventListener('click', () => {
    toDoList.deleteCompleted();
    for (let i = divTodoList.children.length - 1; i >= 0; i--){
        const element = divTodoList.children[i];
        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
});

ulFiltors.addEventListener('click', (event) => {
    console.log(event.target.text);

    const filter = event.target.text;
    if (!filter) {return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    
    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch (filter) {
            case 'Pendientes':
                if (completed) element.classList.add('hidden');
            break;
            
            case 'Completados':
                if (!completed) element.classList.add('hidden');
            break;
        }
    }
});