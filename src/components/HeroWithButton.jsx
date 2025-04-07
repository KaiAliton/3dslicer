export default function HeroWithButton({ title, description, buttonTitle, onclickFunction }) {
    return (<>
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-base-content font-bold text-6xl title-font mb-3">{title}</h1>
                    <p className="text-2xl py-6">
                        {description}
                    </p>
                    <button className="btn btn-lg" onClick={onclickFunction}>{buttonTitle}</button>
                </div>
            </div>
        </div>
    </>)
}