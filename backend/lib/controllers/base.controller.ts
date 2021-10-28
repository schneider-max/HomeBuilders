export class BaseController {
    protected readonly Ok: number = 200;
    protected readonly Created: number = 201;
    protected readonly BadRequest: number = 400;
    protected readonly Unauthorized: number = 401;
    protected readonly NotFound: number = 404;
    protected readonly InternalServerError: number = 500;
}