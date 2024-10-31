import Header from "@/components/Header";
import Jumbotron from "@/components/Jumbotron";
import TopicCard from "@/components/Cards/TopicCard";
import BlogCard from "@/components/Cards/BlogCard";
import CardSection from "@/components/CardSection";
import Carousel from "@/components/Carousel";
import { BlogTopic } from "../../types/blogtopics";
import SubheadingTitle from "@/components/Headings/SubheadingTitle";
import LoginModal from "@/components/Modals/LoginModal";
import LoginButton from "@/components/Buttons/LoginButton";
import { Suspense } from 'react'



export default function Home() {


  const blogTopics: BlogTopic[] = [
    {
      title: "Philosophy",
      description: "Exploring philosophy\’s big questions, I find myself both the debater and the skeptic, endlessly intrigued.",
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


  return (
    <main>
      <Suspense>
        <LoginModal />
      </Suspense>
      <Jumbotron />
      {/* <div className="relative top-[-60px]"> */}
      <CardSection heading="Featured Blogs">
        <Carousel>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </Carousel>
      </CardSection>
      {/* </div> */}
      <hr className="bg-black mb-[60px] w-[80%] mx-auto"></hr>
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
