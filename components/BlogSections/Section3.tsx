import Card from "../BlogSections/BlogSection3Card";

const cards = [
  { row: "lg:row-start-1 lg:row-end-3", col: "lg:col-start-4 lg:col-end-6" },
  { row: "lg:row-start-1 lg:row-end-3", col: "lg:col-start-6 lg:col-end-8" },

  { row: "lg:row-start-3 lg:row-end-5", col: "lg:col-start-4 lg:col-end-6" },
  { row: "lg:row-start-3 lg:row-end-5", col: "lg:col-start-6 lg:col-end-8" },

  { row: "lg:row-start-5 lg:row-end-7", col: "lg:col-start-4 lg:col-end-6" },
  { row: "lg:row-start-5 lg:row-end-7", col: "lg:col-start-6 lg:col-end-8" },
];

export default function Section3() {
  return (
    <section
      className="
        w-full text-white border-b border-gray-800 py-10
        grid grid-cols-1 gap-10
        lg:grid-cols-[1fr_1fr_2fr_1fr_1.5fr_1fr_1.5fr]
        lg:grid-rows-6 lg:gap-0
        lg:px-[1.5%]
        xl:px-0
      "
    >
        <div className="flex flex-col gap-5 px-[3%] lg:px-[2%] pb-0 sm:pb-0 lg:pb-10 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-4">
            <Card
                ImageSrc="/blog-images/7.jpeg"
                Tag="People"
                date="May 18, 2024"
                Title="Tech innovators: The minds behind the machines"
                Description="Profiles of pioneering individuals who are driving technological advancements and innovation."
                CardSize="large"
            />
        </div>

        <div className="flex flex-col gap-5 px-[3%] lg:px-[2%] pb-0 sm:pb-0 lg:pb-10 lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-7">
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
          className={`
            flex flex-col gap-5 px-[3%] lg:px-[2%] pb-0 sm:pb-0 lg:pb-10
            ${row} ${col}
          `}
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
  );
}
