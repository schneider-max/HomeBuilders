import {createConnection} from "typeorm";
import {Logger} from '@overnightjs/logger';
import {Customer} from "../entities/entity.customer";
import {Project} from "../entities/entity.project";
import {Sector} from "../entities/entity.sector";
import {Supplier} from "../entities/entity.supplier";

const config = require("../../config/db.config");
const insertsJsn = require("./inserts.json");


createConnection(config).then(async connection => {

    Logger.Imp(`Database initialisation started...`);

    if (connection.isConnected) {

        let queryBuilder = connection.createQueryBuilder();

        await queryBuilder.delete().from(Customer).execute();
        await queryBuilder.insert().into(Customer)
            .values(insertsJsn.customers)
            .execute();
        Logger.Info(`Customer table initialized`);

        await queryBuilder.delete().from(Project).execute();
        await queryBuilder.insert().into(Project)
            .values(insertsJsn.project)
            .execute();
        Logger.Info(`Project table initialized`);


        await queryBuilder.delete().from(Sector).execute();
        await queryBuilder.insert().into(Sector)
            .values(insertsJsn.sector)
            .execute();
        Logger.Info(`Sector table initialized`);


        await queryBuilder.delete().from(Supplier).execute();
        await queryBuilder.insert().into(Supplier)
            .values(insertsJsn.supplier)
            .execute();
        Logger.Info(`Supplier table initialized`);


        await queryBuilder.delete().from("project_sectors_sector").execute();
        await queryBuilder.insert().into("project_sectors_sector")
            .values(insertsJsn.project_sectors_sector)
            .execute();
        Logger.Info(`project_sectors_sector table initialized`);


        await queryBuilder.delete().from("sector_suppliers_supplier").execute();
        await queryBuilder.insert().into("sector_suppliers_supplier")
            .values(insertsJsn.sector_suppliers_supplier)
            .execute();
        Logger.Info(`sector_suppliers_supplier table initialized`);

    }

    await connection.close();
    Logger.Imp('Database initialisation finished successful!');

}).catch(error => {
    Logger.Info(`Database initialisation failed due to following error:`);
    Logger.Err(error);
    Logger.Info('If this error keeps occurring please delete everything in your db and start this script again.')
});