import { faBox, faDisplay, faSitemap, faTag } from "@fortawesome/free-solid-svg-icons";
import SideBarItem from "./SideBarItem";

type Props = {

    spaceId: string

}

const SideBarItems = (props: Props) => {

    const generateURL = (page: string) => `/space/${props.spaceId}/${page}`;

    return (
        <div className="w-full overflow-y-auto flex flex-col items-center">
            <SideBarItem displayName="Dashboard" icon={faDisplay} route={generateURL("dashboard")} />
            <div className="divider">Assets</div>
            <SideBarItem displayName="Assets" icon={faBox} route={generateURL("assets")} />
            <SideBarItem displayName="Locations" icon={faBox} route={generateURL("locations")} />
            <SideBarItem displayName="Categories" icon={faSitemap} route={generateURL("categories")} />
            <div className="divider">Access Control</div>
            <SideBarItem displayName="Users" icon={faTag} route={generateURL("users")} />
        </div>
    );

}

export default SideBarItems;