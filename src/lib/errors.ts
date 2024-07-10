export class AccessDeniedError extends Error {

    constructor() {
        super("access denied");

        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }

}

export class NotAuthenticatedError extends Error {

    constructor() {
        super("not authenticated");

        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }

}

