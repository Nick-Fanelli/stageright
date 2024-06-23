import { auth, signIn, signOut } from "@/auth";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";

const SignInButton = async () => {

    const session = await auth();

    if(!session) { // Not Logged In
        return (
            <form action={async () => {
                "use server";
                await signIn("google");
            }}>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        )
    } else {
        return (
            <form action={async () => {
                "use server";
                redirect("/spaces");
            }}>
                <button type="submit" className="btn btn-primary">Go To App</button>
            </form>
        )
    }


}

export default SignInButton;