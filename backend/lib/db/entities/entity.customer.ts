import { Md5 } from "ts-md5";
import { Entity, Column, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = Md5.hashStr(this.password);
        }
    }
}