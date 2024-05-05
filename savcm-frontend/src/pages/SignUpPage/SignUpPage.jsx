import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function SignUpPage() {
  return (
    <div className="max-w-screen -m-[2rem] md:grid md:grid-cols-2 min-h-screen">
      <div>
        <LeftSide />
      </div>
      <div className="hidden md:block">
        <RightSide />
      </div>
    </div>
  );
}

export default SignUpPage;
