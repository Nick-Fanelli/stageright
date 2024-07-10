"use client";

import { createNewAsset } from "@/actions/asset.actions";
import { convertCategoryHierarchyToDisplayName } from "@/actions/categories.actions";
import SelectCategory from "@/app/components/selectCategory/SelectCategory";
import { ILocation } from "@/models/location.model";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {

    spaceId: string,
    locations: { id: string, name: string }[]
    redirectURL: string

}

const NewAssetForm = (props: Props) => {

    const [category, setCategory] = useState<string[]>([]);

    const catReturnInputRef = useRef<HTMLInputElement>(null);
    const locationsRef = useRef<HTMLSelectElement>(null);

    const onCatReturnInputChange = useCallback(async () => {

        const value: string[] = JSON.parse(catReturnInputRef.current?.value || "");

        const res = await convertCategoryHierarchyToDisplayName(props.spaceId, value);

        setCategory(res);

    }, [setCategory, props.spaceId]);

    useEffect(() => {

        const catReturnInput = catReturnInputRef.current;

        if(!catReturnInput)
            return;

        catReturnInput.addEventListener("change", onCatReturnInputChange);

        return () => {
            catReturnInput.removeEventListener("change", onCatReturnInputChange);
        }

    }, [onCatReturnInputChange]);

    return (
        <>
            <input type="text" className="hidden" id="cat-return-input" ref={catReturnInputRef} />
            <form className="w-full flex flex-col items-center gap-5" action={async (formData) => {

                const assetName = formData.get("asset-name")?.toString() || "";

                if(assetName.length <= 0) {
                    console.error("Invalid form value"); // TODO: THROW CLIENT TOAST OR SOME ERROR
                    return;
                }

                const selectedIndex: number = locationsRef.current?.selectedIndex || 0;
                const locationId = locationsRef.current?.children[selectedIndex].getAttribute("location-id") || undefined;

                const uuid = await createNewAsset(props.spaceId, assetName, locationId);

                redirect(props.redirectURL);

            }}>

                <label className="form-control w-1/2">
                    <div className="label"><span className="label-text">Asset Name *</span></div>
                    <input type="text" name="asset-name" id="asset-name" className="input bg-base-100 w-100 text-base-content" placeholder="Asset Name" />
                </label>

                <label className="form-control w-1/2">
                    <div className="label"><span className="label-text">Category</span></div>
                    <div className="flex justify-center items-center">

                        <div className="btn w-11/12 h-full rounded-r-none bg-base-100 hover:bg-base-200 border-r-0" onClick={() => {
                            (document.getElementById("cat_modal") as HTMLDialogElement)?.showModal()
                        }}>
                            <p className={`w-full text-center ${category.length > 0 ? "hidden" : ""}`}>- None Selected -</p>
                            <div className={`w-full text-left ${category.length <= 0 ? "hidden" : ""}`}>
                                <div className="text-sm breadcrumbs h-full p-0">
                                    <ul>
                                        {
                                            category.map((cat, index) => (
                                                <li key={`${index}${cat}`}>{cat}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="btn w-1/12 rounded-l-none bg-base-100 hover:bg-base-200 border-l-0" onClick={() => {
                            setCategory([]);
                        }}>
                            <FontAwesomeIcon icon={faX} className="p-0 m-0 text-base" />
                        </div>

                    </div>

                </label>

                <label className="form-control w-1/2">
                    <div className="label"><span className="label-text">Location</span></div>
                    <div className="flex justify-center items-center">

                        <select className="select w-11/12 border-r-0 rounded-r-none" ref={locationsRef} defaultValue={"None Selected"} name="location">
                            <option disabled>None Selected</option>
                            {
                                props.locations.map((location, index) => (
                                    <option key={location.id} location-id={location.id}>{location.name}</option>
                                ))
                            }
                        </select>

                        <div className="btn w-1/12 rounded-l-none bg-base-100 hover:bg-base-200 border-l-0" onClick={() => {
                            if(locationsRef.current) {
                                locationsRef.current.value = "None Selected";
                            }
                        }}>
                            <FontAwesomeIcon icon={faX} className="p-0 m-0 text-base" />
                        </div>

                    </div>

                </label>

                <button className="btn btn-primary h-[3rem] w-1/2 mt-5" type="submit">Create</button>

            </form>
        </>
    )

}

export default NewAssetForm;