import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
        const { search, status } = filterDTO;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = this.tasks.filter(t => t.status === status);
        }

        if (search) {
            tasks = this.tasks.filter(t =>
                t.title.includes(search) ||
                t.description.includes(search)
            );
        }

        return tasks;
    }

    public getTaskById(id: string): Task {
        return this.tasks.find(t => t.id === id);
    }

    public createTask(createTaskDTO: CreateTaskDTO) {
        const { title, description } = createTaskDTO;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    public updateTaskStatus(
        id: string,
        status: TaskStatus
    ): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    public deleteTask(id: string): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }
}
