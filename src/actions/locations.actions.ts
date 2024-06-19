"use server";

import { ILocation } from "@/models/location.model";
import { getSpace } from "./spaces.actions";

export const getSpaceLocations = async (id: string): Promise<ILocation[]> => {

    const space = await getSpace(id);

    return space.locations;

}

export const createSpaceLocation = async (spaceId: string, locationName: string): Promise<void> => {

    const space = await getSpace(spaceId);

    space.locations = [...space.locations, { locationName: locationName }];

    await space.save();

}

export const deleteSpaceLocation = async (spaceId: string, locationId: string): Promise<void> => {

    const space = await getSpace(spaceId);

    space.locations = space.locations.filter(location => String(location._id) !== locationId);
    await space.save();

}

export const updateSpaceLocation = async (spaceId: string, locationId: string, locationName: string): Promise<void> => {

    const space = await getSpace(spaceId);

    const index = space.locations.findIndex(location => String(location._id) === locationId);

    if (index == -1) {
        throw new Error("Unknown location id " + locationId);
    }

    space.locations[index].locationName = locationName;
    await space.save();

}