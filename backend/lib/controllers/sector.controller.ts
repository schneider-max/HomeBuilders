import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { logger } from '../middleware/logger.mw';
import { getRepository } from 'typeorm';

import { Project } from '../db/entities/entity.project';
import { BaseController } from './base.controller';
import {authMw} from "../middleware/auth.mw";
import { Sector } from '../db/entities/entity.sector';

@Controller('api/sectors')
export class SectorController extends BaseController {
    @Get('')
    @Middleware([logger, authMw])
    public async get(req: Request, res: Response): Promise<any> {
        const sectors = await getRepository(Sector).find();
        return res.status(this.Ok).json(sectors);
    }
    
    @Get(':projectId')
    @Middleware([logger, authMw])
    public async getSectorOfProject(req: Request, res: Response): Promise<any> {
        const projectId = req.params.projectId;
        const sectors = await getRepository(Project)
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.sectors', 'sector')
            .leftJoinAndSelect('sector.suppliers', 'supplier')
            .where('project.id = :projectId', {projectId})
            .getMany()
        return res.status(this.Ok).json(sectors);
    }
}
