"use client";
import { BlogCard } from "./subCompo/BlogCard";
import SplitText from "./SplitText";
import * as motion from "motion/react-client"
import Image from "next/image";
import Pagination from '@mui/material/Pagination';
import { useScrollDirection } from "@/customFunctions/scrole";
import { HiguenSerif } from "./subCompo/fonts";
import ProfileDropdown from "@/components/kokonutui/profile-dropdown"
import Stack from '@mui/material/Stack';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Drawer from "./subCompo/BlogSideBar";
import { Suspense } from "react";
import { FullScreenVideo } from "./video/video";

// Utility function for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const BLOGS_PER_PAGE = 5;

export const BlogData = [
  {
    url: "/blog-images/1.jpg",
    title: "Jewel of the Month",
    description: "Alessio Boschi's Jubilee Ring",
    tags: ["jewellery", "knowledge"],
    sign: "By Katerina Perez",
    club: false,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
    BigImages: ["/blog-images/1.jpg", "/blog-images/2.jpg", "/blog-images/3.jpg", "/blog-images/4.jpg"],
  },
  {
    url: "/blog-images/2.jpg",
    title: "Where Form Finds Feeling",
    description: "Inside India's Mrs. Marquise",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: false,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/3.jpg",
    title: "Debunked",
    description: "10 Precious Jewelry Myths that Deserve to be Retired",
    tags: ["jewellery", "knowledge"],
    sign: "By Katerina Perez",
    club: true,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/4.jpg",
    title: "Two Worlds Collide",
    description: "How Jewellery Enriched Fashion on the 2025/26 Catwalks",
    tags: ["jewellery", "trends"],
    sign: "By Francesca Fearon",
    club: true,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/5.jpg",
    title: "Molten Beauty",
    description: "Dalal Alosaimi's Moody Jewellery is the New Face of Kuwaiti Luxury",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: false,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/6.jpg",
    title: "Beyond Gold and Platinum",
    description: "The Alloys Powering a New Era of Contemporary Craftsmanship",
    tags: ["jewellery", "knowledge"],
    sign: "By Joshua Hendren",
    club: true,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/7.jpeg",
    title: "Molten Beauty",
    description: "Dalal Alosaimi's Moody Jewellery is the New Face of Kuwaiti Luxury",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: true,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/8.webp",
    title: "Two Worlds Collide",
    description: "How Jewellery Enriched Fashion on the 2025/26 Catwalks",
    tags: ["jewellery", "trends"],
    sign: "By Francesca Fearon",
    club: true,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
  {
    url: "/blog-images/9.webp",
    title: "Molten Beauty",
    description: "Dalal Alosaimi's Moody Jewellery is the New Face of Kuwaiti Luxury",
    tags: ["jewellery", "profile"],
    sign: "By Katerina Perez",
    club: true,
    publishDate: "June 10, 2024",
    by: "By Katerina Perez",
    readTime: "8 min read",
  },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

function ScrollProgressArrow({ size = 60, position = 'fixed' }) {
  const progress = useScrollProgress();
  const positionClass = position === 'fixed' ? 'fixed' : position === 'absolute' ? 'absolute' : 'sticky';

  const arrowColor = progress > 50 ? '#ffffff' : '#000000';

  return (
    <div className={`${positionClass} bottom-22 right-5.5 md:bottom-22 md:right-5.5 `} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="block"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="none"
        />

        <defs>
          <clipPath id="circleClip">
            <circle cx="50" cy="50" r="45" />
          </clipPath>
        </defs>

        <rect
          x="5"
          y={5 + (90 * (100 - progress) / 100)}
          width="90"
          height={90 * progress / 100}
          fill="#1a1a1a"
          clipPath="url(#circleClip)"
        />

        <path
          d="M 50 30 L 50 60 M 50 60 L 40 50 M 50 60 L 60 50"
          stroke={arrowColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const blogname = searchParams.get("blogname");
  const router = useRouter();
  const tag = searchParams.get("tag");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const topSectionRef = useRef<HTMLDivElement>(null);
  const isTopBarVisible = useScrollDirection(topSectionRef);

  const filteredBlogs = tag
    ? BlogData.filter((blog) => blog.tags.includes(tag))
    : BlogData;

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const blog = BlogData.find((b) => b.title === blogname);

  const TopBar = [
    { text: "Jewellery", link: "" },
    { text: "knowledge", link: "" },
    { text: "Moodbord", link: "" },
    { text: "Raya Story", link: "" }
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/blog?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagClick = (tagText: string) => {
    const params = new URLSearchParams();
    params.set("tag", tagText.toLowerCase());
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  const handleBlogClick = (blogTitle: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("blogname", blogTitle);
    router.push(`/blog?${params.toString()}`);
  };

  const handleDrawerClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("blogname");
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <>
      <div className="absolute">
        {blogname && blog && (
          <Drawer
            isOpen={true}
            onClose={handleDrawerClose}
            key={1}
            Data={blog}
          />
        )}
      </div>

      {/* Tracker element to know when to start hiding the bar */}
      <div ref={topSectionRef} className="h-1 w-full" />

      <div className={`${blogname ? 'object-cover transition-transform my-12 md:my-24 md:mb-16' : ''}`}>
        {/* TopBar visibility logic - ONLY THIS PART IS FIXED */}
        <div
          className={cn(
            "fixed left-0 right-0 top-20 md:top-28 z-40 transition-all duration-300 ease-in-out",
            !isTopBarVisible ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          )}
        >
          <div className="flex justify-center w-full py-0 md:py-4 xl:py-4">
            <div className="flex gap-5 md:gap-10 backdrop-blur-sm px-6 py-2 rounded-full">
              {TopBar.map((items, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(items.text)}
                  className="uppercase hover:text-gray-500 transition-colors cursor-pointer text-xs md:text-sm font-medium"
                >
                  {items.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Show blog cards when tag is selected */}
        {tag && (
          <>
            {/* Blog Cards logic */}
            <div className="lg:px-5 px-0 sm:px-4 flex justify-center items-center my-20 md:my-10 md:mt-32 md:mb-16">
              <div className="grid 2xl:mx-5 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                {paginatedBlogs.map((blog, index) => {
                  return (
                    <div
                      key={index}
                      className="mt-10"
                      onClick={() => handleBlogClick(blog.title)}
                    >
                      <BlogCard
                        url={blog.url}
                        title={blog.title}
                        description={blog.description}
                        tags={blog.tags}
                        sign={blog.sign}
                        club={blog.club}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Paging Logic And component */}
            {filteredBlogs.length > BLOGS_PER_PAGE && (
              <Stack spacing={2} className="mt-16 flex items-center pb-10">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            )}
          </>
        )}
      </div>

      {!tag && (
        <>
          <FullScreenVideo
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="/blog-images/video-poster.jpg"
          />
          <div className=" 2xl:px-[12.5%] xl:px-[7.5%] bg-black">
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

                <div className="text-sm"><ProfileDropdown /></div>
              </div>
            </section>

            <section className="text-white text-3xl h-[80vh] w-full bg-black border-b border-gray-800  flex flex-col justify-center items-center px-5">
              <motion.div className="box" ><SplitText text="At Vence, we excel in creating captivating content that not only captures attention but also drives meaningful engagement. We leverages cutting-edge technology and innovative storytelling techniques to produce visually stunning commercials."/></motion.div>
            </section>

            <section className="h-[80vh]  w-full bg-black border-b border-gray-800">

            </section>
          </div>
        </>
      )}
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
      <ScrollProgressArrow size={70} position="fixed" />
    </Suspense>
  );
}