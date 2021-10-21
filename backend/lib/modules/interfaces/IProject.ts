import { IElement } from './IElement';

export interface IProject extends IElement {
    name: string;
    creationDate: Date;
    budget: number;
}
