import SignInButton from "@/components/SignInButton";
import { signIn } from "next-auth/react";
import Link from "next/link"

const Page = () => {
    
    return (
        <>
            <SignInButton />
            <Link href="/app">
                <button className="btn btn-primary">To App</button>
            </Link>
        </>
    )

}

export default Page;