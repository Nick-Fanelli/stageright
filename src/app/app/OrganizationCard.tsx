type Props = {

    name: string,

}

const OrganizationCard = async (props: Props) => {

    return (
        <div className="card w-96 bg-base-200 text-base inline-flex m-8">

            <div className="card-body card-normal">
                <h1 className="card-title text-2xl">{props.name}</h1>
                <div>
                    <p>10 Organization Units</p>
                    <p>10 Users</p>
                </div>

                <div className="card-actions justify-end">
                    <button className="btn btn-neutral">Access</button>
                </div>
            </div>

        </div>
    )

}

export default OrganizationCard;