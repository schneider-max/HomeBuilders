import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { Customer } from '../db/entities/entity.customer';

@Controller('api/customers')
export class CustomerController {

    @Get(':email')
    async get(req: Request, res: Response): Promise<any> {
        Logger.Info(req.originalUrl);
        let customers = await getRepository(Customer).find();
        return res.status(200).json(customers);
    }
}