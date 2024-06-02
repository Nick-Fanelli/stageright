import NextAuth from "next-auth";
import authConfig from "./auth.config";
import connectDB from "./lib/db";
import { IUser, userSchema } from "./models/user.model";
import { model } from "mongoose";

export const { auth, handlers, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    ...authConfig,
});