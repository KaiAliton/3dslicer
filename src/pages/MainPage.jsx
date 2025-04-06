import AutoScrollingCards from "../components/Cards"
import Header from "../components/Header"
import Stats from "../components/Stats"

const MainPage = () => {

    return <>
        <div className="flex flex-col h-full p-2 ">
            <div className="flex flex-col h-screen w-full">
                <Header />
                <div className="hero h-full">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                            src="https://eccmarket.ru/upload/medialibrary/645/l2pb2upj3k4qbkjz2w59qdxxcy79967w.jpg"
                            className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold">We are PRINTING!</h1>
                            <p className="py-6">
                                For now, you can just send us your model so we can calculate price in real time
                            </p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
                <Stats />
            </div>
            <AutoScrollingCards />
        </div>



    </>
}

export default MainPage