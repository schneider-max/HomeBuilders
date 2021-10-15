import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Request } from './entity.request';
import { Sector } from './entity.sector';
import { Customer } from './entity.customer';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    name: string;

    @Column({
        type: "datetime"
    })
    creationDate: Date;

    @Column({
        type: "decimal",
        precision: 10, 
        scale: 0,
        nullable: true,
        default: null
    })
    budget: number;

    @ManyToOne(type => Customer, customer => customer.projects, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    customer: Customer;

    @OneToMany(type => Request, request => request.projects)
    requests: Request[];

    @ManyToMany(type => Sector, sector => sector.projects)
    @JoinTable()
    sectors: Sector[];
}