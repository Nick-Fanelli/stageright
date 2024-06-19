"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import UserModel, { IUser } from "@/models/user.model";
import { Session } from "next-auth";

export const actionMiddleware = async (middlewareCallbacks?: [() => Promise<boolean>]): Promise<[Session, IUser]> => {

    await connectDB();

    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        throw new Error("Not Authenticated");
    }

    let user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {

        const newUserModel = await UserModel.create({ email: session.user.email });
        user = await newUserModel.save();

    }

    if (middlewareCallbacks) {
        middlewareCallbacks.forEach(async callback => {
            const result = await callback();

            if (!result) {
                throw new Error("Failed middleware callback");
            }
        });
    }

    return [session, user];

}