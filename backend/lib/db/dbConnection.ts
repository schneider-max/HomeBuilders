import {createConnection} from "typeorm";
import { Logger } from '@overnightjs/logger';
import { compileFunction } from 'vm';
import { Customer } from './entities/entity.customer';

const config = require("../config/db.config");

createConnection(config).then(async connection => {

    Logger.Imp(`Connection to ${connection.name} successful!`);

    let repo = connection.manager.getRepository(Customer);
    let customers = await repo.find();

    console.log(customers);

}).catch(error => console.log(error));