import {Entity, PrimaryGeneratedColumn, Column, Index, OneToMany} from "typeorm";
import {Task} from "./Task"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];

}
