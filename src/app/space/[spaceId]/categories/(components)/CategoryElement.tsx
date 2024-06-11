"use client";

import { CategoryNode, extrapolateHierarchyId } from "../CategoriesHierarchy";

type Props = {

    name: string,
    node: CategoryNode

}

const CategoryElement = (props: Props) => {

    return (
        <li>
            <div className="flex justify-between w-full">
                <p>{props.name}</p>
                <div className="flex gap-4 mr-5">
                    <p className="link">New Sub-Category</p>
                    <p className="link">Delete</p>
                </div>
            </div>
        </li>
    )

}

export default CategoryElement;