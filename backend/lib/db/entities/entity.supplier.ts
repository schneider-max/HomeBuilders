import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Sector } from './entity.sector';
import { Request } from './entity.request';

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    companyName: string;

    @Column({
        type: "nvarchar",
        length: 255,
        charset: "utf8"
    })
    email: string;

    @Column({
        type: "nvarchar",
        length: 255,
        nullable: true,
        default: null,
        charset: "utf8"
    })
    webPage: string;
    
    @ManyToMany(type => Sector, sector => sector.suppliers)
    sectors: Sector[];

    @OneToMany(type => Request, request => request.suppliers)
    requests: Request[];
}