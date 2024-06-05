import { getAllUserSpaces } from "@/actions/spaces.actions";
import SpaceCard from "./SpaceCard";

export const revalidate = 0;

const Spaces = async () => {

    const spaces = await getAllUserSpaces();

    return (
        <div id="spaces" className="w-screen h-screen overflow-y-auto">

            {
                spaces.map((space, index) => (
                    <SpaceCard key={`space-${space.id}-${index}`} name={space.name} id={space.id} />
                ))
            }

        </div>
    );


}

export default Spaces;