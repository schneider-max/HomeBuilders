import {Controller, Get, Middleware, Post} from '@overnightjs/core';
import {Project} from '../db/entities/entity.project';
import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {BaseController} from './base.controller';
import {logger} from '../middleware/logger.mw';
import {authMw} from '../middleware/auth.mw';
import {Request as ReqestEntity} from "../db/entities/entity.request";

@Controller('api/requests')
export class RequestController extends BaseController {
    @Get(':email')
    @Middleware([logger, authMw])
    public async get(req: Request, res: Response): Promise<any> {
        const email = req.params.email.toLowerCase();
        const projects = await getRepository(Project)
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.requests', 'request')
            .leftJoinAndSelect('request.sectors', 'sector')
            .where('project.customerEmail = :email', {email})
            .getMany();

        return res.status(this.Ok).json(projects);
    }

    @Post('')
    @Middleware([logger, authMw])
    public async createNewRequest(req: Request, res: Response): Promise<any> {
        req.body.creationDate = new Date();

        const requests = getRepository(ReqestEntity).create(req.body);
        console.log(req.body);
        const results = await getRepository(ReqestEntity).save(requests);

        return res.status(this.Ok).json(results);
    }
}
