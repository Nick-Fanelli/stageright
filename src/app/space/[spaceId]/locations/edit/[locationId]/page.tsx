import { deleteSpaceLocation, getSpaceLocations } from "@/actions/spaces.actions"
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongoose";
import { redirect } from "next/navigation";
import EditLocationForm from "./EditLocationForm";

type Params = {

    spaceId: string,
    locationId: ObjectId

}

const EditLocation = async ({ params }: { params: Params }) => {

    const spaceLocations = await getSpaceLocations(params.spaceId);
    const filteredSpaceLocations = spaceLocations.filter(location => String(location._id) === String(params.locationId));

    const redirectURL = `/space/${params.spaceId}/locations`;

    if (filteredSpaceLocations.length != 1) {
        // TODO: Throw some error
        redirect(redirectURL);
    }

    const spaceLocation = filteredSpaceLocations[0];

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
                <h1 className="text-4xl">Create New Location</h1>
                <div className="w-5"></div>
            </div>

            <div className="mt-10 w-full">

                <EditLocationForm spaceId={params.spaceId} locationId={String(params.locationId)} redirectURL={redirectURL} locationName={spaceLocation.locationName} />

            </div>

        </div>
    )

}

export default EditLocation;