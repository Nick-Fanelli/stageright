import { faBox, faBoxesStacked, faList, faLocationDot, faLocationPin, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpaceParams } from "../layout";
import { getSpaceStats } from "@/actions/spaces.actions";

export const metadata = {
    title: 'Dashboard | Stage Right',
    description: '',
}

export const revalidate = 0;

const Dashboard = async ({ params }: { params: SpaceParams}) => {

    const stats = await getSpaceStats(params.spaceId);

    return (
        <section id="dashboard" className="absolute top-0 left-0 right-0 bottom-4 overflow-y-hidden p-0">

            <h1 className="ml-5 mt-6 mb-8 text-5xl font-black">{stats.name}</h1>

            <div className="h-full w-full flex flex-col items-center">

                <div className="w-full flex flex-col gap-0 px-5">
                    <div className="stats shadow rounded-b-none">

                        <div className="stat">
                            <div className="stat-figure">
                                <FontAwesomeIcon icon={faBox} className="text-4xl" />
                            </div>
                            <div className="stat-title">Assets</div>
                            <div className="stat-value">105</div>
                            <div className="stat-desc">32 remaining</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure">
                                <FontAwesomeIcon icon={faBoxesStacked} className="text-4xl" />
                            </div>
                            <div className="stat-title">Items</div>
                            <div className="stat-value">4,200</div>
                            <div className="stat-desc">10 types remaining</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure">
                                <FontAwesomeIcon icon={faUsers} className="text-4xl" />
                            </div>
                            <div className="stat-title">Users</div>
                            <div className="stat-value">{stats.numUsers + 1}</div>
                            <div className="stat-desc">0 remaining</div>
                        </div>

                    </div>


                    <div className="stats shadow rounded-t-none">

                        <div className="stat">
                            <div className="stat-figure">
                                <FontAwesomeIcon icon={faLocationDot} className="text-4xl" />
                            </div>
                            <div className="stat-title">Locations</div>
                            <div className="stat-value">{stats.numLocations}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure">
                                <FontAwesomeIcon icon={faList} className="text-4xl" />
                            </div>
                            <div className="stat-title">Categories</div>
                            <div className="stat-value">{stats.numCategories}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure">
                                <FontAwesomeIcon icon={faUsers} className="text-4xl" />
                            </div>
                            <div className="stat-title">Users</div>
                            <div className="stat-value">3</div>
                            <div className="stat-desc">0 remaining</div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )

}

export default Dashboard;