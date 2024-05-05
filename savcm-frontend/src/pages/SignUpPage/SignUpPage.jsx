import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function SignUpPage() {
  return (
    <div className="lg:grid lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block">
        <LeftSide />
      </div>
      <RightSide />
    </div>
  );
}

export default SignUpPage;
