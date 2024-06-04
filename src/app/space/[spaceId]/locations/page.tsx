import LocationComponent from "./(components)/LocationComponent";

export const metadata = {
    title: 'Locations | Stage Right',
    description: '',
}

const Tags = async () => {

    return (
        <section id="locations" className="absolute top-0 left-0 right-0 bottom-0 overflow-y-hidden p-0">
            <div className="flex items-center h-20">
                <h1 className="mt-3 ml-3 text-3xl">Locations</h1>
                <button className="btn btn-primary">New Locations</button>
            </div>
            <div className="w-full flex h-full pb-4 flex-col items-center">
                <div className="overflow-x-auto overflow-y-auto bg-base-100 w-11/12 rounded-xl" style={{ height: "90%" }}>
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="">
                                <th className="w-full">Location Name</th>
                                <th className="px-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                            <LocationComponent />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )

}

export default Tags;