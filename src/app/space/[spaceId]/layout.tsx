import { ActionResponseCode } from "@/actions/actions";
import { getSpace } from "@/actions/spaces.actions";
import { auth } from "@/auth";
import { faDashboard, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { redirect } from "next/navigation";
import SideBarItem from "./(components)/SideBarItem";
import { headers } from "next/headers";
import { space } from "postcss/lib/list";

export const metadata = {
    title: 'Space | Stage Right',
    description: '',
}

const deriveActivePath = (url: string | null, spaceId: string) : string => {

    if(url == null) {
        console.warn("URL of NULL ", url);
        return "";
    }
    
    const parts = url.split(spaceId);

    if(parts.length !== 2) {
        console.warn("Weird URL", url);
        return "";
    }

    const split = parts[1].split("/");

    return split[1];

}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { spaceId: string } }) {

    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin");
    }

    if (!params || !params.spaceId) {
        console.warn("Params not found for spaces");
        redirect("/spaces");
    }

    const space = await getSpace(params.spaceId);

    if (space.code !== ActionResponseCode.SUCCESS || !space.payload) { // TODO: Handle not allowed, etc. differently
        console.warn("Not allowed");
        redirect("/spaces");
    }

    const activePath = deriveActivePath(headers().get('next-url'), params.spaceId);

    const generateURL = (page: string) => `/space/${params.spaceId}/${page}`;

    return (
        <section id="space" className="w-screen h-screen overflow-hidden grid" style={{ gridTemplateColumns: "300px auto" }}>

            <nav id="sidebar" className="bg-base-100 rounded-box">
                <div className="header h-16 text-base-content flex justify-center items-center w-full">
                    <Link className="btn btn-ghost text-2xl w-11/12" href={"/spaces"}>Stage Right</Link>
                </div>
                <div className="w-full overflow-y-auto flex flex-col items-center">
                    <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} selected={activePath === "dashboard"} />
                    <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} />
                    <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} />
                    <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} />
                </div>
            </nav>


            <div className="bg-base-300">

                <nav id="top-bar" className="navbar h-16 bg-base-100">
                    <div className="flex-1">
                        <div className="text-sm breadcrumbs ml-5">
                            <ul>
                                <li><Link href="#">lorem1</Link></li>
                                <li><Link href="#">lorem2</Link></li>
                                <li><Link href="#">lorem3</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-none">
                        <label className="swap swap-rotate mr-4">
                            <input type="checkbox" className="theme-controller" value="light" />
                            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Profile Picture" src={session.user?.image || ""} />
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

            </div>

        </section>
    );

}
