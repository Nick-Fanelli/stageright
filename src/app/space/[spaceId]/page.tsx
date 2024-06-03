import { ActionResponseCode } from "@/actions/actions";
import { getSpace } from "@/actions/spaces.actions";
import { redirect } from "next/navigation";

type Props = {

    params: { spaceId: string }

}

const Space = async ({ params }: Props) => {

    if(!params || !params.spaceId) {
        console.warn("Params not found for spaces");
        redirect("/spaces");
    }

    const space = await getSpace(params.spaceId);

    if(space.code !== ActionResponseCode.SUCCESS || !space.payload) { // TODO: Handle not allowed, etc. differently
        console.warn("Not allowed");
        redirect("/spaces");
    }

    return (
        <h1>{space.payload.name}</h1>
    )

}

export default Space;