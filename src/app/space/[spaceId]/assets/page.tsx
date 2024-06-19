import { faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import AssetsTable from "./(components)/AssetsTable";
import { SpaceParams } from "../layout";

const Assets = ({ params } : { params: SpaceParams }) => {

    return (
        <section id="assets" className="absolute top-0 left-0 right-0 bottom-0 overflow-y-hidden p-0 grid" style={{ gridTemplateRows: "7rem auto 4rem" }}>

            <div className="w-full h-34 flex justify-center items-center">
                <div className="bg-base-100 w-11/12 rounded-xl flex items-center justify-between pr-5 h-20">
                    <div className="h-full w-full flex items-center">

                        <div className="bg-neutral w-44 h-full rounded-tl-xl rounded-bl-xl text-neutral-content flex justify-start items-center mr-5">
                            <FontAwesomeIcon icon={faBox} className="size-8 mr-3 ml-3" />
                            <h1 className="text-xl">Assets</h1>
                        </div>

                    </div>

                    <div className="w-64 flex items-center justify-end">
                        <form action={async () => {
                            "use server";
                            // redirect(`/space/${params.spaceId}/locations/new`);
                        }}>
                            <button type="submit" className="btn btn-ghost text-base">New Asset(s)</button>
                        </form>
                    </div>

                </div>
            </div>

            <div className="w-full h-full overflow-y-hidden flex justify-center items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-100 w-11/12 rounded-xl h-full">

                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="">
                                <th className="w-3/12">Asset Name</th>
                                <th className="w-3/12">Asset Tag ID</th>
                                <th className="w-3/12">Category</th>
                                <th className="w-3/12">Location</th>
                                <th className="px-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Suspense fallback={<h1>Loading</h1>}>
                                <AssetsTable spaceId={params.spaceId} />
                            </Suspense>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="h-full flex justify-center items-center w-full">

                <div className="bg-base-100 w-11/12 rounded-xl flex justify-center">
                    <div className="join rounded-none">
                        <button className="join-item btn btn-ghost rounded-l-xl">«</button>
                        <button className="join-item btn btn-ghost">Page 22</button>
                        <button className="join-item btn btn-ghost rounded-r-xl">»</button>
                    </div>
                </div>

            </div>

        </section>
    )

}

export default Assets;