
import './css/styles.css';
import { Task, TaskList } from './classes';
import { createTaskHtml } from './js/components';

export const toDoList = new TaskList();

// TIP: això és igual a lo de sota
// toDoList.list.forEach(task => {
//     createTaskHtml(task);
// });

toDoList.list.forEach(createTaskHtml);

console.log(toDoList);