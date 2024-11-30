"use client";
import { useState } from "react";
import Image from "next/image"
import { CiHeart } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { Session } from "../../types/users";
import { Comment } from "../../types/comment";
import { formatDate } from "../../utils/formatDate";

export default function SingleComment({ session, commentData }: { session: Session, commentData: Comment }) {

    const [showReplies, setShowReplies] = useState<boolean>(false)

    function showLoginModal(): void {
        alert("show login modal")
    }
    function showAddCommentReplyModal(): void {
        alert('show add comment replay modal')
    }

    async function addLike() {
        alert('you added a like')
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
                        <CiHeart
                            onClick={session.status === 'authenticated' ? addLike : showLoginModal}
                            size={23}
                            className="hover:cursor-pointer" />
                        <p className="text-[.93rem]">{commentData.likes}</p>
                    </div>
                </div>
            </div>
            <p className="text-[1rem] px-[50px] mt-2">{commentData.text}</p>
            <div className="flex justify-between items-center text-[.975rem] mx-14 mt-2">
                <div
                    onClick={() => setShowReplies(prev => !prev)}
                    className="w-fit mr-0 flex justify-end text-[var(--gray-600)] items-center hover:cursor-pointer"
                >
                    <p>replies</p>
                    <p className="text-[.9rem] ml-[4px]">{commentData.replies.length}</p>
                    {showReplies ? <FiChevronLeft size={18} /> : <IoChevronDownOutline />}
                </div>
                <p
                    onClick={session.status === 'authenticated' ? showAddCommentReplyModal : showLoginModal}
                    className="hover:cursor-pointer text-[.95rem] underline text-[var(--brown-500)] opacity-[0.7] hover:opacity-[1]"
                >
                    Reply
                </p>
            </div>

            {/* Replies */}
            {showReplies &&
                <div style={{ transform: "scale(0.88)" }}
                    className=""
                >
                    {commentData.replies.map((reply, index) => (
                        <div key={index} className="mb-4 border-l ps-4">
                            <div className="flex items-center">
                                <Image
                                    src={"/images/defaultProfilePic.png"}
                                    width={40}
                                    height={40}
                                    alt="profile pic of blog author"
                                    className="rounded-[50px] w-[40px]"
                                />
                                <div className="flex justify-between items-center w-full ml-3">
                                    <div>
                                        <p className="leading-none text-[.95rem] text-[var(--brown-500)]">Anthony Barragan</p>
                                        <p className="leading-none text-[.95rem] text-[var(--gray-500)]">2 days ago</p>
                                    </div>
                                    <div className="flex items-center text-[var(--gray-600)]">
                                        <CiHeart size={23} />
                                        <p className="text-[.93rem]">93</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1rem] px-[50px] mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!</p>
                        </div>
                    ))}

                    {/* <div className="mb-4 border-l ps-4">
                        <div className="flex items-center">
                            <Image
                                src={"/images/defaultProfilePic.png"}
                                width={40}
                                height={40}
                                alt="profile pic of blog author"
                                className="rounded-[50px] w-[40px]"
                            />
                            <div className="flex justify-between items-center w-full ml-3">
                                <div>
                                    <p className="leading-none text-[.95rem] text-[var(--brown-500)]">Anthony Barragan</p>
                                    <p className="leading-none text-[.95rem] text-[var(--gray-500)]">2 days ago</p>
                                </div>
                                <div className="flex items-center text-[var(--gray-600)]">
                                    <CiHeart size={23} />
                                    <p className="text-[.93rem]">93</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[1rem] px-[50px] mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus doloremque, eum aliquid voluptatum suscipit facere quaerat, nobis itaque saepe harum quia, corporis sequi perferendis! Aut similique sint qui nemo nulla!</p>
                    </div> */}

                </div>
            }
        </div>
    )
}
