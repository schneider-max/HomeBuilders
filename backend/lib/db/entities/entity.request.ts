import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Project } from './entity.project';
import { Sector } from './entity.sector';
import { Supplier } from './entity.supplier';

enum RequestStatus {
    canceled = "c",
    pending = "p",
    accepted = "a"
}

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

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
        scale: 2,
        nullable: true,
        default: null
    })
    budget: number;

    @Column({
        type: 'nvarchar',
        length: 255,
        charset: 'utf8'
    })
    email: string;

    @Column({
        type: 'enum',
        enum: RequestStatus,
        default: RequestStatus.pending
    })
    status: RequestStatus;

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

    @BeforeInsert()
    @BeforeUpdate()
    emailToLower() {
        if (this.email) {
            this.email = this.email.toLowerCase();
        }
    }
}
