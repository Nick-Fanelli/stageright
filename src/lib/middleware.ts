import { auth, signIn } from "@/auth"
import { RedirectType, redirect } from "next/navigation";

export const useAuthorizedMiddleware = async () => {
    "use server";

    const session = await auth();

    if(!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return session;

}