import SignInButton from "@/components/SignInButton";
import Link from "next/link"

const Page = () => {
    
    return (
        <>
            <SignInButton />
            <Link href="/spaces">
                <button className="btn btn-primary">To App</button>
            </Link>
        </>
    )

}

export default Page;