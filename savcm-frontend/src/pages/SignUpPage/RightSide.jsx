import React from "react";
import catAndDogImage from "../../assets/images/cats-and-dogs.png";

function RightSide() {
  return (
    <div className="p-20">
      <div className="bg-teal-100 p-20 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Simplify Your Pet Care Experience with Our App</h1>
      <p className="text-lg mb-4">
        Take the stress out of caring for your furry friend with our all-in-one pet care app.
      </p>
      <div className="pr-36 pl-36">
        <div className="benefit">
          <div className="icon flex justify-center items-center mb-4 p-10">
            <svg
              className="h-12 w-12 text-orange-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8L5.64 11.36a1 1 0 1 1-1.42-1.42L12 4l4.64 4.64a1 1 0 0 1-1.42 1.42z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 11a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
            <div className=" mb-4 bg-white rounded-2xl p-10">
              <p className="text-gray-700 text-base font-semibold leading-relaxed">
                Easy Appointment Scheduling: Schedule vet visits, grooming sessions,
                and dog walking services – all in one place, anytime.
              </p>
            </div>
          
        </div>
        <div className="benefit">
          <div className="icon flex justify-center items-center mb-4">
            <svg
              className="h-12 w-12 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12h6m-6 4h6m2 4H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-2m-2-4v-8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
            <div className=" mb-4 bg-white rounded-2xl p-10">
          <p className="text-gray-700 text-base font-semibold leading-relaxed">
            Secure Access to Pet Records: Keep track of your pet's vaccination
            history, medications, and medical notes – all organized and
            readily available.
          </p>
        </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <img src={catAndDogImage} alt="catAndDogImage" className="w-1/2 mx-auto block" />
      </div>
    </div>
    </div>
  );
}

export default RightSide;