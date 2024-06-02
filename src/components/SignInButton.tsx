import { auth, signIn, signOut } from "@/auth";

const SignInButton = async () => {

    const session = await auth();

    if(!session) { // Not Logged In
        return (
            <form action={async () => {
                "use server";
                await signIn("google");
            }}>
                <button type="submit" className="btn btn-neutral">Sign in with Google</button>
            </form>
        )
    } else {
        return (
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <h1>{session.user?.name}</h1>
                <button type="submit" className="btn btn-error">Sign Out</button>
            </form>
        )
    }


}

export default SignInButton;