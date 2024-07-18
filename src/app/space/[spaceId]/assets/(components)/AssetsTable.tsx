import { getAssets } from "@/actions/asset.actions";
import AssetComponent from "./AssetComponent";
import { getSpaceLocations } from "@/actions/location.actions";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const AssetsTable = async (props: Props) => {

    const assets = await getAssets(props.spaceId);
    const locations = await getSpaceLocations(props.spaceId);

    return (

        assets.map((asset) => {
            const location : string = asset.location ? (locations.find((loc) => String(loc._id) === String(asset.location))?.locationName) || "" : ""

            return <AssetComponent 
                key={String(asset._id)} 
                id={String(asset._id)} 
                uuid={asset.uuid} 
                spaceId={props.spaceId} 
                name={asset.name} 
                location={location}
            />
        })

    )

}

export default AssetsTable;