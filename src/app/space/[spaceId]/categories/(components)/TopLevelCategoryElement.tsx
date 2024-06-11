"use client";

import { deleteSpaceCategory } from "@/actions/spaces.actions";
import { CategoryNode, extrapolateParents } from "../CategoriesHierarchy";
import CreateNewCategoryElement from "./CreateNewCategoryElement";
import { useRouter } from "next/navigation";

type Props = {

    spaceId: string
    name: string,
    children: React.ReactNode | React.ReactNode[],
    node: CategoryNode

}

const TopLevelCategoryElement = (props: Props) => {

    const router = useRouter();

    return (
        <li>
            <details open className="">

                <summary className="flex">
                    <div className="flex justify-between w-full">
                        <p>{props.name}</p>
                        <div className="flex gap-4 mr-5">
                            <p className="link" onClick={async (e) => {
                                e.preventDefault();

                                const confirmation = window.confirm("Are you sure you want to delete this category with all of its sub-categories?");
        
                                if(confirmation) {
        
                                    await deleteSpaceCategory(props.spaceId, extrapolateParents(props.node));
                                    router.refresh();
        
                                }
        
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