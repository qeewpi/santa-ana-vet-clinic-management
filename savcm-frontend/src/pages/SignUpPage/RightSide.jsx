import React from "react";
import catAndDogImage from "../../assets/images/cats-and-dogs.png";
import { CalendarDays } from 'lucide-react';
import { ShieldCheck  } from 'lucide-react';

const App = () => {
  return (
    <div>
      <CalendarDays />
      <ShieldCheck  />
    </div>
  );
};

function RightSide() {
  return (
    <div>
      <div className="bg-[#735C3C] text-white  rounded-lg shadow-md">
      <h1 className=" text-2xl font-bold text-center">Simplify Your Pet Care Experience with Our App</h1>
      <p className="text-lg mb-4">
        Take the stress out of caring for your furry friend with our all-in-one pet care app.
      </p>
      <div className="pr-36 pl-36">
        <div className="benefit">
          <div className="icon flex justify-center items-center mb-4">
          <CalendarDays className="w-12 h-12"/>
          </div>
            <div className=" mb-4 bg-white rounded-2xl p-10">
              <p className="text-gray-700 text-base font-semibold leading-relaxed">
                Easy Appointment Scheduling 
                </p>

                  <p className="text-gray-700 text-base font-semibold leading-relaxed pt-5">
                Schedule vet visits, grooming sessions, and dog walking services – all in one place, anytime.
              </p>
            </div>
          </div>
          <div className="benefit">
            <div className="icon flex justify-center items-center mb-4">
            <ShieldCheck className="w-12 h-12"/>
            </div>
            <div className=" mb-4 bg-white rounded-2xl p-10">
              <p className="text-gray-900 text-base font-bold leading-relaxed">
                SECURE ACCESS TO PET RECORDS
                <p className="text-gray-900 text-base font-semibold leading-relaxed pt-5">
                  Keep track of your pet's vaccination history, medications, and medical notes – all
                organized and readily available.
                </p>
                
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <img
            src={catAndDogImage}
            alt="catAndDogImage"
            className="w-1/2 mx-auto block"
          />
        </div>
      </div>
    </div>
  );
}

export default RightSide;
