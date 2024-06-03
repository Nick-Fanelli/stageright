import { auth } from "@/auth";
import { getUser } from "./user.actions";
import { Session } from "next-auth";
import UserModel, { IUser } from "@/models/user.model";

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

export const getUserAuth = async (): Promise<[ Session | null, IUser | null ]> => {
    "use server";

    const session = await auth();

    if(!session) {
        return [null, null];
    }

    if(!session.user) {
        return [session, null];
    }

    const user: IUser | null = await UserModel.findOne({ email: session.user.email });

    if(user != null) {
        return [session, user];
    }

    const newUser = await UserModel.create({ email: session.user.email });

    return [ session, user ];

}

export default ActionResponse;