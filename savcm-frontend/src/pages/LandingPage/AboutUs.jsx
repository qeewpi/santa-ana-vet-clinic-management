import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="text-center">
      <h1
        className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl"
        data-aos="fade-up"
      >
        About Santa Ana Animal Health Clinic
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6" data-aos="fade-up">
        Santa Ana Animal Health Clinic is dedicated to providing compassionate
        and affordable veterinary care to the pets of our community. We believe
        that all animals deserve access to quality healthcare, regardless of
        their background. Our team of dedicated professionals is committed to
        ensuring the well-being of your furry companions.
      </p>
    </div>
  );
}

export default AboutUs;
