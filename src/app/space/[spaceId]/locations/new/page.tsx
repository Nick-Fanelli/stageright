import { createSpaceLocation } from "@/actions/spaces.actions";
import { faLessThan, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpaceParams } from "../../layout";
import { redirect } from "next/navigation";

const NewLocationPage = ({ params } : { params: SpaceParams }) => {

    const redirectURL = `/space/${params.spaceId}/locations`;

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

                <form action={async (formData) => {
                    "use server";

                    const locationName = formData.get("location-name")?.toString();

                    if(!locationName || locationName.trim().length < 0) {
                        console.error("INVALID");
                        return;
                    }

                    await createSpaceLocation(params.spaceId, locationName);
                    redirect(redirectURL);

                }} className="w-full flex flex-col items-center">

                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Location Name</span></div>
                        <input type="text" name="location-name" id="location-name" className="input bg-base-100 w-100 text-base-content" placeholder="Location Name" />
                    </label>
                    <button className="btn btn-primary h-[3rem] w-1/2 mt-5" type="submit">Create</button>

                </form>

            </div>

        </div>
    )

}

export default NewLocationPage;