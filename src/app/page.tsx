import SignInButton from "@/components/SignInButton";
import Link from "next/link"

const Page = () => {
    
    return (
        <>
            <h1>Stage Right Deployment</h1>
            <SignInButton />
            <Link href="/spaces">
                <button className="btn btn-primary">To App</button>
            </Link>
        </>
    )

}

export default Page;