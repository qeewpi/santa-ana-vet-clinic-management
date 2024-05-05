import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

function AccordionDemo() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" data-aos="fade-up">
        <AccordionTrigger>Pet Records</AccordionTrigger>
        <AccordionContent>
          Securely store your pet's medical history for easy access and
          efficient care.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" data-aos="fade-up">
        <AccordionTrigger>Easy Appointment Booking</AccordionTrigger>
        <AccordionContent>
          Schedule appointments online at your convenience.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" data-aos="fade-up">
        <AccordionTrigger>Expert Veterinarians</AccordionTrigger>
        <AccordionContent>
          Our experienced team provides comprehensive care for your pets.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" data-aos="fade-up">
        <AccordionTrigger>Affordable Services</AccordionTrigger>
        <AccordionContent>
          We offer competitive rates and low-cost programs to ensure
          accessibility.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionDemo;
