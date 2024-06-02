import { getUsers } from "@/actions/userAction";
import SignInButton from "@/components/SignInButton";
import Link from "next/link"

const Page = () => {
    
    return (
        <>
            <SignInButton />
            <Link href="/app">
                <button className="btn btn-primary">To App</button>
            </Link>
            <form action={async () => {
                "use server";

                getUsers();
            }}>
                <button type="submit" className="btn btn-primary">Query Server</button>
            </form>
        </>
    )

}

export default Page;