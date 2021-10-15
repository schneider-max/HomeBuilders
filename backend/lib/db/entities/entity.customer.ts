import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Project } from './entity.project';

@Entity()
export class Customer {

    @PrimaryColumn({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    email: string;

    @Column({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    password: string;

    @Column({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    firstname: string;

    @Column({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    lastname: string;

    @OneToMany(type => Project, project => project.customer)
    projects: Project[];
}