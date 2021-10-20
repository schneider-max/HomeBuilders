import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Project } from './entity.project';
import { Sector } from './entity.sector';
import { Supplier } from './entity.supplier';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accepted: boolean;

    @Column({
        type: 'datetime'
    })
    creationDate: Date;

    @Column({
        type: 'nvarchar',
        length: 255,
        charset: 'utf8'
    })
    subject: string;

    @Column({
        type: 'text',
        charset: 'utf8'
    })
    message: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 0,
        nullable: true,
        default: null
    })
    price: number;

    @ManyToOne(type => Project, project => project.requests, {
        nullable: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    projects: Project;

    @ManyToOne(type => Sector, sector => sector.requests, {
        nullable: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    sectors: Sector;

    @ManyToOne(type => Supplier, supplier => supplier.requests, {
        nullable: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    suppliers: Supplier;
}
