"use server";

import { ILocation } from "@/models/location.model";
import { editSpaceMiddleware, viewSpaceMiddleware } from "./actionMiddleware";
import SpaceModel from "@/models/space.model";

export const getSpaceLocations = async (spaceId: string): Promise<ILocation[]> => {

    await viewSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('locations').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    return res.locations;

}

export const createSpaceLocation = async (spaceId: string, locationName: string): Promise<void> => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('locations').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    res.locations = [...res.locations, { locationName: locationName }];

    await res.save();

}

export const deleteSpaceLocation = async (spaceId: string, locationId: string): Promise<void> => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('locations').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    res.locations = res.locations.filter(location => String(location._id) !== locationId);
    await res.save();

}

export const updateSpaceLocation = async (spaceId: string, locationId: string, locationName: string): Promise<void> => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('locations').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    const index = res.locations.findIndex(location => String(location._id) === locationId);

    if (index == -1) {
        throw new Error("Unknown location id " + locationId);
    }

    res.locations[index].locationName = locationName;
    await res.save();

}