import { NextRequest, NextResponse } from "next/server";
import { auth, signIn } from "./auth";
import { Session } from "next-auth";
import { NextApiRequest } from "next";

type AccessControlResponse = { isAccessGranted: boolean, redirectURL?: string };
type AccessControlRule = (req: Session | null) => AccessControlResponse;

const PublicAccessControlRule: AccessControlRule = () => { return { isAccessGranted: true }; }
const AuthorizedControlRule: AccessControlRule = (req) => { 
    if(req && req !== null && req !== undefined)
        return { isAccessGranted: true };
    return { isAccessGranted: false, redirectURL: "/api/auth/signin" };
} 

const AccessControlMap: Record<string, AccessControlRule> = {

    // ========================================================================================================================
    // PUBLIC
    // ========================================================================================================================
    "/": PublicAccessControlRule,
    "/favicon.ico": PublicAccessControlRule,
    "/public/*": PublicAccessControlRule,
    "/_next/static/*": PublicAccessControlRule,

    "/api/auth/*": PublicAccessControlRule,

    // ========================================================================================================================
    // AUTHORIZED
    // ========================================================================================================================
    "/app": AuthorizedControlRule

}

const matchURL = (pattern: string, url: string) => {

    // * Wild card
    pattern = pattern.replaceAll("*", '(.*)');

    // Add start and end anchors for exact matching
    return new RegExp(`^${pattern}$`).test(url);

}

const runAccessControlOnURL = (auth: Session | null, url: string) : AccessControlResponse => {

    const accessControl = Object.entries(AccessControlMap).find(([urlRegex, _]) => {
        const routeMatch = matchURL(urlRegex, url);
        return routeMatch;
    });

    if(!accessControl) {
        console.warn(`No access control rule set for path: ${url}`);
        return { isAccessGranted: false, redirectURL: "/" };
    }

    const [, accessControlRule] = accessControl;
    return accessControlRule(auth);

}

export default auth(async (req) => {

    const accessControlResponse = runAccessControlOnURL(req.auth, req.nextUrl.pathname);

    if(accessControlResponse.isAccessGranted) {
        return NextResponse.next();
    } else {
        if(accessControlResponse.redirectURL) {
            return NextResponse.redirect(new URL(accessControlResponse.redirectURL, req.url));
        } else {
            return NextResponse.error();
        }
    }

});
