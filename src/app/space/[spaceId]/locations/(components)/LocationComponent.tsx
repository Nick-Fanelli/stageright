"use client";

import { deleteSpaceLocation } from "@/actions/location.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {

    spaceId: string
    id: string
    name: string

}

const LocationComponent = (props: Props) => {

    const router = useRouter();

    return (
        <tr className="hover">
            <td>{props.name}</td>
            <td className="flex gap-3">
                <Link className="link" href={`/space/${props.spaceId}/locations/edit/${props.id}`}>Edit</Link>
                <p className="link" onClick={async () => {
                    const confirm = window.confirm("Are you sure you want to delete the location: " + props.name);

                    if(confirm) {
                        await deleteSpaceLocation(props.spaceId, props.id);
                        router.refresh();
                    }

                }}>Delete</p>
            </td>
        </tr>
    )

}

export default LocationComponent;