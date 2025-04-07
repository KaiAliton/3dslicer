export default function HeroWithButton({ title, description, buttonTitle, onclickFunction }) {
    return (<>
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-white text-6xl title-font font-medium mb-3">{title}</h1>
                    <p className="py-6">
                        {description}
                    </p>
                    <button className="btn " onClick={onclickFunction}>{buttonTitle}</button>
                </div>
            </div>
        </div>
    </>)
}