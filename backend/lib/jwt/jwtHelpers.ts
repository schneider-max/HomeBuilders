import {Session} from "./jwtInterfaces";


export type PartialSession = Omit<Session, "issued" | "expires">;

export type DecodeResult =
    | {
    type: "valid";
    session: Session;
}
    | {
    type: "integrity-error";
}
    | {
    type: "invalid-token";
};

export enum ExpirationStatus { "expired" , "active" , "grace"}