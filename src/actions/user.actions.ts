"use server";

import { auth } from "@/auth";
import UserModel, { IUser } from "@/models/user.model";
import connectDB from "@/lib/db";

export const getUser = async () : Promise<IUser | null> => { 
    
    await connectDB();

    const session = await auth();

    if(!session) {
        return null;
    }

    if(!session.user) {
        return null;
    }

    const user: IUser | null = await UserModel.findOne({ email: session.user.email });

    if(user != null) {
        return user;
    }

    const newUser = await UserModel.create({ email: session.user.email });
    return await newUser.save();

}