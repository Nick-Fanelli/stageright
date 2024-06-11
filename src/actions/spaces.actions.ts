"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { IUser } from "@/models/user.model";
import { getUser } from "./user.actions";
import SpaceModel, { ISpace } from "@/models/space.model";
import { ILocation, locationSchema } from "@/models/location.model";
import { authenticationMiddleware, userMiddleware } from "./actionMiddleware";
import { ObjectId } from "mongoose"
import { ICategory, categorySchema } from "@/models/category.model";

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

    return result.space.locations;

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

export const deleteSpaceLocation = async (spaceId: string, locationId: string) : Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    result.space.locations = result.space.locations.filter(location => String(location._id) !== locationId);
    await result.space.save();

}

export const updateSpaceLocation = async (spaceId: string, locationId: string, locationName: string) : Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    const index = result.space.locations.findIndex(location => String(location._id) === locationId);

    if(index == -1) {
        throw new Error("Unknown location id " + locationId);
    }

    result.space.locations[index].locationName = locationName;
    await result.space.save();

}

// ======================================================================================================================================================
// Categories
// ======================================================================================================================================================
export const createDemoCategories = async (spaceId: string) : Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    result.space.categories = [

        { name: "Test Element", children: [
            { name: "Another Test "},
            { name: "Hey Hey "},
            { name: "Some Category "},
            { name: "This one is cool", children: [
                { name: "Super Nested", children: [
                    { name: "Super SUPER Nested", children: [] }
                ] }
            ]}
        ] },
        { name: "Final Element "}

    ];

   await result.space.save();

}

export const getSpaceCategories = async (spaceId: string) : Promise<ICategory[]> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    return result.space.categories;

}

export const createSpaceCategory = async (spaceId: string, parents: string[], name: string) => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    let targetArray = result.space.categories;

    for(let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if(index == -1) {
            break;
        }

        targetArray = targetArray[index].children || [];

    }
    
    targetArray.push({ name: name });

    await result.space.save();

}

export const deleteSpaceCategory = async (spaceId: string, parents: string[]) => {


    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if(!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    const id = parents.pop();

    let targetArray = result.space.categories;

    for(let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if(index == -1) {
            break;
        }

        
        targetArray = targetArray[index].children || [];

    }

    const index = targetArray.findIndex(cat => String(cat._id) === id);

    if(index == -1) {
        throw new Error("Could not find category to delete");
    }

    targetArray.splice(index, 1);

    await result.space.save();

}