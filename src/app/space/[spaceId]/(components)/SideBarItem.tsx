import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type Props = {
    
    displayName: string
    route: string
    icon?: IconDefinition
    selected?: boolean

}

const SideBarItem = (props: Props) => {

    return (
        <div className={`w-11/12 pl-5 rounded-md py-2 cursor-pointer hover:bg-base-300 ${props.selected ? "bg-base-300" : ""}`}>
            <Link href={props.route} className="flex justify-start items-center w-full h-full">
                {
                    props.icon &&
                    <FontAwesomeIcon icon={props.icon} className="w-5 h-5 mr-3" />
                }
                Dashboard
            </Link>
        </div>
    )

}

export default SideBarItem;