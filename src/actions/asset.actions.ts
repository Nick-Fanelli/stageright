"use server";

import { generateAssetUUID } from "@/lib/uuid";
import { getSpace } from "./spaces.actions";
import { IAsset } from "@/models/assets.model";
import mongoose, { Mongoose, ObjectId, SchemaTypes, Types } from "mongoose";

export const createNewAsset = async (spaceId: string, name: string, locationId?: string) : Promise<string> => {

    const space = await getSpace(spaceId);

    let uuid = generateAssetUUID(); // Generate new UUID
    let collisionDetectionCount = 0;

    // Verify that the UUID is unique
    while(collisionDetectionCount < 10) {

        const index = space.assets.findIndex((asset) => asset.uuid === uuid);

        if(index == -1)
            break;

        collisionDetectionCount++;

    }

    let asset: IAsset = { uuid: uuid, name, location: undefined };

    // Verify and add location
    if(locationId) {
        const location = space.locations.find((location) => String(location._id) === locationId);

        if(location) { // Valid locationId
            asset.location = location._id;
        }
    }

    // Push new asset into the array
    space.assets = [...space.assets, asset];
    
    await space.save();

    return uuid;

}