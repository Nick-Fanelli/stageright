import { ActionResponseCode } from "@/actions/actions";
import { getSpace } from "@/actions/spaces.actions";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Dashboard | Stage Right',
    description: '',
}

const Space = async () => {

    return (
        <h1>Dashboard</h1>
    )

}

export default Space;