import { createConnection, DeepPartial, getRepository } from 'typeorm';
import { Logger } from '@overnightjs/logger';
import { Customer } from '../entities/entity.customer';
import { Project } from '../entities/entity.project';
import { Sector } from '../entities/entity.sector';
import { Supplier } from '../entities/entity.supplier';

const config = require('../../config/db.config');
const mockData = require('../../../assets/sql/data/mock-data.json');

createConnection(config)
    .then(async connection => {
        Logger.Imp(`Database initialisation started...`);

        if (connection.isConnected) {
            let queryBuilder = connection.createQueryBuilder();

            // use get repo for auto hashed password and lowercase emails

            let customers = mockData.customers.map((customer: DeepPartial<Customer>) => getRepository(Customer).create({...customer}));
            await getRepository(Customer).save(customers);
            Logger.Info(`Customer table initialized`);

            let projects = mockData.projects.map((project: DeepPartial<Project>) => {
                let p = getRepository(Project).create({...project});
                p.customer.email = p.customer.email.toLowerCase();
                return p;
            });
            await getRepository(Project).save(projects);
            Logger.Info(`Project table initialized`);

            let sectors = mockData.sectors.map((sector: DeepPartial<Sector>) => getRepository(Sector).create({...sector}));
            await getRepository(Sector).save(sectors);
            Logger.Info(`Sector table initialized`);

            let suppliers = mockData.suppliers.map((supplier: DeepPartial<Supplier>) => getRepository(Supplier).create({...supplier}));
            await getRepository(Supplier).save(suppliers);
            Logger.Info(`Supplier table initialized`);

            await queryBuilder.delete().from('project_sectors_sector').execute();
            await queryBuilder
                .insert()
                .into('project_sectors_sector')
                .values(mockData.project_sectors_sector)
                .execute();
            Logger.Info(`project_sectors_sector table initialized`);

            await queryBuilder.delete().from('sector_suppliers_supplier').execute();
            await queryBuilder
                .insert()
                .into('sector_suppliers_supplier')
                .values(mockData.sector_suppliers_supplier)
                .execute();
            Logger.Info(`sector_suppliers_supplier table initialized`);
        }

        await connection.close();
        Logger.Imp('Database initialisation finished successful!');
    })
    .catch(error => {
        Logger.Warn(`Database initialisation failed due to following error:`);
        Logger.Err(error);
        Logger.Warn('If this error keeps occurring please delete everything in your db and start this script again.');
    });
