import Image from "next/image"
import { FaHeart } from "react-icons/fa"; // solid heart
import { CiHeart } from "react-icons/ci"; // outline heart
import SubheadingTitle from "./Headings/SubheadingTitle";
import { IoIosArrowDown } from "react-icons/io";
import SingleComment from "./SingleComment";


export default function CommentSection() {

    const commentData = [
        {
            username: "tommy",
            commentText: "I love this",
            likes: "20"
        },
        {
            username: "Ronny",
            commentText: "Keep up the good work",
            likes: "13"
        }
    ]

    return (
        <section className="relative max-w-[700px] mx-auto pb-5 pt-8">
            <p className="absolute right-0 top-[15px] hover:cursor-pointer text-[.95rem] underline text-[var(--brown-500)] opacity-[0.7] hover:opacity-[1]">Add Comment</p>
            <SubheadingTitle title="Comments" />
            <SingleComment />
            <SingleComment />
            <SingleComment />
        </section>
    )
}
