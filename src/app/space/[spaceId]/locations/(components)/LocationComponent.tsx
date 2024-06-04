import Link from "next/link";

const LocationComponent = async () => {

    return (
        <tr className="hover">
            <th>Some Name</th>
            <td>
                <Link className="link" href={"#"}>Edit</Link>
            </td>
        </tr>
    )

}

export default LocationComponent;