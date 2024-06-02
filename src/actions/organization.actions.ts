"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import OrganizationModel, { IOrganization } from "@/models/organization.models";
import { IUser } from "@/models/user.model";
import { getUser } from "./user.actions";

export const createOrganization = async (organizationName: string) : Promise<IOrganization | null> => {

    await connectDB();

    const session = await auth();
    const dbUser = await getUser();

    if(!session || !session.user || !dbUser)
        return null;

    const organization = await OrganizationModel.create({ name: organizationName, owner: dbUser.id });
    return await organization.save();

}

export const getAllUserOrganizations = async () : Promise<IOrganization[]> => {

    await connectDB();

    const session = await auth();
    const dbUser = await getUser();

    if(!session || !session.user || !dbUser)
        return [];

    return await OrganizationModel.find({ owner: dbUser.id }).exec();

}