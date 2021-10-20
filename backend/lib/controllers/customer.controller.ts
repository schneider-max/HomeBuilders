import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express'
import { Md5 } from 'ts-md5';
import { getRepository } from 'typeorm';

import { Customer } from '../db/entities/entity.customer';
import { ICustomer } from '../modules/interfaces';

@Controller('api/customers')
export class CustomerController {

    @Get('')
    async get(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customers = await getRepository(Customer).find();       
        return res.status(200).json(this.mapDBOToDTO(customers));
    }

    @Get(':email')
    async getById(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customer = await getRepository(Customer).findOne(req.params.email);      
        if (customer != null)
            return res.status(200).json(this.mapDBOToDTO([customer]));
        else
            return res.status(404).json({});
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
        const customer = getRepository(Customer).create(req.body);
        const results = await getRepository(Customer).save(customer);        
        return res.status(200).json(this.mapDBOToDTO(results));
    }

    @Put('')
    async update(req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customer = await getRepository(Customer).findOne(req.body.email);   
        if (customer?.password === Md5.hashStr(req.body.password)) {
            getRepository(Customer).merge(customer, req.body);
            const result = await getRepository(Customer).save(customer);
            return res.status(200).json([result]);
        }
        else {
            return res.status(401).json({});
        }
    }

    @Delete(':email/:password')
    async delete (req: Request, res: Response): Promise<any> {
        Logger.Info(`[${req.method}]` + req.originalUrl);
        const customer = await getRepository(Customer).findOne(req.params.email);
        if (customer?.password === Md5.hashStr(req.params.password)) {
            const results = await getRepository(Customer).delete(req.params.email);
            return res.status(200).json(results);
        }
        else
            return res.status(401).json({});
    }

    private mapDBOToDTO(customers: Customer[]): ICustomer[] {
        let results: ICustomer[] = [];
        customers.forEach(c => {
            results.push(<ICustomer> {
                email: c.email,
                firstname: c.firstname,
                lastname: c.lastname
            });
        });
        return results;
    }
}