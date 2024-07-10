import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpaceParams } from "../layout";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AccessTable from "./(components)/AccessTable";
import ErrorBoundary from "next/dist/client/components/error-boundary";
import AccessTableSuspense from "./(components)/AccessTableSuspension";

export const metadata = {
    title: 'Access | Stage Right',
    description: '',
}

const Access = ({ params }: { params: SpaceParams }) => {

    return (
        <section id="access" className="absolute top-0 left-0 right-0 bottom-4 overflow-y-hidden p-0 grid" style={{ gridTemplateRows: "7rem auto" }}>
            <div className="w-full h-34 flex justify-center items-center">
                <div className="bg-base-100 w-11/12 rounded-xl flex items-center justify-between pr-5 h-20">
                    <div className="h-full w-full flex items-center">

                        <div className="bg-neutral w-44 h-full rounded-tl-xl rounded-bl-xl text-neutral-content flex justify-start items-center mr-5">
                            <FontAwesomeIcon icon={faIdBadge} className="size-8 mr-3 ml-3" />
                            <h1 className="text-xl">Access</h1>
                        </div>

                    </div>

                    <div className="w-64 flex items-center justify-end">
                        <form action={async () => {
                            "use server";
                            redirect(`/space/${params.spaceId}/access/new`);
                        }}>
                            <button type="submit" className="btn btn-ghost text-base">New User</button>
                        </form>
                    </div>

                </div>
            </div>

            <div className="w-full h-full overflow-y-hidden flex justify-center items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-100 w-11/12 rounded-xl h-full">

                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="">
                                <th className="w-6/12">User Email</th>
                                <th className="w-6/12">Access Level</th>
                                <th className="px-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Suspense fallback={<AccessTableSuspense />}>
                                <AccessTable spaceId={params.spaceId} />
                            </Suspense>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )

}

export default Access;