"use client";
import { BiMessageRounded } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Session } from "../../../types/users";
import { CommentLike } from "../../../types/comment";

interface Props {
    likes: CommentLike[];
}

export default function BlogLikeCommentBar({ likes }: Props) {

    const session: Session = useSession();
    function showLoginMenu(): void {
        alert('you need to login')
    }
    function addLike(): void {
        alert('you liked a thing')
    }
    function showAddCommentModal(): void {
        alert('Here is the modal')
    }

    return (
        <section className="flex items-center mx-auto mb-[40px] justify-between py-[5px] max-w-[700px] my-5 px-4 text-[var(--gray-500)] border-t border-b border-[var(--paper-color)]">
            <div className="flex items-center text-[var(--gray-500)">
                <IoMdHeartEmpty
                    onClick={session.status === 'authenticated' ? addLike : showLoginMenu}
                    className="text-[1.5rem] mr-[2px] hover:cursor-pointer"
                />
                <p className="mr-5 text-[.95rem]">{likes.length}</p>
                <BiMessageRounded
                    onClick={session.status === 'authenticated' ? showAddCommentModal : showLoginMenu}
                    className="text-[1.5rem] mr-[2px] hover:cursor-pointer"
                />
                <p className="text-[.95rem]">15</p>
            </div>
            <IoShareOutline className="text-[1.55rem] text-[var(--gray-500) hover:cursor-pointer" />
        </section>
    )
}
