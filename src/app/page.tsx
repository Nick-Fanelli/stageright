import SignInButton from "@/components/SignInButton";
import Link from "next/link"

const Page = () => {

    return (
        <section id="lander" className="w-screen min-h-screen overflow-x-hidden bg-base-100 flex flex-col items-center">
            <div className="w-full 2xl:w-[90vw]">

                <header className="">
                    <div className="navbar bg-base-100">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><Link href="#">About</Link></li>
                                    <li><Link href="#">Pricing</Link></li>
                                    <li><Link href="#">Contact</Link></li>
                                </ul>
                            </div>
                            <a className="btn btn-ghost text-xl">Stage Right</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li><Link href="#">About</Link></li>
                                <li><Link href="#">Pricing</Link></li>
                                <li><Link href="#">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <SignInButton />
                        </div>
                    </div>
                </header>
                <main className="h-[80vh]">

                    <div className="flex justify-evenly items-center h-full w-full px-5">

                        <div className="w-full">
                            <h1 className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-black">Keep track of all your assets with our <div className="text-primary inline">easily scalable asset management</div> solutions.</h1>
                            <p className="text-2xl mt-10 w-[90%]">Our system adapts to your needs, ensuring comprehensive oversight and optimal efficiency, whether you manage a small inventory or a vast portfolio. Simplify asset tracking, improve accuracy, and enhance productivity with our user-friendly and reliable service.</p>
                            <div className="flex mt-10 gap-5">
                                <button className="btn btn-primary">Try Demo</button>
                                <button className="btn btn-neutral">Learn More</button>
                            </div>
                        </div>

                        <div className="w-full h-[80%] rounded-3xl flex justify-center items-center bg-accent">
                            <h1 className="text-xl text-black">Placeholder for dashboard image</h1>
                        </div>

                    </div>

                </main>

                {/* <h1>Stage Right Deployment</h1>
                <SignInButton />
                <Link href="/spaces">
                    <button className="btn btn-primary">To App</button>
                </Link> */}
            </div>
        </section>
    )

}

export default Page;