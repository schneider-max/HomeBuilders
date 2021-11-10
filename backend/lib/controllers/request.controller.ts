import {Controller, Get, Middleware, Post} from '@overnightjs/core';
import {Project} from '../db/entities/entity.project';
import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {BaseController} from './base.controller';
import {logger} from '../middleware/logger.mw';
import {authMw} from '../middleware/auth.mw';
import {Request as RequestEntity, RequestStatus} from "../db/entities/entity.request";

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

    @Post(':requestId/:status')
    @Middleware([logger, authMw])
    public async postRequestStatus(req: Request, res: Response): Promise<any> {
        try {
            const id: string = req.params.requestId;
            const status: RequestStatus = req.params.status as RequestStatus;
            await getRepository(RequestEntity)
                .createQueryBuilder("request")
                .update<RequestEntity>(RequestEntity, {status: status})
                .where("request.id = :id", { id: id })
                .execute();

            return res.status(this.Ok).json(null);
        } catch (ex: any) {
            return res.status(this.BadRequest).json("Request update failed due to the following error: </br>" + ex);
        }
    }

    @Post('')
    @Middleware([logger, authMw])
    public async createNewRequest(req: Request, res: Response): Promise<any> {
        try {
            const reqRequest = req.body;
            reqRequest.creationDate = new Date();

            let request = getRepository(RequestEntity).create(reqRequest);
            const result = await getRepository(RequestEntity).save(request);
            return res.status(this.Ok).json(result);
        } catch (ex: any) {
            return res.status(this.BadRequest).json("Request creation failed due to the following error: </br>" + ex);
        }
    }
}
