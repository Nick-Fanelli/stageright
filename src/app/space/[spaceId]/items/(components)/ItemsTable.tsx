import { getAssets } from "@/actions/asset.actions";
import ItemsComponent from "./ItemsComponent";
import { getSpaceLocations } from "@/actions/location.actions";
import { getItems } from "@/actions/item.actions";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const ItemsTable = async (props: Props) => {

    const [ items, locations ] = await Promise.all([
        getItems(props.spaceId),
        getSpaceLocations(props.spaceId)
    ]);

    return (

        items.map((item) => {
            const location : string = item.location ? (locations.find((loc) => String(loc._id) === String(item.location))?.locationName) || "" : ""

            return <ItemsComponent 
                key={String(item._id)} 
                id={String(item._id)} 
                sku={String(item.sku)}
                spaceId={props.spaceId} 
                name={String(item.name)} 
                location={location}
                quantity={item.quantity}
            />
        })

    )

}

export default ItemsTable;