import { Logger } from '@overnightjs/logger';
import { Logger as TypeORMLogger, QueryRunner } from 'typeorm';

export class DBLogger implements TypeORMLogger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    Logger.Info(query);
  }
  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    Logger.Err(error);
  }
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    Logger.Info(query);
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    Logger.Info(message);
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    Logger.Info(message);
  }
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log' || 'info':
        Logger.Info(message);
        break;
      case 'warn':
        Logger.Warn(message);
        break;
      default:
        break;
    }
  }
}
