import Image from "next/image";
import ProfileDropdown from "../kokonutui/profile-dropdown";

export default function Section1() {
  return (
    <section className="text-white grid grid-cols-1 md:grid-cols-6 border-b border-gray-800 md:grid-rows-5 gap-0 min-h-[90vh] md:h-[50vh] bg-black">
        {/* Image Column */}
        <div className="md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-6 overflow-hidden h-[40vh] md:h-[90vh]">
        <div className="relative w-full h-full">
            <Image 
            alt="Blog image" 
            src={"/blog-images/10.webp"} 
            fill
            quality={100}
            className="object-cover [object-position:50%_20%]"
            />
        </div>
        </div>

        {/* Content Column */}
        <div className=" md:col-start-1 md:col-end-4 px-[4%] md:px-[5%] md:row-start-1 md:row-end-6 h-full w-full flex flex-col justify-between py-3 lg:py-10 xl:pr-25 2xl:pr-50">
        <div className="flex flex-col gap-3 mb-20">
            <span className="text-3xl md:text-4xl font-bold">
            <div>We don&apos;t follow trends. </div>
            <div>We create them.</div>
            </span>
            <div className="text-sm lg:text-md font-serif">We are driven by an unwavering commitment to excellence and a passion for innovation. Our approach blends meticulous craftsmanship with a bold vision, allowing us to create content that stands out in a crowded marketplace. Our work is defined by its sophistication, creativity, and ability to push the boundaries of what's possible.</div>
            <div className="text-sm lg:text-md font-serif">Beyond client-driven projects, we invest in experimental work that challenges the status quo and explores the limitless possibilities of digital media. By constantly pushing the limits of technology and creativity, we not only enhance our skills but also inspire new trends and set new standards in the industry.</div>
        </div>

        <div className="text-sm flex flex-col gap-1">
          <Image src={"/man/3.webp"} alt="hello" height={100} width={100} className="rounded-full md:mb-2 size-10 md:size-15"/>
          <div className="text-lg md:text-2xl">Alex Bennet, Creative Director</div>
          <div className="text-md md:text-lg ">
            <button className="cursor-pointer hover:underline w-max">Learn more</button>
          </div>
        </div>
        </div>
    </section>
  );
}