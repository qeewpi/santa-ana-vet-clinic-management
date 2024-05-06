import React from "react";
import VerifyLeftSide from "./VerifyLeftSide";
import VerifyRightSide from "./VerifyRightSide";

export default function VerifyEmailPage() {
  return (
    <div className="max-w-screen flex flex-row min-h-screen mx-auto">
      <div className="w-full md:w-1/2">
        <VerifyLeftSide />
      </div>
      <div className="hidden md:block md:w-1/2">
        <VerifyRightSide />
      </div>
    </div>
  );
}
