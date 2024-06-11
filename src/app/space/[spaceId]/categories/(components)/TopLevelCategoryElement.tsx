"use client";

import { CategoryNode, extrapolateParents } from "../CategoriesHierarchy";
import CreateNewCategoryElement from "./CreateNewCategoryElement";

type Props = {

    spaceId: string
    name: string,
    children: React.ReactNode | React.ReactNode[],
    node: CategoryNode

}

const TopLevelCategoryElement = (props: Props) => {

    return (
        <li>
            <details open className="">

                <summary className="flex">
                    <div className="flex justify-between w-full">
                        <p>{props.name}</p>
                        <div className="flex gap-4 mr-5">
                            <p className="link" onClick={(e) => {
                                e.preventDefault();
                            }}>Delete</p>
                        </div>
                    </div>
                </summary>

                <ul>
                    {props.children}
                    <CreateNewCategoryElement spaceId={props.spaceId} parent={props.node} />
                </ul>
            </details>
        </li>
    )

}

export default TopLevelCategoryElement;