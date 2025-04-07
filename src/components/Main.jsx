import { BENEFITS } from "../constants/benefits";
import Hero from "./Hero";
import HeroWithButton from "./HeroWithButton";
import ImageWithBenefits from "./ImageWithBenefits";



export default function Main() {

  const onclickFunction = () => document.getElementById('my_modal_1').showModal()

  return (
    <section className="text-black body-font lg:pt-20">
      <Hero
        title={"We are Printing beautiful models"}
        description={"First realtime price calculating website for customers"}
        imageURL={"https://p.turbosquid.com/ts-thumb/Fy/FpHA2S/COvGaAHU/mercedes2/jpg/1603956495/1920x1080/fit_q87/60d0093138466ee2537310c2b67868fd69e195a2/mercedes2.jpg"}
      />

      <div className="divider divider-base text-white">What do we do?</div>
      <section className="text-gray-600 body-font">
        <ImageWithBenefits
          imageURL={"https://files.cults3d.com/uploaders/7302754/illustration-file/1454697171-28676-7967/IMG_3639.JPG"}
          benefits={BENEFITS}

        />
      </section>
      <section className="text-gray-600 body-font">
        <HeroWithButton
          title={"Start printing"}
          description={"Just click the button and upload your modal to calculate price and order printing."}
          buttonTitle={"Calculate printing"}
          onclickFunction={onclickFunction}
        />
      </section>
    </section>
  );
}