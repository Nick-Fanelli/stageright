"use server";

import { generateAssetUUID } from "@/lib/uuid";
import { IAsset } from "@/models/assets.model";
import { editSpaceMiddleware, viewSpaceMiddleware } from "./actionMiddleware";
import SpaceModel from "@/models/space.model";

export const createNewAsset = async (spaceId: string, name: string, locationId?: string) : Promise<string> => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('assets locations').exec();

    if(!res) {
        throw new Error("Could not find asset in space");
    }

    let uuid = generateAssetUUID(); // Generate new UUID
    let collisionDetectionCount = 0;

    // Verify that the UUID is unique
    while(collisionDetectionCount < 10) {

        const index = res.assets.findIndex((asset) => asset.uuid === uuid);

        if(index == -1)
            break;

        collisionDetectionCount++;

    }

    let asset: IAsset = { uuid: uuid, name, location: undefined };

    // Verify and add location
    if(locationId) {
        const location = res.locations.find((location) => String(location._id) === locationId);

        if(location) { // Valid locationId
            asset.location = location._id;
        }
    }

    // Push new asset into the array
    res.assets = [...res.assets, asset];
    
    await res.save();

    return uuid;

}

export const deleteAsset = async (spaceId: string, assetId: string) => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select("assets").exec();

    if(!res) {
        throw new Error("Could not find asset in space");
    }

    const assetIndex = res.assets.findIndex((asset) => String(asset._id) === assetId);

    if(assetIndex == -1) {
        throw new Error(`Asset with id: ${assetId} not found`);
    }

    res.assets.splice(assetIndex, 1);

    await res.save();
    
}

export const getAssets = async (spaceId: string) => {

    await viewSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('assets').exec();

    return res?.assets || [];

}