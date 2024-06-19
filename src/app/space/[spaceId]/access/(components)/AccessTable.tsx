import { getAccess } from "@/actions/access.actions";
import AccessComponent from "./AccessComponent";
import { accessSchema } from "@/models/access.model";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const AccessTable = async (props: Props) => {

    const access = await getAccess(props.spaceId);

    return access.map(a => (
        <AccessComponent key={String(a._id)} spaceId={props.spaceId} userEmail={a.email} accessLevel={a.accessLevel} accessId={String(a._id)} />
    ))

}

export default AccessTable;