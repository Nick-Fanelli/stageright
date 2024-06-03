"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { IUser } from "@/models/user.model";
import { getUser } from "./user.actions";
import SpaceModel, { ISpace } from "@/models/space.models";
import ActionResponse, { ActionResponseCode, getUserAuth } from "./actions";

export const createSpace = async (spaceName: string) : Promise<ISpace | null> => {

    await connectDB();

    const [ session, dbUser ] = await getUserAuth();

    if(!session || !session.user || !dbUser)
        return null;

    const space = await SpaceModel.create({ name: spaceName, owner: dbUser.id });
    return await space.save();

}

export const getAllUserSpaces = async () : Promise<ISpace[]> => {

    await connectDB();

    const [ session, dbUser ] = await getUserAuth();

    if(!session || !session.user || !dbUser)
        return [];

    return await SpaceModel.find({ owner: dbUser.id }).exec();

}

type IsUserAuthorizedForSpaceReturnType = {

    isAuthorized: boolean,
    space?: ISpace

}

const isUserAuthorizedForSpace = async (userId: IUser['id'], spaceId: ISpace['id']) : Promise<IsUserAuthorizedForSpaceReturnType> => {

    const space = await SpaceModel.findById(spaceId);

    if(!space)
        return { isAuthorized: false };

    if(space.owner.text !== userId.text) {
        return { isAuthorized: false };
    }

    return {
        isAuthorized: true,
        space: space
    }

}

//Promise<ActionResponse<void>>

export const getSpace = async (id: string) : Promise<ActionResponse<ISpace>> => {

    await connectDB();

    const [ session, dbUser ] = await getUserAuth();

    if(session == null || dbUser == null)
        return { code: ActionResponseCode.NOT_AUTHENTICATED };

    const result = await isUserAuthorizedForSpace(dbUser?.id, id);

    if(!result.isAuthorized) {
        return { code: ActionResponseCode.ACCESS_DENIED };
    }

    return { 
        code: ActionResponseCode.SUCCESS,
        payload: result.space
    };

}