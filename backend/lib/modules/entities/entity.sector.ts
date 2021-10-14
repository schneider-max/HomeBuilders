import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Supplier } from './entity.supplier';
import { Project } from './entity.project';
import { Request } from './entity.request';

@Entity()
export class Sector {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Project, project => project.sectors)
    projects: Project[];

    @ManyToMany(type => Request, request => request.sectors)
    requests: Request[];

    @ManyToMany(type => Supplier, supplier => supplier.sectors)
    suppliers: Request[];
}