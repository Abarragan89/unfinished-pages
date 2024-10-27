import Header from "@/components/Header";
import Jumbotron from "@/components/Jumbotron";
import Card from "@/components/Cards/TopicCard";
import BlogCard from "@/components/Cards/BlogCard";
import CardSection from "@/components/CardSection";

export default function Home() {

  return (
    <main>
      <Header />
      <Jumbotron />
      <CardSection heading="Featured Blogs">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </CardSection>
      <CardSection heading="Topics">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardSection>
    </main>
  );
}
