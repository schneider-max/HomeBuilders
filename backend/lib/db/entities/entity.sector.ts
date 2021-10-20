import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Supplier } from './entity.supplier';
import { Project } from './entity.project';
import { Request } from './entity.request';

@Entity()
export class Sector {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'nvarchar',
        length: 255,
        charset: 'utf8'
    })
    name: string;

    @OneToMany(type => Request, request => request.sectors)
    requests: Request[];

    @ManyToMany(type => Project, project => project.sectors)
    projects: Project[];

    @ManyToMany(type => Supplier, supplier => supplier.sectors)
    @JoinTable()
    suppliers: Supplier[];
}
