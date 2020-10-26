import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    // @Get()
    // public getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
    //     if (Object.keys(filterDTO)?.length) {
    //         return this.tasksService.getTasksWithFilters(filterDTO);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    // @Get('/:id')
    // public getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // public createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    //     return this.tasksService.createTask(createTaskDTO);
    // }

    // @Patch('/:id/status')
    // public updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ): Task {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }

    // @Delete('/:id')
    // public deleteTask(@Param('id') id: string): void {
    //     this.tasksService.deleteTask(id);
    // }

}
