import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express'
import { Logger } from '@overnightjs/logger';

@Controller('api/customers')
export class CustomerController {

    @Get(':id')
    get(req: Request, res: Response): any {
        Logger.Info(req.params.id);
        return res.status(200).json({msg: 'get_called'});
    }
}