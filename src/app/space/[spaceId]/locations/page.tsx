import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { createSpaceLocation, getSpaceLocations } from "@/actions/spaces.actions";
import { SpaceParams } from "../layout";
import LocationComponent from "./(components)/LocationComponent";
import LocationsTable from "./(components)/LocationsTable";
import { Suspense } from "react";

export const metadata = {
    title: 'Locations | Stage Right',
    description: '',
}

const Locations = async ({ params }: { params: SpaceParams }) => {

    return (
        <section id="locations" className="absolute top-0 left-0 right-0 bottom-4 overflow-y-hidden p-0 grid" style={{ gridTemplateRows: "7rem auto" }}>

            <div className="w-full h-34 flex justify-center items-center">
                <div className="bg-base-100 w-11/12 rounded-xl flex items-center justify-between pr-5 h-20">
                    <div className="h-full w-full flex items-center">

                        <div className="bg-neutral w-44 h-full rounded-tl-xl rounded-bl-xl text-neutral-content flex justify-start items-center mr-5">
                            <FontAwesomeIcon icon={faLocationDot} className="size-8 mr-3 ml-3" />
                            <h1 className="text-xl">Locations</h1>
                        </div>

                    </div>

                    <div className="w-40 flex items-center justify-end">
                        <form action={async () => {
                            "use server";

                            createSpaceLocation(params.spaceId);
                        }}>
                            <button type="submit" className="btn btn-ghost text-base">New Location</button>
                        </form>


                    </div>

                </div>
            </div>

            <div className="w-full h-full overflow-y-hidden flex justify-center items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-100 w-11/12 rounded-xl h-full">
                    <Suspense fallback={<h1>Loading...</h1>}> 
                    { 
                    // TODO: ADD FALLBACK
                     }
                        <LocationsTable spaceId={params.spaceId} />
                    </Suspense>
                </div>
            </div>
        </section>
    )

}

export default Locations;