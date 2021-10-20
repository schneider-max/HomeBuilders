import {createConnection} from "typeorm";
import {Logger} from '@overnightjs/logger';

const config = require("../../config/db.config");

createConnection(config).then(async connection => {

    Logger.Info(`Database connection Test started...`);
    if (connection.isConnected) {
        Logger.Info('Database connection Test finished successful!');
    }
    await connection.close();
    Logger.Info(`Database connection closed.`);
}).catch(error => {
    Logger.Info(`Database connection Test failed due to following error:`);
    Logger.Err(error);
});