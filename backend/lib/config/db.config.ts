import { DBLogger } from '../db/maintenance/db.logger';

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'HomeBuildersTest',
    password: 'Passwort12',
    database: 'homebuildersdb',
    synchronize: true,
    logging: new DBLogger(),
    insecureAuth: true,
    entities: ['dist/db/entities/**/*.js']
};
