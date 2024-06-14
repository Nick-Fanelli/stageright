"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import UserModel from "@/models/user.model";
import { Session } from "next-auth";

export const authenticationMiddleware = async () => {

    await connectDB();

    const session = await auth();

    if(!session || !session.user || !session.user.email) {
        throw new Error("Not Authenticated");
    }

    return session;

}

export const userMiddleware = async (session: Session) => {

    await connectDB();

    const user = await UserModel.findOne({ email: session.user?.email });

    if(!user) {

        if(!session.user || !session.user.email) {
            throw new Error("Invalid user session");
        }

        const newUser = await UserModel.create({ email: session.user.email });
        return await newUser.save();
    }

    return user;

}