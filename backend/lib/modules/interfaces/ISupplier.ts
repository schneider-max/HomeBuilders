import { IElement } from "./IElement";

export interface ISupplier extends IElement {
    companyName: string,
    email: string,
    webPage: URL
}