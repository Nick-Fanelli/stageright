import { redirect } from "next/navigation";
import Link from "next/link";
import { createSpace } from "@/actions/spaces.actions";

export const metadata = {
    title: 'New Space | Stage Right'
}

const NewSpace = () => {

    return (
        <section id="new-space" className="h-screen w-screen overflow-hidden">

            <Link href="/spaces"><p className="text-5xl absolute top-3 left-5 cursor-pointer">x</p></Link>

            <h1 className="text-center text-5xl mt-10">Create New Space</h1>

            <form 
            className="text-center w-screen flex justify-center items-center flex-col mt-20"
            action={async (e) => {
                "use server";

                const name = e.get('space-name');

                if(!name) {
                    console.warn("No space name input found");
                    return;
                }

                const nameStr = name.toString().trim();

                if(nameStr.length <= 0) {
                    console.warn("Invalid space name");
                    return; 
                }

                await createSpace(nameStr);
                // TODO: DO SOME LOADING

                redirect("/spaces");

            }}>

                <label className="form-control w-1/2">
                    <div className="label"><span className="label-text">Space Name</span></div>
                    <input type="text" name="space-name" id="space-name" className="input bg-neutral w-100" placeholder="Space Name" />
                </label>
                
                <p className="mt-10 w-1/2 text-wrap">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae necessitatibus odit saepe iste et. Minima, illo cupiditate ex temporibus ducimus, nam repellendus, debitis inventore iure placeat facere sequi quia est.</p>

                <button type="submit" className="btn btn-primary w-1/2 mt-10">Create Space</button>

            </form>

        </section>
    )

}

export default NewSpace;