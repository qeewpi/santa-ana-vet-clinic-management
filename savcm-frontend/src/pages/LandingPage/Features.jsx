import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import AccordionDemo from "./LandingPageAccordion";

function Features() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="p-[2rem] container">
      <h2
        className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-start"
        data-aos="fade-up"
      >
        Our Services
      </h2>
      <div className="">
        <AccordionDemo />
      </div>
    </div>
  );
}

export default Features;
