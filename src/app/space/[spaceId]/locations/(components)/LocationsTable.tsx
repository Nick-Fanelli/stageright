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
        <table className="table table-zebra w-full">
            <thead>
                <tr className="">
                    <th className="w-full">Location Name</th>
                    <th className="px-10"></th>
                </tr>
            </thead>
            <tbody>
                {
                    locations.map((location, index) => (
                        <LocationComponent key={`location-${location.locationName}${index}`} name={location.locationName} />
                    ))
                }
            </tbody>
        </table>
    )

}

export default LocationsTable;