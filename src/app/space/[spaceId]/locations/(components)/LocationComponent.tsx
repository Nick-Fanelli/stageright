import { ObjectId } from "mongoose";
import Link from "next/link";

type Props = {

    spaceId: string
    id: ObjectId | undefined
    name: string

}

const LocationComponent = async (props: Props) => {

    return (
        <tr className="hover">
            <th>{props.name}</th>
            <td>
                <Link className="link" href={`/space/${props.spaceId}/locations/edit/${props.id}`}>Edit</Link>
            </td>
        </tr>
    )

}

export default LocationComponent;