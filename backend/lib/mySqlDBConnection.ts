import {createConnection} from "typeorm";

let dbConf = require("./config/db.config");
createConnection(dbConf).then(async connection => {

    console.log("Connection successful!");
    connection.query("Select * from Customer").then(r => console.log(r));

}).catch(error => console.log(error));