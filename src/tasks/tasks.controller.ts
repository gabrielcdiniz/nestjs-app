import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public getTasks(
        @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
        @GetUser() user: User,
    ) {
        return this.tasksService.getTasks(filterDTO, user);
    }

    @Get('/:id')
    public getTaskById(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Patch('/:id/status')
    public updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    public deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

}
