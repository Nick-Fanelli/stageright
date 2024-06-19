"use client";

import Link from "next/link";

type Props = {

    id: string
    spaceId: string

    name: string

}

const AssetComponent = (props: Props) => {

    return (
        <tr className="hover">
            <td>{props.name}</td>
            <td>
                <div className="text-sm breadcrumbs h-full p-0">
                    <ul>
                        <li>Parts</li>
                        <li>Brakes</li>
                        <li>Brake Lines</li>
                    </ul>
                </div>
            </td>
            <td>Location</td>
            <td className="flex gap-3">
                <Link className="link" href={`/space/${props.spaceId}/assets/edit/${props.id}`}>Edit</Link>
                <p className="link" onClick={async () => {
                    const confirm = window.confirm("Are you sure you want to delete the location: " + props.name);

                    if (confirm) {
                        // await deleteSpaceLocation(props.spaceId, props.id);
                        // router.refresh();
                    }

                }}>Delete</p>
            </td>
        </tr>
    )

}

export default AssetComponent;