import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function SignUpPage() {
  return (
    <div className="max-w-screen flex flex-row min-h-screen mx-auto">
      <div className="w-full lg:w-1/2">
        <LeftSide />
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <RightSide />
      </div>
    </div>
  );
}

export default SignUpPage;
