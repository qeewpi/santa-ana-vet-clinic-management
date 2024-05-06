import React from "react";
import EmailVerifiedLeft from "./EmailVerifiedLeft";
import EmailVerifiedRight from "./EmailVerifiedRight";

export default function EmailVerifiedPage() {
  return (
    <div className="max-w-screen flex flex-row min-h-screen mx-auto">
      <div className="w-full md:w-1/2">
        <EmailVerifiedLeft />
      </div>
      <div className="hidden md:block md:w-1/2">
        <EmailVerifiedRight />
      </div>
    </div>
  );
}
