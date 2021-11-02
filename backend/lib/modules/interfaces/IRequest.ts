import { IElement } from './IElement';

export interface IRequest extends IElement {
    creationDate: Date;
    subject: string;
    message: string;
    budget: number;
    email: string;
}
