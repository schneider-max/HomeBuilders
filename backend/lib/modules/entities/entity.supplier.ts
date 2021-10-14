import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Sector } from './entity.sector';
import { Request } from './entity.request';

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName: string;

    @Column()
    email: string;

    @Column()
    webPage: URL;

    @ManyToMany(type => Request, request => request.suppliers)
    requests: Request[];

    @ManyToMany(type => Sector, sector => sector.suppliers)
    sectors: Sector[];
}