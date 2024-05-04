import Features from "./Features";
import Hero from "./Hero";
import { LandingPageNavBar } from "./LandingPageNavBar";

function LandingPage() {
  return (
    <div>
      <LandingPageNavBar />
      <div className="container pt-20 pb-36">
        <Hero />
      </div>
      <div className="container">
        <Features />
      </div>
    </div>
  );
}

export default LandingPage;
