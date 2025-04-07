export default function Hero({ title, description, imageURL }) {
    return (
        <>
            <div className=" px-5 pt-32 mx-auto lg:px-4 lg:py-4">
                <div className="flex flex-col w-full mb-2 text-left md:text-center ">
                    <h1 className="mb-2 text-6xl font-bold tracking-tighter text-base-content lg:text-8xl md:text-7xl">
                        <span>{title} </span>
                    </h1>
                    <br></br>
                    <p className="mx-auto  text-2xl font-normal leading-relaxed text-base-content  lg:w-2/3">
                        {description}
                    </p>
                </div>
            </div>
            <div className=" flex flex-col items-center justify-center py-8 mx-auto rounded-lg md:p-1 p-3">
                <img
                    className="object-cover object-center w-full mb-10 border-gray-200 dark:border-gray-900 g327 border rounded-lg shadow-md"
                    alt="hero"
                    src={imageURL}
                ></img>
            </div>
        </>
    )

}