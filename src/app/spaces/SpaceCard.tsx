import { redirect } from "next/navigation";

type Props = {

    name: string,
    id: string

}

const SpaceCard = async (props: Props) => {

    return (
        <div className="card w-96 bg-base-200 text-base inline-flex m-8">

            <div className="card-body card-normal">
                <h1 className="card-title text-2xl">{props.name}</h1>
                <div>
                    <p>100 Assets</p>
                    <p>10 Users</p>
                </div>

                <div className="card-actions justify-end">
                    <form action={async () => {
                        "use server";

                        redirect(`space/${props.id}`)
                    }}>
                        <button type="submit" className="btn btn-neutral">Access</button>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default SpaceCard;