"use client";
import SubheadingTitle from "./Headings/SubheadingTitle";
import SingleComment from "./SingleComment";
import { useSession } from "next-auth/react";
import { Session } from "../../types/users";

export default function CommentSection() {

    const session: Session = useSession();
    console.log('session', session)

    function showAddCommentModal(): void {
        alert('showing comment modal')
    }

    function showLoginModal(): void {
        alert("show login modal")
    }

    return (
        <section className="relative max-w-[700px] mx-auto pb-5 pt-8">
            <p
                onClick={session.status === 'authenticated' ? showAddCommentModal : showLoginModal}
                className="absolute right-0 top-[15px] hover:cursor-pointer text-[.95rem] underline text-[var(--brown-500)] opacity-[0.7] hover:opacity-[1]">Add Comment</p>
            <SubheadingTitle title="Comments" />
            <SingleComment session={session} />
            <SingleComment session={session} />
            <SingleComment session={session} />
        </section>
    )
}
