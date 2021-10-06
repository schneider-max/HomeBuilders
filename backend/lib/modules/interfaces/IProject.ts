import { IElement } from "./IElement";
import { IRequest } from "./IRequest";
import { ISector } from "./ISector";

export interface IProject extends IElement {
    name: string,
    creationDate: Date,
    budget: number,
    requests: IRequest[],
    sectors: ISector[]
}