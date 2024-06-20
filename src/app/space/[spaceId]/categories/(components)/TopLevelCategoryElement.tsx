"use client";

import { deleteSpaceCategory } from "@/actions/categories.actions";
import { CategoryNode, extrapolateParents } from "../CategoriesHierarchy";
import CreateNewCategoryElement from "./CreateNewCategoryElement";
import { useRouter } from "next/navigation";

type Props = {

    spaceId: string
    name: string,
    children: React.ReactNode | React.ReactNode[],
    node: CategoryNode,
    select?: boolean

}

const TopLevelCategoryElement = (props: Props) => {

    const router = useRouter();

    return (
        <li onClick={(e) => {
            if(props.select)
                (document.getElementById("cat_modal_form") as HTMLFormElement)?.requestSubmit();
            e.stopPropagation();
        }}>
            <details open className="" onClick={(e) => e.preventDefault()}>

                <summary className="flex">
                    <div className="flex justify-between w-full">
                        <p>{props.name}</p>
                        {
                            props.select ||
                            <>
                                <div className="flex gap-4 mr-5">
                                    <p className="link" onClick={async (e) => {
                                        e.preventDefault();

                                        const confirmation = window.confirm("Are you sure you want to delete this category with all of its sub-categories?");

                                        if (confirmation) {

                                            await deleteSpaceCategory(props.spaceId, extrapolateParents(props.node));
                                            router.refresh();

                                        }

                                    }}>Delete</p>
                                </div>
                            </>
                        }

                    </div>
                </summary>

                <ul>
                    {props.children}
                    {
                        props.select || <CreateNewCategoryElement spaceId={props.spaceId} parent={props.node} />
                    }
                </ul>
            </details>
        </li>
    )

}

export default TopLevelCategoryElement;