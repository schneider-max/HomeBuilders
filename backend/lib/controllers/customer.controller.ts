import {Controller, Delete, Get, Middleware, Post, Put} from '@overnightjs/core';
import {json, Request, Response} from 'express';
import {logger} from '../middleware/logger.mw';
import {Md5} from 'ts-md5';
import {getRepository} from 'typeorm';

import {Customer} from '../db/entities/entity.customer';
import {BaseController} from './base.controller';
import {authMw} from "../middleware/auth.mw";
import {checkExpirationStatus, decodeSession, encodeSession} from "../jwt/jwtFunctions";
import {JWT_TOKEN} from "../jwt/tokens";
import {Session} from "../jwt/jwtInterfaces";

@Controller('api/customers')
export class CustomerController extends BaseController {
    @Get('')
    @Middleware([logger, authMw])
    public async get(req: Request, res: Response): Promise<any> {
        const customers = await getRepository(Customer).find();
        return res.status(this.Ok).json(customers);
    }

    @Get('validate')
    @Middleware([logger, authMw])
    public async getValidateToken(req: Request, res: Response): Promise<any> {
        let tokenString = req.header("X-JWT-Token");
        if(tokenString != null){
            let decodedSessionJsn = JSON.stringify(decodeSession(JWT_TOKEN, tokenString));
            checkExpirationStatus(JSON.parse(decodedSessionJsn).session);

            return res.status(this.Ok).json("Token is valid!");
        }else {
            return res.status(this.Unauthorized).json("Token is invalid!");
        }
    }

    @Get(':email/:password/projects')
    @Middleware([logger, authMw])
    public async getByIdWithProjects(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const customer = await getRepository(Customer)
            .createQueryBuilder('customer')
            .leftJoinAndSelect('customer.projects', 'project')
            .where('customer.email = :email', {email})
            .getMany();
        if (customer != null) return res.status(this.Ok).json(customer);
        else return res.status(this.NotFound).json(null);
    }

    @Post(':email')
    @Middleware([logger])
    public async getLogin(req: Request, res: Response): Promise<any> {
        const customer = await getRepository(Customer).findOne(req.params.email.toLowerCase());
        if (customer?.password === Md5.hashStr(req.body.password))
            return res.status(this.Ok).json(
            encodeSession(JWT_TOKEN, {id: customer.email, dateCreated: Date.now(), username: customer.firstname})
        );
        else return res.status(this.Unauthorized).json(null);
    }

    @Post('')
    @Middleware([logger])
    public async post(req: Request, res: Response): Promise<any> {
        const customer = getRepository(Customer).create(req.body);
        const existingCustomer = await getRepository(Customer).findOne(customer[0]?.email);
        if(existingCustomer){
            await getRepository(Customer).delete(existingCustomer.email);
        }
        const results = await getRepository(Customer).save(customer);
        return res.status(this.Ok).json(results);
    }

    @Put('')
    @Middleware([logger, authMw])
    public async update(req: Request, res: Response): Promise<any> {
        req.body.email = req.body.email.toLowerCase();
        const customer = await getRepository(Customer).findOne(req.body.email.toLowerCase());
        if (customer?.password === Md5.hashStr(req.body.password)) {
            getRepository(Customer).merge(customer, req.body);
            const result = await getRepository(Customer).save(customer);
            return res.status(this.Ok).json(result);
        } else return res.status(this.Unauthorized).json(null);
    }

    @Delete(':email/:password')
    @Middleware([logger, authMw])
    public async delete(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const customer = await getRepository(Customer).findOne(email);
        if (customer?.password === Md5.hashStr(req.params.password)) {
            const results = await getRepository(Customer).delete(email);
            return res.status(this.Ok).json(results);
        } else return res.status(this.Unauthorized).json(null);
    }
}
