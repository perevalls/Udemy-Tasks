import { Task } from "./task.class";


export class TaskList {
    
    constructor() {
        this.loadLocalStorage();
    }

    addTask(task) {
        this.list.push(task);
        this.saveLocalStorage();
    }

    deleteTask(id) {
        this.list = this.list.filter(task => task.id != id);
        this.saveLocalStorage();
    }

    toggleCompleted(id) {
        for (const task of this.list)
        {
            if (task.id == id)
            {
                task.completed = !task.completed;
                break;
            }
        }
        this.saveLocalStorage();
    }

    deleteCompleted() {
        this.list = this.list.filter(task => !task.completed);
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.list));
    }

    loadLocalStorage() {
        this.list = localStorage.getItem('tasks')
                    ? JSON.parse(localStorage.getItem('tasks'))
                    : [];

        // this.list = this.list.map(obj => Task.fromJSON(obj));
        this.list = this.list.map(Task.fromJSON);
    }
}