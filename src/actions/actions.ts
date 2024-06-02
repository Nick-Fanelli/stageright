export enum ActionResponseCode {

    SUCCESS,
    UNEXPECTED_ERROR,
    NOT_AUTHENTICATED,
    ACCESS_DENIED,

}

type ActionResponse<T> = {

    code: ActionResponseCode,
    payload?: T

}

export default ActionResponse;