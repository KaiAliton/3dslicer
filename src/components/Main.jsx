
export default function Main() {
  return (
    <section className="text-black body-font lg:pt-20">
      <div className="container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
        <div className="flex flex-col w-full mb-2 text-left md:text-center ">
          <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white lg:text-8xl md:text-7xl">
            <span>We are Printing </span>
            <br className="hidden lg:block"></br>
            beautiful models
          </h1>
          <br></br>
          <p className="mx-auto  text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3">
            First realtime price calculating website for customers {" "}
          </p>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center py-8 mx-auto rounded-lg md:p-1 p-3">
        <img
          className="object-cover object-center w-full mb-10 border-gray-200 dark:border-gray-900 g327 border rounded-lg shadow-md"
          alt="hero"
          src="https://p.turbosquid.com/ts-thumb/Fy/FpHA2S/COvGaAHU/mercedes2/jpg/1603956495/1920x1080/fit_q87/60d0093138466ee2537310c2b67868fd69e195a2/mercedes2.jpg"
        ></img>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="https://3dmade.ru/sites/default/files/inline-images/3dprint_spb2.jpg"
            ></img>
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-white text-2xl title-font font-medium mb-3">
                  Instant Price & Weight Estimation
                </h2>
                <p className="leading-relaxed text-lg">
                  Upload your 3D model and get an immediate cost and weight estimate based on material, size, and printing parameters. No waiting—just quick, transparent pricing.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-white text-2xl title-font font-medium mb-3">
                  Interactive 3D Model Viewer
                </h2>
                <p className="leading-relaxed text-lg">
                  After uploading, view your model directly in the browser with our built-in 3D viewer. Rotate, zoom, and inspect your design before placing an order.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-white text-2xl title-font font-medium mb-3">
                  Automated File Analysis
                </h2>
                <p className="leading-relaxed text-lg">
                  Our system checks your model for errors (like non-manifold edges or wall thickness issues) and suggests fixes before printing.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-white text-2xl title-font font-medium mb-3">
                  Real-Time Production Updates
                </h2>
                <p className="leading-relaxed text-lg">
                  Track your order status with live updates—from printing to shipping.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className="text-white text-2xl title-font font-medium mb-3">
                  Secure File Handling
                </h2>
                <p className="leading-relaxed text-lg">
                  Your 3D models are kept private and only used for production—no sharing or unauthorized use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-white text-6xl title-font font-medium mb-3">Start printig</h1>
              <p className="py-6">
                Just click the button and upload your modal to calculate price and order printing.
              </p>
              <button className="btn " onClick={() => document.getElementById('my_modal_1').showModal()}>Calculate printing</button>
            </div>
          </div>
        </div>
      </section>

    </section>
  );
}