import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

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