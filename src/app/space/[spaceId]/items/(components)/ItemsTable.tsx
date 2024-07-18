import { getAssets } from "@/actions/asset.actions";
import ItemsComponent from "./ItemsComponent";
import { getSpaceLocations } from "@/actions/locations.actions";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const ItemsTable = async (props: Props) => {

    // const assets = await getAssets(props.spaceId);
    // const locations = await getSpaceLocations(props.spaceId);

    return null;

    // return (

    //     assets.map((asset) => {
    //         const location : string = asset.location ? (locations.find((loc) => String(loc._id) === String(asset.location))?.locationName) || "" : ""

    //         return <ItemsComponent 
    //             key={String(asset._id)} 
    //             id={String(asset._id)} 
    //             uuid={asset.uuid} 
    //             spaceId={props.spaceId} 
    //             name={asset.name} 
    //             location={location}
    //         />
    //     })

    // )

}

export default ItemsTable;