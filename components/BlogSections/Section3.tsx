import Card from "../BlogSections/BlogSection3Card";
import { MdKeyboardArrowRight } from "react-icons/md";

const cards = [
  { row: "lg:row-start-1 lg:row-end-3", col: "lg:col-start-4 lg:col-end-6" },
  { row: "lg:row-start-1 lg:row-end-3", col: "lg:col-start-6 lg:col-end-8" },

  { row: "lg:row-start-3 lg:row-end-5", col: "lg:col-start-4 lg:col-end-6" },
  { row: "lg:row-start-3 lg:row-end-5", col: "lg:col-start-6 lg:col-end-8" },

  { row: "lg:row-start-5 lg:row-end-7", col: "lg:col-start-4 lg:col-end-6" },
  { row: "lg:row-start-5 lg:row-end-7", col: "lg:col-start-6 lg:col-end-8" },
];

export default function Section3({type}: {type: string}) {
  return (
    <div className="lg:px-[1.5%] w-full flex flex-col gap-5 lg:gap-5 text-white border-b border-gray-800 pt-5 2xl:pt-8 ">
      {type && <div className="text-white flex px-[3%] lg:px-0 text-xl xl:text-2xl"><p className="hover:underline cursor-pointer">{type}</p><MdKeyboardArrowRight className="translate-y-1" /></div>}
      <section
        className="
          grid grid-cols-1
          lg:grid-cols-7
          lg:grid-rows-6
          lg:gap-4
        "
      >
        <div className="flex flex-col gap-5 px-[3%] lg:px-0 pb-10 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-4">
          <Card
            ImageSrc="/blog-images/7.jpeg"
            Tag="People"
            date="May 18, 2024"
            Title="Tech innovators: The minds behind the machines"
            Description="Profiles of pioneering individuals who are driving technological advancements and innovation."
            CardSize="large"
          />
        </div>

        <div className="flex flex-col gap-5 px-[3%] lg:px-0 pb-10 lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-7">
          <Card
            ImageSrc="/blog-images/7.jpeg"
            Tag="People"
            date="May 18, 2024"
            Title="Tech innovators: The minds behind the machines"
            Description="Profiles of pioneering individuals who are driving technological advancements and innovation."
            CardSize="large"
          />
        </div>

        {cards.map(({ row, col }, index) => (
          <div
            key={index}
            className={`flex flex-col gap-5 px-[3%] lg:px-0 pb-10 ${row} ${col}`}
          >
            <Card
              ImageSrc="/blog-images/7.jpeg"
              Tag="People"
              date="May 18, 2024"
              Title="Tech innovators: The minds behind the machines"
              Description="Profiles of pioneering individuals who are driving technological advancements and innovation."
            />
          </div>
        ))}
      </section>
    </div>
  );
}