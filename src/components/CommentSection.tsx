'use client';
import SubheadingTitle from "./Headings/SubheadingTitle";
import SingleComment from "./SingleComment";
import { useSession } from "next-auth/react";
import { Session } from "../../types/users";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { Comment } from "../../types/comment";
import TextareaLabel from "./FormInputs/TextareaLabel";

export default function CommentSection({ blogId, blogComments }: { blogId: string, blogComments: Comment[] }) {

    const session: Session = useSession();
    const [userComment, setUserComment] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [blogCommentState, setBlogCommentState] = useState<Comment[]>(blogComments)

    function showAddCommentModal(): void {
        alert('showing comment modal')
    }

    function showLoginModal(): void {
        alert("show login modal")
    }

    async function addCommentHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post('/api/userRoutes/comments', {
                text: userComment.trim(),
                blogId: blogId
            })
            setBlogCommentState(prev => [data.comment, ...prev])
            setUserComment('');
        } catch (error) {
            console.log('error adding comment ', error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="relative max-w-[700px] mx-auto pb-5 pt-5">
            <SubheadingTitle title="Comments" />
            {session.status === 'authenticated' ?
                <form
                    onSubmit={(e) => addCommentHandler(e)}
                    className="relative"
                >
                    <div className="mb-10">
                        <TextareaLabel
                            handleStateChange={setUserComment}
                            userText={userComment}
                            characterLimit={1000}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`absolute right-[10px] top-[65px] h-[30px] ${userComment ? '' : 'opacity-[.5] pointer-events-none'}`}
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
                :
                <p className="text-center">Login To Comment on this post</p>
            }

            {blogCommentState && blogCommentState?.map((commentData) => (
                <SingleComment
                    key={commentData.id}
                    session={session}
                    commentData={commentData}
                />
            ))}
        </section>
    )
}
