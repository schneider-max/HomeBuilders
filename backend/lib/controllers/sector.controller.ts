import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { logger } from '../middleware/logger.mw';
import { getRepository } from 'typeorm';

import { Project } from '../db/entities/entity.project';
import { BaseController } from './base.controller';
import {authMw} from "../middleware/auth.mw";

@Controller('api/sectors')
export class SectorController extends BaseController {
    @Get(':projectId')
    @Middleware([logger, authMw])
    public async get(req: Request, res: Response): Promise<any> {
        const projectId = req.params.projectId;
        const sectors = await getRepository(Project)
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.sectors', 'sector')
            .where('project.id = :projectId', {projectId})
            .getMany()
        return res.status(this.Ok).json(sectors);
    }
}
