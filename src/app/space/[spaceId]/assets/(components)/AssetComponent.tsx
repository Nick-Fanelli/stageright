"use client";

import { deleteAsset } from "@/actions/asset.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {

    id: string
    uuid: string
    spaceId: string
    location: string

    name: string
    category: string[]

}

const AssetComponent = (props: Props) => {

    const router = useRouter();

    return (
        <tr className="hover">
            <td>{props.name}</td>
            <td>{props.uuid}</td>
            <td>
                <div className="text-sm breadcrumbs h-full p-0">
                    <ul>
                        {
                            props.category.map(cat => (
                                <li key={cat}>{cat}</li>
                            ))
                        }
                    </ul>
                </div>
            </td>
            <td>{props.location}</td>
            <td className="flex gap-3">
                <Link className="link" href={`/space/${props.spaceId}/assets/edit/${props.id}`}>Edit</Link>

                <p className="link" onClick={async () => {
                    const confirm = window.confirm("Are you sure you want to delete the location: " + props.name);

                    if (confirm) {
                        await deleteAsset(props.spaceId, props.id);
                        router.refresh();
                    }

                }}>Delete</p>
            </td>
        </tr>
    )

}

export default AssetComponent;