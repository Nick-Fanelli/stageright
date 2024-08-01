"use server";

import SpaceModel from "@/models/space.model";
import { editSpaceMiddleware, viewSpaceMiddleware } from "./actionMiddleware";
import { IItem } from "@/models/item.model";

export const createNewItem = async (spaceId: string, sku: string, name: string, locationId?: string) => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('items locations').exec();

    if(!res) {
        throw new Error("Could not find asset in space");
    }

    // Ensure no SKU collisions
    if(res.items.findIndex((item) => item.sku === sku) != -1) { // Is Collision
        throw new Error("SKU Collision");
    }

    let item: IItem = { sku, name, location: undefined, quantity: 0 };

    // Verify and add location
    if(locationId) {
        const location = res.locations.find((location) => String(location._id) === locationId);

        if(location) { // Valid locationId
            item.location = location._id;
        }
    }

    // Push new item into array
    res.items = [...res.items, item];

    await res.save();

}

export const deleteItem = async (spaceId: string, itemId: string) => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select("items").exec();

    if(!res) {
        throw new Error("Could not find asset in space");
    }

    const itemIndex = res.items.findIndex((item) => String(item._id) === itemId);

    if(itemIndex == -1) {
        throw new Error(`Item with id: ${itemId} not found`);
    }

    res.items.splice(itemIndex, 1);

    await res.save();

}

export const getItems = async (spaceId: string) => {

    await viewSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('items').exec();

    return res?.items || [];

}   