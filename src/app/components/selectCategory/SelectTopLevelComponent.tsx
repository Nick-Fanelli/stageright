"use client";

type Props = {

    name: string,
    id: string
    children: React.ReactNode

}

const SelectTopLevelComponent = (props: Props) => {

    return (
        <li key={String(props.id)}>
            <details open className="" onClick={(e) => e.preventDefault()}>

                <summary className="flex">
                    <div className="flex justify-between w-full">
                        <p>{props.name}</p>
                    </div>
                </summary>

                <ul>
                    {props.children}
                </ul>
            </details>
        </li>
    )

}

export default SelectTopLevelComponent;