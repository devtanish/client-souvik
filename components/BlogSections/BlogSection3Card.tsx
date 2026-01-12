import Card from "@mui/material/Card";
import Image from "next/image";

interface BlogCardProps {
  ImageSrc?: string;
  Tag?: string;
  date?: string;
  Title?: string;
  Description?: string;
  CardSize?: "normal" | "large";
}

export default function BlogCard({
  ImageSrc = "/blog-images/7.jpeg",
  Tag = "",
  date = "",
  Title = "",
  Description = "",
  CardSize = "normal",
}: BlogCardProps) {
  return (
    <article className={`flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 ${CardSize == "large" ? "gap-4" : "gap-3"}`}>
      <div className={`relative w-full overflow-hidden rounded-md aspect-[16/10]`}>
        <Image
          src={ImageSrc}
          alt={Title || "Blog cover image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className={`flex justify-between border-t border-white/20 pt-2 text-[0.65rem] sm:text-md ${CardSize == "large" ? "lg:text-[0.7rem] xl:text-md" : "lg:text-[0.6rem] xl:text-[0.7rem]" } text-gray-300 uppercase tracking-wide`}>
        <span>{Tag}</span>
        <span>{date}</span>
      </div>

      <div className="flex flex-col gap-1 flex-grow">
        <h3 className={`text-lg sm:text-xl font-semibold leading-tight ${CardSize == "large" ? "xl:text-3xl" : "xl:text-xl"}`}>
          {Title}
        </h3>
        <p className={`text-xs sm:text-sm lg:text-[0.85rem] text-gray-400 line-clamp-2 lg:line-clamp-3 ${CardSize == "large" ? "xl:text-lg" : "md:text-md"}`}>
          {Description}
        </p>
      </div>
    </article>
  );
}