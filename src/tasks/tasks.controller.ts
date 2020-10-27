import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO) {
        return this.tasksService.getTasks(filterDTO);
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    public updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    public deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

}
