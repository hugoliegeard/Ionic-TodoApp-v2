/**
 * Je défini quel est la structure d'une tâche.
 */
export class Task {
    id: number = Date.now();
    name: string;
    status = false;
}
