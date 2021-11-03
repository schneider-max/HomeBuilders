
export interface Session {
    id: string;
    dateCreated: number;
    username: string;
    /**
     * Timestamp indicating when the session was created, in Unix milliseconds.
     */
    issued: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
}

export interface EncodeResult {
    token: string,
    expires: number,
    issued: number
}