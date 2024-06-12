import { faBox, faDisplay, faIdBadge, faLocationDot, faLocationPin, faLocationPinLock, faMoneyCheck, faSitemap, faTag, faTags } from "@fortawesome/free-solid-svg-icons";
import SideBarItem from "./SideBarItem";

type Props = {

    spaceId: string

}

const SideBarItems = (props: Props) => {

    const generateURL = (page: string) => `/space/${props.spaceId}/${page}`;

    return (
        <div className="w-full h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center">
            <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} />
            <div className="divider">Assets</div>
            <SideBarItem displayName="Assets" icon={faBox} route={generateURL("assets")} />
            <SideBarItem displayName="Locations" icon={faLocationDot} route={generateURL("locations")} />
            <SideBarItem displayName="Categories" icon={faTags} route={generateURL("categories")} />
            <div className="divider">Space Admin</div>
            <SideBarItem displayName="Access Control" icon={faIdBadge} route={generateURL("accessControl")} />
            <SideBarItem displayName="Billing" icon={faMoneyCheck} route={generateURL("billing")} />
        </div>
    );

}

export default SideBarItems;