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

export const createSpace = async (spaceName: string): Promise<ISpace | null> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const space = await SpaceModel.create({ name: spaceName, owner: dbUser.id });
    return await space.save();

}

export const getAllUserSpaces = async (): Promise<ISpace[]> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    return await SpaceModel.find({ owner: dbUser.id }).exec();

}

type IsUserAuthorizedForSpaceReturnType = {

    isAuthorized: boolean,
    space?: ISpace

}

const internalIsUserAuthorizedForSpace = async (userId: IUser['id'], spaceId: ISpace['id']): Promise<IsUserAuthorizedForSpaceReturnType> => {

    await connectDB();

    const space = await SpaceModel.findById(spaceId);

    if (!space)
        return { isAuthorized: false };

    if (String(space.owner) !== String(userId)) {
        return { isAuthorized: false };
    }

    return {
        isAuthorized: true,
        space: space
    }

}

export const isUserAuthorizedForSpace = async (spaceId: ISpace['id']): Promise<IsUserAuthorizedForSpaceReturnType> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    return internalIsUserAuthorizedForSpace(dbUser?.id, spaceId);

}

export const getSpace = async (id: string): Promise<ISpace> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, id);

    if (!result.isAuthorized) {
        throw new Error("Access Denied");
    }

    if (!result.space) {
        throw new Error(`Space by id: ${id} not found!`);
    }

    return result.space;
}

// ======================================================================================================================================================
// Locations
// ======================================================================================================================================================
export const getSpaceLocations = async (id: string): Promise<ILocation[]> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, id);

    if (!result.isAuthorized) {
        throw Error("Access Denied");
    }

    if (!result.space) {
        throw Error("Unexpected Error")
    }

    return result.space.locations;

}

export const createSpaceLocation = async (spaceId: string, locationName: string): Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    result.space.locations = [...result.space.locations, { locationName: locationName }];

    await result.space.save();

}

export const deleteSpaceLocation = async (spaceId: string, locationId: string): Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    result.space.locations = result.space.locations.filter(location => String(location._id) !== locationId);
    await result.space.save();

}

export const updateSpaceLocation = async (spaceId: string, locationId: string, locationName: string): Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    const index = result.space.locations.findIndex(location => String(location._id) === locationId);

    if (index == -1) {
        throw new Error("Unknown location id " + locationId);
    }

    result.space.locations[index].locationName = locationName;
    await result.space.save();

}

// ======================================================================================================================================================
// Categories
// ======================================================================================================================================================
export const createDemoCategories = async (spaceId: string): Promise<void> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    result.space.categories = [
        {
            name: "Motorcycles", children: [
                {
                    name: "Cruiser", children: []
                },
                {
                    name: "Sportster", children: []
                },
                {
                    name: "Softail", children: [
                    ]
                },{
                    name: "Dyna", children: [
                    ]
                },
                {
                    name: "Trike", children: [
                    ]
                }
            ]
        },
        {
            name: "Parts", children: [
                {
                    name: "Engine Components", children: [
                        { name: "Air Cleaners" },
                        { name: "Carburetors" },
                        { name: "Fuel Injectors" },
                        { name: "Gaskets & Seals" },
                        { name: "Pistons & Cylinders" }
                    ]
                },
                {
                    name: "Electrical", children: [
                        { name: "Batteries" },
                        { name: "Starters" },
                        { name: "Alternators" },
                        { name: "Ignition Systems" },
                        { name: "Wiring Harnesses" }
                    ]
                },
                {
                    name: "Exhaust", children: [
                        { name: "Full Systems" },
                        { name: "Slip-Ons" },
                        { name: "Headers" },
                        { name: "Mufflers" },
                        { name: "Heat Shields" }
                    ]
                },
                {
                    name: "Brakes", children: [
                        { name: "Brake Pads" },
                        { name: "Brake Rotors" },
                        { name: "Brake Lines" },
                        { name: "Master Cylinders" }
                    ]
                },
                {
                    name: "Suspension", children: [
                        { name: "Forks" },
                        { name: "Shocks" },
                        { name: "Springs" },
                        { name: "Swingarms" }
                    ]
                },
                {
                    name: "Transmission", children: [
                        { name: "Clutches" },
                        { name: "Gearboxes" },
                        { name: "Belts & Chains" },
                        { name: "Shift Levers" }
                    ]
                }
            ]
        },
        {
            name: "Accessories", children: [
                {
                    name: "Riding Gear", children: [
                        { name: "Helmets" },
                        { name: "Jackets" },
                        { name: "Gloves" },
                        { name: "Boots" },
                        { name: "Riding Pants" }
                    ]
                },
                {
                    name: "Luggage", children: [
                        { name: "Saddlebags" },
                        { name: "Tank Bags" },
                        { name: "Tail Bags" },
                        { name: "Backpacks" }
                    ]
                },
                {
                    name: "Electronics", children: [
                        { name: "GPS Systems" },
                        { name: "Audio Systems" },
                        { name: "Communication Devices" },
                        { name: "Mounts & Holders" }
                    ]
                },
                {
                    name: "Custom Accessories", children: [
                        { name: "Mirrors" },
                        { name: "Handlebars" },
                        { name: "Foot Pegs" },
                        { name: "Grips" }
                    ]
                }
            ]
        },
        {
            name: "Maintenance", children: [
                {
                    name: "Oils & Fluids", children: [
                        { name: "Engine Oil" },
                        { name: "Transmission Fluid" },
                        { name: "Brake Fluid" },
                        { name: "Coolant" }
                    ]
                },
                {
                    name: "Tools", children: [
                        { name: "Wrenches" },
                        { name: "Sockets" },
                        { name: "Screwdrivers" },
                        { name: "Specialty Tools" }
                    ]
                },
                {
                    name: "Cleaning Supplies", children: [
                        { name: "Wash & Wax" },
                        { name: "Polishes" },
                        { name: "Detailing Kits" },
                        { name: "Brushes & Sponges" }
                    ]
                }
            ]
        },
        {
            name: "Tires & Wheels", children: [
                {
                    name: "Tires", children: [
                        { name: "Front Tires" },
                        { name: "Rear Tires" },
                        { name: "Dual Sport Tires" },
                        { name: "Racing Tires" }
                    ]
                },
                {
                    name: "Wheels", children: [
                        { name: "Alloy Wheels" },
                        { name: "Spoked Wheels" },
                        { name: "Wheel Accessories" },
                        { name: "Hubcaps" }
                    ]
                }
            ]
        },
        {
            name: "Apparel", children: [
                {
                    name: "Men's Apparel", children: [
                        { name: "T-Shirts" },
                        { name: "Hoodies" },
                        { name: "Caps" },
                        { name: "Vests" }
                    ]
                },
                {
                    name: "Women's Apparel", children: [
                        { name: "T-Shirts" },
                        { name: "Hoodies" },
                        { name: "Caps" },
                        { name: "Vests" }
                    ]
                },
                {
                    name: "Kid's Apparel", children: [
                        { name: "T-Shirts" },
                        { name: "Hoodies" },
                        { name: "Caps" }
                    ]
                }
            ]
        }
    ];


    await result.space.save();

}

export const getSpaceCategories = async (spaceId: string): Promise<ICategory[]> => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    return result.space.categories;

}

export const createSpaceCategory = async (spaceId: string, parents: string[], name: string) => {

    const session = await authenticationMiddleware();
    const dbUser = await userMiddleware(session);

    const result = await internalIsUserAuthorizedForSpace(dbUser.id, spaceId);

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    let targetArray = result.space.categories;

    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if (index == -1) {
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

    if (!result.isAuthorized || !result.space) {
        throw new Error("Access Denied");
    }

    const id = parents.pop();

    let targetArray = result.space.categories;

    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if (index == -1) {
            break;
        }


        targetArray = targetArray[index].children || [];

    }

    const index = targetArray.findIndex(cat => String(cat._id) === id);

    if (index == -1) {
        throw new Error("Could not find category to delete");
    }

    targetArray.splice(index, 1);

    await result.space.save();

}