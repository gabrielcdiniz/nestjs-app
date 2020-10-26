export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export const ALLOWED_TASK_STATUS = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
];