import EarringsPage from "@/components/categoryPage";

export default function Home() {

  return (
    <div className="mt-18 md:mt-31 w-screen  mb-20">
      <div className="md:mt-0">
        <div className="w-screen h-25 bg-white z-10 top-7 md:flex hidden fixed"></div> 
        <EarringsPage/>        
      </div>
    </div>
  );
}
