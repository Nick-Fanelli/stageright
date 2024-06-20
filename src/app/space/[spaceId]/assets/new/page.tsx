import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faX } from "@fortawesome/free-solid-svg-icons";
import ShowHierarchyModalButton from "./ShowHiearchyModalButton";
import CategoriesHierarchy from "../../categories/CategoriesHierarchy";
import { SpaceParams } from "../../layout";

const NewAsset = ({ params }: { params: SpaceParams }) => {

    // const redirectURL = `/space/${params.spaceId}/assets`;

    return (
        <div className="h-full w-full flex relative flex-col items-center">
            <div id="header" className="w-full h-28 flex items-center justify-between pl-10">
                <div className="w-5">
                    <form action={async () => {
                        "use server";
                        // redirect(redirectURL)
                    }}>
                        <button type="submit">
                            <FontAwesomeIcon icon={faLessThan} className="text-2xl" />
                        </button>
                    </form>
                </div>
                <h1 className="text-4xl">Create New Asset</h1>
                <div className="w-5"></div>
            </div>

            <div className="mt-10 w-full">

                <form className="w-full flex flex-col items-center gap-5">

                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Asset Name</span></div>
                        <input type="text" name="asset-name" id="asset-name" className="input bg-base-100 w-100 text-base-content" placeholder="Asset Name" />
                    </label>

                    <label className="form-control w-1/2">
                        <div className="label"><span className="label-text">Category</span></div>
                        <ShowHierarchyModalButton />
                    </label>


                    {/* <div className="absolute z-10 bg-base-100 rounded-xl overflow-y-scroll top-0 bottom-0 left-0 right-0 my-20 mx-20 backdrop-blur-xl"> */}
                    {/* <CategoriesHierarchy spaceId={params.spaceId} /> */}
                    {/* </div> */}
                    {/* <label className="form-control w-1/2">
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
                    </label> */}

                    <button className="btn btn-primary h-[3rem] w-1/2 mt-5" type="submit">Create</button>

                </form>

                <dialog id="cat_modal" className="modal w-full">
                    <div className="w-[80vw] modal-box max-w-[80vw]">
                        <form id="cat_modal_form" action={async () => {
                            "use server";
                            console.log("SIDJFLSDJFKJ");
                        }}>
                            {/* <button type="submit">SDFD</button> */}
                            <CategoriesHierarchy spaceId={params.spaceId} select />
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button className="cursor-default">close</button>
                    </form>
                </dialog>

            </div>

        </div>
    )

}

export default NewAsset;