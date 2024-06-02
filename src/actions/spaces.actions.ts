"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { IUser } from "@/models/user.model";
import { getUser } from "./user.actions";
import SpaceModel, { ISpace } from "@/models/space.models";

export const createSpace = async (spaceName: string) : Promise<ISpace | null> => {

    await connectDB();

    const session = await auth();
    const dbUser = await getUser();

    if(!session || !session.user || !dbUser)
        return null;

    const space = await SpaceModel.create({ name: spaceName, owner: dbUser.id });
    return await space.save();

}

export const getAllUserSpaces = async () : Promise<ISpace[]> => {

    await connectDB();

    const session = await auth();
    const dbUser = await getUser();

    if(!session || !session.user || !dbUser)
        return [];

    return await SpaceModel.find({ owner: dbUser.id }).exec();

}