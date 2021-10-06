import { IProject } from "./IProject";

export interface ICustomer {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    projects: IProject[]
}