import { Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express'
import { Md5 } from 'ts-md5';
import { getRepository } from 'typeorm';

import { Customer } from '../db/entities/entity.customer';
import { ICustomer } from '../modules/interfaces';
import { BaseController, logger } from './base.controller';

@Controller('api/customers')
export class CustomerController extends BaseController {

    @Get('')
    @Middleware([logger])
    public async get(req: Request, res: Response): Promise<any> {
        const customers = await getRepository(Customer).find();       
        return res.status(this.Ok).json(this.mapDBOToDTO(customers));
    }

    @Get(':email')
    @Middleware([logger])
    public async getById(req: Request, res: Response): Promise<any> {
        const customer = await getRepository(Customer).findOne(req.params.email);      
        if (customer != null)
            return res.status(this.Ok).json(this.mapDBOToDTO([customer]));
        else
            return res.status(this.NotFound).json(null);
    }

    @Get(':email/:password')
    @Middleware([logger])
    public async getLogin(req: Request, res: Response): Promise<any> {
        const customer = await getRepository(Customer).findOne(req.params.email);       
        if (customer?.password === Md5.hashStr(req.params.password))
            return res.status(this.Ok).json(null);
        else
            return res.status(this.Unauthorized).json(null);
    }

    @Post('')
    @Middleware([logger])    
    public async post(req: Request, res: Response): Promise<any> {
        const customer = getRepository(Customer).create(req.body);
        const results = await getRepository(Customer).save(customer);        
        return res.status(this.Ok).json(this.mapDBOToDTO(results));
    }

    @Put('')
    @Middleware([logger])
    public async update(req: Request, res: Response): Promise<any> {
        const customer = await getRepository(Customer).findOne(req.body.email);   
        if (customer?.password === Md5.hashStr(req.body.password)) {
            getRepository(Customer).merge(customer, req.body);
            const result = await getRepository(Customer).save(customer);
            return res.status(this.Ok).json(this.mapDBOToDTO([result]));
        }
        else {
            return res.status(this.Unauthorized).json(null);
        }
    }

    @Delete(':email/:password')
    @Middleware([logger])
    public async delete (req: Request, res: Response): Promise<any> {
        const customer = await getRepository(Customer).findOne(req.params.email);
        if (customer?.password === Md5.hashStr(req.params.password)) {
            const results = await getRepository(Customer).delete(req.params.email);
            return res.status(this.Ok).json(results);
        }
        else
            return res.status(this.Unauthorized).json(null);
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