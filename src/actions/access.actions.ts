"use server";

import { AccessLevel } from "@/models/access.model";
import { getSpace } from "./spaces.actions";

export const getAccess = async (spaceId: string) => { // TODO: ENSURE ADMIN

    const space = await getSpace(spaceId);

    return space.access || [];

}

export const createAccess = async (spaceId: string, email: string, accessLevel: AccessLevel) => { // TODO: ENSURE ADMIN
    
    const space = await getSpace(spaceId); 

    space.access = [...space.access, { email: email, accessLevel: accessLevel }];

    await space.save();

}

export const deleteAccess = async (spaceId: string, accessId: string) => { // TODO: ENSURE ADMIN

    const space = await getSpace(spaceId);

    space.access = space.access.filter(a => String(a._id) !== accessId);

    await space.save();

}