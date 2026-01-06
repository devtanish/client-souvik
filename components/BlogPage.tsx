"use client";
import { BlogCard } from "./subCompo/BlogCard";
import Pagination from '@mui/material/Pagination';
import { useScrollDirection } from "@/customFunctions/scrole";
import { HiguenSerif } from "./subCompo/fonts";
import Stack from '@mui/material/Stack';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Drawer from "./subCompo/BlogSideBar";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

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
    <div className={`${positionClass} bottom-5 right-2 md:bottom-22 md:right-5.5 z-[]`} style={{ width: `${size}px`, height: `${size}px` }}>
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

  // Threshold ref and visibility state
  const topSectionRef = useRef<HTMLDivElement>(null);
  const isTopBarVisible = useScrollDirection(topSectionRef);

  // Filter blogs by tag
  const filteredBlogs = tag
    ? BlogData.filter((blog) => blog.tags.includes(tag))
    : BlogData;

  // Calculate pagination
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
      {blogname && blog && (
        <Drawer
          isOpen={true}
          onClose={handleDrawerClose}
          key={1}
          Data={blog}
        />
      )}

      {/* Tracker element to know when to start hiding the bar */}
      <div ref={topSectionRef} className="h-1 w-full" />

      <div className={`${blogname ? 'object-cover transition-transform' : ''}`}>
      {/* TopBar visibility logic */}
        <div
          className={cn(
            "flex gap-10 w-screen justify-center sticky top-20 rounded-2xl md:top-30 z-10 transition-all duration-300 ease-in-out",
            !isTopBarVisible ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          )}
        >
          <div className="gap-5 md:gap-10 flex justify-center backdrop-blur-xs py-2 md:px-6">
            {TopBar.map((items, idx) => (
              <button
                key={idx}
                onClick={() => handleTagClick(items.text)}
                className="uppercase hover:text-gray-500 cursor-pointer text-[0.8rem] md:text-[0.95rem]"
              >
                {items.text}
              </button>
            ))}
          </div>
        </div>

        {/* Show HELLO page when no tag is selected */}
        {!tag ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h1 className="text-4xl font-bold">HELLO</h1>
          </div>
        ) : (
          <>
          {/* Blog Cards logic */}
            <div className="lg:px-5 px-0 sm:px-4 flex justify-center items-center">
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
              <Stack spacing={2} className="mt-15 flex items-center pb-10">
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