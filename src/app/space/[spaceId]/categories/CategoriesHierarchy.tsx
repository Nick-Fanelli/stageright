import Link from "next/link";
import { SpaceParams } from "../layout";
import { getSpaceCategories } from "@/actions/spaces.actions";
import { ICategory } from "@/models/category.model";
import CreateNewCategoryElement from "./(components)/CreateNewCategoryElement";
import CategoryElement from "./(components)/CategoryElement";
import TopLevelCategoryElement from "./(components)/TopLevelCategoryElement";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const CategoriesHierarchy = async (props: Props) => {

    const categories = await getSpaceCategories(props.spaceId);

    let children: React.ReactNode[] = [];

    const categoryToElement = (category: ICategory) : React.ReactNode => {

        if(category.children && category.children.length > 0) {
            let children: React.ReactNode[] = [];
            category.children.forEach((cat) => children.push(categoryToElement(cat)));

            return <TopLevelCategoryElement name={category.name} children={children} />;
        } else {
            return <CategoryElement name={category.name} />
        }

    }

    categories.forEach(cat => {

        children.push(categoryToElement(cat));

    });

    children.push(<CreateNewCategoryElement />)

    return (
        <ul className="menu w-full rounded-box">

            {children}

            {/* <li>
                <details open className="">

                    <summary className="flex">
                        <div className="flex justify-between w-full">
                            <p>Test Element</p>
                            <div className="flex gap-4 mr-5">
                                <Link className="link" href="#">New Sub-Category</Link>
                                <Link className="link" href="#">Delete</Link>
                            </div>
                        </div>
                    </summary>

                    <ul>
                        <li>
                            <div className="flex justify-between w-full">
                                <p>Test Element</p>
                                <div className="flex gap-4 mr-5">
                                    <Link className="link" href="#">New Sub-Category</Link>
                                    <Link className="link" href="#">Delete</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-between w-full">
                                <p>Test Element</p>
                                <div className="flex gap-4 mr-5">
                                    <Link className="link" href="#">New Sub-Category</Link>
                                    <Link className="link" href="#">Delete</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-between w-full">
                                <p>Test Element</p>
                                <div className="flex gap-4 mr-5">
                                    <Link className="link" href="#">New Sub-Category</Link>
                                    <Link className="link" href="#">Delete</Link>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="flex justify-between w-full">
                                <p className="text-primary">[ Create New Category]</p>
                            </div>
                        </li>

                    </ul>

                </details>
            </li>

            <li>
                <div className="flex justify-between w-full">
                    <p>Test Element</p>
                    <div className="flex gap-4 mr-5">
                        <Link className="link" href="#">New Sub-Category</Link>
                        <Link className="link" href="#">Delete</Link>
                    </div>
                </div>
            </li>

            <li>
                <div className="flex justify-between w-full">
                    <p className="text-primary">[ Create New Category]</p>
                </div>
            </li> */}
        </ul>
    );

}

export default CategoriesHierarchy;