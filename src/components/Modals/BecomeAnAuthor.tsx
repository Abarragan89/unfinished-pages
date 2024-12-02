"use client";
import ModalWrapper from "./ModalWrapper";
import TextareaLabel from "../FormInputs/TextareaLabel";
import { useState, useEffect } from "react";
import axios from "axios";
import SubmitButton from "../Buttons/SubmitButton";
import { AuthorRequest } from "../../../types/users";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function BecomeAnAuthor({ userId }: { userId: string }) {

    const router = useRouter();

    const [aboutText, setAboutText] = useState<string>('');
    const [whyBlogText, setWhyBlogText] = useState<string>('');
    const [topicsText, setTopicsText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [requestStatus, setRequestState] = useState<AuthorRequest | null>(null)

    async function handleAuthorRequest(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post('/api/userRoutes/authorRequest', {
                aboutText,
                whyBlogText,
                topicsText
            })
            if (data === null) {
                setRequestState(null)
            } else {
                setRequestState(data)
            }
        } catch (error) {
            console.log('error ', error)
        } finally {
            setIsLoading(false)
        }
    }

    // check to see if there is already a request for this person
    useEffect(() => {
        async function checkRequestStatus() {
            try {
                const { data } = await axios.get(`/api/userRoutes/authorRequest/${userId}`)
                if (data === null) {
                    setRequestState(null)
                } else {
                    setRequestState(data)
                }
            } catch (error) {
                console.log('error getting requests', error)
            }
        }
        checkRequestStatus();
    }, [])

    async function acknowledgeDeclinedStatus() {
        try {
            await axios.delete(`/api/userRoutes/authorRequest/${userId}`)
            setRequestState(null)
        } catch (error) {
            console.log('error deleting author request', error)
        } finally {
            router.back();
        }
    }

    return (

        <ModalWrapper
            title="Request Author Status"
            urlParam="becomeAnAuthor"
        >
            {!requestStatus ?
                <form
                    onSubmit={(e) => handleAuthorRequest(e)}
                    className="w-[315px] md:w-[380px]"
                >
                    <TextareaLabel
                        handleStateChange={setWhyBlogText}
                        userText={whyBlogText}
                        labelText="Why do you want to become an author?"
                        characterLimit={1000}
                    />
                    <TextareaLabel
                        handleStateChange={setAboutText}
                        userText={aboutText}
                        labelText="Tell us about yourself."
                        characterLimit={1000}
                    />
                    <TextareaLabel
                        handleStateChange={setTopicsText}
                        userText={topicsText}
                        labelText="What topics will you blog about?"
                        characterLimit={500}
                    />
                    <div className="w-fit mx-auto mt-4">
                        <SubmitButton
                            isSubmittable={!!whyBlogText && !!aboutText && !!topicsText}
                            isLoading={isLoading}
                        >
                            Submit
                        </SubmitButton>
                    </div>
                </form>
                :
                <>
                    {requestStatus.status === 'pending' &&
                        <p className="text-center text-[var(--brown-500)] my-4">We are reviewing your information and will notify by email when we make our decision.</p>
                    }
                    {requestStatus.status === 'declined' &&
                        <>
                            <p className="text-center text-[var(--brown-500)] my-4">Unfortunately, you were decline author status for the following reason:</p>
                            <p className="text-center my-4 bg-[var(--gray-100)] border border-[var(--gray-300)] rounded-sm p-2">{requestStatus.replyMessage}</p>
                            <button
                                onClick={acknowledgeDeclinedStatus}
                                className="custom-small-btn block mx-auto bg-[var(--success)]"
                            >Acknowledge</button>
                        </>
                    }
                    {requestStatus.status === 'approved' &&
                        <>
                            <p className="text-center text-[var(--brown-500)] my-4">Congratulations, You've been approved to be an author! You must log out and log back in to start writing.</p>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="custom-small-btn block mx-auto bg-[var(--success)]"
                            >Acknowledge</button>
                        </>
                    }
                </>
            }
        </ModalWrapper>
    )
}
