import CreateNewCategoryElement from "./CreateNewCategoryElement";

type Props = {

    name: string,
    children: React.ReactNode | React.ReactNode[]

}

const TopLevelCategoryElement = (props: Props) => {

    return (
        <li>
            <details open className="">

                <summary className="flex">
                    <div className="flex justify-between w-full">
                        <p>{props.name}</p>
                        <div className="flex gap-4 mr-5">
                            <p className="link">New Sub-Category</p>
                            <p className="link">Delete</p>
                        </div>
                    </div>
                </summary>

                <ul>
                    {props.children}
                    <CreateNewCategoryElement />
                </ul>
            </details>
        </li>
    )

}

export default TopLevelCategoryElement;