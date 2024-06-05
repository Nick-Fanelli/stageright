import Link from "next/link";

type Props = {

    name: string

}

const LocationComponent = async (props: Props) => {

    return (
        <tr className="hover">
            <th>{props.name}</th>
            <td>
                <Link className="link" href={"#"}>Edit</Link>
            </td>
        </tr>
    )

}

export default LocationComponent;