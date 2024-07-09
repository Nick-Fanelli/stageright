"use server";

import { AccessLevel } from "@/models/access.model";
import { administerSpaceMiddleware } from "./actionMiddleware";
import SpaceModel from "@/models/space.model";

export const getAccess = async (spaceId: string) => {

    await administerSpaceMiddleware(spaceId); // Ensure admin access

    const res = await SpaceModel.findById(spaceId).select('access').exec();

    return res?.access || [];

}

export const createAccess = async (spaceId: string, email: string, accessLevel: AccessLevel) => { 
    
    await administerSpaceMiddleware(spaceId); // Ensure admin access

    const res = await SpaceModel.findById(spaceId).select('access').exec();
    
    if(!res) {
        throw new Error("Could not find access in space");
    }

    res.access = [...res.access, { email: email, accessLevel: accessLevel }];

    await res.save();

}

export const deleteAccess = async (spaceId: string, accessId: string) => { 

    await administerSpaceMiddleware(spaceId); // Ensure admin access

    const res = await SpaceModel.findById(spaceId).select('access').exec();

    if(!res) {
        throw new Error("Could not find access in space");
    }

    res.access = res.access.filter(a => String(a._id) !== accessId);

    await res.save();

}