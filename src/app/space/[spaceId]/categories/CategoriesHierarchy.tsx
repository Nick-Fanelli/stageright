import { getSpaceCategories } from "@/actions/categories.actions";
import { ICategory } from "@/models/category.model";
import CreateNewCategoryElement from "./(components)/CreateNewCategoryElement";
import CategoryElement from "./(components)/CategoryElement";
import TopLevelCategoryElement from "./(components)/TopLevelCategoryElement";

export const revalidate = 0;

export type CategoryNode = {
    
    id: string
    parent: CategoryNode | null
    
}

export const extrapolateParents = (node: CategoryNode) : string[] => {

    const path: string[] = [node.id];

    let currentNode = node.parent;

    while(currentNode != null) {
        path.push(currentNode.id);
        currentNode = currentNode.parent;
    }

    return path.reverse();
}

type Props = {

    spaceId: string,

}

const CategoriesHierarchy = async (props: Props) => {

    const categories = (await getSpaceCategories(props.spaceId)).sort((a, b) => {
        if(a.name > b.name)
            return 1;
        if(a.name < b.name)
            return -1;
        return 0;
    });

    let children: React.ReactNode[] = [];

    const categoryToElement = (category: ICategory, node: CategoryNode) : React.ReactNode => {

        if(category.children && category.children.length > 0) {
            let children: React.ReactNode[] = [];

            let sortedCatChildren = category.children.sort((a, b) => {
                if(a.name > b.name)
                    return 1;
                if(a.name < b.name)
                    return -1;
                return 0;
            });

            sortedCatChildren.forEach((cat) => children.push(categoryToElement(cat, { id: String(cat._id), parent: node })));

            return <TopLevelCategoryElement key={JSON.stringify(category)} name={category.name} node={node} spaceId={props.spaceId}>{children}</TopLevelCategoryElement>;
        } else {
            return <CategoryElement name={category.name} spaceId={props.spaceId} node={node} key={String(category._id)} />
        }

    }

    categories.forEach(cat => {

        children.push(categoryToElement(cat, { id: String(cat._id), parent: null }));

    });

    children.push(<CreateNewCategoryElement spaceId={props.spaceId} parent={null} key={"base new cat"} />)

    return (
        <ul className="menu w-full rounded-box">
            {children}
        </ul>
    );

}

export default CategoriesHierarchy;