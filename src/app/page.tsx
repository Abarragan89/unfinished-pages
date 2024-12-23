import Jumbotron from "@/components/Jumbotron";
import TopicCard from "@/components/Cards/TopicCard";
import BlogCard from "@/components/Cards/BlogCard";
import CardSection from "@/components/CardSection";
import Carousel from "@/components/Carousel";
import { BlogTopic } from "../../types/blogtopics";
import { BlogData } from "../../types/blog";
import LoginModal from "@/components/Modals/LoginModal";
import { Suspense } from 'react'
import Link from "next/link";
import getPublishedBlogs from "./services/getPublishedBlogs";
import { cleanTitleForURL } from "../../utils/stringManipulation";
import { formatDate } from "../../utils/formatDate";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'Unfinished Pages',
    description: 'Blogs that explore ideas that leaves you with questions, not answers. Join the Conversation',
    openGraph: {
      title: 'Unfinished Pages',
      description: 'Blogs that explore ideas that leaves you with questions, not answers. Join the Conversation',
      url: `https://www.unfinishedpages.com`,
      images: '/images/websiteLogo.png',
      siteName: 'Unfinished Pages',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Unfinished Pages',
      description: 'Blogs that explore ideas that leaves you with questions, not answers. Join the Conversation',
      images: '/images/websiteLogo.png',
    },
    alternates: {
      canonical: `https://www.unfinishedpages.com`
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function Home() {
  const blogTopics: BlogTopic[] = [
    {
      title: "Politics | Philosophy",
      description: "Delve into the realms of politics and philosophy, exploring ideas that shape societies and human thought.",
      imgSrc: "/images/categories/politics-philosophy.png",
      alt: "Politics and Philosophy",
      link: "/category/politics-philosophy"
    },
    {
      title: "Education | Career",
      description: "Explore the intersection of education and career, uncovering paths to learning and professional growth.",
      imgSrc: "/images/categories/education-career.png",
      alt: "Education and Career",
      link: "/category/education-career"
    },
    {
      title: "Business | Technology",
      description: "Dive into the world of business and technology, discovering innovations and strategies shaping the future.",
      imgSrc: "/images/categories/business-technology.png",
      alt: "Business and Technology",
      link: "/category/business-technology"
    },
    {
      title: "Health | Fitness",
      description: "Navigate the journey of health and fitness, learning tips and strategies for a balanced lifestyle.",
      imgSrc: "/images/categories/health-fitness.png",
      alt: "Health and Fitness",
      link: "/category/health-fitness"
    },
    {
      title: "Short Stories",
      description: "Immerse yourself in captivating short stories that inspire, entertain, and provoke thought.",
      imgSrc: "/images/categories/short-stories.png",
      alt: "Short Stories",
      link: "/category/short-stories"
    },
    {
      title: "Family | Relationships",
      description: "Explore the dynamics of family and relationships, uncovering the essence of human connection.",
      imgSrc: "/images/categories/family-relationships.png",
      alt: "Family and Relationships",
      link: "/category/family-relationships"
    },
    {
      title: "Travel | Food",
      description: "Embark on a journey of travel and food, savoring experiences from around the globe.",
      imgSrc: "/images/categories/travel-food.png",
      alt: "Travel and Food",
      link: "/category/travel-food"
    },
    {
      title: "DIY",
      description: "Get inspired with DIY projects, unlocking creativity and hands-on skills.",
      imgSrc: "/images/categories/DIY.png",
      alt: "DIY",
      link: "/category/DIY"
    },
    {
      title: "Entertainment | Sports",
      description: "Stay updated with the latest in entertainment and sports, celebrating moments of joy and competition.",
      imgSrc: "/images/categories/entertainment-sports.png",
      alt: "Entertainment and Sports",
      link: "/category/entertainment-sports"
    },
    {
      title: "Other",
      description: "Discover topics that don't fit into conventional categories but are equally intriguing.",
      imgSrc: "/images/categories/other.png",
      alt: "Other Topics",
      link: "/category/other"
    }
  ];

  const blogData = await getPublishedBlogs() as BlogData[];

  return (
    <main>
      <Suspense>
        <LoginModal />
      </Suspense>
      <Jumbotron />
      <div className="my-[60px]" id="featured-blogs">
        <CardSection heading="Featured Blogs">
          <Carousel>
            {blogData && blogData.map((blog: BlogData) => {
              return (
                <Link key={blog.id} href={`/blog/${cleanTitleForURL(blog.title as string)}-${blog.id}`} className="embla__slide">
                  <BlogCard
                    title={blog.title}
                    description={blog.description}
                    date={blog.publishedDate ? formatDate(blog.publishedDate) : ''}
                    likeCount={blog.likeCount}
                    coverPhotoUrl={blog.coverPhotoUrl}
                    readDuration={blog.readDuration}
                    totalCommentCount={blog?._count?.comments ?? 0}
                  />
                </Link>
              )
            })}
          </Carousel>
        </CardSection>
      </div>
      <div className="mb-[50px]">
        <CardSection heading="Blog Topics">
          <div className="flex flex-wrap justify-around mx-auto mt-[20px] max-w-[1200px]">
            {blogTopics.map((topic, index) => (
              <TopicCard
                key={index}
                title={topic.title}
                description={topic.description}
                imgSrc={topic.imgSrc}
                alt={topic.alt}
                link={topic.link}
              />
            ))}
          </div>
        </CardSection>
      </div>
    </main>
  );
}
