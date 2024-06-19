"use server";

import SpaceModel, { ISpace } from "@/models/space.model";
import { ILocation } from "@/models/location.model";
import { actionMiddleware } from "./actionMiddleware";
import { ICategory } from "@/models/category.model";

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

// ======================================================================================================================================================
// Locations
// ======================================================================================================================================================
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

// ======================================================================================================================================================
// Categories
// ======================================================================================================================================================
export const createDemoCategories = async (spaceId: string): Promise<void> => {

    const space = await getSpace(spaceId);

    space.categories = [
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


    await space.save();

}

export const getSpaceCategories = async (spaceId: string): Promise<ICategory[]> => {

    const space = await getSpace(spaceId);

    return space.categories;

}

export const createSpaceCategory = async (spaceId: string, parents: string[], name: string) => {

    const space = await getSpace(spaceId);

    let targetArray = space.categories;

    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if (index == -1) {
            break;
        }

        targetArray = targetArray[index].children || [];

    }

    targetArray.push({ name: name });

    await space.save();

}

export const deleteSpaceCategory = async (spaceId: string, parents: string[]) => {

    const space = await getSpace(spaceId);

    const id = parents.pop();

    let targetArray = space.categories;

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

    await space.save();

}