"use client";

import { deleteAccess } from "@/actions/access.actions";
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {

    spaceId: string
    userEmail: string
    accessLevel: string
    accessId: string

}

const AccessComponent = (props: Props) => {

    const router = useRouter();

    return (
        <tr className="hover">
            <td>{props.userEmail}</td>
            <td>{props.accessLevel}</td>
            <td className="flex gap-3">
                <Link className="link" href={`/space/${props.spaceId}/access/edit/`}>Edit</Link>
                <p className="link" onClick={async () => {
                    const confirm = window.confirm("Are you sure you want to delete the user: " + props.userEmail);

                    if(confirm) {
                        await deleteAccess(props.spaceId, props.accessId);
                        router.refresh();
                    }

                }}>Delete</p>
            </td>
        </tr>
    )

}

export default AccessComponent;