"use client";

import { deleteAsset } from "@/actions/asset.actions";
import { deleteItem } from "@/actions/item.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {

    id: string
    sku: string
    spaceId: string
    location: string

    name: string

}

const ItemsComponent = (props: Props) => {

    const router = useRouter();

    return (
        <tr className="hover">
            <td>{props.name}</td>
            <td>{props.sku}</td>
            <td>
                <div className="text-sm breadcrumbs h-full p-0">
                    <ul>
                        <li>Parts</li>
                        <li>Brakes</li>
                        <li>Brake Lines</li>
                    </ul>
                </div>
            </td>
            <td>{props.location}</td>
            <td className="flex gap-3">
                <Link className="link" href={`/space/${props.spaceId}/assets/edit/${props.id}`}>Edit</Link>

                <p className="link" onClick={async () => {
                    const confirm = window.confirm("Are you sure you want to delete the location: " + props.name);

                    if (confirm) {
                        await deleteItem(props.spaceId, props.id);
                        router.refresh();
                    }

                }}>Delete</p>
            </td>
        </tr>
    )

}

export default ItemsComponent;