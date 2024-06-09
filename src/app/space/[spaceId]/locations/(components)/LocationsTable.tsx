import { ILocation } from "@/models/location.model";
import { useEffect, useOptimistic, useState } from "react";
import LocationComponent from "./LocationComponent";
import { getSpaceLocations } from "@/actions/spaces.actions";
import { auth } from "@/auth";

export const revalidate = 0;

type Props = {

    spaceId: string

}

const LocationsTable = async (props: Props) => {

    const locations = await getSpaceLocations(props.spaceId);

    return (
        <>
            {
                locations.map((location, index) => (
                    <LocationComponent key={`location-${location.locationName}${index}${location._id}`} id={String(location._id)} spaceId={props.spaceId} name={location.locationName} />
                ))
            }
        </>
    )

}

export default LocationsTable;