"use client";

import { useRouter } from "next/navigation";
import { CategoryNode, extrapolateHierarchyId } from "../CategoriesHierarchy";

type Props = {

    spaceId: string
    parent: CategoryNode | null

}

const CreateNewCategoryElement = (props: Props) => {

    const router = useRouter();

    return (
        <li onClick={() => {

            const parentHierarchy: string[] = props.parent ? extrapolateHierarchyId(props.parent) : [];

            router.push(`/space/${props.spaceId}/categories/new?parent=${parentHierarchy}`);
        }}>
            <div className="flex justify-between w-full">
                <p className="text-primary">[ New Category ]</p>
            </div>
        </li>
    )

}

export default CreateNewCategoryElement;