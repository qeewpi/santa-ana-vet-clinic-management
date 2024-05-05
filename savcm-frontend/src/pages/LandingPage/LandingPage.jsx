import Footer from "../../components/Footer";
import { useTheme } from "../../components/ui/theme-provider";
import AboutUs from "./AboutUs";
import Features from "./Features";
import Hero from "./Hero";
import { LandingPageNavBar } from "./LandingPageNavBar";

function LandingPage() {
  const theme = useTheme();

  return (
    <div className="">
      <div className="relative">
        {theme.theme === "light" ? (
          <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-amber-500 opacity-20 blur-[100px]"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-amber-500 bg-[size:20px_20px] opacity-5 blur-[100px] -z-10"></div>
        )}
        <div className="container py-[2rem]">
          <LandingPageNavBar />
        </div>
        <div className="container pt-20 pb-28 md:pb-48">
          <Hero />
        </div>
      </div>
      <div className="bg-white dark:bg-black">
        <div className="py-8 md:py-16">
          <Features />
        </div>
      </div>
      <div className="pt-40 relative">
        {theme.theme === "light" ? (
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,rgba(240,240,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(240,240,240,0.5)_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(209,95,60,0.5),transparent)]"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-red-400 bg-[size:20px_20px] opacity-10 blur-[100px]"></div>
        )}
        <div className="container pb-40">
          <AboutUs />
        </div>
      </div>
      <div className="pt-20 container">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
