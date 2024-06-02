import NextAuth, { Session, User } from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user }) {

            const email = user.email;
            if(!email) return false;

            // Validate with mongodb

            return true;
        }
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    ...authConfig,
});