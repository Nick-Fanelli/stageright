import { redirect } from "next/navigation";
import { SpaceParams } from "../../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { createSpaceLocation } from "@/actions/locations.actions";
import { createAccess } from "@/actions/access.actions";
import email from "next-auth/providers/email";
import { AccessLevel } from "@/models/access.model";

export const metadata = {

    title: "New Access | Stage Right"

}

const NewUser = ({ params }: { params: SpaceParams }) => {

    const redirectURL = `/space/${params.spaceId}/access`;

    return (
        <div className="h-full w-full flex relative flex-col items-center">
            <div id="header" className="w-full h-28 flex items-center justify-between pl-10">
                <div className="w-5">
                    <form action={async () => {
                        "use server";
                        redirect(redirectURL)
                    }}>
                        <button type="submit">
                            <FontAwesomeIcon icon={faLessThan} className="text-2xl" />
                        </button>
                    </form>
                </div>
                <h1 className="text-4xl">Create New User</h1>
                <div className="w-5"></div>
            </div>

            <div className="mt-10 w-full">

                <form action={async (formData) => {
                    "use server";

                    const emailAddress = formData.get("user-email")?.toString();
                    const access = formData.get("user-access")?.toString();

                    if (!emailAddress || emailAddress.trim().length < 0 || !access) {
                        console.error("INVALID");
                        return;
                    }

                    let accessLevel: AccessLevel = "viewer";
                
                    switch(access) {

                        case "Admin":
                            accessLevel = "admin";
                            break;
                        case "Editor":
                            accessLevel = "editor";
                            break;
                        case "Viewer":
                        default:
                            accessLevel = "viewer";
                            break;

                    } 

                    await createAccess(params.spaceId, emailAddress, accessLevel);
                    redirect(redirectURL);

                }} className="w-full flex flex-col items-center gap-5">

                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Email Address</span></div>
                        <input type="text" name="user-email" id="user-email" className="input bg-base-100 w-100 text-base-content" placeholder="Email Address" />
                    </label>
                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Access Level</span></div>
                        <select name="user-access" className="select w-full text-base-content text-base">
                            <option disabled selected>Choose Access Level</option>
                            <option>Viewer</option>
                            <option>Editor</option>
                            <option>Admin</option>
                        </select>
                    </label>

                    <button className="btn btn-primary h-[3rem] w-1/2 mt-5" type="submit">Create</button>

                </form>

            </div>

        </div>
    )

}

export default NewUser;