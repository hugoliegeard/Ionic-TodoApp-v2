import {Component} from '@angular/core';
import {Task} from '../models/task';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private storage: Storage) {
        this.storage.get('tasks').then(tasks => {
            if (null !== tasks) {
                this.tasks = tasks;
            }
        });
    }

    title = 'Mes Tâches à faire';

    /** Création d'une tâche */
    task: Task = new Task();

    /** Liste des tâches */
    tasks: Task[] = [];

    /** Ajouter une tâche dans le tableau "tasks" */
    addTask() {
        if (this.task.name && this.task.name.length > 0) {
            // console.log(this.task);

            // Je pousse dans mon tableau la nouvelle tâche
            this.tasks.push(this.task);

            // Je sauvegarde mon tableau de tâches
            this.saveTasks();

            // Je remet à zero la tâche (Création d'une nouvelle tâche vierge)
            this.task = new Task();
        }
    }

    /** Permet de détecter lorsque l'utilisateur press "enter" */
    enterDetection(code: string) {
        if (code === 'Enter') {
            this.addTask();
        }
    }

    /** Permet de supprimer une tâche */
    deleteTask(task: Task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.saveTasks();
    }

    /** Permet de déclencher l'enregistrement des tâches */
    saveTasks() {
        this.storage.set('tasks', this.tasks);
    }
}
