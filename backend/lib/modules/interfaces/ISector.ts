import { IElement } from "./IElement";
import { ISupplier } from "./ISupplier";

export interface ISector extends IElement  {
    name: string,
    suppliers: ISupplier[]
}