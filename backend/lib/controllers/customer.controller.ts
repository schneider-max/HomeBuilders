import { Controller, Delete, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express'
import { Md5 } from 'ts-md5';
import { getRepository } from 'typeorm';
import { Customer } from '../db/entities/entity.customer';

@Controller('api/customers')
export class CustomerController {

    @Get('')
    async get(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customers = await getRepository(Customer).find();
        return res.status(200).json(customers);
    }

    @Get(':email')
    async getById(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customer = await getRepository(Customer).findOne(req.params.email);
        return res.status(200).json(customer);
    }

    @Get(':email/:password')
    async getLogin(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customer = await getRepository(Customer).findOne(req.params.email);
        if (customer?.password === Md5.hashStr(req.params.password))
            return res.status(200).json({});
        else
            return res.status(401).json({});
    }

    @Post('')
    async post(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customer = await getRepository(Customer).create(req.body);
        const results = await getRepository(Customer).save(customer);
        return res.status(200).json(results);
    }

    @Delete(':email')
    async delete (req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const results = await getRepository(Customer).delete(req.params.email);
        return res.status(200).json(results);
    }
}