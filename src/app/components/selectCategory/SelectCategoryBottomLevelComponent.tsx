"use client";

import { extrapolateParents } from "@/app/space/[spaceId]/categories/CategoriesHierarchy";

type Props = {

    name: string,
    parentsExtrapolated: string[]
        
}

const SelectCategoryBottomLevelComponent = (props: Props) => {

    return (
        <li onClick={(e) => {
            e.stopPropagation();

            const catReturnInput = document.getElementById("cat-return-input") as HTMLInputElement;
            
            if(catReturnInput) {
                catReturnInput.value = JSON.stringify(props.parentsExtrapolated);
                catReturnInput.dispatchEvent(new Event('change'));
            }
            
            (document.getElementById("cat_modal") as HTMLDialogElement)?.close();
        }}>
            <div className="flex justify-between w-full">
                <p>{props.name}</p>
            </div>
        </li>
    )

}

export default SelectCategoryBottomLevelComponent;