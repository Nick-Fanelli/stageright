"use client";

type Props = {

    name: string,
    id: string
    children: React.ReactNode,
    parentsExtrapolated: string[]

}

const SelectTopLevelComponent = (props: Props) => {

    return (
        <li key={String(props.id)} onClick={(e) => {
            e.stopPropagation();

            const catReturnInput = document.getElementById("cat-return-input") as HTMLInputElement;

            if(catReturnInput) {
                catReturnInput.value = JSON.stringify(props.parentsExtrapolated);
                catReturnInput.dispatchEvent(new Event('change'));
            }

            (document.getElementById("cat_modal") as HTMLDialogElement)?.close();
        }}>
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