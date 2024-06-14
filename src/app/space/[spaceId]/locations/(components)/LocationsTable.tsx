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

    let locations = await getSpaceLocations(props.spaceId);

    locations.sort((a, b) => {
        if(a.locationName > b.locationName)
            return 1;
        if(a.locationName < b.locationName)
            return -1;
        return 0;
    });

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