import EarringsPage from "@/components/categoryPage";

export default function Home() {

  return (
    <div className="mt-18 md:mt-31 w-screen  mb-20">
      <div className="md:mt-0 lg:mx-12 md:mx-10 mx-4">
        <div className="w-screen h-24 bg-white z-10 top-8 md:flex hidden -translate-x-12 fixed"></div> 
        {/* <LandingPage /> */}
        <EarringsPage/>        
      </div>
    </div>
  );
}
