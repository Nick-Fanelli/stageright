import { createSpaceCategory, getSpaceCategories } from "@/actions/spaces.actions";
import { SpaceParams } from "../../layout";
import { redirect, useSearchParams } from "next/navigation";
import { ICategory } from "@/models/category.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";

const extrapolateParentObjectFromParentHierarchy = (categories: ICategory[], parentHierarchy: string[]): ICategory[] => {

    if (parentHierarchy.length <= 0)
        return [];

    let currentHierarchyNode: ICategory[] = categories;
    let returnHierarchy: ICategory[] = [];

    parentHierarchy.forEach(parent => {

        const curr = currentHierarchyNode.find(curr => String(curr._id) === parent);

        if (curr) {
            returnHierarchy.push(curr);
        }

        if (curr?.children === undefined) {
            console.error("Stopped digging earlier then expected");
            return currentHierarchyNode;
        }

        currentHierarchyNode = curr.children;

    });

    return returnHierarchy;

}

const Page = async ({ params, searchParams }: { params: SpaceParams, searchParams?: { [key: string]: string | undefined } }) => {

    const categories = await getSpaceCategories(params.spaceId);

    const parentSearchParamString: string = searchParams ? (searchParams.parent || "") : "";
    const parentSearchParam: string[] = parentSearchParamString.split(",");

    const parentCategories = extrapolateParentObjectFromParentHierarchy(categories, parentSearchParam);

    const redirectURL = `/space/${params.spaceId}/categories`;

    return (

        <section id="new-category" className="h-full w-full flex relative flex-col items-center">
            <div id="header" className="w-full h-28 flex items-center justify-between pl-10">
                <div className="w-5">
                    <form action={async () => {
                        "use server";
                        redirect(redirectURL)
                    }}>
                        <button type="submit">
                            <FontAwesomeIcon icon={faLessThan} className="text-2xl" />
                        </button>
                    </form>
                </div>
                <h1 className="text-4xl">Create New Category</h1>
                <div className="w-5"></div>
            </div>

            <div className="mt-10 w-full">

                <form action={async (formData) => {
                    "use server";

                    const categoryName = formData.get("category-name")?.toString();

                    if (!categoryName || categoryName.trim().length < 0) {
                        console.error("INVALID");
                        return;
                    }

                    await createSpaceCategory(params.spaceId, parentSearchParam, categoryName);
                    redirect(redirectURL);

                }} className="w-full flex flex-col items-center">

                    {
                        parentCategories.length > 0 ?
                            (
                                <>
                                    <div className="w-1/2 flex flex-col items-start mb-4">
                                        <div className="label"><span className="label-text">Sub Category Of</span></div>
                                        <div className="breadcrumbs ml-1 bg-base-100 rounded-lg px-2">
                                            <ul>
                                                {
                                                    parentCategories.map(parent => (
                                                        <li key={String(parent._id)} className="cursor-pointer">
                                                            <p className="btn-ghost px-2 py-1 rounded-lg">{parent.name}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                        </div>
                                    </div>

                                    <div className="w-1/2 my-5">
                                        <div className="divider"></div>
                                    </div>
                                </>
                            ) : null
                    }

                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Category Name</span></div>
                        <input type="text" name="category-name" id="category-name" className="input bg-base-100 w-100 text-base-content" placeholder="Category Name" />
                    </label>
                    <button className="btn btn-primary h-[3rem] w-1/2 mt-5" type="submit">Create</button>

                </form>

            </div>

        </section>

    )

}

export default Page;