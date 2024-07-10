"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { AccessDeniedError, NotAuthenticatedError } from "@/lib/errors";
import SpaceModel from "@/models/space.model";
import UserModel, { IUser } from "@/models/user.model";
import { Session } from "next-auth";
import { space } from "postcss/lib/list";

export const actionMiddleware = async (): Promise<[Session, IUser]> => {

    await connectDB();

    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        throw new NotAuthenticatedError();
    }

    let user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {

        const newUserModel = await UserModel.create({ email: session.user.email });
        user = await newUserModel.save();

    }

    return [session, user];

}

export const viewSpaceMiddleware = async (spaceId: string) => {

    await connectDB();

    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        throw new NotAuthenticatedError();
    }

    let user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {
        const newUserModel = await UserModel.create({ email: session.user.email });
        user = await newUserModel.save();
    }

    const res = await SpaceModel.findById(spaceId).select('owner access').exec();

    if(res?.owner && String(res.owner) === String(user.id)) { // IS AUTHORIZED
        return; 
    }

    const access = res?.access.find((access) => access.email === user.email);

    if(!access) {
        throw new AccessDeniedError();
    }

}

export const editSpaceMiddleware = async (spaceId: string) => {
 
    await connectDB();

    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        throw new NotAuthenticatedError();
    }

    let user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {
        const newUserModel = await UserModel.create({ email: session.user.email });
        user = await newUserModel.save();
    }

    const res = await SpaceModel.findById(spaceId).select('owner access').exec();

    if(res?.owner && String(res.owner) === String(user.id)) { // IS AUTHORIZED
        return; 
    }

    const access = res?.access.find((access) => access.email === user.email);

    if(!access) {
        throw new AccessDeniedError();
    }

    if(access.accessLevel === "admin" || access.accessLevel === "editor") {
        return; // Allow
    } else {
        throw new AccessDeniedError();
    }

}

export const administerSpaceMiddleware = async (spaceId: string) => {
 
    await connectDB();

    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        throw new NotAuthenticatedError();
    }

    let user = await UserModel.findOne({ email: session.user?.email });

    if (!user) { // TODO: SEE IF I WANT TO CREATE A USER
        const newUserModel = await UserModel.create({ email: session.user.email });
        user = await newUserModel.save();
    }

    const res = await SpaceModel.findById(spaceId).select('owner access').exec();

    if(res?.owner && String(res.owner) === String(user.id)) { // IS AUTHORIZED
        return; 
    }

    const access = res?.access.find((access) => access.email === user.email);

    if(!access) {
        throw new AccessDeniedError();
    }

    if(access.accessLevel === "admin") {
        return; // Allow
    } else {
        throw new AccessDeniedError();      
    }

}

export const ownSpaceMiddleware = async (spaceId: string) => {
 
    await connectDB();

    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        throw new NotAuthenticatedError();
    }

    let user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {
        const newUserModel = await UserModel.create({ email: session.user.email });
        user = await newUserModel.save();
    }

    const res = await SpaceModel.findById(spaceId).select('owner').exec();

    if(res?.owner && String(res.owner) === String(user.id)) { // IS AUTHORIZED
        return; 
    }

    throw new AccessDeniedError();

}