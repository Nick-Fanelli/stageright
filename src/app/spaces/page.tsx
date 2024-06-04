import Link from "next/link";
import { useAuthorizedMiddleware } from "@/lib/middleware";
import { getUser } from "@/actions/user.actions";
import Spaces from "./Spaces";
import ThemeController from "../components/ThemeController";

export const metadata = {
    title: 'Spaces | Stage Right',
    description: '',
}

const App = async () => {

    const session = await useAuthorizedMiddleware();

    return (
        <section id="spaces" className="h-screen w-screen overflow-hidden">
            <header className="">
                <nav className="navbar bg-base-200">
                    <div className="flex-1">
                        <button className="btn btn-ghost text-xl"><Link href="/">Stage Right</Link></button>
                    </div>
                    <div className="flex-none gap-2">
                        <ThemeController />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Profile Picture" src={session.user?.image || "https://t3.ftcdn.net/jpg/03/79/17/00/360_F_379170051_7No0Yg8z2uxbyby4Y0WFDNCBZo18tNGr.jpg"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                                <li><Link href="">Profile</Link></li>
                                <li><Link href="">Profile</Link></li>
                                <li><Link href="">Profile</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="">
                <div className="flex items-center pl-10 pt-7">
                    <h1 className="text-3xl font-bold">All Spaces</h1>
                    <Link href="/spaces/new"><button className="ml-5 btn btn-primary">New Space</button></Link>
                </div>

                <Spaces />

            </main>

            <footer className="bg-green-500">

            </footer>

        </section>
    )

}

export default App;