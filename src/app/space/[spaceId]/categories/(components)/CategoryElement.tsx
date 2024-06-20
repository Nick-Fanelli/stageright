"use client";

import { deleteSpaceCategory } from "@/actions/categories.actions";
import { CategoryNode, extrapolateParents } from "../CategoriesHierarchy";
import { useRouter } from "next/navigation";

type Props = {

    name: string,
    spaceId: string
    node: CategoryNode
    select?: boolean

}

const CategoryElement = (props: Props) => {

    const router = useRouter();

    return (
        <li onClick={(e) => {
            if(props.select)
                (document.getElementById("cat_modal_form") as HTMLFormElement)?.requestSubmit();
            e.stopPropagation();
        }}>
            <div className="flex justify-between w-full">
                <p>{props.name}</p>
                <div className="flex gap-4 mr-5">
                    {
                        props.select ||
                        <>
                            <p className="link" onClick={async () => {

                                const parentHierarchy: string[] = extrapolateParents(props.node);
                                router.push(`/space/${props.spaceId}/categories/new?parent=${parentHierarchy}`);

                            }}>New Sub-Category</p>
                            <p className="link" onClick={async () => {

                                const confirmation = window.confirm("Are you sure you want to delete this category with all of its sub-categories?");

                                if (confirmation) {

                                    await deleteSpaceCategory(props.spaceId, extrapolateParents(props.node));
                                    router.refresh();

                                }

                            }}>Delete</p>
                        </>
                    }

                </div>
            </div>
        </li>
    )

}

export default CategoryElement;