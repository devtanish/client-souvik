import { BlogCard } from "@/components/subCompo/BlogCard";


    // url?: string;
    // title?: string;
    // description?: string;
    // tags?: string[2];
    // sign?: string;
    // club?: boolean;

const BlogData = [
    {
        url: "/blog-images/1.webp",
        title: "Jewl of the Month",
        description: "Alessio Boschi's Jubilee Ring",
        tags: ["julery", "Knowledge"],
        sign: "By Katerina Perez",
        club: false,
    },
    {
        url: "/blog-images/2.webp",
        title: "Where From Finds Feeling",
        description: "Inside India's Mrs. Marquise",
        tags: ["julery", "Profile"],
        sign: "By Katerina Perez",
        club: false,
    },
    {
        url: "/blog-images/3.webp",
        title: "Debunked",
        description: "10 Precious Jewelry Myths that Deserve to be Retired",
        tags: ["julery", "Knowledge"],
        sign: "By Katerina Perez",
        club: true,
    },
    {
        url: "/blog-images/4.webp",
        title: "Two Worlds Collide",
        description: "How Jweleria Enriched Fashion on the 2025/26 Catwalks",
        tags: ["julery", "Trends"],
        sign: "By Francesca Fearon",
        club: true,
    },
    {
        url: "/blog-images/5.webp",
        title: "Molten Beauty",
        description: "Dalal Alosaimi’s Moody Jewellery is the New Face of Kuwaiti Luxury",
        tags: ["julery", "profile"],
        sign: "by Katerina Perez",
        club: false,
    },
    {
        url: "/blog-images/6.webp",
        title: "Beyond Gold and Platinum",
        description: "The Alloys Powering a New Era of Contemporary Craftsmanship",
        tags: ["julery", "knowledge"],
        sign: "By Joshua Hendren",
        club: true,
    },
    {
        url: "/blog-images/5.webp",
        title: "Molten Beauty",
        description: "Dalal Alosaimi’s Moody Jewellery is the New Face of Kuwaiti Luxury",
        tags: ["julery", "profile"],
        sign: "by Katerina Perez",
        club: true,
    },
    {
        url: "/blog-images/4.webp",
        title: "Two Worlds Collide",
        description: "How Jweleria Enriched Fashion on the 2025/26 Catwalks",
        tags: ["julery", "Trends"],
        sign: "By Francesca Fearon",
        club: true,
    },
    {
        url: "/blog-images/5.webp",
        title: "Molten Beauty",
        description: "Dalal Alosaimi’s Moody Jewellery is the New Face of Kuwaiti Luxury",
        tags: ["julery", "profile"],
        sign: "by Katerina Perez",
        club: true,
    }
]

export default function BlogPage() {
    return (
        <>
            <div className="lg:px-5 px-4 flex justify-center items-center">
                <div className="grid grid-cols-3">
                    {BlogData.map((blog, index) => {
                        return <div key={index} className="mt-10">
                            <BlogCard url={blog.url} title={blog.title} description={blog.description} tags={blog.tags[index-1]} sign={blog.sign} club={blog.club} />
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}
