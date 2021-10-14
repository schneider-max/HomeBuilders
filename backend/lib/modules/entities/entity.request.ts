import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Project } from './entity.project';
import { Sector } from './entity.sector';
import { Supplier } from './entity.supplier';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accepted: boolean;

    @Column()
    creationDate: Date;

    @Column()
    subject: string;

    @Column()
    message: string;

    @Column()
    price: number;

    @ManyToOne(type => Project, project => project.requests)
    projects: Project[];

    @ManyToMany(type => Sector, sector => sector.requests)
    @JoinTable()
    sectors: Sector[];

    @ManyToMany(type => Supplier, supplier => supplier.requests)
    @JoinTable()
    suppliers: Supplier[];
}