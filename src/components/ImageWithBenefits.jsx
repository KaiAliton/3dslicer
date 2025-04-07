export default function ImageWithBenefits({ imageURL, benefits }) {
    return (
        <>
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                    <img
                        alt="feature"
                        className="object-cover object-center h-full w-full"
                        src={imageURL}
                    ></img>
                </div>
                <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                    {benefits.map((item, index) => (
                        <div className="flex flex-col mb-10 lg:items-start items-center" key={index}>
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl title-font font-medium mb-3">
                                    {item.title}
                                </h2>
                                <p className="leading-relaxed text-lg">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}

