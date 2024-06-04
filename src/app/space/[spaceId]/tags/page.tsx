import TagComponent from "./(components)/TagComponent";

export const metadata = {
    title: 'Tags | Stage Right',
    description: '',
}

const Tags = async () => {

    return (
        <section id="tags" className="absolute top-0 left-0 right-0 bottom-0 overflow-y-hidden p-0">
            <div className="flex items-center h-20">
                <h1 className="mt-3 ml-3 text-3xl">Tags</h1>
                <button className="btn btn-primary">New Tag</button>
            </div>
            <div className="w-full flex h-full pb-4 flex-col items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-200 w-11/12 rounded-xl" style={{ height: "90%" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="min-w-0 w-px"></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TagComponent />
                        </tbody>
                    </table>
                </div>
                <div className="join">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn">Page 1/10</button>
                    <button className="join-item btn">»</button>
                </div>
            </div>
        </section>
    )

}

export default Tags;