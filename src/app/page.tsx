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

export default function Home() {

  const blogTopics: BlogTopic[] = [
    {
      title: "Philosophy",
      description: "Exploring philosophys big questions, I find myself both the debater and the skeptic, endlessly intrigued.",
      imgSrc: "/images/topicCardImgs/philosophy.jpg",
      alt: "",
      link: ""
    },
    {
      title: "Religion",
      description: "I wrestle with religious ideas, questioning beliefs and unraveling perspectives that shape human meaning.",
      imgSrc: "/images/topicCardImgs/religion.jpg",
      alt: "",
      link: ""
    },
    {
      title: "Family",
      description: "Family life sparks inner debates on tradition, values, and what it truly means to connect and belong.",
      imgSrc: "/images/topicCardImgs/family.jpg",
      alt: "",
      link: ""
    },
    {
      title: "Education",
      description: "I challenge myself on education\’s role, questioning how best we learn, grow, and pass on knowledge.",
      imgSrc: "/images/topicCardImgs/education.jpg",
      alt: "",
      link: ""
    },
    {
      title: "Technology",
      description: "I argue the pros and cons of technology, reflecting on how it shapes us and transforms our daily lives.",
      imgSrc: "/images/topicCardImgs/technology.jpg",
      alt: "",
      link: ""
    },
    {
      title: "Government",
      description: "I find myself questioning the role of government, debating its impact on freedom, justice, and societal well-being.",
      imgSrc: "/images/topicCardImgs/government.jpg",
      alt: "",
      link: ""
    }
  ];

  const blogData: BlogData[] = [
    {
        id: '1',
        title: 'Boost Your Creativity with These Proven Techniques',
        description: 'Discover insightful tips, expert advice, and the latest trends to elevate your lifestyle, boost productivity, and inspire personal growth!',
        date: 'September 12, 2023',
        likes: 53,
        dislikes: 11,
        pictureURL: '/public/topicCardImgs/family.png'
    },
    {
        id: '2',
        title: 'Mastering the Art of Productivity: Tips for Daily Success',
        description: 'Your go-to source for in-depth articles on tech, wellness, and creativity. Explore fresh perspectives and tips for thriving in todays world.!',
        date: 'August 29, 2024',
        likes: 120,
        dislikes: 25,
        pictureURL: '/public/topicCardImgs/family.png'
    },
    {
        id: '3',
        title: 'Healthy Living Hacks: Simple Changes for a Better Life',
        description: 'Uncover practical solutions and fresh ideas for work, wellness, and creativity. Join us on a journey to live more inspired, balanced lives.',
        date: 'July 12, 2023',
        likes: 892,
        dislikes: 30,
        pictureURL: '/public/topicCardImgs/family.png'
    },
    {
        id: '4',
        title: 'Exploring the Future of AI: Trends and Innovations Ahead',
        description: 'Explore actionable insights and stories across tech, health, and creativity, designed to help you grow, learn, and live with purpose.',
        date: 'Decemeber 25, 2024',
        likes: 2,
        dislikes: 1,
        pictureURL: '/public/topicCardImgs/family.png'
    }
]


  return (
    <main>
      <Suspense>
        <LoginModal />
      </Suspense>
      <Jumbotron />
      <div className="my-[60px]" id="featured-blogs">
        <CardSection heading="Featured Blogs">
          <Carousel>
            {blogData.map((blog) => {
              return (
                <Link key={blog.id} href={`/blog/${blog.title}`} className="embla__slide">
                  <BlogCard
                    id={blog.id}
                    title={blog.title}
                    description={blog.description}
                    date={blog.date}
                    likes={blog.likes}
                    pictureURL={blog.pictureURL}
                    dislikes={blog.dislikes}
                  />
                </Link>
              )
            })}

          </Carousel>
        </CardSection>
      </div>
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
    </main>
  );
}
