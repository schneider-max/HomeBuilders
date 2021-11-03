import {NextFunction, Request, Response} from 'express';
import {DecodeResult, ExpirationStatus} from "../jwt/jwtHelpers";
import {checkExpirationStatus, decodeSession, encodeSession} from "../jwt/jwtFunctions";
import {Session} from "../jwt/jwtInterfaces";
import {JWT_TOKEN} from "../jwt/tokens";


/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
export function authMw(request: Request, response: Response, next: NextFunction) {
    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    });

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = request.header(requestHeader);

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    const decodedSession: DecodeResult = decodeSession(JWT_TOKEN, header);

    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === ExpirationStatus.expired) {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }

     let session: Session;

    if (expiration === ExpirationStatus.grace) {
        // Automatically renew the session and send it back with the response
        const {token, expires, issued} = encodeSession(JWT_TOKEN, decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };

        response.setHeader(responseHeader, token);
    } else {
        session = decodedSession.session;
    }

    // Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session
    };

    next();
}