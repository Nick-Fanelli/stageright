import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import UserModel from "./models/user.model";
import connectDB from "./lib/db";

export default {
    providers: [Google],
    callbacks: {
        async signIn({ account, profile }) {

            if(!profile || !profile.email)
                return false;

            return true;

        }
    }
} satisfies NextAuthConfig;