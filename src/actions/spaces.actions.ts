"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { IUser } from "@/models/user.model";
import { getUser } from "./user.actions";
import SpaceModel, { ISpace } from "@/models/space.models";
import { ILocation, locationSchema } from "@/models/location.model";
import { authenticationMiddleware, userMiddleware } from "./actionMiddleware";

export const createSpace = async (spaceName: string) : Promise<ISpace | null> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const space = await SpaceModel.create({ name: spaceName, owner: dbUser.id });
    return await space.save();

}

export const getAllUserSpaces = async () : Promise<ISpace[]> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    return await SpaceModel.find({ owner: dbUser.id }).exec();

}

type IsUserAuthorizedForSpaceReturnType = {

    isAuthorized: boolean,
    space?: ISpace

}

const internalIsUserAuthorizedForSpace = async (userId: IUser['id'], spaceId: ISpace['id']) : Promise<IsUserAuthorizedForSpaceReturnType> => {

    await connectDB();

    const space = await SpaceModel.findById(spaceId);

    if(!space)
        return { isAuthorized: false };

    if(String(space.owner) !== String(userId)) {
        return { isAuthorized: false };
    }

    return {
        isAuthorized: true,
        space: space
    }

}

export const isUserAuthorizedForSpace = async (spaceId: ISpace['id']) : Promise<IsUserAuthorizedForSpaceReturnType> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    return internalIsUserAuthorizedForSpace(dbUser?.id, spaceId);

}

export const getSpace = async (id: string) : Promise<ISpace> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, id);

    if(!result.isAuthorized) {
        throw new Error("Access Denied");
    }

    if(!result.space) {
        throw new Error(`Space by id: ${id} not found!`);
    }

    return result.space;
}

// ======================================================================================================================================================
// Locations
// ======================================================================================================================================================
export const getSpaceLocations = async (id: string) : Promise<ILocation[]> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, id);

    if(!result.isAuthorized) {
        throw Error("Access Denied");
    }

    if(!result.space) {
        throw Error("Unexpected Error")
    }

    let locations: ILocation[] = [];
    
    result.space.locations.forEach((location) => {
        locations.push({ locationName: location.locationName });        
    }); 

    return locations;

}

export const createSpaceLocation = async (spaceId: string, locationName: string) : Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    result.space.locations = [...result.space.locations, { locationName: locationName }];

    await result.space.save();

}