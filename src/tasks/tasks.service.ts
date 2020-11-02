import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    public async getTasks(
        filterDTO: GetTasksFilterDTO,
        user: User,
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO, user);
    }

    public async getTaskById(
        id: number,
        user: User
    ): Promise<Task> {
        const { id: userId } = user;
        const where = { id, userId };
        const found = await this.taskRepository.findOne({ where });

        if (!found) {
            throw new NotFoundException(`Task with the ID "${id}" not found !`);
        }

        return found;
    }

    public async createTask(
        createTaskDTO: CreateTaskDTO,
        user: User,
    ) {
        return this.taskRepository.createTask(createTaskDTO, user);
    }

    public async updateTaskStatus(
        id: number,
        status: TaskStatus,
        user: User,
    ): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    public async deleteTask(
        id: number,
        user: User,
    ): Promise<void> {
        const { id: userId } = user;
        const condition = { id, userId };
        const result = await this.taskRepository.delete(condition);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with the ID "${id}" not found !`);
        }
    }
}
