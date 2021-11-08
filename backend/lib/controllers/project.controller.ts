import { Controller, Delete, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { logger } from '../middleware/logger.mw';
import { createQueryBuilder, DeepPartial, getRepository } from 'typeorm';

import { Project } from '../db/entities/entity.project';
import { BaseController } from './base.controller';
import {authMw} from "../middleware/auth.mw";
import { Customer } from '../db/entities/entity.customer';
import { Sector } from 'db/entities/entity.sector';

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

    @Delete(':id')
    @Middleware([logger, authMw])
    public async deleteById(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        const project = await getRepository(Project).findOne(id);
        if (project != null) {
            await getRepository(Project).delete(project);
            return res.status(this.Ok).json(null);
        }
        else {
            return res.status(this.NotFound).json(null);
        }
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

        createQueryBuilder()
            .insert()
            .into('project_sectors_sector')
            .values(req.body.sectors.map((sectorId: any) => {
                return {
                    projectId: results[0].id,
                    sectorId: sectorId
                }
            }))
            .execute();

        return res.status(this.Ok).json(results);
    }
}
