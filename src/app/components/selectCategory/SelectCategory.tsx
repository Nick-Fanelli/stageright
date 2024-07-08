import { getSpaceCategories } from "@/actions/categories.actions";
import { CategoryNode, extrapolateParents } from "@/app/space/[spaceId]/categories/CategoriesHierarchy";
import { ICategory } from "@/models/category.model";
import React from "react";
import SelectTopLevelComponent from "./SelectTopLevelComponent";
import SelectCategoryBottomLevelComponent from "./SelectCategoryBottomLevelComponent";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const SelectCategory = async (props: Props) => {

    const categories = (await getSpaceCategories(props.spaceId)).sort((a, b) => {
        if (a.name > b.name)
            return 1;
        if (a.name < b.name)
            return -1;
        return 0;
    });

    let children: React.ReactNode[] = [];

    const categoryToElement = (category: ICategory, node: CategoryNode): React.ReactNode => { // TODO: ONLY EXTRAPOLATE PARENTS ON CLICK

        if (category.children && category.children.length > 0) {
            let children: React.ReactNode[] = [];

            let sortedCatChildren = category.children.sort((a, b) => {
                if (a.name > b.name)
                    return 1;
                if (a.name < b.name)
                    return -1;
                return 0;
            });

            sortedCatChildren.forEach((cat) => children.push(categoryToElement(cat, { id: String(cat._id), parent: node })));

            return <SelectTopLevelComponent name={category.name} id={String(category._id)} key={String(category._id)} children={children} parentsExtrapolated={extrapolateParents(node)} />
        } else {
            return <SelectCategoryBottomLevelComponent name={category.name} key={String(category._id)} parentsExtrapolated={extrapolateParents(node)} />
        }

    }

    categories.forEach(cat => {

        children.push(categoryToElement(cat, { id: String(cat._id), parent: null }));

    });

    return (

        <ul className="menu w-full rounded-box">
            {children}
        </ul>

    )

}

export default SelectCategory;