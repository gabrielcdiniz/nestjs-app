import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(
        filterDTO: GetTasksFilterDTO,
        user: User,
    ): Promise<Task[]> {
        const { status, search } = filterDTO;
        const { id: userId } = user;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId })

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
        }

        const tasks = await query.getMany();

        return tasks;
    }

    public async createTask(
        createTaskDTO: CreateTaskDTO,
        user: User,
    ): Promise<Task> {
        const { title, description } = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        await task.save();

        delete task.user;

        return task;
    }

}
