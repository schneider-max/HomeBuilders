import * as bodyParser from 'body-parser'
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';


class HomeBuilderServer extends Server {

   private readonly SERVER_START_MSG = 'Server started at port: ';
   private readonly config = require("./config/server.config");

   constructor() {
      super();

      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: true}));
      this.setupControllers();
   }

   public start(port?: number): void {
      // use custom port if specified, else use config port
      const _port: number = port ?? this.config.port;  
      this.app.listen(_port, () => {
         Logger.Imp(this.SERVER_START_MSG + _port);
      });
   }

   // get exported controllers and add them to server
   private setupControllers(): void {
      const controllerInstances = [];
      for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
               Logger.Info(`Adding controller to server: ${controller.name}`)
               controllerInstances.push(new controller());
            }
      }
      super.addControllers(controllerInstances);
   }
}

export default HomeBuilderServer;