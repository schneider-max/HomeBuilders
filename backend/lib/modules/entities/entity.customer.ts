import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Project } from './entity.project';

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @OneToMany(type => Project, project => project.name)
    projects: Project[];
}