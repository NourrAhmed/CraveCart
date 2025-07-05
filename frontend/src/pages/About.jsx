import React from "react";
import CraveCartLogo from "../assets/CraveCartLogo.svg";
import FeaturesBox from "../components/FeaturesBox";

const About = () => {
  return (
    <div className="font-sans">
      <h1 className="text-center py-8 text-4xl font-bold text-[#000]">
        About Us
      </h1>

      <div className="flex flex-col md:flex-row justify-center  px-8 md:px-24 py-8">
        <div className="bg-[#212121] p-6 rounded-lg text-white min-w-[250px] max-w-[400px]  shadow-md mb-6 ">
          <h2 className="font-bold text-2xl mb-4 ">Crave Cart.</h2>
          <p className="text-lg">
            Crave Cart is an online food ordering platform that lets you choose
            from a variety of restaurants with ease. Our goal is to make
            ordering as simple as possible, delivering your food right to your
            door with just a click. We offer a wide range of restaurant options
            to satisfy every craving, ensuring a fast and smooth delivery
            experience.
          </p>
        </div>

        <div className="w-full md:w-[400px] h-[300px]">
          <img
            src={CraveCartLogo}
            alt="CraveCartLogo Image"
            className="w-fit h-fit mt-10 ml-10"
          />
        </div>
      </div>

      <FeaturesBox />
    </div>
  );
};

export default About;
