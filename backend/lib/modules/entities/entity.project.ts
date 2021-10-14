import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Request } from './entity.request';
import { Sector } from './entity.sector';
import { Customer } from './entity.customer';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    name: string;

    @Column()
    creationDate: Date;

    @Column()
    budget: number;

    @ManyToOne(type => Customer, customer => customer.projects)
    customer: Customer[];

    @OneToMany(type => Request, request => request.projects)
    requests: Request[];

    @ManyToMany(type => Sector, sector => sector.projects)
    @JoinTable()
    sectors: Sector[];
}