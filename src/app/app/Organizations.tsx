import { getAllUserOrganizations } from "@/actions/organization.actions";
import OrganizationCard from "./OrganizationCard";

const Organizations = async () => {

    const organizations = await getAllUserOrganizations();

    return (
        <div id="organizations" className="w-screen h-screen overflow-y-auto">

            {
                organizations.map((organization, index) => (
                    <OrganizationCard key={`org-${organization.id}-${index}`} name={organization.name} />
                ))
            }

        </div>
    );


}

export default Organizations;