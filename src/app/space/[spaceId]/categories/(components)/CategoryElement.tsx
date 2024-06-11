"use client";

import { deleteSpaceCategory } from "@/actions/spaces.actions";
import { CategoryNode, extrapolateParents } from "../CategoriesHierarchy";
import { useRouter } from "next/navigation";

type Props = {

    name: string,
    spaceId: string
    node: CategoryNode

}

const CategoryElement = (props: Props) => {

    const router = useRouter();

    return (
        <li>
            <div className="flex justify-between w-full">
                <p>{props.name}</p>
                <div className="flex gap-4 mr-5">
                    <p className="link">New Sub-Category</p>
                    <p className="link" onClick={async () => {

                        const confirmation = window.confirm("Are you sure you want to delete this category with all of its sub-categories?");

                        if(confirmation) {

                            await deleteSpaceCategory(props.spaceId, extrapolateParents(props.node));
                            router.refresh();

                        }

                    }}>Delete</p>
                </div>
            </div>
        </li>
    )

}

export default CategoryElement;