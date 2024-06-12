import { createDemoCategories } from "@/actions/spaces.actions";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpaceParams } from "../layout";
import CategoriesHierarchy from "./CategoriesHierarchy";
import { revalidatePath } from "next/cache";

export const metadata = {
    title: 'Categories | Stage Right'
}

const Categories = async ({ params }: { params: SpaceParams }) => {

    return (
        <section id="locations" className="absolute top-0 left-0 right-0 bottom-4 overflow-y-hidden p-0 grid" style={{ gridTemplateRows: "7rem auto" }}>

            <div className="w-full h-34 flex justify-center items-center">
                <div className="bg-base-100 w-11/12 rounded-xl flex items-center justify-between pr-5 h-20">
                    <div className="h-full w-full flex items-center">

                        <div className="bg-neutral w-48 h-full rounded-tl-xl rounded-bl-xl text-neutral-content flex justify-start items-center mr-5">
                            <FontAwesomeIcon icon={faTags} className="size-8 mr-3 ml-3" />
                            <h1 className="text-xl">Categories</h1>
                        </div>

                        <div className="flex justify-between w-full">

                            <form action={async () => {
                                "use server";
                                await createDemoCategories(params.spaceId);
                                revalidatePath(`/space/${params.spaceId}/categories`);
                            }}>
                                <button className="btn btn-primary">Create Demo Categories</button>

                            </form>
                        </div>

                    </div>

                </div>
            </div>

            <div className="w-full h-full overflow-y-hidden flex justify-center items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-100 w-11/12 rounded-xl h-full">

                    <CategoriesHierarchy spaceId={params.spaceId} />

                </div>
            </div>
        </section>
    )

}

export default Categories;