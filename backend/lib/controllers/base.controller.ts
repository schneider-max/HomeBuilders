import { Logger } from '@overnightjs/logger';
import { NextFunction, Request, Response } from 'express';

export class BaseController {
    protected readonly Ok: number = 200;
    protected readonly Created: number = 201;
    protected readonly BadRequest: number = 400;
    protected readonly Unauthorized: number = 401;
    protected readonly NotFound: number = 404;
    protected readonly InternalServerError: number = 500;
}

// logging middleware for controller methods
export const logger = (req: Request, res: Response, next: NextFunction) => {
    Logger.Info(`[${req.method}]` + req.originalUrl);
    next();
};
