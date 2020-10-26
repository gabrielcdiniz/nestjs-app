import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    
    // public getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // public getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    //     const { search, status } = filterDTO;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = this.tasks.filter(t => t.status === status);
    //     }

    //     if (search) {
    //         tasks = this.tasks.filter(t =>
    //             t.title.includes(search) ||
    //             t.description.includes(search)
    //         );
    //     }

    //     return tasks;
    // }

    // public getTaskById(id: string): Task {
    //     const found = this.tasks.find(t => t.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`Task with the ID "${id}" not found !`);
    //     }

    //     return found;
    // }

    // public createTask(createTaskDTO: CreateTaskDTO) {
    //     const { title, description } = createTaskDTO;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task);
    //     return task;
    // }

    // public updateTaskStatus(
    //     id: string,
    //     status: TaskStatus
    // ): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // public deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(t => t.id !== found.id);
    // }
}
