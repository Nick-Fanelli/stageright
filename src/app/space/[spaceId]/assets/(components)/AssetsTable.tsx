import AssetComponent from "./AssetComponent";

type Props = {

    spaceId: string

}

const AssetsTable = (props: Props) => {

    return (
        <>
            <AssetComponent id={""} spaceId={""} name={"Example Component"} />
        </>
    )

}

export default AssetsTable;