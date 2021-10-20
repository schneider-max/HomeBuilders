import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import { Project } from '../db/entities/entity.project';
import { BaseController, logger } from './base.controller';

@Controller('api/projects')
export class ProjectController extends BaseController {

    @Get('')
    @Middleware([logger])
    public async get(req: Request, res: Response): Promise<any> {
        const projects = await getRepository(Project).find();       
        return res.status(this.Ok).json(projects);
    }

    @Post('')
    @Middleware([logger])    
    public async post(req: Request, res: Response): Promise<any> {
        const project = getRepository(Project).create(req.body);
        const results = await getRepository(Project).save(project);        
        return res.status(this.Ok).json(results);
    }
}