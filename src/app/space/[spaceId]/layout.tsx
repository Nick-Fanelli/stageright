import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SideBarItems from "./(components)/SideBarItems";
import ThemeController from "@/app/components/ThemeController";
import Image from "next/image";
import { isUserAuthorizedForSpace } from "@/actions/spaces.actions";

export const metadata = {
    title: 'Space | Stage Right',
    description: '',
}

export type SpaceParams = {

    spaceId: string

}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: SpaceParams }) {

    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin");
    }

    if (!params || !params.spaceId) {
        console.warn("Params not found for spaces");
        redirect("/spaces");
    }

    const isAuthorized = await isUserAuthorizedForSpace(params.spaceId);

    if(!isAuthorized) {
        console.warn("Access Denied");
        redirect("/spaces");
    }
    
    return (
        <section id="space" className="w-screen h-screen overflow-hidden grid" style={{ gridTemplateColumns: "300px auto" }}>

            <nav id="sidebar" className="bg-base-100 rounded-box">
                <div className="header h-16 text-base-content flex justify-center items-center w-full">
                    <Link className="btn btn-ghost text-2xl w-11/12" href={"/spaces"}>Stage Right</Link>
                </div>
                <SideBarItems spaceId={params.spaceId} />
            </nav>

            <div className="bg-base-300 grid" style={{gridTemplateRows: "4rem auto"}}>

                <nav id="top-bar" className="navbar bg-base-100 h-full">
                    <div className="flex-1">
                        {/* <div className="text-sm breadcrumbs ml-5">
                            <ul>
                                <li><Link href="#">lorem1</Link></li>
                                <li><Link href="#">lorem2</Link></li>
                                <li><Link href="#">lorem3</Link></li>
                            </ul>
                        </div> */}
                    </div>
                    <div className="flex-none">
                        <ThemeController />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image alt="Profile Picture" src={session.user?.image || ""} fill />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a className="justify-between">Profile</a></li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="w-full h-full relative">
                    {children}
                </div>

            </div>

        </section>
    );

}
