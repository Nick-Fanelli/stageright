import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faX } from "@fortawesome/free-solid-svg-icons";
import { SpaceParams } from "../../layout";
import SelectCategory from "@/app/components/selectCategory/SelectCategory";
import NewAssetForm from "./NewAssetForm";
import { redirect } from "next/navigation";
import { getSpaceLocations } from "@/actions/location.actions";

const NewAsset = async ({ params }: { params: SpaceParams }) => {

    const locations : { id: string, name: string }[]  = (await getSpaceLocations(params.spaceId)).map((loc) => ({ id: String(loc._id), name: loc.locationName }));

    const redirectURL = `/space/${params.spaceId}/assets`;

    return (
        <div className="h-full w-full flex relative flex-col items-center">
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
                <h1 className="text-4xl">Create New Asset</h1>
                <div className="w-5"></div>
            </div>

            <div className="mt-10 w-full">

                <NewAssetForm spaceId={params.spaceId} locations={locations} redirectURL={redirectURL} />

                <dialog id="cat_modal" className="modal w-full">
                    <div className="w-[80vw] modal-box max-w-[80vw]">
                        <SelectCategory spaceId={params.spaceId} />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button className="cursor-default"></button>
                    </form>
                </dialog>

            </div>

        </div>
    )

}

export default NewAsset;