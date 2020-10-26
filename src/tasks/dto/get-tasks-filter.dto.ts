import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ALLOWED_TASK_STATUS, TaskStatus } from "../task-status.enum";

export class GetTasksFilterDTO {
    @IsOptional()
    @IsIn(ALLOWED_TASK_STATUS)
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
