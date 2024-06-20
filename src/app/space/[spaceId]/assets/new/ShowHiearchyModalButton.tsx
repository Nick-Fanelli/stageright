"use client";

const ShowHierarchyModalButton = () => {

    return (
        <div className="btn" onClick={() => {
            (document.getElementById("cat_modal") as HTMLDialogElement)?.showModal()
        }}>open modal</div>
    )

}

export default ShowHierarchyModalButton;