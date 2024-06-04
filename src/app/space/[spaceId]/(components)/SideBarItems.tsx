"use client";

import { faBox, faDisplay, faTag } from "@fortawesome/free-solid-svg-icons";
import SideBarItem from "./SideBarItem";
import { usePathname } from "next/navigation";

type Props = {

    spaceId: string

}

const SideBarItems = (props: Props) => {

    const pathname = usePathname();

    const generateURL = (page: string) => `/space/${props.spaceId}/${page}`;

    return (
        <div className="w-full overflow-y-auto flex flex-col items-center">
            <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} activePath={pathname} />
            <div className="divider">Assets</div>
            <SideBarItem displayName="Assets" icon={faBox} route={generateURL("assets")} activePath={pathname} />
            <SideBarItem displayName="Locations" icon={faBox} route={generateURL("locations")} activePath={pathname} />
            <SideBarItem displayName="Tags" icon={faTag} route={generateURL("tags")} activePath={pathname} />
            <div className="divider">Access Control</div>
            <SideBarItem displayName="Users" icon={faTag} route={generateURL("users")} activePath={pathname} />
        </div>
    );

}

export default SideBarItems;