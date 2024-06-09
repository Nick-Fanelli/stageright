import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const metadata = {
    title: 'Categories | Stage Right'
}

const Categories = async () => {

    return (
        <section id="locations" className="absolute top-0 left-0 right-0 bottom-4 overflow-y-hidden p-0 grid" style={{ gridTemplateRows: "7rem auto" }}>

            <div className="w-full h-34 flex justify-center items-center">
                <div className="bg-base-100 w-11/12 rounded-xl flex items-center justify-between pr-5 h-20">
                    <div className="h-full w-full flex items-center">

                        <div className="bg-neutral w-44 h-full rounded-tl-xl rounded-bl-xl text-neutral-content flex justify-start items-center mr-5">
                            <FontAwesomeIcon icon={faSitemap} className="size-8 mr-3 ml-3" />
                            <h1 className="text-xl">Categories</h1>
                        </div>

                    </div>

                </div>
            </div>

            <div className="w-full h-full overflow-y-hidden flex justify-center items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-100 w-11/12 rounded-xl h-full">

                    <ul className="menu w-full rounded-box">

                        <li>
                            <details open className="">

                                <summary className="flex">
                                    <div className="flex justify-between w-full">
                                        <p>Test Element</p>
                                        <div className="flex gap-4 mr-5">
                                            <Link className="link" href="#">New Sub-Category</Link>
                                            <Link className="link" href="#">Delete</Link>
                                        </div>
                                    </div>
                                </summary>

                                <ul>
                                    <li>
                                        <div className="flex justify-between w-full">
                                            <p>Test Element</p>
                                            <div className="flex gap-4 mr-5">
                                                <Link className="link" href="#">New Sub-Category</Link>
                                                <Link className="link" href="#">Delete</Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-between w-full">
                                            <p>Test Element</p>
                                            <div className="flex gap-4 mr-5">
                                                <Link className="link" href="#">New Sub-Category</Link>
                                                <Link className="link" href="#">Delete</Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-between w-full">
                                            <p>Test Element</p>
                                            <div className="flex gap-4 mr-5">
                                                <Link className="link" href="#">New Sub-Category</Link>
                                                <Link className="link" href="#">Delete</Link>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="flex justify-between w-full">
                                            <p className="text-primary">[ Create New Category]</p>
                                        </div>
                                    </li>

                                </ul>

                            </details>
                        </li>

                        <li>
                            <div className="flex justify-between w-full">
                                <p>Test Element</p>
                                <div className="flex gap-4 mr-5">
                                    <Link className="link" href="#">New Sub-Category</Link>
                                    <Link className="link" href="#">Delete</Link>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="flex justify-between w-full">
                                <p className="text-primary">[ Create New Category]</p>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
    )

}

export default Categories;