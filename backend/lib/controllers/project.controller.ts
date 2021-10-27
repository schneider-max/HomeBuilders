import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { logger } from 'middleware/logger.mw';
import { DeepPartial, getRepository } from 'typeorm';

import { Project } from '../db/entities/entity.project';
import { BaseController } from './base.controller';

@Controller('api/projects')
export class ProjectController extends BaseController {
    @Get('')
    @Middleware([logger])
    public async get(req: Request, res: Response): Promise<any> {
        const projects = await getRepository(Project).find();
        return res.status(this.Ok).json(projects);
    }

    @Get(':email')
    @Middleware([logger])
    public async getByCustomerId(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const projects = await getRepository(Project)
            .createQueryBuilder('project')
            .where('project.customerEmail = :email', { email })
            .getMany();
        return res.status(this.Ok).json(projects);
    }

    @Post('')
    @Middleware([logger])
    public async post(req: Request, res: Response): Promise<any> {
        const projects = [req.body].map((project: DeepPartial<Project>) => {
            let p = getRepository(Project).create(project);
            p.customer.email = p.customer.email.toLowerCase();
            return p;
        });
        const results = await getRepository(Project).save(projects);
        return res.status(this.Ok).json(results);
    }
}
