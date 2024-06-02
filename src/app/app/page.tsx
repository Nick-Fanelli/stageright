import Link from "next/link";
import OrganizationCard from "./OrganizationCard";
import { useAuthorizedMiddleware } from "@/lib/middleware";
import { getUser } from "@/actions/user.actions";

export const metadata = {
    title: 'App | Stage Right',
    description: '',
}

const App = async () => {

    const session = await useAuthorizedMiddleware();
    const user = await getUser();

    return (
        <section id="app" className="h-screen w-screen overflow-hidden">
            <header className="">
                <nav className="navbar bg-base-200">
                    <div className="flex-1">
                        <button className="btn btn-ghost text-xl"><Link href="/">Stage Right</Link></button>
                    </div>
                    <div className="flex-none gap-2">
                        <label className="swap swap-rotate mr-4">
                            <input type="checkbox" className="theme-controller" value="light" />
                            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                        </label>
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
                    <h1 className="text-3xl font-bold">All Organizations</h1>
                    <Link href="/app/new-organization"><button className="ml-5 btn btn-primary">New Organization</button></Link>
                </div>

                <div id="organizations" className="w-screen h-screen overflow-y-auto">
                    <OrganizationCard name="WHS Theater" />
                    <h1>DATA: {JSON.stringify(user)}</h1>
                </div>

            </main>

            <footer className="bg-green-500">

            </footer>

        </section>
    )

}

export default App;