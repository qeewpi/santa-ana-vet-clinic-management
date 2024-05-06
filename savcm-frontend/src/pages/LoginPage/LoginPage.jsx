import React from "react";
import LoginLeftSide from "./LoginLeftSide";
import LoginRightSide from "./LoginRightSide";

export default function LoginPage() {
  return (
    <div className="max-w-screen flex flex-row min-h-screen mx-auto">
      <div className="w-full lg:w-1/2">
        <LoginLeftSide />
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <LoginRightSide />
      </div>
    </div>
  );
}
