"use client";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    
    displayName: string
    route: string
    icon?: IconDefinition

}

const SideBarItem = (props: Props) => {

    const pathname = usePathname();

    return (
        <Link className={`w-11/12 pl-5 rounded-md py-2 cursor-pointer hover:bg-base-300 ${pathname.startsWith(props.route) ? "bg-base-300" : ""}`} href={props.route}>
            <div className="flex justify-start items-center w-full h-full">
                {
                    props.icon &&
                    <FontAwesomeIcon icon={props.icon} className="w-5 h-5 mr-3" />
                }
                {props.displayName}
            </div>
        </Link>
    )

}

export default SideBarItem;