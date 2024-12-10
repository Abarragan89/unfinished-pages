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
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "./Modals/LoginModal";

export default function CommentSection({ blogId, blogComments }: { blogId: string, blogComments: Comment[] }) {

    const session: Session = useSession();
    const router = useRouter();
    const pathname = usePathname()
    const [userComment, setUserComment] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [blogCommentState, setBlogCommentState] = useState<Comment[]>(blogComments)

    const handleShowLoginModal = () => {
        // Use router.push with the new query parameter
        router.push(`${window.location.origin}/${pathname}?showModal=login`, {
            scroll: false
        })
    };

    async function addCommentHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            // add comment
            setIsLoading(true);
            const { data } = await axios.post('/api/userRoutes/comments', {
                text: userComment.trim(),
                blogId: blogId
            })
            setBlogCommentState(prev => [data.comment, ...prev])
            setUserComment('');

            // create notifications
            await axios.post('/api/userRoutes/notifications', {
                blogId,
                commenterId: session.data?.user?.id,
                blogSlug: pathname.split('/')[2]
            })
        } catch (error) {
            console.log('error adding comment ', error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="relative max-w-[700px] mx-auto pb-5 pt-5" id="comment-section-main">
            <LoginModal />
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
                            placeholderText={'Add comment'}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`absolute right-[10px] top-[75px] h-[30px] ${userComment ? '' : 'opacity-[.5] pointer-events-none'}`}
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
                // Textbox leads to login
                <>
                    <div className="relative" onClick={handleShowLoginModal}>
                        <div className="mb-10 pointer-events-none">
                            <TextareaLabel
                                handleStateChange={setUserComment}
                                userText={userComment}
                                characterLimit={1000}
                                placeholderText={'Add comment'}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`absolute right-[10px] top-[75px] h-[30px] opacity-[.5] pointer-events-none`}
                        >
                            <IoSendSharp
                                color="black"
                                size={22}
                            />
                        </button>
                    </div>
                </>
            }

            {blogCommentState && blogCommentState?.map((commentData) => (
                <SingleComment
                    key={commentData.id}
                    session={session}
                    commentData={commentData}
                    blogId={blogId}
                />
            ))}
        </section>
    )
}
