import { getAllUserSpaces } from "@/actions/spaces.actions";
import SpaceCard from "./SpaceCard";

const Spaces = async () => {

    const spaces = await getAllUserSpaces();

    return (
        <div id="spaces" className="w-screen h-screen overflow-y-auto">

            {
                spaces.map((space, index) => (
                    <SpaceCard key={`space-${space.id}-${index}`} name={space.name} />
                ))
            }

        </div>
    );


}

export default Spaces;