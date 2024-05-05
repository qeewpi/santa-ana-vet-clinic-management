import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function SignUpPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <LeftSide />
      <RightSide />
    </div>
  );
}

export default SignUpPage;
