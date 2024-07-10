"use client";

const AccessError = ({ error } : { error: Error & { digest?: string }, reset: () => void}) => {

    return (
        <section id="access" className="flex justify-center items-center w-full h-full">

            <h1 className="text-[8vw]">{error.message === "access denied" ? "Access Denied" : "An unknown error ocurred"}</h1>

        </section>
    )

}

export default AccessError;