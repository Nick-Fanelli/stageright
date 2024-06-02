"use server";

import connectDB from "@/lib/db";
import UserModel from "@/models/userModel";

export const getUsers = async () => {

    await connectDB();

    const user = new UserModel({ email: "test@gmail.com" });
    await user.save();


    return { user };

}