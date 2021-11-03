import { Logger } from '@overnightjs/logger';
import { NextFunction, Request, Response } from 'express';

// logging middleware for controller methods
export const logger = (req: Request, res: Response, next: NextFunction) => {
    Logger.Info(`[${req.method}]` + req.originalUrl);
    next();
};
