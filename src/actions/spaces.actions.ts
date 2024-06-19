"use server";

import SpaceModel, { ISpace } from "@/models/space.model";
import { actionMiddleware } from "./actionMiddleware";

export const isUserAuthorizedForSpace = async (spaceId: string) : Promise<boolean> => {

    try {
        await getSpace(spaceId);
    } catch(e) {
        console.error(e);
        return false;
    }

    return true;

}

export const createSpace = async (spaceName: string): Promise<ISpace | null> => {

    const [ _, dbUser ] = await actionMiddleware();

    const space = await SpaceModel.create({ name: spaceName, owner: dbUser.id });
    return await space.save();

}

export const getAllUserSpaces = async (): Promise<ISpace[]> => {

    const [ _, dbUser ] = await actionMiddleware();

    return await SpaceModel.find({ owner: dbUser.id }).exec();

}

export const getSpace = async (spaceId: string): Promise<ISpace> => {

    const space = await SpaceModel.findById(spaceId);

    if(!space) {
        throw new Error(`Space with id: ${spaceId}, could not be found`);
    }

    const [ _, dbUser ] = await actionMiddleware();

    // If is admin/owner
    if(String(space.owner) === String(dbUser.id)) {
        return space;
    }

    throw new Error("Access Denied");

}