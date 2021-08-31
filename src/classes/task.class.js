

export class Task {

    static fromJSON = ({id, task, completed, creationDate}) => {
        const tempTask        = new Task(task);

        tempTask.id           = id;
        tempTask.completed    = completed;
        tempTask.creationDate = creationDate;
        return tempTask;
    }

    constructor(task) {
        this.task         = task;
        this.id           = new Date().getTime();
        this.completed    = false;
        this.creationDate = new Date();
    }
}