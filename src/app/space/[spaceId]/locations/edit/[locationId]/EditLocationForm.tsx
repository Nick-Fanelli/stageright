"use client";

import { deleteSpaceLocation, updateSpaceLocation } from "@/actions/spaces.actions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {

    spaceId: string
    locationName: string
    locationId: string
    redirectURL: string

}

const EditLocationForm = (props: Props) => {

    const router = useRouter();

    const locationNameRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full flex flex-col items-center">

            <label className="form-control w-1/2">
                <div className="label"><span className="label-text">Location Name</span></div>
                <input ref={locationNameRef} type="text" name="location-name" id="location-name" className="input bg-base-100 w-100 text-base-content" defaultValue={props.locationName} />
            </label>

            <div className="flex w-full items-center justify-center mt-5">
                <button className="btn btn-error h-[3rem] w-[8rem] mr-5" onClick={async () => {

                    await deleteSpaceLocation(props.spaceId, props.locationId);
                    router.push(props.redirectURL);
                    router.refresh();

                }}>Delete</button>
                <button className="btn btn-primary h-[3rem] w-[calc(50%-9.25rem)]" type="submit" onClick={async () => {
                    const locationName = locationNameRef.current?.value;

                    if (!locationName || locationName.trim().length < 0) {
                        console.error("INVALID");
                        return;
                    }
                    
                    await updateSpaceLocation(props.spaceId, props.locationId, locationName);
        
                    router.push(props.redirectURL);
                    router.refresh();
                }}>Update</button>
            </div>


        </div>
    )

}

export default EditLocationForm;