import { getAssets } from "@/actions/asset.actions";
import AssetComponent from "./AssetComponent";
import { getSpaceLocations } from "@/actions/location.actions";
import { getMapOfCategoryObjectIdToSimpleName } from "@/actions/category.actions";

type Props = {

    spaceId: string

}

export const revalidate = 0;

const AssetsTable = async (props: Props) => {

    const [ assets, locations, categoryMap ] = await Promise.all([
        getAssets(props.spaceId),
        getSpaceLocations(props.spaceId),
        getMapOfCategoryObjectIdToSimpleName(props.spaceId)
    ]);

    return (

        assets.map((asset) => {

            const location : string = asset.location ? (locations.find((loc) => String(loc._id) === String(asset.location))?.locationName) || "" : ""
            
            let mappedCategoryNames: string[] = [];

            asset.category?.forEach((cat) => {
                mappedCategoryNames.push(categoryMap.find(c => c.id === cat)?.name || "");
            })

            return <AssetComponent 
                key={String(asset._id)} 
                id={String(asset._id)} 
                uuid={asset.uuid} 
                spaceId={props.spaceId} 
                name={asset.name} 
                location={location}
                category={mappedCategoryNames}
            />
        })

    )

}

export default AssetsTable;