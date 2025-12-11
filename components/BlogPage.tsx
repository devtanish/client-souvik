"use client";
import { BlogCard } from "./subCompo/BlogCard";
import { useSearchParams, useRouter } from "next/navigation";
import Drawer from "./subCompo/BlogSideBar";
import { Suspense } from "react";

const BlogData = [
  {
    url: "/blog-images/1.jpg",
    title: "Jewel of the Month",
    description: "Alessio Boschi's Jubilee Ring",
    tags: ["jewellery", "knowledge"],
    sign: "By Katerina Perez",
    club: false,
  },
  {
    url: "/blog-images/2.jpg",
    title: "Where Form Finds Feeling",
    description: "Inside India's Mrs. Marquise",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: false,
  },
  {
    url: "/blog-images/3.jpg",
    title: "Debunked",
    description: "10 Precious Jewelry Myths that Deserve to be Retired",
    tags: ["jewellery", "knowledge"],
    sign: "By Katerina Perez",
    club: true,
  },
  {
    url: "/blog-images/4.jpg",
    title: "Two Worlds Collide",
    description: "How Jewellery Enriched Fashion on the 2025/26 Catwalks",
    tags: ["jewellery", "trends"],
    sign: "By Francesca Fearon",
    club: true,
  },
  {
    url: "/blog-images/5.jpg",
    title: "Molten Beauty",
    description: "Dalal Alosaimi's Moody Jewellery is the New Face of Kuwaiti Luxury",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: false,
  },
  {
    url: "/blog-images/6.jpg",
    title: "Beyond Gold and Platinum",
    description: "The Alloys Powering a New Era of Contemporary Craftsmanship",
    tags: ["jewellery", "knowledge"],
    sign: "By Joshua Hendren",
    club: true,
  },
  {
    url: "/blog-images/7.jpeg",
    title: "Molten Beauty",
    description: "Dalal Alosaimi's Moody Jewellery is the New Face of Kuwaiti Luxury",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: true,
  },
  {
    url: "/blog-images/8.webp",
    title: "Two Worlds Collide",
    description: "How Jewellery Enriched Fashion on the 2025/26 Catwalks",
    tags: ["jewellery", "trends"],
    sign: "By Francesca Fearon",
    club: true,
  },
  {
    url: "/blog-images/9.webp",
    title: "Molten Beauty",
    description: "Dalal Alosaimi's Moody Jewellery is the New Face of Kuwaiti Luxury",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: true,
  },
];

// Separate component that uses useSearchParams
function BlogContent() {
  const searchParams = useSearchParams();
  const blogname = searchParams.get("blogname");
  const router = useRouter();

  const blog = BlogData.find((b) => b.title === blogname);

  return (
    <div className={``}>
      {blogname && <Drawer isOpen={blogname ? true : false} onClose={() => router.push('/blog')} key={1} Data={blog}/>}
      <div className={`${blogname ? ` object-cover transition-transform `: ``}`}>
        <div className={` flex gap-10 w-screen justify-center sticky top-20 rounded-2xl md:top-30 z-10 `}>
          <div className="gap-5 md:gap-10 flex justify-center backdrop-blur-xs  py-2 md:px-6 ">
            <span className="uppercase hover:text-gray-500 cursor-pointer">Jewellery</span>
            <span className="uppercase hover:text-gray-500 cursor-pointer">Gemstones</span>
            <span className="uppercase hover:text-gray-500 cursor-pointer">Watches</span>
            <span className="uppercase hover:text-gray-500 cursor-pointer">Raya Blogs</span>
          </div>
        </div>
        <div className="lg:px-5 px-0 sm:px-4 flex justify-center items-center">
          <div className="grid 2xl:mx-5 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 ">
            {BlogData.map((blog, index) => {
              return <div key={index} className="mt-10" onClick={() => {
                router.push(`/blog?blogname=${blog.title}`)
              }}>
                <BlogCard url={blog.url} title={blog.title} description={blog.description} tags={blog.tags} sign={blog.sign} club={blog.club} />
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export wrapped in Suspense
export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}