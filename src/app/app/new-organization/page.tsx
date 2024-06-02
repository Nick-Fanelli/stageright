import { createOrganization } from "@/actions/organizaton.actions";
import { redirect } from "next/navigation";
import Link from "next/link";

const NewOrganization = () => {

    return (
        <section id="new-organization" className="h-screen w-screen overflow-hidden">

            <Link href="/app"><p className="text-5xl absolute top-3 left-5 cursor-pointer">x</p></Link>

            <h1 className="text-center text-5xl mt-10">Create New Organization</h1>

            <form 
            className="text-center w-screen flex justify-center items-center flex-col mt-20"
            action={async (e) => {
                "use server";

                const name = e.get('organization-name');

                if(!name) {
                    console.warn("No organization name input found");
                    return;
                }

                const nameStr = name.toString().trim();

                if(nameStr.length <= 0) {
                    console.warn("Invalid organization name");
                    return; 
                }

                await createOrganization(nameStr);
                // TODO: DO SOME LOADING

                redirect("/app");

            }}>

                <label className="form-control w-1/2">
                    <div className="label"><span className="label-text">Organization Name</span></div>
                    <input type="text" name="organization-name" id="organization-name" className="input bg-neutral w-100" placeholder="Organization Name" />
                </label>
                
                <p className="mt-10 w-1/2 text-wrap">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae necessitatibus odit saepe iste et. Minima, illo cupiditate ex temporibus ducimus, nam repellendus, debitis inventore iure placeat facere sequi quia est.</p>

                <button type="submit" className="btn btn-primary w-1/2 mt-10">Create Organization</button>

            </form>

        </section>
    )

}

export default NewOrganization;