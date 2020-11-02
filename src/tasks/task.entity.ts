import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public status: TaskStatus;

    @Column()
    public userId: number;

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    public user: User;
}
