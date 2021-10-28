import { NextFunction, Request, Response } from 'express';

// auth middleware for controller methods
export const authMw = (req: Request, res: Response, next: NextFunction) => {

    next();
};
