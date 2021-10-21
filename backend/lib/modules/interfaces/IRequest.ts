import { IElement } from './IElement';

export interface IRequest extends IElement {
    accepted: boolean;
    creationDate: Date;
    subject: string;
    message: string;
    price: number;
}
