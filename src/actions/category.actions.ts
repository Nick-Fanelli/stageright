"use server";

import { ICategory } from "@/models/category.model";
import { editSpaceMiddleware, viewSpaceMiddleware } from "./actionMiddleware";
import SpaceModel from "@/models/space.model";

export const createDemoCategories = async (spaceId: string): Promise<void> => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('categories').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    res.categories = [
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


    await res.save();

}

export const getSpaceCategories = async (spaceId: string): Promise<ICategory[]> => {

    await viewSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('categories').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    return res.categories;

}

export const createSpaceCategory = async (spaceId: string, parents: string[], name: string) => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('categories').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    let targetArray = res.categories;

    for (let i = 0; i < parents.length; i++) {
        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if (index == -1) {
            break;
        }

        targetArray = targetArray[index].children || [];

    }

    targetArray.push({ name: name });

    await res.save();

}

export const deleteSpaceCategory = async (spaceId: string, parents: string[]) => {

    await editSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('categories').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    const id = parents.pop();

    let targetArray = res.categories;

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

    await res.save();

}

export const convertCategoryHierarchyToDisplayName = async (spaceId: string, parents: string[]) => {

    await viewSpaceMiddleware(spaceId);

    const res = await SpaceModel.findById(spaceId).select('categories').exec();

    if(!res) {
        throw new Error("Could not find categories for space");
    } 

    let returnString : string[] = [];

    let targetArray = res.categories;

    for(let i = 0; i < parents.length; i++) {

        const parent = parents[i];

        const index = targetArray.findIndex(curr => String(curr._id) === parent);

        if(index == -1) {
            break;
        }

        returnString.push(targetArray[index].name);

        targetArray = targetArray[index].children || [];

    }

    return returnString;

}