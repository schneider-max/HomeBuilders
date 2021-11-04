import { Controller, Get, Middleware } from '@overnightjs/core';
import { Project } from '../db/entities/entity.project';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { BaseController } from './base.controller';
import { logger } from '../middleware/logger.mw';
import { authMw } from '../middleware/auth.mw';

@Controller('api/requests')
export class RequestController extends BaseController {
    @Get(':email')
    @Middleware([logger, authMw])
    public async get(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const projects = await getRepository(Project)
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.requests', 'request')
            .where('project.customerEmail = :email', { email })
            .getMany();

        return res.status(this.Ok).json(projects);
    }
}
