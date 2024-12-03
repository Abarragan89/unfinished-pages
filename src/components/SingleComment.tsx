"use client";
import { useState, useEffect } from "react";
import Image from "next/image"
import { IoChevronDownOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FiChevronLeft } from "react-icons/fi";
import { Session } from "../../types/users";
import { Comment } from "../../types/comment";
import { formatDate } from "../../utils/formatDate";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import TextareaLabel from "./FormInputs/TextareaLabel";
import { IoSendSharp } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import CommentReplySection from "./CommentReplySection";

export default function SingleComment({ session, commentData, blogId }: { session: Session, commentData: Comment, blogId: string }) {
    const [showReplies, setShowReplies] = useState<boolean>(false)
    const [isLikedByUser, setIsLikeByUser] = useState<boolean>(false)

    const [totalCommentLikes, setTotalCommentLikes] = useState<number>(commentData.likeCount || 0)
    const [showReplyTextarea, setShowReplyTextarea] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [replyCommentState, setReplyCommentState] = useState<Comment[]>(commentData.replies)

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (session.data?.user?.id && commentData.likes.length > 0) {
            const isLiked = commentData.likes.some((like) => like.userId === session?.data?.user?.id);
            setIsLikeByUser(isLiked);
        }
    }, [commentData?.likes, session?.data?.user?.id]);

    const handleShowLoginModal = () => {
        // Use router.push with the new query parameter
        router.push(`${window.location.origin}/${pathname}?showModal=login`, {
            scroll: false
        })
    };


    async function addCommentReplyHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post('/api/userRoutes/commentReplies', {
                text: replyText.trim(),
                blogId: blogId,
                commentId: commentData.id
            })
            setReplyCommentState(prev => [data.comment, ...prev])
        } catch (error) {
            console.log('error adding comment ', error)
        } finally {
            setIsLoading(false);
            setReplyText('');
            setShowReplyTextarea(false)
            setShowReplies(true)
        }
    }

    // This to toggle likes in main comment
    async function toggleCommentLike(toggleOption: string, commentId: string) {
        try {
            await axios.put('/api/userRoutes/comments', {
                commentId
            })
            if (toggleOption === 'add') {
                setIsLikeByUser(true)
                setTotalCommentLikes(prev => prev + 1)
            } else if (toggleOption === 'remove') {
                setIsLikeByUser(false)
                setTotalCommentLikes(prev => prev - 1)
            }
        } catch (error) {
            console.log('error adding comment ', error)
        }
    }

    return (
        <div className="mb-7">
            <div className="flex items-center">
                <Image
                    src={commentData.user.image as string}
                    width={40}
                    height={40}
                    alt="profile pic of comment author"
                    className="rounded-[50px] w-[40px]"
                />
                <div className="flex justify-between items-center w-full ml-3">
                    <div>
                        <p className="leading-0 text-[.95rem] text-[var(--brown-500)]">{commentData.user.name}</p>
                        <p className="leading-none text-[.95rem] text-[var(--gray-500)]">{formatDate(commentData.createdAt)}</p>
                    </div>
                    <div className="flex items-center text-[var(--gray-600)]">
                        {isLikedByUser ?
                            <FaHeart
                                onClick={session.status === 'authenticated' ? () => toggleCommentLike('remove', commentData.id) : handleShowLoginModal}
                                size={20}
                                className="hover:cursor-pointer text-[var(--brown-100)]" />
                            :
                            <FaRegHeart
                                onClick={session.status === 'authenticated' ? () => toggleCommentLike('add', commentData.id) : handleShowLoginModal}
                                size={20}
                                className="hover:cursor-pointer" />
                        }
                        <p className="text-[.93rem] ml-1">{totalCommentLikes?.toString()}</p>
                    </div>
                </div>
            </div>
            <p className="text-[1rem] px-[50px] mt-0">{commentData.text}</p>

            {/* Conditionally render reply form */}
            {showReplyTextarea &&
                <form
                    onSubmit={(e) => addCommentReplyHandler(e)}
                    className="relative w-[80%] mx-auto mt-[-10px]"
                >
                    <div>
                        <TextareaLabel
                            handleStateChange={setReplyText}
                            userText={replyText}
                            characterLimit={1000}
                            placeholderText={'Add comment'}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`absolute right-[10px] top-[75px] h-[30px] ${replyText ? '' : 'opacity-[.5] pointer-events-none'}`}
                    >
                        {isLoading ?
                            <BarLoader
                                color={'black'}
                                width={15}
                                height={2}
                                loading={isLoading}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            :
                            <IoSendSharp
                                color="black"
                                size={22}
                            />
                        }
                    </button>
                </form>
            }

            <div className="flex justify-between items-center text-[.975rem] mx-14 mt-2">
                <div
                    onClick={() => setShowReplies(prev => !prev)}
                    className="w-fit mr-0 flex justify-end text-[var(--gray-600)] items-center hover:cursor-pointer"
                >
                    <p>replies</p>
                    <p className="text-[.9rem] ml-[4px]">{commentData?.replies?.length || 0}</p>
                    {showReplies ? <FiChevronLeft size={18} /> : <IoChevronDownOutline />}
                </div>
                {showReplyTextarea ?
                    <p
                        onClick={session.status === 'authenticated' ? () => setShowReplyTextarea(false) : handleShowLoginModal}
                        className="hover:cursor-pointer text-[.95rem] underline text-[var(--brown-500)] opacity-[0.7] hover:opacity-[1]"
                    >
                        Cancel
                    </p>
                    :
                    <p
                        onClick={session.status === 'authenticated' ? () => setShowReplyTextarea(true) : handleShowLoginModal}
                        className="hover:cursor-pointer text-[.95rem] underline text-[var(--brown-500)] opacity-[0.7] hover:opacity-[1]"
                    >
                        Reply
                    </p>
                }
            </div>

            {/* Replies */}
            {showReplies &&
                <div style={{ transform: "scale(0.88)" }}
                    className=""
                >
                    {replyCommentState && replyCommentState.map((reply: Comment, index: number) => (
                        <CommentReplySection
                            key={index}
                            handleShowLoginModal={handleShowLoginModal}
                            session={session}
                            replyCommentData={reply}
                        />
                    ))}
                </div>
            }
        </div>
    )
}
