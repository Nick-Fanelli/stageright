"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {

    const session = useSession();

    if(session && session.data) {
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.data.user?.name}</p>
                <button className="btn btn-error" onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }

    return (
        <button className="btn btn-success ml-auto" onClick={() => signIn("google")}>Sign In</button>
    )

}

export default SignInButton;