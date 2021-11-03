import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { logger } from '../middleware/logger.mw';
import { DeepPartial, getRepository } from 'typeorm';

import { Project } from '../db/entities/entity.project';
import { BaseController } from './base.controller';
import {authMw} from "../middleware/auth.mw";
import { Customer } from '../db/entities/entity.customer';

@Controller('api/projects')
export class ProjectController extends BaseController {
    @Get('')
    @Middleware([logger, authMw])
    public async get(req: Request, res: Response): Promise<any> {
        const projects = await getRepository(Project).find();
        return res.status(this.Ok).json(projects);
    }

    @Get(':email')
    @Middleware([logger, authMw])
    public async getByCustomerId(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const projects = await getRepository(Project)
            .createQueryBuilder('project')
            .where('project.customerEmail = :email', { email })
            .getMany();
        return res.status(this.Ok).json(projects);
    }

    @Post('')
    @Middleware([logger, authMw])
    public async post(req: Request, res: Response): Promise<any> {
        const email = req.body.email;
        const project = req.body.project;

        const customer = await getRepository(Customer)
            .createQueryBuilder('customer')
            .leftJoinAndSelect('customer.projects', 'project')
            .where('customer.email = :email', {email})
            .getOneOrFail();

        const projects = [project].map((project: DeepPartial<Project>) => {
            let p = getRepository(Project).create(project);
            p.customer = customer;
            return p;
        });

        const results = await getRepository(Project).save(projects);
        return res.status(this.Ok).json(results);
    }
}
