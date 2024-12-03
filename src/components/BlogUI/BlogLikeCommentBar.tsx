"use client";
import { BiMessageRounded } from "react-icons/bi";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Session } from "../../../types/users";
import { Comment, CommentLike } from "../../../types/comment";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Props {
    likes: CommentLike[];
    blogId: string;
    commentCount: number;
}

export default function BlogLikeCommentBar({ likes, blogId, commentCount }: Props) {

    const session: Session = useSession();
    const [isBlogLikedByUser, setIsBlogLikeByUser] = useState<boolean>(false);
    const [totalCommentLikes, setTotalCommentLikes] = useState<number>(likes.length);
    const [totalComments, setTotalComments] = useState<number>(0);

    const router = useRouter();
    const pathname = usePathname();

    const handleShowLoginModal = () => {
        // Use router.push with the new query parameter
        router.push(`${window.location.origin}/${pathname}?showModal=login`, {
            scroll: false
        })
    };

    // I need this useeffect because I'm calling the session here and timing is sometimes off
    // This is not the case for comments where I am passing the session from parent to child
    useEffect(() => {
        if (session.data?.user?.id) {
            const isLiked = likes.some((like) => like.userId === session.data?.user?.id);
            setIsBlogLikeByUser(isLiked);
        }
    }, [likes, session.data?.user?.id]);


    async function toggleBlogLike(toggleOption: string) {
        try {
            await axios.put('/api/userRoutes/blogLike', {
                blogId
            })
            if (toggleOption === 'add') {
                setIsBlogLikeByUser(true)
                setTotalCommentLikes(prev => prev + 1)
            } else if (toggleOption === 'remove') {
                setIsBlogLikeByUser(false)
                setTotalCommentLikes(prev => prev - 1)
            }
        } catch (error) {
            console.log('error adding comment ', error)
        }
    }

    return (
        <section className="flex items-center mx-auto mb-[40px] justify-between py-[5px] max-w-[700px] my-5 px-4 text-[var(--gray-500)] border-t border-b border-[var(--paper-color)]">
            <div className="flex items-center text-[var(--gray-500)">
                {isBlogLikedByUser ?
                    <FaHeart
                        onClick={session.status === 'authenticated' ?
                            () => toggleBlogLike('remove')
                            : handleShowLoginModal
                        }
                        className="text-[1.5rem] mr-[2px] hover:cursor-pointer text-[var(--brown-100)]"
                    />
                    :
                    <FaRegHeart
                        onClick={session.status === 'authenticated' ?
                            () => toggleBlogLike('add')
                            : handleShowLoginModal
                        }
                        className="text-[1.5rem] mr-[2px] hover:cursor-pointer"
                    />
                }
                <p className="mr-5 text-[.95rem]">{totalCommentLikes}</p>
                <Link
                    href="#comment-section-main"
                >
                    <BiMessageRounded
                        className="text-[1.5rem] mr-[2px] hover:cursor-pointer"
                    />
                </Link>
                <p className="text-[.95rem]">{commentCount?.toString()}</p>
            </div>
            <IoShareOutline className="text-[1.55rem] text-[var(--gray-500) hover:cursor-pointer" />
        </section>
    )
}
