import { DBLogger } from '../db/maintenance/db.logger';

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'niklas',
    password: 'Password123',
    database: 'homebuildersdb',
    synchronize: true,
    logging: new DBLogger(),
    insecureAuth: true,
    entities: ['dist/db/entities/**/*.js']
};
