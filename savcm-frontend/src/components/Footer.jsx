import { Facebook, Instagram } from "lucide-react";
import React from "react";
import Logo from "./ui/logo";

function Footer() {
  return (
    <div className="flex flex-col items-start text-sm">
      <div className="logo-container w-1/2">
        <Logo />
      </div>

      <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 w-full pt-10 text-start gap-x-4">
        <div className="footer-column flex flex-col gap-4">
          <h2 className="text-muted-foreground">Contact Details</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="tel:(02) 8241 7224">(02) 8241 7224</a>
            </li>
            <li>
              <a href="mailto:manilavetclinic@gmail.com">
                manilavetclinic@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/J17Yza2ikzrWkP5o6"
                target="_blank"
                rel="noopener noreferrer"
              >
                2259 Calderon, Santa Ana, Manila, 1009 Metro Manila
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column flex flex-col gap-4">
          <h2 className="text-muted-foreground">Social Media</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="https://www.facebook.com/manilavetclinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 items-center"
              >
                <Facebook className="w-5 h-5" /> Facebook
              </a>
            </li>
            <li>
              <a className="flex flex-row gap-2 items-center">
                <Instagram className="w-5 h-5" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 w-full mt-8 pt-4 font-medium">
        <p className="text-muted-foreground">
          © 2024 Santa Ana Animal Health Clinic. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
