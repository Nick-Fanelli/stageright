import { getSpaceLocations, updateSpaceLocation } from "@/actions/location.actions";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongoose";
import { redirect } from "next/navigation";

type Params = {

    spaceId: string,
    locationId: string

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
                <h1 className="text-4xl">Edit Location</h1>
                <div className="w-5"></div>
            </div>

            <div className="mt-10 w-full">

                <form className="w-full flex flex-col items-center" action={async (formData) => {

                    "use server";

                     const locationName = formData.get("location-name")?.toString();

                     if (!locationName || locationName.trim().length < 0) {
                         console.error("INVALID");
                         return;
                     }

                     await updateSpaceLocation(params.spaceId, params.locationId, locationName);

                    redirect(redirectURL)
                }}>

                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Location Name</span></div>
                        <input type="text" name="location-name" id="location-name" className="input bg-base-100 w-100 text-base-content" defaultValue={spaceLocation.locationName} />
                    </label>

                    <div className="flex w-full items-center justify-center mt-5">
                        <button className="btn btn-primary h-[3rem] w-1/2" type="submit">Update</button>
                    </div>


                </form>

            </div>

        </div>
    )

}

export default EditLocation;