import { Controller, Get, Middleware } from '@overnightjs/core';
import { Project } from '../db/entities/entity.project';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { BaseController, logger } from './base.controller';

@Controller('api/requests')
export class RequestController extends BaseController {
    @Get(':email')
    @Middleware([logger])
    public async get(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const projects = await getRepository(Project)
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.requests', 'request')
            .leftJoinAndSelect('request.sectors', 'sector')
            .where('project.customerEmail = :email', { email })
            .getMany();

        return res.status(this.Ok).json(projects);
    }
}
