import * as controllers from './controllers';
import * as express from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { createConnection } from 'typeorm';

class RouterServer extends Server {
    private readonly SERVER_START_MSG: string = 'Server started at port: ';
    private readonly SERVER_CONFIG = require('./config/server.config');
    private readonly DB_CONFIG = require('./config/db.config');

    constructor() {
        super();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.setupConnection();
        this.setupControllers();
    }

    public start(port?: number): void {
        // use custom port if specified, else use config port
        const _port: number = port ?? this.SERVER_CONFIG.port;
        this.app.listen(_port, () => {
            Logger.Imp(this.SERVER_START_MSG + _port);
        });
    }

    // dynamically get exported controllers and add them to server
    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                Logger.Info(`Adding controller to server: ${controller.name}`);
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }

    // create db connection object at startup
    // use getConnection/getRespository to use this connection
    private setupConnection(): void {
        createConnection(this.DB_CONFIG)
            .then(async connection => {
                Logger.Imp(`Connection to ${connection.options.database} successful!`);
            })
            .catch(error => console.log(error));
    }
}

export default RouterServer;
