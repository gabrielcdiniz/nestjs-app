import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ALLOWED_TASK_STATUS } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

    private readonly allowedStatus = ALLOWED_TASK_STATUS;

    public transform(value: any) {
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}
