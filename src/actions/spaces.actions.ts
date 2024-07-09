"use server";

import SpaceModel, { ISpace } from "@/models/space.model";
import { actionMiddleware, viewSpaceMiddleware } from "./actionMiddleware";
import { AccessLevel } from "@/models/access.model";
import { space } from "postcss/lib/list";

export type UserSpaceRelationship = AccessLevel | "owner" | undefined;

export const getUserRelationshipToSpace = async (spaceId: string) : Promise<UserSpaceRelationship> => {

    const [ _, dbUser ] = await actionMiddleware();

    const res = await SpaceModel.findById(spaceId).select("owner access").exec();

    if(res?.owner && String(res.owner) === String(dbUser.id)) {
        return "owner";
    }

    const access = res?.access.find((access) => access.email === dbUser.email);

    return access?.accessLevel;

}

export const createSpace = async (spaceName: string): Promise<ISpace | null> => {

    const [ _, dbUser ] = await actionMiddleware();

    const space = await SpaceModel.create({ name: spaceName, owner: dbUser.id });
    return await space.save();

}

export const getAllUserSpaces = async (): Promise<ISpace[]> => {

    const [ _, dbUser ] = await actionMiddleware();

    return await SpaceModel.find({
        $or: [
            { owner: dbUser.id },
            { "access.email": dbUser.email }
        ]
    })
    .exec();

}

export type SpaceStats = {

    name: string,
    numUsers: number,
    numLocations: number,
    numCategories: number

}

export const getSpaceStats = async (spaceId: string) : Promise<SpaceStats> => {

    await viewSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('name access.length locations.length categories.length').exec();

    if(!res) {
        throw new Error("Could not get stats of space");
    }

    return {

        name: res.name,
        numUsers: res.access.length,
        numLocations: res.locations.length,
        numCategories: res.categories.length

    }   

}